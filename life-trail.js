const lifeCanvas = document.querySelector("[data-life-canvas]");
const trailCanvas = document.querySelector("[data-life-cursor-trail]");
const scaleInput = document.querySelector("[data-life-scale]");

if (lifeCanvas && trailCanvas) {
  const context = trailCanvas.getContext("2d", { alpha: true });
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(pointer: fine)");
  const generationInterval = 1000 / 7.5;
  const minimumRadius = 16;
  const maximumRadius = 58;
  const maximumLiveCells = 1400;
  const neighborOffsets = [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0], [1, 0],
    [-1, 1], [0, 1], [1, 1],
  ];

  let liveCells = new Map();
  let fadingCells = new Map();
  let columns = 0;
  let rows = 0;
  let cellSize = 5;
  let animationFrame = 0;
  let lastGenerationAt = 0;
  let lastSeedAt = 0;
  let lastSeedPoint = null;
  let pointerPressed = false;
  let shapePhase = Math.random() * Math.PI * 2;
  let smoothedRadius = 36;

  const neonThemeActive = () => document.documentElement.dataset.theme === "neon";
  const trailColor = () => (neonThemeActive() ? "#00ff00" : "#0000ff");
  const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));
  const smoothstep = (value) => {
    const normalized = clamp(value, 0, 1);
    return normalized * normalized * (3 - 2 * normalized);
  };

  const cellKey = (column, row) => row * columns + column;

  const clearTrail = () => {
    liveCells.clear();
    fadingCells.clear();
    lastSeedPoint = null;
    lastGenerationAt = performance.now();
    trailCanvas.dataset.activeCells = "0";
    context.clearRect(0, 0, trailCanvas.clientWidth, trailCanvas.clientHeight);
  };

  const syncGrid = () => {
    const width = Math.max(1, trailCanvas.clientWidth);
    const height = Math.max(1, trailCanvas.clientHeight);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const requestedCellSize = Number(scaleInput?.value || 5);

    cellSize = Math.max(1, Number.isFinite(requestedCellSize) ? requestedCellSize : 5);
    columns = Math.max(8, Math.floor(width / cellSize));
    rows = Math.max(8, Math.floor(height / cellSize));
    trailCanvas.width = Math.round(width * pixelRatio);
    trailCanvas.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.imageSmoothingEnabled = false;
    clearTrail();
  };

  const opacityForLiveCell = (cell, now) => {
    const birth = smoothstep((now - cell.bornAt) / 150);
    const expiry = smoothstep((cell.expiresAt - now) / 650);
    return cell.opacity * birth * expiry;
  };

  const beginFade = (key, cell, now, duration = 480) => {
    if (fadingCells.has(key)) return;
    fadingCells.set(key, {
      diedAt: now,
      duration,
      opacity: opacityForLiveCell(cell, now),
    });
  };

  const evolveCells = (now) => {
    const viableCells = new Map();

    liveCells.forEach((cell, key) => {
      if (cell.expiresAt <= now) {
        beginFade(key, cell, now, 620);
      } else {
        viableCells.set(key, cell);
      }
    });

    const neighborCounts = new Map();
    const neighborExpiry = new Map();

    viableCells.forEach((cell, key) => {
      const column = key % columns;
      const row = Math.floor(key / columns);

      neighborOffsets.forEach(([offsetX, offsetY]) => {
        const neighborColumn = column + offsetX;
        const neighborRow = row + offsetY;
        if (
          neighborColumn < 0 ||
          neighborColumn >= columns ||
          neighborRow < 0 ||
          neighborRow >= rows
        ) return;

        const neighborKey = cellKey(neighborColumn, neighborRow);
        neighborCounts.set(neighborKey, (neighborCounts.get(neighborKey) || 0) + 1);
        neighborExpiry.set(
          neighborKey,
          Math.max(neighborExpiry.get(neighborKey) || 0, cell.expiresAt),
        );
      });
    });

    const nextCells = new Map();

    neighborCounts.forEach((count, key) => {
      const existingCell = viableCells.get(key);
      if (existingCell && (count === 2 || count === 3)) {
        nextCells.set(key, existingCell);
        return;
      }

      if (!existingCell && count === 3) {
        const expiresAt = (neighborExpiry.get(key) || now) - generationInterval * 0.7;
        if (expiresAt <= now + 180) return;
        nextCells.set(key, {
          bornAt: now,
          expiresAt,
          opacity: 0.58 + Math.random() * 0.22,
        });
        fadingCells.delete(key);
      }
    });

    viableCells.forEach((cell, key) => {
      if (!nextCells.has(key)) beginFade(key, cell, now, 440 + Math.random() * 180);
    });

    liveCells = nextCells;
  };

  const drawCell = (key, alpha, fill) => {
    if (alpha <= 0.005) return;
    const column = key % columns;
    const row = Math.floor(key / columns);
    const gap = cellSize >= 7 ? 1 : 0.5;
    const cellFill = Math.max(1, cellSize - gap);

    context.globalAlpha = alpha;
    context.fillStyle = fill;
    context.fillRect(column * cellSize, row * cellSize, cellFill, cellFill);
  };

  const renderTrail = (now) => {
    animationFrame = 0;
    const width = trailCanvas.clientWidth;
    const height = trailCanvas.clientHeight;

    if (liveCells.size && now - lastGenerationAt >= generationInterval) {
      evolveCells(now);
      lastGenerationAt = now;
    }

    context.clearRect(0, 0, width, height);
    const fill = trailColor();

    liveCells.forEach((cell, key) => {
      drawCell(key, opacityForLiveCell(cell, now), fill);
    });

    fadingCells.forEach((cell, key) => {
      const progress = (now - cell.diedAt) / cell.duration;
      if (progress >= 1) {
        fadingCells.delete(key);
        return;
      }
      drawCell(key, cell.opacity * (1 - smoothstep(progress)), fill);
    });

    context.globalAlpha = 1;
    trailCanvas.dataset.activeCells = String(liveCells.size + fadingCells.size);

    if (liveCells.size || fadingCells.size) {
      animationFrame = window.requestAnimationFrame(renderTrail);
    }
  };

  const requestTrailFrame = () => {
    if (!animationFrame) animationFrame = window.requestAnimationFrame(renderTrail);
  };

  const seedCell = (column, row, now, expiresAt) => {
    if (column < 0 || column >= columns || row < 0 || row >= rows) return;
    const key = cellKey(column, row);
    const existingCell = liveCells.get(key);

    if (existingCell) {
      existingCell.expiresAt = Math.max(existingCell.expiresAt, expiresAt);
      return;
    }

    liveCells.set(key, {
      bornAt: now,
      expiresAt,
      opacity: 0.58 + Math.random() * 0.24,
    });
    fadingCells.delete(key);
  };

  const seedAmoeba = (point, now, intensity = 1) => {
    const radiusWave =
      38 +
      Math.sin(now * 0.00043 + shapePhase) * 12 +
      Math.sin(now * 0.00017 - shapePhase * 0.7) * 8;
    const targetRadius = clamp(radiusWave, minimumRadius, maximumRadius);
    smoothedRadius += (targetRadius - smoothedRadius) * 0.16;
    shapePhase += 0.055;

    const sampleCount = Math.round((5 + smoothedRadius * 0.055) * intensity);
    const centerColumn = Math.floor(point.x / cellSize);
    const centerRow = Math.floor(point.y / cellSize);
    const lifetime = 1750 + Math.random() * 850;

    for (let sample = 0; sample < sampleCount; sample += 1) {
      const angle = Math.random() * Math.PI * 2;
      const envelope = clamp(
        0.72 +
          Math.sin(angle * 3 + shapePhase) * 0.17 +
          Math.sin(angle * 5 - shapePhase * 0.74) * 0.1 +
          Math.sin(angle * 2 + shapePhase * 0.36) * 0.06,
        0.42,
        1,
      );
      const distance = Math.pow(Math.random(), 1.3) * smoothedRadius * envelope;
      const column = centerColumn + Math.round((Math.cos(angle) * distance) / cellSize);
      const row = centerRow + Math.round((Math.sin(angle) * distance) / cellSize);
      const expiresAt = now + lifetime - Math.random() * 360;

      seedCell(column, row, now, expiresAt);

      if (Math.random() < 0.22) {
        const [neighborX, neighborY] = neighborOffsets[Math.floor(Math.random() * neighborOffsets.length)];
        seedCell(column + neighborX, row + neighborY, now + Math.random() * 35, expiresAt);
      }

      if (Math.random() < 0.05) {
        const horizontal = Math.random() < 0.5 ? -1 : 1;
        const vertical = Math.random() < 0.5 ? -1 : 1;
        seedCell(column + horizontal, row, now + Math.random() * 45, expiresAt);
        seedCell(column, row + vertical, now + Math.random() * 45, expiresAt);
      }
    }

    if (liveCells.size > maximumLiveCells) {
      const overflow = liveCells.size - maximumLiveCells;
      [...liveCells.entries()]
        .sort(([, first], [, second]) => first.expiresAt - second.expiresAt)
        .slice(0, overflow)
        .forEach(([key, cell]) => {
          liveCells.delete(key);
          beginFade(key, cell, now, 280);
        });
    }

    if (!animationFrame) lastGenerationAt = now;
    requestTrailFrame();
  };

  const seedAlongPointer = (point, now) => {
    if (!lastSeedPoint) {
      seedAmoeba(point, now);
      lastSeedPoint = point;
      lastSeedAt = now;
      return;
    }

    const deltaX = point.x - lastSeedPoint.x;
    const deltaY = point.y - lastSeedPoint.y;
    const distance = Math.hypot(deltaX, deltaY);
    if (distance < 2 || now - lastSeedAt < 76) return;

    const steps = Math.min(3, Math.max(1, Math.ceil(distance / 30)));
    for (let step = 1; step <= steps; step += 1) {
      const progress = step / steps;
      seedAmoeba({
        x: lastSeedPoint.x + deltaX * progress,
        y: lastSeedPoint.y + deltaY * progress,
      }, now + step * 4, 1 / Math.sqrt(steps));
    }

    lastSeedPoint = point;
    lastSeedAt = now;
  };

  const retireTrail = () => {
    const now = performance.now();
    liveCells.forEach((cell, key) => {
      beginFade(key, cell, now, 180);
    });
    liveCells.clear();
    fadingCells.forEach((cell) => {
      const progress = clamp((now - cell.diedAt) / cell.duration, 0, 1);
      cell.opacity *= 1 - smoothstep(progress);
      cell.diedAt = now;
      cell.duration = 180;
    });
    lastSeedPoint = null;
    requestTrailFrame();
  };

  lifeCanvas.addEventListener("pointermove", (event) => {
    if (
      pointerPressed ||
      event.buttons !== 0 ||
      reducedMotion.matches ||
      !finePointer.matches ||
      event.pointerType === "touch"
    ) return;

    const rect = lifeCanvas.getBoundingClientRect();
    seedAlongPointer({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }, performance.now());
  }, { passive: true });

  lifeCanvas.addEventListener("pointerdown", () => {
    pointerPressed = true;
    retireTrail();
  });

  const releasePointer = () => {
    pointerPressed = false;
    lastSeedPoint = null;
  };

  window.addEventListener("pointerup", releasePointer);
  window.addEventListener("pointercancel", releasePointer);
  lifeCanvas.addEventListener("pointerleave", () => {
    lastSeedPoint = null;
  });

  window.addEventListener("kdl:themechange", requestTrailFrame);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) clearTrail();
  });

  scaleInput?.addEventListener("change", syncGrid);

  if ("ResizeObserver" in window) {
    const observer = new ResizeObserver(syncGrid);
    observer.observe(trailCanvas);
  } else {
    window.addEventListener("resize", syncGrid);
  }

  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) clearTrail();
  });

  syncGrid();
}
