const titleText = "KLUB DEL LIBRE — Lectura, Investigación y Creación Colectiva —";
const titleTrack = `${titleText}${" ".repeat(24)}`;
let titleOffset = 0;

document.title = titleText;
window.setInterval(() => {
  titleOffset = (titleOffset + 1) % titleTrack.length;
  document.title = titleTrack.slice(titleOffset) + titleTrack.slice(0, titleOffset);
}, 300);

const neonToggle = document.querySelector("[data-neon-toggle]");
const neonStorageKey = "kdl-neon-theme-v1";
const themeColorMetas = [...document.querySelectorAll('meta[name="theme-color"]')];

themeColorMetas.forEach((meta) => {
  meta.dataset.defaultContent = meta.content;
});

const setNeonTheme = (enabled, remember = true) => {
  if (enabled) document.documentElement.dataset.theme = "neon";
  else document.documentElement.removeAttribute("data-theme");

  if (neonToggle) {
    neonToggle.setAttribute("aria-pressed", String(enabled));
    neonToggle.setAttribute(
      "aria-label",
      enabled ? "Desactivar modo neón oscuro" : "Activar modo neón oscuro",
    );
    neonToggle.setAttribute(
      "title",
      enabled ? "Volver al modo claro" : "Activar modo neón oscuro",
    );
  }

  themeColorMetas.forEach((meta) => {
    meta.content = enabled ? "#000000" : meta.dataset.defaultContent;
  });

  if (remember) {
    try {
      window.localStorage.setItem(neonStorageKey, enabled ? "on" : "off");
    } catch (error) {
      // The theme still works when storage is unavailable.
    }
  }

  window.dispatchEvent(new CustomEvent("kdl:themechange", { detail: { neon: enabled } }));
};

let savedNeonTheme = false;
try {
  savedNeonTheme = window.localStorage.getItem(neonStorageKey) === "on";
} catch (error) {
  savedNeonTheme = false;
}

setNeonTheme(savedNeonTheme, false);
neonToggle?.addEventListener("click", () => {
  setNeonTheme(document.documentElement.dataset.theme !== "neon");
});

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".site-nav a")];
let navFrame = 0;

