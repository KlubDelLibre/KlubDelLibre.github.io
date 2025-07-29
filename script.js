const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
function openMenu(){
  hamburger.classList.add('active');
  menu.classList.add('open');
  menu.setAttribute('aria-hidden','false');
}
function closeMenu(){
  hamburger.classList.remove('active');
  menu.classList.remove('open');
  menu.setAttribute('aria-hidden','true');
}
hamburger.addEventListener('click', () => menu.classList.contains('open') ? closeMenu() : openMenu());
document.addEventListener('keydown', e => { if(e.key==='Escape') closeMenu(); });
document.getElementById('year').textContent = new Date().getFullYear();

// Rotación dinámica del título de la pestaña
tmpTitle = "KLUB DEL LIBRE - Web en constante evolución - ";
let rotIndex = 0;
setInterval(() => {
  document.title = tmpTitle.slice(rotIndex) + tmpTitle.slice(0, rotIndex);
  rotIndex = (rotIndex + 1) % tmpTitle.length;
}, 300);
