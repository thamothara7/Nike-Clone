function init() {
  const root = document.documentElement;
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const imageStack = document.getElementById('imageStack');
  const images = [...imageStack.querySelectorAll('.stack-image')];
  const colorPicker = document.getElementById('colorPicker');

  let activeKey = 'red';
  let autoRotate = true;
  let index = 0;

  function setAccent(hex) {
    root.style.setProperty('--accent', hex);
  }

  function showImageByKey(key) {
    let anyVisible = false;
    images.forEach((img) => {
      const visible = img.dataset.key === key;
      img.classList.toggle('active', visible);
      anyVisible = anyVisible || visible;
    });
    if (!anyVisible && images.length) {
      images[0].classList.add('active');
    }
  }

  function handleSwatchClick(e) {
    const btn = e.target.closest('.swatch');
    if (!btn) return;
    const hex = btn.dataset.color;
    const key = btn.dataset.image;
    activeKey = key;
    setAccent(hex);
    showImageByKey(key);
    autoRotate = false;
  }

  function rotate() {
    if (!autoRotate || images.length === 0) return;
    index = (index + 1) % images.length;
    const key = images[index].dataset.key || activeKey;
    activeKey = key;
    showImageByKey(key);
  }

  function initSwatches() {
    if (!colorPicker) return;
    const swatches = [...colorPicker.querySelectorAll('.swatch')];
    swatches.forEach((s) => {
      s.style.background = s.dataset.color;
    });
    if (swatches.length) setAccent(swatches[0].dataset.color);
  }

  function initMenu() {
    if (!burger || !nav) return;
    burger.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // Ensure at least one image is visible on load
  if (images.length) {
    const hasActive = images.some((img) => img.classList.contains('active'));
    if (!hasActive) images[0].classList.add('active');
  }

  initSwatches();
  if (colorPicker) colorPicker.addEventListener('click', handleSwatchClick);
  setInterval(rotate, 3500);
  initMenu();
}

document.addEventListener('DOMContentLoaded', init);
