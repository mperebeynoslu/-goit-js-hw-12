import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import {
  renderGallery,
  clearGallery,
  hide,
  show,
  disable,
  enable
} from "./js/render-functions";
import { getPicturesByQuery } 
from "./js/pixabay-api";

let currentPage = 1;
let currentQuery = '';

const searchForm = document.querySelector('.form');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

hide(loadMoreBtn);
enable(loadMoreBtn, loader);
searchForm.addEventListener('submit', handleSearch);

async function handleSearch(evt) {
    evt.preventDefault();
  
    clearGallery();
    const queryValue = evt.currentTarget.elements.query.value.trim();
  
    if (!queryValue) {
      return showErrorToast('❌ Please enter a search query');
    }
  
    disable(loadMoreBtn, loader);
    currentQuery = queryValue;
    currentPage = 1;
  
    await fetchImages();
}

async function fetchImages() {
  try {
    const data = await getPicturesByQuery(currentQuery, currentPage);

    if (data.hits.length === 0) {
      return showWarningToast('Sorry, there are no images matching your search query.');
    }

    renderGallery(data.hits);
    handleLoadMoreVisibility(data.totalHits);

  } catch (error) {
    onFetchError(error);
  } finally {
    enable(loadMoreBtn, loader);
    searchForm.reset();
  }
}

function handleLoadMoreVisibility(totalHits) {
  if (totalHits > currentPage * 15) {
    show(loadMoreBtn);
  } else {
    hide(loadMoreBtn);
    showInfoToast("We're sorry, but you've reached the end of search results.");
  }
}

function onFetchError(error) {
  showErrorToast('❌ No pictures found');
}

loadMoreBtn.addEventListener('click', async () => {
  disable(loadMoreBtn, loader);
  hide(loadMoreBtn);
  currentPage += 1;

  await fetchImages();
  smoothScroll();
});

function smoothScroll() {
  const { height: cardHeight } = document.querySelector('.gallery').getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

//Функції повідомлень
function showErrorToast(message) {
  iziToast.error({ title: 'Error', message });
}

function showWarningToast(message) {
  iziToast.warning({ title: 'No Results', message });
}

function showInfoToast(message) {
  iziToast.info({ title: 'End of Results', message });
}
