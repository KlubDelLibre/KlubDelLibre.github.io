<script language="JavaScript" type="text/javascript">
		(function titleScroller(text) {
			document.title = text;
			setTimeout(function () {
				titleScroller(text.substr(1) + text.substr(0, 1));
			}, 500);
		}("KLUB DEL LIBRE — Web en constante evolución — "));
	</script>
// Barra de progreso de scroll
document.addEventListener('DOMContentLoaded', () => {
  const bar = document.getElementById('scroll-progress');
  const doc = document.documentElement;

  function updateBar() {
    const max = doc.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.setProperty('--w', pct + '%');
  }

  // Hacemos que el pseudo-elemento ::before use la variable --w
  const style = document.createElement('style');
  style.textContent = `#scroll-progress::before { width: var(--w, 0%); }`;
  document.head.appendChild(style);

  window.addEventListener('scroll', updateBar, { passive: true });
  window.addEventListener('resize', updateBar);
  window.addEventListener('load', updateBar);

  updateBar(); // inicial
});

