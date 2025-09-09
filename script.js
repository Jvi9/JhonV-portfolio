document.addEventListener('DOMContentLoaded', () => {
  const galleries = document.querySelectorAll('.accordion-gallery');

  galleries.forEach(gallery => {
    const panels = gallery.querySelectorAll('.panel');
    const container = gallery.closest('.container, .container-fluid, section') || gallery.parentElement;
    const detailBox = container ? container.querySelector('.project-detail') : null;

    panels.forEach(panel => {
      // Hover detail
      panel.addEventListener('pointerenter', () => {
        if (detailBox) {
          const titleEl = detailBox.querySelector('.project-title');
          const descEl  = detailBox.querySelector('.project-desc');
          if (titleEl) titleEl.innerHTML = panel.dataset.title || '';
          if (descEl)  descEl.innerHTML  = panel.dataset.description || '';
        }
      });


      // Touch toggle for mobile
      panel.addEventListener('click', (ev) => {
        const isCoarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
        if (isCoarse && !ev.target.closest('img')) {
          const already = panel.classList.contains('active');
          panels.forEach(p => p.classList.remove('active'));
          if (!already) panel.classList.add('active');
          if (detailBox) {
            const titleEl = detailBox.querySelector('.project-title');
            const descEl  = detailBox.querySelector('.project-desc');
            if (titleEl) titleEl.textContent = panel.dataset.title || '';
            if (descEl)  descEl.textContent  = panel.dataset.description || '';
          }
          ev.preventDefault();
        }
      });

      // Handle image click for lightbox
      panel.querySelectorAll('img').forEach(img => {
        img.addEventListener('click', (ev) => {
          ev.stopPropagation(); // prevent panel click
          const lightbox = document.getElementById('lightbox');
          const lightboxImg = document.getElementById('lightbox-img');
          lightbox.style.display = 'flex';
          lightboxImg.src = img.src; // you can change to higher-res src if available
        });
      });
    });
  });

  // Lightbox close logic
  const lightbox = document.getElementById('lightbox');
  const closeBtn = document.querySelector('.lightbox .close');
  closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.style.display = 'none';
  });
});
