import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
const gallery = document.querySelector('.gallery');

const galleryTags = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<a class="gallery__item" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        alt="${description}"
      />
    </a>`
  )
  .join('');

gallery.insertAdjacentHTML('afterbegin', galleryTags);

const gallerySlider = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
