import fetch from './js/fetch';
import renderImageCard from './js/render';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const { searchForm, gallery, loadMoreBtn } = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),

};

let currentPage = 1;
let currentHits = 0;
let searchQuery = '';

searchForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  searchQuery = evt.currentTarget.searchQuery.value.trim();
  currentPage = 1;

  if (searchQuery === '') {
    return;
  }

  const response = await fetch(searchQuery, currentPage);
  currentHits = response.hits.length;

  if (response.totalHits > 40) {
    loadMoreBtn.classList.remove('is-hidden');

  } else {
    loadMoreBtn.classList.add('is-hidden');

  }

  try {
    if (response.totalHits > 0) {
      Notify.success(`Hooray! We found ${response.totalHits} images.`);
      gallery.innerHTML = '';
      renderImageCard(response.hits, gallery);
    }

    if (response.totalHits === 0) {
      gallery.innerHTML = '';
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      loadMoreBtn.classList.add('is-hidden');

    }
  } catch (error) {
    console.error(error);
  }
})

loadMoreBtn.addEventListener('click', async (evt) => {
  currentPage += 1;
  const response = await fetch(searchQuery, currentPage);
  renderImageCard(response.hits, gallery);
  currentHits += response.hits.length;


  if (currentHits === response.totalHits) {
    loadMoreBtn.classList.add('is-hidden');
  }
});