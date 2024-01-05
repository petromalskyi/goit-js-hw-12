import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const formEl = document.querySelector('form');
const listEl = document.querySelector('.gallery');
const loadMoreEl = document.querySelector('.js-btn-load');

let userEntered = '';
let currentPage = 1;
let perPage = 40;
let loaderEl = '';

formEl.addEventListener('submit', handleSubmit);
loadMoreEl.addEventListener('click', onLoadMore);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

function onLoadMore() {
  currentPage += 1;
  loadMoreEl.classList.toggle('hidden');
  loadMoreEl.insertAdjacentHTML('afterend', '<span class="loader"></span>');
  loaderEl = document.querySelector('.loader');

  getGallery(userEntered, currentPage)
    .then(data => {
      if (!data.hits.length) {
        iziToastError();
        return;
      } else {
        if (data.totalHits - (currentPage - 1) * perPage <= perPage) {
          perPage = data.totalHits - currentPage * perPage;
          iziToastWarning();
        } else {
          loadMoreEl.classList.remove('hidden');
        }
      }
      return createMarkup(data.hits);
    })
    .catch(err => console.log(err));
}

function handleSubmit(event) {
  event.preventDefault();
  listEl.innerHTML = '';
  currentPage = 1;
  perPage = 40;
  userEntered = event.target.elements.name.value;

  loadMoreEl.insertAdjacentHTML('afterend', '<span class="loader"></span>');
  loaderEl = document.querySelector('.loader');

  getGallery(userEntered)
    .then(data => {
      if (!data.hits.length) {
        iziToastError();
        return;
      } else {
        if (data.totalHits - (currentPage - 1) * perPage <= perPage) {
          perPage = data.totalHits - currentPage * perPage; //- (currentPage - 1) * perPage;
          iziToastWarning();
        } else {
          loadMoreEl.classList.remove('hidden');
        }
      }

      return createMarkup(data.hits);
    })

    .catch(err => console.log(err));
}

async function getGallery(userEntered) {
  const API_KEY = '41437501-0a58a7d6f9b55a91ef815cfe0';
  axios.defaults.baseURL = 'https://pixabay.com/api';

  const response = await axios.get(
    `/?key=${API_KEY}&q=${userEntered}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${currentPage}`,
  );

  return response.data;
}

function createMarkup(array) {
  const markup = array.reduce(
    (
      html,
      { largeImageURL, previewURL, tags, likes, views, comments, downloads },
    ) =>
      html +
      `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
            <img
            class="gallery-image"
            src="${previewURL}"
            alt="${tags}"
            width="360"
            height="200"
            ;
            />
            <div class="gallery-info">
              <div class="gallery-box">
                <h3 class="gallery-title">likes</h3>
                <p class="gallery-text">${likes}</p>
                <!--hit.likes -->
              </div>
              <div class="gallery-box">
                <h3 class="gallery-title">views</h3>
                <p class="gallery-text">${views}</p>
              </div>
              <div class="gallery-box">
                <h3 class="gallery-title">comments</h3>
                <p class="gallery-text">${comments}</p>
              </div>
              <div class="gallery-box">
                <h3 class="gallery-title">downloads</h3>
                <p class="gallery-text">${downloads}</p>
              </div>
            </div>
         </a>
       </li>`,
    '',
  );

  listEl.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();

  loaderEl.remove();

  window.scrollBy({
    top: listEl.getBoundingClientRect().height,
    left: 0,
    behavior: 'smooth',
  });
}

function iziToastError() {
  loadMoreEl.classList.add('hidden');
  loaderEl.remove();
  iziToast.error({
    title: 'Error',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
    position: 'topRight',
    messageColor: '#ffffff',
    titleColor: '#ffffff',
    iconColor: '#ffffff',
    backgroundColor: '#B51B1B',
  });
}

function iziToastWarning() {
  loadMoreEl.classList.add('hidden');
  loaderEl.remove();
  iziToast.warning({
    title: 'Caution',
    message: "We're sorry, but you've reached the end of search results.",
    position: 'topRight',
    messageColor: '#000000',
    titleColor: '#000000',
    iconColor: '#000000',
    backgroundColor: '#06bb3c',
  });
}
