import Engine from "./assets/vendor/way-of-life/engine.js";

const stage = document.querySelector("[data-life-stage]");
const canvas = document.querySelector("[data-life-canvas]");
const siteHeader = document.querySelector(".site-header");

if (stage && canvas) {
  const context = canvas.getContext("2d", { alpha: false });
  const toolbar = document.querySelector("[data-life-toolbar]");
  const toolbarHandle = document.querySelector("[data-life-drag-handle]");
  const toolbarBody = document.querySelector("[data-life-toolbar-body]");
  const infoButton = document.querySelector("[data-life-info-button]");
  const infoPanel = document.querySelector("[data-life-info-panel]");
  const minimizeButton = document.querySelector("[data-life-minimize]");
  const minimizeIcon = document.querySelector("[data-life-minimize-icon]");
  const generationOutput = document.querySelector("[data-life-generation]");
  const populationOutput = document.querySelector("[data-life-population]");
  const seedInput = document.querySelector("[data-life-seed]");
  const densityInput = document.querySelector("[data-life-density]");
  const speedInput = document.querySelector("[data-life-speed]");
  const scaleInput = document.querySelector("[data-life-scale]");
  const wrapInput = document.querySelector("[data-life-wrap]");
  const trailsInput = document.querySelector("[data-life-trails]");
  const colorInput = document.querySelector("[data-life-color]");
  const colorTrigger = document.querySelector("[data-life-color-trigger]");
  const colorPicker = document.querySelector("[data-life-color-picker]");
  const colorSurface = document.querySelector("[data-life-color-surface]");
  const colorHandle = document.querySelector("[data-life-color-handle]");
  const hueInput = document.querySelector("[data-life-hue]");
  const colorOutput = document.querySelector("[data-life-color-output]");
  const toolButtons = [...document.querySelectorAll("[data-life-tool]")];
  const actionButtons = [...document.querySelectorAll("[data-life-action]")];
  const playButton = document.querySelector('[data-life-action="play"]');
  const pauseButton = document.querySelector('[data-life-action="pause"]');
  const mobileToolbarQuery = window.matchMedia("(max-width: 560px)");

  const patterns = {
    acorn: [
      [0, 0],
      [1, 0],
      [1, 2],
      [3, 1],
      [4, 0],
      [5, 0],
      [6, 0],
    ],
    "r-pentomino": [
      [1, 0],
      [2, 0],
      [0, 1],
      [1, 1],
      [1, 2],
    ],
    "glider-gun": [
      [0, 4], [0, 5], [1, 4], [1, 5],
      [10, 4], [10, 5], [10, 6], [11, 3], [11, 7],
      [12, 2], [12, 8], [13, 2], [13, 8], [14, 5],
      [15, 3], [15, 7], [16, 4], [16, 5], [16, 6], [17, 5],
      [20, 2], [20, 3], [20, 4], [21, 2], [21, 3], [21, 4],
      [22, 1], [22, 5], [24, 0], [24, 1], [24, 5], [24, 6],
      [34, 2], [34, 3], [35, 2], [35, 3],
    ],
  };

  // Exact run lengths recovered from the original hand-drawn canvas (825 cells).
  const invitationWidth = 183;
  const invitationRuns = [
    [0, 107, 112],
    [1, 105, 106, 113, 113],
    [2, 96, 96, 104, 105],
    [3, 96, 97, 103, 104],
    [4, 41, 41, 83, 83, 97, 97, 103, 103],
    [5, 41, 41, 51, 60, 82, 82, 98, 98, 103, 103],
    [6, 7, 13, 27, 27, 40, 41, 50, 51, 61, 61, 82, 82, 98, 98, 103, 103],
    [7, 5, 7, 13, 15, 27, 27, 40, 40, 49, 50, 62, 63, 82, 82, 98, 98, 103, 103],
    [8, 3, 5, 15, 16, 22, 22, 28, 28, 40, 40, 48, 48, 63, 64, 82, 82, 99, 99, 103, 104],
    [9, 3, 3, 22, 22, 29, 29, 40, 40, 48, 48, 64, 64, 82, 82, 99, 99, 104, 104],
    [10, 2, 2, 23, 23, 30, 30, 40, 40, 47, 47, 64, 64, 82, 82, 99, 99, 105, 106, 109, 114],
    [11, 1, 2, 23, 23, 30, 30, 40, 40, 47, 47, 63, 64, 82, 82, 99, 99, 106, 109, 114, 116],
    [12, 1, 1, 23, 23, 31, 31, 40, 40, 47, 49, 62, 63, 82, 82, 99, 99, 116, 116],
    [13, 1, 1, 23, 23, 31, 31, 39, 39, 47, 47, 50, 53, 60, 62, 82, 82, 99, 99, 117, 117],
    [14, 1, 1, 23, 23, 31, 31, 39, 39, 47, 47, 54, 59, 82, 82, 99, 99, 117, 117],
    [15, 0, 0, 23, 24, 32, 32, 39, 39, 47, 47, 82, 82, 99, 99, 117, 117],
    [16, 0, 0, 24, 24, 32, 32, 39, 39, 47, 47, 82, 82, 98, 99, 117, 117],
    [17, 0, 0, 12, 17, 24, 24, 33, 33, 39, 39, 47, 47, 83, 83, 98, 98, 103, 103, 117, 117],
    [18, 0, 0, 11, 12, 17, 19, 24, 24, 33, 34, 39, 39, 48, 49, 83, 84, 97, 97, 104, 104, 116, 116],
    [19, 0, 0, 19, 19, 25, 25, 34, 34, 39, 39, 49, 50, 84, 84, 96, 97, 104, 106, 115, 116],
    [20, 1, 1, 20, 20, 25, 25, 34, 34, 39, 39, 50, 51, 85, 86, 95, 96, 106, 114],
    [21, 1, 1, 20, 21, 25, 26, 34, 35, 38, 38, 52, 64, 86, 95],
    [22, 1, 1, 21, 21, 26, 26, 35, 35, 38, 38],
    [23, 2, 2, 20, 21, 26, 27, 35, 36, 38, 38],
    [24, 2, 2, 20, 20, 27, 27, 36, 36, 38, 38],
    [25, 3, 3, 19, 19, 27, 27, 37, 38],
    [26, 3, 4, 19, 19, 28, 28, 37, 38],
    [27, 4, 5, 17, 18],
    [28, 6, 7, 16, 17],
    [29, 8, 16, 128, 128],
    [30, 109, 109, 128, 128],
    [31, 109, 109, 128, 128],
    [32, 109, 109, 128, 128],
    [33, 97, 97, 109, 110, 128, 128],
    [34, 98, 98, 109, 110, 128, 128],
    [35, 81, 82, 99, 99, 109, 110, 128, 128],
    [36, 77, 80, 84, 87, 99, 99, 109, 110, 128, 128],
    [37, 75, 77, 83, 84, 87, 88, 100, 100, 109, 110, 128, 128, 175, 176],
    [38, 72, 74, 81, 82, 89, 89, 101, 101, 109, 110, 128, 128, 176, 179],
    [39, 70, 72, 80, 80, 90, 90, 102, 103, 110, 110, 128, 128, 178, 181],
    [40, 68, 70, 79, 79, 91, 91, 103, 104, 110, 110, 128, 128, 178, 181],
    [41, 66, 68, 71, 71, 78, 78, 91, 91, 104, 105, 110, 110, 128, 128, 177, 177, 181, 182],
    [42, 63, 65, 71, 71, 78, 78, 91, 91, 106, 107, 110, 110, 128, 128, 175, 176, 180, 180],
    [43, 60, 62, 71, 71, 78, 78, 91, 91, 108, 110, 128, 128, 174, 174, 180, 180],
    [44, 57, 60, 72, 72, 78, 78, 91, 91, 110, 110, 128, 128, 172, 173, 179, 180],
    [45, 18, 21, 72, 72, 79, 79, 90, 90, 110, 110, 128, 128, 171, 172, 179, 179],
    [46, 14, 17, 21, 23, 72, 72, 79, 79, 89, 90, 110, 110, 128, 128, 171, 171, 179, 179],
    [47, 13, 13, 26, 26, 73, 73, 80, 80, 88, 89, 110, 110, 128, 128, 170, 171, 179, 179],
    [48, 11, 12, 26, 26, 73, 73, 81, 81, 86, 87, 110, 110, 128, 128, 170, 170],
    [49, 10, 11, 26, 26, 73, 73, 81, 81, 84, 86, 110, 110, 169, 169],
    [50, 9, 9, 26, 26, 73, 73, 82, 91, 110, 110, 168, 169],
    [51, 9, 9, 26, 26, 73, 73, 82, 82, 92, 92, 110, 110, 168, 168],
    [52, 8, 8, 26, 26, 73, 74, 82, 82, 93, 96, 110, 110, 168, 168],
    [53, 8, 8, 25, 27, 74, 74, 83, 83, 96, 97, 110, 110, 168, 168],
    [54, 8, 8, 25, 25, 27, 27, 74, 74, 83, 83, 98, 99, 110, 110, 167, 168],
    [55, 7, 7, 24, 25, 28, 28, 74, 75, 84, 84, 100, 101, 110, 110, 167, 167],
    [56, 7, 7, 24, 24, 28, 29, 75, 75, 84, 84, 110, 110, 127, 129, 167, 167],
    [57, 7, 7, 23, 24, 29, 30, 75, 75, 85, 85, 110, 110, 127, 129, 167, 167],
    [58, 7, 7, 22, 23, 30, 33, 76, 76, 86, 86, 110, 110, 128, 128, 166, 166],
    [59, 7, 7, 22, 22, 33, 38, 76, 76, 87, 87, 110, 110, 166, 166],
    [60, 7, 7, 20, 21, 76, 77, 87, 87, 109, 109, 166, 166],
    [61, 7, 8, 19, 20, 77, 77, 88, 88, 109, 109, 166, 166],
    [62, 8, 9, 17, 19, 77, 78, 109, 109, 165, 165],
    [63, 9, 11, 15, 16, 78, 78, 109, 109, 165, 165],
    [64, 12, 14, 78, 78, 108, 108, 165, 165],
    [65, 107, 108, 165, 165],
    [66, 106, 107, 165, 165],
    [67, 105, 106, 164, 164],
    [68, 164, 164],
    [69, 163, 164],
    [70, 163, 163],
    [71, 163, 163],
    [72, 162, 162],
    [73, 162, 162],
    [74, 47, 49, 161, 161],
    [75, 47, 49, 161, 161],
    [76, 47, 49, 66, 68, 161, 161],
    [77, 47, 49, 65, 68, 161, 161],
    [78, 65, 68, 159, 160],
    [79, 39, 39, 158, 159],
    [80, 39, 39, 157, 157],
    [81, 39, 39, 114, 114, 156, 156],
    [82, 40, 40, 114, 114, 156, 156],
    [83, 40, 40, 115, 115, 154, 155],
    [84, 40, 41, 78, 78, 115, 115, 153, 154],
    [85, 41, 41, 77, 78, 116, 116, 152, 153],
    [86, 41, 42, 75, 76, 117, 118, 151, 151],
    [87, 42, 43, 74, 75, 118, 119, 150, 150],
    [88, 43, 45, 72, 73, 119, 120, 148, 149],
    [89, 45, 47, 69, 71, 121, 123, 146, 147],
    [90, 47, 50, 67, 68, 124, 126, 142, 145],
    [91, 50, 58, 63, 67, 127, 141],
    [92, 58, 63],
  ];

  // Preserve the hand-drawn seed while omitting only the connected arrow component.
  const invitationArrowCells = (() => {
    const sourceCells = new Set();

    invitationRuns.forEach(([row, ...runs]) => {
      for (let index = 0; index < runs.length; index += 2) {
        for (let column = runs[index]; column <= runs[index + 1]; column += 1) {
          sourceCells.add(`${column},${row}`);
        }
      }
    });

    const arrowCells = new Set(["182,41"]);
    const pending = [[182, 41]];

    while (pending.length) {
      const [column, row] = pending.pop();

      for (let columnOffset = -1; columnOffset <= 1; columnOffset += 1) {
        for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
          if (columnOffset === 0 && rowOffset === 0) continue;
          const neighbor = `${column + columnOffset},${row + rowOffset}`;
          if (!sourceCells.has(neighbor) || arrowCells.has(neighbor)) continue;
          arrowCells.add(neighbor);
          pending.push([column + columnOffset, row + rowOffset]);
        }
      }
    }

    return arrowCells;
  })();

  patterns.pulsar = (() => {
    const cells = [];
    const arms = [2, 3, 4, 8, 9, 10];
    const rails = [0, 5, 7, 12];

    arms.forEach((position) => {
      rails.forEach((rail) => {
        cells.push([position, rail], [rail, position]);
      });
    });

    return cells;
  })();

  let engine;
  let columns = 0;
  let rows = 0;
  let cellSize = Number(scaleInput.value);
  let generation = 0;
  let population = 0;
  let running = false;
  let stageVisible = true;
  let activeTool = "pencil";
  let pointerDrawing = false;
  let previousPointerCell = null;
  let initialCells = [];
  let trail = new Uint8Array();
  let cellColors = new Uint32Array();
  let nextCellColors = new Uint32Array();
  let aliveSnapshot = new Uint8Array();
  let trailColors = new Uint32Array();
  let selectedCellColor = Number.parseInt(colorInput.value.slice(1), 16);
  let lastStepAt = 0;
  let lastCanvasWidth = 0;
  let lastCanvasHeight = 0;
  let resizeFrame = 0;
  let toolbarDrag = null;
  let toolbarPosition = null;
  let toolbarMinimized = false;
  let infoOpen = false;
  let colorSurfacePointer = null;
  let selectedHue = 240;
  let selectedSaturation = 1;
  let selectedValue = 1;

  const toolbarStorageKey = "kdl-life-toolbar-position-v4";
  const toolbarMinimizedStorageKey = "kdl-life-toolbar-minimized-v3";
  const toolbarInset = 8;
  const colorCssCache = new Map();

  const colorToCss = (color) => {
    if (colorCssCache.has(color)) return colorCssCache.get(color);
    if (colorCssCache.size > 4096) colorCssCache.clear();
    const cssColor = `#${color.toString(16).padStart(6, "0")}`;
    colorCssCache.set(color, cssColor);
    return cssColor;
  };

  const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));

  const numericInputValue = (input, fallback) => {
    const value = Number(input.value);
    if (!Number.isFinite(value)) return fallback;
    return clamp(Math.round(value), Number(input.min), Number(input.max));
  };

  const commitNumericInput = (input, fallback) => {
    const value = numericInputValue(input, fallback);
    input.value = String(value);
    return value;
  };

  const hsvToHex = (hue, saturation, value) => {
    const normalizedHue = ((hue % 360) + 360) % 360;
    const chroma = value * saturation;
    const sector = normalizedHue / 60;
    const secondary = chroma * (1 - Math.abs((sector % 2) - 1));
    const minimum = value - chroma;
    let red = 0;
    let green = 0;
    let blue = 0;

    if (sector < 1) [red, green] = [chroma, secondary];
    else if (sector < 2) [red, green] = [secondary, chroma];
    else if (sector < 3) [green, blue] = [chroma, secondary];
    else if (sector < 4) [green, blue] = [secondary, chroma];
    else if (sector < 5) [red, blue] = [secondary, chroma];
    else [red, blue] = [chroma, secondary];

    const component = (channel) => Math.round((channel + minimum) * 255)
      .toString(16)
      .padStart(2, "0");

    return `#${component(red)}${component(green)}${component(blue)}`;
  };

  const syncSelectedColor = () => {
    const color = hsvToHex(selectedHue, selectedSaturation, selectedValue);
    selectedCellColor = Number.parseInt(color.slice(1), 16);
    colorInput.value = color;
    colorTrigger.style.setProperty("--life-selected-color", color);
    colorPicker.style.setProperty("--life-picker-hue", selectedHue);
    colorHandle.style.left = `${selectedSaturation * 100}%`;
    colorHandle.style.top = `${(1 - selectedValue) * 100}%`;
    colorOutput.value = color.toUpperCase();
    colorOutput.textContent = colorOutput.value;
    colorSurface.setAttribute("aria-valuenow", String(Math.round(selectedSaturation * 100)));
    colorSurface.setAttribute("aria-valuetext", color.toUpperCase());
  };

  const setColorPickerOpen = (open) => {
    colorPicker.hidden = !open;
    colorTrigger.setAttribute("aria-expanded", String(open));
    if (open) colorSurface.focus();
  };

  const updateColorFromPointer = (event) => {
    const rect = colorSurface.getBoundingClientRect();
    selectedSaturation = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    selectedValue = 1 - clamp((event.clientY - rect.top) / rect.height, 0, 1);
    syncSelectedColor();
  };

  const toolbarLimits = () => ({
    maxLeft: Math.max(toolbarInset, stage.clientWidth - toolbar.offsetWidth - toolbarInset),
    maxTop: Math.max(toolbarInset, stage.clientHeight - toolbar.offsetHeight - toolbarInset),
  });

  const setToolbarPosition = (left, top, remember = true) => {
    const { maxLeft, maxTop } = toolbarLimits();
    const clampedLeft = Math.min(maxLeft, Math.max(toolbarInset, left));
    const clampedTop = Math.min(maxTop, Math.max(toolbarInset, top));

    toolbar.style.left = `${clampedLeft}px`;
    toolbar.style.top = `${clampedTop}px`;

    if (remember) {
      toolbarPosition = {
        x: maxLeft === toolbarInset ? 0 : (clampedLeft - toolbarInset) / (maxLeft - toolbarInset),
        y: maxTop === toolbarInset ? 0 : (clampedTop - toolbarInset) / (maxTop - toolbarInset),
      };
    }
  };

  const applyToolbarPosition = () => {
    if (mobileToolbarQuery.matches) {
      toolbar.style.removeProperty("left");
      toolbar.style.removeProperty("top");
      return;
    }

    if (!toolbarPosition) return;
    const { maxLeft, maxTop } = toolbarLimits();
    setToolbarPosition(
      toolbarInset + toolbarPosition.x * (maxLeft - toolbarInset),
      toolbarInset + toolbarPosition.y * (maxTop - toolbarInset),
      false,
    );
  };

  const saveToolbarPosition = () => {
    if (!toolbarPosition) return;
    try {
      window.localStorage.setItem(toolbarStorageKey, JSON.stringify(toolbarPosition));
    } catch {
      // The panel remains draggable when storage is unavailable.
    }
  };

  try {
    const savedPosition = JSON.parse(window.localStorage.getItem(toolbarStorageKey));
    if (
      Number.isFinite(savedPosition?.x) &&
      Number.isFinite(savedPosition?.y) &&
      savedPosition.x >= 0 &&
      savedPosition.x <= 1 &&
      savedPosition.y >= 0 &&
      savedPosition.y <= 1
    ) {
      toolbarPosition = savedPosition;
    }
  } catch {
    toolbarPosition = null;
  }

  try {
    toolbarMinimized = window.localStorage.getItem(toolbarMinimizedStorageKey) === "true";
  } catch {
    toolbarMinimized = false;
  }

  const syncInfoPanelHeight = () => {
    const bodyHeight = toolbarBody.getBoundingClientRect().height;
    if (bodyHeight > 0) {
      toolbar.style.setProperty("--life-toolbar-body-height", `${bodyHeight}px`);
    }
  };

  const keepToolbarInBounds = () => {
    if (toolbarPosition) {
      applyToolbarPosition();
      return;
    }

    const { maxLeft, maxTop } = toolbarLimits();
    const currentLeft = toolbar.offsetLeft;
    const currentTop = toolbar.offsetTop;
    if (currentLeft > maxLeft || currentTop > maxTop) {
      setToolbarPosition(currentLeft, currentTop, false);
    }
  };

  const toolbarAnchor = () => ({
    left: toolbar.offsetLeft,
    top: toolbar.offsetTop,
  });

  const moveToolbarClearOfHeader = () => {
    if (!siteHeader || getComputedStyle(siteHeader).position !== "fixed") {
      return false;
    }

    const toolbarRect = toolbar.getBoundingClientRect();
    const headerRect = siteHeader.getBoundingClientRect();
    const overlapsHeader =
      toolbarRect.left < headerRect.right &&
      toolbarRect.right > headerRect.left &&
      toolbarRect.top < headerRect.bottom &&
      toolbarRect.bottom > headerRect.top;

    if (!overlapsHeader) return false;

    const stageRect = stage.getBoundingClientRect();
    const { maxLeft, maxTop } = toolbarLimits();
    const currentLeft = toolbar.offsetLeft;
    const currentTop = toolbar.offsetTop;
    const candidates = [
      {
        left: headerRect.right - stageRect.left + toolbarInset,
        top: currentTop,
      },
      {
        left: currentLeft,
        top: headerRect.bottom - stageRect.top + toolbarInset,
      },
    ].filter(({ left, top }) => left <= maxLeft && top <= maxTop);

    const [nearest] = candidates.sort((first, second) => {
      const firstDistance = Math.hypot(first.left - currentLeft, first.top - currentTop);
      const secondDistance = Math.hypot(second.left - currentLeft, second.top - currentTop);
      return firstDistance - secondDistance;
    });

    const destination = nearest || candidates[0] || {
      left: headerRect.right - stageRect.left + toolbarInset,
      top: currentTop,
    };
    setToolbarPosition(destination.left, destination.top);
    return true;
  };

  const settleToolbarPosition = (anchor = null) => {
    if (anchor) setToolbarPosition(anchor.left, anchor.top);
    else keepToolbarInBounds();

    const movedClear = moveToolbarClearOfHeader();
    if (anchor || movedClear) saveToolbarPosition();
  };

  const syncToolbarView = (anchor = null) => {
    if (mobileToolbarQuery.matches) {
      toolbarBody.hidden = false;
      infoPanel.hidden = true;
      infoOpen = false;
      toolbar.classList.remove("is-minimized");
      infoButton.setAttribute("aria-expanded", "false");
      setColorPickerOpen(false);
      window.requestAnimationFrame(() => applyToolbarPosition());
      return;
    }

    toolbarBody.hidden = toolbarMinimized || infoOpen;
    infoPanel.hidden = !infoOpen;
    infoButton.setAttribute("aria-expanded", String(infoOpen));
    toolbar.classList.toggle("is-minimized", toolbarMinimized && !infoOpen);

    const expanded = !toolbarMinimized;
    const minimizeLabel = expanded ? "Minimizar panel" : "Expandir panel";
    minimizeButton.setAttribute("aria-expanded", String(expanded));
    minimizeButton.setAttribute("aria-label", minimizeLabel);
    minimizeButton.title = minimizeLabel;
    minimizeIcon.textContent = expanded ? "−" : "+";
    setColorPickerOpen(false);
    window.requestAnimationFrame(() => settleToolbarPosition(anchor));
  };

  const setToolbarMinimized = (value) => {
    const anchor = toolbarAnchor();
    toolbarMinimized = value;
    infoOpen = false;
    try {
      window.localStorage.setItem(toolbarMinimizedStorageKey, String(value));
    } catch {
      // The panel remains minimizable when storage is unavailable.
    }
    syncToolbarView(anchor);
  };

  const setInfoOpen = (value) => {
    const anchor = toolbarAnchor();
    if (value && toolbarMinimized) {
      toolbarMinimized = false;
      try {
        window.localStorage.setItem(toolbarMinimizedStorageKey, "false");
      } catch {
        // The information panel still opens when storage is unavailable.
      }
    }
    if (value) {
      toolbarBody.hidden = false;
      syncInfoPanelHeight();
    }
    infoOpen = value;
    syncToolbarView(anchor);
  };

  const setRunning = (value) => {
    running = value;
    playButton.disabled = value;
    pauseButton.disabled = !value;
  };

  toolbarHandle.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;
    if (event.target.closest?.("button")) return;

    const toolbarRect = toolbar.getBoundingClientRect();
    toolbarDrag = {
      pointerId: event.pointerId,
      offsetX: event.clientX - toolbarRect.left,
      offsetY: event.clientY - toolbarRect.top,
    };
    toolbarHandle.setPointerCapture(event.pointerId);
    toolbar.classList.add("is-dragging");
    event.preventDefault();
  });

  toolbarHandle.addEventListener("pointermove", (event) => {
    if (!toolbarDrag || event.pointerId !== toolbarDrag.pointerId) return;

    const stageRect = stage.getBoundingClientRect();
    setToolbarPosition(
      event.clientX - stageRect.left - toolbarDrag.offsetX,
      event.clientY - stageRect.top - toolbarDrag.offsetY,
    );
  });

  const stopToolbarDrag = (event) => {
    if (!toolbarDrag || event.pointerId !== toolbarDrag.pointerId) return;
    toolbarDrag = null;
    toolbar.classList.remove("is-dragging");
    moveToolbarClearOfHeader();
    saveToolbarPosition();
    if (toolbarHandle.hasPointerCapture(event.pointerId)) {
      toolbarHandle.releasePointerCapture(event.pointerId);
    }
  };

  toolbarHandle.addEventListener("pointerup", stopToolbarDrag);
  toolbarHandle.addEventListener("pointercancel", stopToolbarDrag);

  infoButton.addEventListener("click", () => setInfoOpen(!infoOpen));
  minimizeButton.addEventListener("click", () => setToolbarMinimized(!toolbarMinimized));
  mobileToolbarQuery.addEventListener("change", () => syncToolbarView());

  const setHardEdges = () => {
    engine.loopCurrentState = function clearGhostCells() {
      const bottom = this._height - 1;
      const right = this._width - 1;

      for (let column = 0; column < this._width; column += 1) {
        this._current[this.index(0, column)] = 0;
        this._current[this.index(bottom, column)] = 0;
      }

      for (let row = 1; row < bottom; row += 1) {
        this._current[this.index(row, 0)] = 0;
        this._current[this.index(row, right)] = 0;
      }
    };
  };

  const createEngine = () => {
    engine = new Engine(columns, rows);
    engine.init();
    if (!wrapInput.checked) setHardEdges();
    const cellCount = columns * rows;
    trail = new Uint8Array(cellCount);
    cellColors = new Uint32Array(cellCount);
    nextCellColors = new Uint32Array(cellCount);
    aliveSnapshot = new Uint8Array(cellCount);
    trailColors = new Uint32Array(cellCount);
  };

  const setCell = (column, row, value = 1, color = selectedCellColor) => {
    if (column < 0 || column >= columns || row < 0 || row >= rows) return;
    const index = row * columns + column;
    engine.set(row + 1, column + 1, value);
    trail[index] = value ? 255 : 0;
    cellColors[index] = value ? color : 0;
    trailColors[index] = value ? color : 0;
  };

  const getAliveCells = () => {
    const cells = [];

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        const index = row * columns + column;
        if (engine.cellSafe(row, column)) cells.push([column, row, cellColors[index]]);
      }
    }

    return cells;
  };

  const applyCells = (cells) => {
    cells.forEach(([column, row, color]) => {
      setCell(column, row, 1, color ?? selectedCellColor);
    });
  };

  const centerPattern = (cells) => {
    const width = Math.max(...cells.map(([column]) => column)) + 1;
    const height = Math.max(...cells.map(([, row]) => row)) + 1;
    const offsetColumn = Math.max(0, Math.floor((columns - width) / 2));
    const offsetRow = Math.max(0, Math.floor((rows - height) / 2));

    return cells.map(([column, row]) => [column + offsetColumn, row + offsetRow]);
  };

  const randomCells = () => {
    const cells = [];
    const density = numericInputValue(densityInput, 55) / 100;

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        if (Math.random() < density) cells.push([column, row]);
      }
    }

    return cells;
  };

  const invitationCells = () => {
    const cells = [];
    const offsetColumn = Math.max(
      0,
      columns - invitationWidth - Math.round(columns * 0.1),
    );
    const offsetRow = Math.max(0, Math.round(rows * 0.1));

    invitationRuns.forEach(([row, ...runs]) => {
      const targetRow = row + offsetRow;
      if (targetRow >= rows) return;

      for (let index = 0; index < runs.length; index += 2) {
        const start = runs[index];
        const end = runs[index + 1];

        for (let column = start; column <= end; column += 1) {
          if (invitationArrowCells.has(`${column},${row}`)) continue;
          const targetColumn = column + offsetColumn;
          if (targetColumn < columns) cells.push([targetColumn, targetRow]);
        }
      }
    });

    return cells;
  };
  const selectedSeedCells = () => {
    if (seedInput.value === "invitation") return invitationCells();
    if (seedInput.value === "random") return randomCells();
    return centerPattern(patterns[seedInput.value] || patterns.acorn);
  };

  const blendBirthColor = (column, row, previousColors) => {
    let red = 0;
    let green = 0;
    let blue = 0;
    let count = 0;

    for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
      for (let columnOffset = -1; columnOffset <= 1; columnOffset += 1) {
        if (rowOffset === 0 && columnOffset === 0) continue;

        let neighborColumn = column + columnOffset;
        let neighborRow = row + rowOffset;

        if (wrapInput.checked) {
          neighborColumn = (neighborColumn + columns) % columns;
          neighborRow = (neighborRow + rows) % rows;
        } else if (
          neighborColumn < 0 ||
          neighborColumn >= columns ||
          neighborRow < 0 ||
          neighborRow >= rows
        ) {
          continue;
        }

        const neighborIndex = neighborRow * columns + neighborColumn;
        if (!aliveSnapshot[neighborIndex]) continue;

        const color = previousColors[neighborIndex];
        red += (color >> 16) & 255;
        green += (color >> 8) & 255;
        blue += color & 255;
        count += 1;
      }
    }

    if (count === 0) return selectedCellColor;
    return (
      (Math.round(red / count) << 16) |
      (Math.round(green / count) << 8) |
      Math.round(blue / count)
    );
  };

  const updateReadout = () => {
    generationOutput.value = String(generation).padStart(6, "0");
    generationOutput.textContent = generationOutput.value;
    populationOutput.value = String(population).padStart(5, "0");
    populationOutput.textContent = populationOutput.value;
  };

  const scanPopulation = () => {
    let alive = 0;

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        const index = row * columns + column;
        if (engine.cellSafe(row, column)) {
          alive += 1;
          trail[index] = 255;
          trailColors[index] = cellColors[index];
        } else if (trailsInput.checked && trail[index] > 0) {
          trail[index] = Math.max(0, trail[index] - 32);
        } else {
          trail[index] = 0;
          trailColors[index] = 0;
        }
      }
    }

    population = alive;
    updateReadout();
  };

  const render = () => {
    const width = Math.max(1, canvas.clientWidth);
    const height = Math.max(1, canvas.clientHeight);
    const gap = cellSize >= 7 ? 1 : 0.5;
    const cellFill = Math.max(1, cellSize - gap);

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        const index = row * columns + column;
        const alive = engine.cellSafe(row, column);
        const history = trail[index];

        if (!alive && (!trailsInput.checked || history === 0)) continue;

        context.globalAlpha = alive ? 1 : (history / 255) * 0.2;
        context.fillStyle = colorToCss(alive ? cellColors[index] : trailColors[index]);
        context.fillRect(column * cellSize, row * cellSize, cellFill, cellFill);
      }
    }

    context.globalAlpha = 1;
    scanPopulation();
  };

  const sizeCanvas = () => {
    const width = Math.max(1, canvas.clientWidth);
    const height = Math.max(1, canvas.clientHeight);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.imageSmoothingEnabled = false;

    columns = Math.max(8, Math.floor(width / cellSize));
    rows = Math.max(8, Math.floor(height / cellSize));
    lastCanvasWidth = width;
    lastCanvasHeight = height;
  };

  const seedUniverse = (cells = selectedSeedCells()) => {
    setRunning(false);
    generation = 0;
    const coloredCells = cells.map(([column, row, color]) => [
      column,
      row,
      color ?? selectedCellColor,
    ]);
    createEngine();
    applyCells(coloredCells);
    initialCells = coloredCells.map((cell) => [...cell]);
    render();
  };

  const rebuildUniverse = () => {
    cellSize = numericInputValue(scaleInput, 5);
    sizeCanvas();
    seedUniverse();
  };

  const preserveUniverse = () => {
    const cells = getAliveCells();
    const wasRunning = running;
    createEngine();
    applyCells(cells);
    render();
    setRunning(wasRunning, wasRunning ? "VIVO" : "PAUSA");
  };

  const stepUniverse = () => {
    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        const index = row * columns + column;
        aliveSnapshot[index] = engine.cellSafe(row, column);
      }
    }

    const previousColors = cellColors;
    engine.computeNextState();
    nextCellColors.fill(0);

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        const index = row * columns + column;
        if (!engine.cellSafe(row, column)) continue;
        nextCellColors[index] = aliveSnapshot[index]
          ? previousColors[index]
          : blendBirthColor(column, row, previousColors);
      }
    }

    cellColors = nextCellColors;
    nextCellColors = previousColors;
    generation += 1;
    render();

    if (population === 0) setRunning(false, "VACIO");
  };

  const drawLine = (from, to, value) => {
    let [x0, y0] = from;
    const [x1, y1] = to;
    const deltaX = Math.abs(x1 - x0);
    const stepX = x0 < x1 ? 1 : -1;
    const deltaY = -Math.abs(y1 - y0);
    const stepY = y0 < y1 ? 1 : -1;
    let error = deltaX + deltaY;

    while (true) {
      setCell(x0, y0, value);
      if (x0 === x1 && y0 === y1) break;
      const doubledError = 2 * error;
      if (doubledError >= deltaY) {
        error += deltaY;
        x0 += stepX;
      }
      if (doubledError <= deltaX) {
        error += deltaX;
        y0 += stepY;
      }
    }
  };

  const pointerCell = (event) => {
    const rect = canvas.getBoundingClientRect();
    return [
      Math.floor((event.clientX - rect.left) / cellSize),
      Math.floor((event.clientY - rect.top) / cellSize),
    ];
  };

  const paintAtPointer = (event) => {
    const cell = pointerCell(event);
    const value = activeTool === "pencil" ? 1 : 0;
    drawLine(previousPointerCell || cell, cell, value);
    previousPointerCell = cell;
    render();
  };

  canvas.addEventListener("pointerdown", (event) => {
    pointerDrawing = true;
    previousPointerCell = null;
    canvas.setPointerCapture(event.pointerId);
    paintAtPointer(event);
  });

  canvas.addEventListener("pointermove", (event) => {
    if (pointerDrawing) paintAtPointer(event);
  });

  const stopDrawing = (event) => {
    pointerDrawing = false;
    previousPointerCell = null;
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
  };

  canvas.addEventListener("pointerup", stopDrawing);
  canvas.addEventListener("pointercancel", stopDrawing);

  toolButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeTool = button.dataset.lifeTool;
      toolButtons.forEach((candidate) => {
        const active = candidate === button;
        candidate.classList.toggle("is-active", active);
        candidate.setAttribute("aria-pressed", String(active));
      });
    });
  });

  actionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.lifeAction;

      if (action === "play") {
        if (population === 0) seedUniverse();
        setRunning(true);
        lastStepAt = performance.now();
      } else if (action === "pause") {
        setRunning(false);
      } else if (action === "step") {
        setRunning(false);
        stepUniverse();
      } else if (action === "randomize") {
        seedInput.value = "random";
        seedUniverse(randomCells());
      } else if (action === "reset") {
        seedUniverse(initialCells);
      } else if (action === "clear") {
        seedUniverse([]);
      }
    });
  });

  toolbar.addEventListener("submit", (event) => event.preventDefault());

  densityInput.addEventListener("input", () => {
    if (!densityInput.value.trim()) return;
    seedInput.value = "random";
    seedUniverse(randomCells());
  });

  densityInput.addEventListener("change", () => commitNumericInput(densityInput, 55));

  speedInput.addEventListener("change", () => commitNumericInput(speedInput, 9));

  scaleInput.addEventListener("change", () => {
    commitNumericInput(scaleInput, 5);
    rebuildUniverse();
  });

  [densityInput, speedInput, scaleInput].forEach((input) => {
    input.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      input.blur();
    });
  });

  seedInput.addEventListener("change", () => {
    seedUniverse();
  });
  wrapInput.addEventListener("change", preserveUniverse);
  trailsInput.addEventListener("change", () => {
    if (!trailsInput.checked) {
      trail.fill(0);
      trailColors.fill(0);
    }
    render();
  });

  colorTrigger.addEventListener("click", () => setColorPickerOpen(colorPicker.hidden));

  colorSurface.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;
    colorSurfacePointer = event.pointerId;
    colorSurface.setPointerCapture(event.pointerId);
    updateColorFromPointer(event);
    event.preventDefault();
  });

  colorSurface.addEventListener("pointermove", (event) => {
    if (event.pointerId === colorSurfacePointer) updateColorFromPointer(event);
  });

  const stopColorSurfacePointer = (event) => {
    if (event.pointerId !== colorSurfacePointer) return;
    colorSurfacePointer = null;
    if (colorSurface.hasPointerCapture(event.pointerId)) {
      colorSurface.releasePointerCapture(event.pointerId);
    }
  };

  colorSurface.addEventListener("pointerup", stopColorSurfacePointer);
  colorSurface.addEventListener("pointercancel", stopColorSurfacePointer);

  colorSurface.addEventListener("keydown", (event) => {
    const largeStep = event.shiftKey ? 0.1 : 0.02;
    if (event.key === "ArrowLeft") selectedSaturation -= largeStep;
    else if (event.key === "ArrowRight") selectedSaturation += largeStep;
    else if (event.key === "ArrowUp") selectedValue += largeStep;
    else if (event.key === "ArrowDown") selectedValue -= largeStep;
    else return;

    selectedSaturation = clamp(selectedSaturation, 0, 1);
    selectedValue = clamp(selectedValue, 0, 1);
    syncSelectedColor();
    event.preventDefault();
  });

  hueInput.addEventListener("input", () => {
    selectedHue = Number(hueInput.value);
    syncSelectedColor();
  });

  document.addEventListener("pointerdown", (event) => {
    if (
      !colorPicker.hidden &&
      !colorPicker.contains(event.target) &&
      !colorTrigger.contains(event.target)
    ) {
      setColorPickerOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !colorPicker.hidden) {
      setColorPickerOpen(false);
      colorTrigger.focus();
    } else if (event.key === "Escape" && infoOpen) {
      setInfoOpen(false);
      infoButton.focus();
    }
  });

  const animate = (now) => {
    window.requestAnimationFrame(animate);
    if (!running || !stageVisible || document.hidden) return;

    const interval = 1000 / numericInputValue(speedInput, 9);
    const elapsed = now - lastStepAt;
    if (elapsed < interval) return;

    const steps = Math.min(3, Math.floor(elapsed / interval));
    for (let index = 0; index < steps && running; index += 1) stepUniverse();
    lastStepAt = now - (elapsed % interval);
  };

  if ("IntersectionObserver" in window) {
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      stageVisible = entry.isIntersecting;
      lastStepAt = performance.now();
    });
    visibilityObserver.observe(stage);
  }

  if ("ResizeObserver" in window) {
    const resizeObserver = new ResizeObserver(() => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(() => {
        const widthChanged = Math.abs(canvas.clientWidth - lastCanvasWidth) > 2;
        const heightChanged = Math.abs(canvas.clientHeight - lastCanvasHeight) > 2;
        if (widthChanged || heightChanged) rebuildUniverse();
        syncInfoPanelHeight();
        applyToolbarPosition();
        if (moveToolbarClearOfHeader()) saveToolbarPosition();
      });
    });
    resizeObserver.observe(stage);
  }

  document.addEventListener("visibilitychange", () => {
    lastStepAt = performance.now();
  });

  syncSelectedColor();
  rebuildUniverse();
  syncInfoPanelHeight();
  syncToolbarView();
  applyToolbarPosition();
  setRunning(false);
  window.requestAnimationFrame(animate);
}
