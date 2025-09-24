<script language="JavaScript" type="text/javascript">
		(function titleScroller(text) {
			document.title = text;
			setTimeout(function () {
				titleScroller(text.substr(1) + text.substr(0, 1));
			}, 500);
		}("KLUB DEL LIBRE — Web en constante evolución — "));
	</script>
// ===== Barra de progreso de scroll (auto-contenida) =====
document.addEventListener('DOMContentLoaded', () => {
  // Crea el contenedor si no existe
  let container = document.getElementById('scroll-progress');
  if (!container) {
    container = document.createElement('div');
    container.id = 'scroll-progress';
    document.body.prepend(container);
  }

  // Crea la barra interior (para evitar pseudo-elementos)
  let bar = document.getElementById('scroll-progress-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'scroll-progress-bar';
    container.appendChild(bar);
  }

  // Inyecta estilos mínimos (por si el style.css no cargó)
  const style = document.createElement('style');
  style.textContent = `
    #scroll-progress{
      position: fixed;
      top: 0; left: 0;
      width: 100%;
      height: 3px;
      background: transparent;
      pointer-events: none;
      z-index: 2147483647; /* por encima de todo */
    }
    #scroll-progress-bar{
      height: 100%;
      width: 0;
      background: rgba(0,0,0,0.25); /* gris translúcida */
      will-change: width;
    }
  `;
  document.head.appendChild(style);

  // Actualiza el ancho según el scroll
  const doc = document.documentElement;
  function update() {
    const max = doc.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.width = pct + '%';
  }

  window.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  window.addEventListener('resize', update);
  update(); // inicial
});



