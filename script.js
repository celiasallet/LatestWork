const masonry = document.querySelector('.masonry');
const items = Array.from(masonry.children);

function layoutMasonry() {
  const containerWidth = masonry.clientWidth;
  const minColWidth = 200; // largeur minimale d'une colonne
  const gap = 15;           // espace entre les items
  const cols = Math.floor(containerWidth / (minColWidth + gap)) || 1;
  const colWidth = (containerWidth - gap * (cols - 1)) / cols; // largeur réelle par colonne
  const colHeights = Array(cols).fill(0);

  items.forEach(item => {
    const minCol = colHeights.indexOf(Math.min(...colHeights));
    const x = minCol * (colWidth + gap);
    const y = colHeights[minCol];
    item.style.width = colWidth + 'px';
    item.style.transform = `translate(${x}px, ${y}px)`;
    colHeights[minCol] += item.offsetHeight + gap;
  });

  masonry.style.height = Math.max(...colHeights) + 'px';
}

window.addEventListener('load', layoutMasonry);
window.addEventListener('resize', layoutMasonry);









document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('overlay');
  const overlayImg = document.getElementById('overlay-img');
  const imgs = document.querySelectorAll('.masonry .item img');

  // safety checks
  if (!overlay || !overlayImg || imgs.length === 0) {
    console.error('Overlay or images not found');
    return;
  }

  imgs.forEach(img => {
    img.addEventListener('click', (e) => {
      // set src BEFORE adding class for a smoother visual
      overlayImg.src = img.src;
      // force reflow to ensure the browser registers src change before anim (rarely needed)
      void overlay.offsetWidth;
      overlay.classList.add('show');
      overlay.setAttribute('aria-hidden', 'false');
    });
  });

  // click anywhere on overlay to close (and clear src optionally)
  overlay.addEventListener('click', () => {
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden', 'true');
    // optional: clear src after transition end to free memory
    overlayImg.addEventListener('transitionend', function onEnd(e){
      if (e.propertyName === 'transform' && !overlay.classList.contains('show')) {
        overlayImg.src = '';
        overlayImg.removeEventListener('transitionend', onEnd);
      }
    });
  });

  // also close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('show')) {
      overlay.classList.remove('show');
    }
  });
});



