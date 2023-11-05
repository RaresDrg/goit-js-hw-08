// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryListEl = document.querySelector('.gallery');

galleryItems.forEach(item => {
  const markup = `
  <li class="gallery__item">
    <a class="gallery__link" href="${item.original}">
      <img
        class="gallery__image"
        src="${item.preview}"
        alt="${item.description}"
      >
    </a>
  </li>`;

  galleryListEl.insertAdjacentHTML('beforeend', markup);
});

const lightbox = new SimpleLightbox('.gallery li a', {
  captionsData: 'alt',
  captionDelay: '250',
});
