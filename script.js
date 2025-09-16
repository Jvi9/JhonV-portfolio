document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.project-card');
  const detailBox = document.querySelector('.project-detail');
  const titleEl = detailBox.querySelector('.project-title');
  const tagsEl = detailBox.querySelector('.project-tags');
  const descEl = detailBox.querySelector('.project-desc');
  const galleryEl = detailBox.querySelector('.project-gallery');

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => showDetails(card));
    card.addEventListener('click', () => showDetails(card)); // mobile
  });

  function showDetails(card) {
    // Show box if hidden
    detailBox.classList.remove('d-none');

    titleEl.textContent = card.dataset.title;
    tagsEl.textContent = card.dataset.hashtags;
    //descEl.textContent = card.dataset.description;
    descEl.innerHTML = card.dataset.description; // instead of textContent

    galleryEl.innerHTML = '';

    if (card.dataset.gallery) {
      const imgs = card.dataset.gallery.split(',');
      // Skip the first (cover)
      imgs.slice(1).forEach(src => {
        const img = document.createElement('img');
        img.src = src.trim();
        img.addEventListener('click', () => openLightbox(src));
        galleryEl.appendChild(img);
      });
    }
  }

  // Carousel buttons
  const track = document.querySelector('.carousel-track');
  document.querySelector('.prev').addEventListener('click', () => track.scrollBy({left: -300, behavior: 'smooth'}));
  document.querySelector('.next').addEventListener('click', () => track.scrollBy({left: 300, behavior: 'smooth'}));

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  document.querySelector('.lightbox .close').addEventListener('click', () => lightbox.style.display = 'none');
  lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.style.display = 'none'; });

  function openLightbox(src) {
    lightbox.style.display = 'flex';
    lightboxImg.src = src;
  }
});



function showDetails(card) {
  detailBox.classList.remove('d-none');
  detailBox.classList.remove('visible'); // reset
  setTimeout(() => detailBox.classList.add('visible'), 10);

  titleEl.textContent = card.dataset.title;
  tagsEl.textContent = card.dataset.hashtags;
  descEl.innerHTML = card.dataset.description;
  galleryEl.innerHTML = '';

  if (card.dataset.gallery) {
    const imgs = card.dataset.gallery.split(',');
    imgs.slice(1).forEach(src => {
      const img = document.createElement('img');
      img.src = src.trim();
      img.addEventListener('click', () => openLightbox(src));
      galleryEl.appendChild(img);
    });
  }
}