const titleText = "KLUB DEL LIBRE — Grupos de Lectura, Investigación y Creación Colectiva —";
const titleTrack = `${titleText}${" ".repeat(24)}`;
let titleOffset = 0;

document.title = titleText;
window.setInterval(() => {
  titleOffset = (titleOffset + 1) % titleTrack.length;
  document.title = titleTrack.slice(titleOffset) + titleTrack.slice(0, titleOffset);
}, 300);

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