const updateActiveSection = () => {
  navFrame = 0;
  if (!sections.length) return;

  const readingLine = window.innerHeight * 0.5;
  let activeSection = sections[0];

  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= readingLine) {
      activeSection = section;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${activeSection.id}`);
  });
};

const requestActiveSectionUpdate = () => {
  if (navFrame) return;
  navFrame = window.requestAnimationFrame(updateActiveSection);
};

window.addEventListener("scroll", requestActiveSectionUpdate, { passive: true });
window.addEventListener("resize", requestActiveSectionUpdate);
window.addEventListener("hashchange", requestActiveSectionUpdate);
updateActiveSection();

const registrationAlert = document.querySelector(".registration-alert");
const eventAlert = document.querySelector(".event-alert");
const cycleRegistrationAlerts = [...document.querySelectorAll(".cycle-registration-alert")];

if (registrationAlert && eventAlert) {
  let eventAlertOn = true;

  const updateAlternatingAlerts = () => {
    registrationAlert.classList.toggle("is-alert-on", !eventAlertOn);
    eventAlert.classList.toggle("is-alert-on", eventAlertOn);
    cycleRegistrationAlerts.forEach((button) => {
      button.classList.toggle("is-alert-on", !eventAlertOn);
    });
  };

  updateAlternatingAlerts();
  window.setInterval(() => {
    eventAlertOn = !eventAlertOn;
    updateAlternatingAlerts();
  }, 700);
}

document.querySelectorAll("[data-file-download]").forEach((link) => {
  link.addEventListener("click", async (event) => {
    if (!window.fetch || !window.URL?.createObjectURL) return;

    event.preventDefault();
    if (link.getAttribute("aria-busy") === "true") return;

    link.setAttribute("aria-busy", "true");

    try {
      const response = await fetch(link.href, { cache: "no-store" });
      if (!response.ok) throw new Error(`No se pudo descargar el archivo (${response.status})`);

      const file = await response.blob();
      const fileUrl = window.URL.createObjectURL(file);
      const download = document.createElement("a");

      download.href = fileUrl;
      download.download = link.getAttribute("download") || "archivo";
      download.hidden = true;
      document.body.append(download);
      download.click();
      download.remove();
      window.setTimeout(() => window.URL.revokeObjectURL(fileUrl), 1000);
    } catch (error) {
      window.location.assign(link.href);
    } finally {
      link.removeAttribute("aria-busy");
    }
  });
});

const arenaChannels = [...document.querySelectorAll("[data-arena-channel]")];

if (arenaChannels.length) {
  const createArenaCard = (block) => {
    const card = document.createElement("a");
    const media = document.createElement("span");
    const copy = document.createElement("span");
    const title = document.createElement("span");
    const blockTitle = block.title || block.source?.title || "Archivo sin título";
    const imageSource = block.image?.small?.src || block.image?.src;
    const blockKind =
      block.type === "Attachment"
        ? "Archivo"
        : block.type === "Link"
          ? "Enlace"
          : block.type || "Bloque";

    card.className = "arena-card";
    card.href = `https://www.are.na/block/${encodeURIComponent(block.id)}`;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.setAttribute("aria-label", `${blockTitle}. Abrir en Are.na`);

    media.className = "arena-card-media";
    if (imageSource) {
      const image = document.createElement("img");
      image.src = imageSource;
      image.alt = "";
      image.loading = "lazy";
      image.decoding = "async";
      media.append(image);
    } else {
      media.textContent = blockKind;
    }

    copy.className = "arena-card-copy";
    title.className = "arena-card-title";
    title.textContent = blockTitle;
    copy.append(title);
    card.append(media, copy);

    return card;
  };

  const enableAutomaticLoop = (carousel, track, originalCards) => {
    if (originalCards.length < 2) return;

    const pixelsPerSecond = 30;
    let resizeFrame = 0;

    const removeClones = () => {
      track.querySelectorAll("[data-arena-clone]").forEach((clone) => clone.remove());
    };

    const configure = () => {
      removeClones();
      carousel.classList.remove("is-looping");
      carousel.style.removeProperty("--arena-loop-offset");
      carousel.style.removeProperty("--arena-loop-duration");

      const firstCard = originalCards[0];
      const lastCard = originalCards.at(-1);
      const sequenceWidth = lastCard.offsetLeft + lastCard.offsetWidth - firstCard.offsetLeft;

      if (sequenceWidth <= carousel.clientWidth + 1) return;

      const clones = originalCards.map((card) => {
        const clone = card.cloneNode(true);
        clone.dataset.arenaClone = "";
        clone.setAttribute("aria-hidden", "true");
        clone.tabIndex = -1;
        return clone;
      });

      track.append(...clones);
      const loopWidth = clones[0].offsetLeft - firstCard.offsetLeft;

      if (loopWidth > 0) {
        carousel.style.setProperty("--arena-loop-offset", `${-loopWidth}px`);
        carousel.style.setProperty("--arena-loop-duration", `${loopWidth / pixelsPerSecond}s`);
        carousel.classList.add("is-looping");
      }
    };

    const requestConfigure = () => {
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = 0;
        configure();
      });
    };

    window.addEventListener("resize", requestConfigure);
    window.requestAnimationFrame(configure);
  };

  arenaChannels.forEach((channel) => {
    const channelId = channel.dataset.channelId;
    const carousel = channel.querySelector("[data-arena-carousel]");
    const status = channel.querySelector("[data-arena-status]");

    if (!channelId || !carousel || !status) return;

    fetch(`https://api.are.na/v3/channels/${encodeURIComponent(channelId)}/contents?per=24&sort=position_desc`, {
      headers: { Accept: "application/json" },
      cache: "force-cache",
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Are.na respondió con ${response.status}`);
        return response.json();
      })
      .then(({ data }) => {
        const blocks = Array.isArray(data) ? data : [];
        if (!blocks.length) throw new Error("El canal de Are.na está vacío");

        const cards = blocks.map(createArenaCard);
        const track = document.createElement("div");
        track.className = "arena-carousel-track";
        track.append(...cards);
        carousel.replaceChildren(track);
        carousel.removeAttribute("aria-describedby");
        carousel.setAttribute("aria-busy", "false");
        enableAutomaticLoop(carousel, track, cards);
      })
      .catch(() => {
        status.textContent = "Este canal no está disponible ahora. Puedes abrirlo desde su título.";
        carousel.setAttribute("aria-busy", "false");
      });
  });
}
