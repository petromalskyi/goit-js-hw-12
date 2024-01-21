import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const queryElements = {
  formEl: document.querySelector('form'),
  listEl: document.querySelector('.gallery'),
  loadMoreEl: document.querySelector('.js-btn-load'),
  loaderEl: document.querySelector('.loader'),
};

const variables = {
  perPage: 40,
  userEntered: '',
  currentPage: 1,
  messageError: '',
  messageWarning: '',
};

queryElements.formEl.addEventListener('submit', handleSubmit);

queryElements.loadMoreEl.addEventListener('click', onLoadMore);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

async function onLoadMore() {
  variables.currentPage += 1;
  queryElements.loadMoreEl.classList.toggle('hidden');
  queryElements.loaderEl.classList.remove('hidden');

  tryCatch();
}

async function handleSubmit(event) {
  event.preventDefault();

  variables.userEntered = event.currentTarget.elements.name.value.trim();

  if (variables.userEntered === '') {
    queryElements.formEl.reset();
    variables.messageError = 'Sorry, enter some value in this field.';
    iziToastError();
    return;
  }

  variables.currentPage = 1;
  queryElements.loaderEl.classList.remove('hidden');

  // queryElements.listEl.innerHTML = '';
  const arrChildNodes = Array.from(queryElements.listEl.childNodes);
  if (arrChildNodes.length) {
    arrChildNodes.forEach(arr => arr.remove());
  }

  tryCatch();

  queryElements.formEl.reset();
}

async function tryCatch() {
  try {
    const data = await getGallery(variables.userEntered);

    if (!data.hits.length) {
      variables.messageError =
        'Sorry, there are no images matching your search query. Please try again!';
      iziToastError();
      return;
    }

    if (data.totalHits / (variables.perPage * variables.currentPage) <= 1) {
      variables.messageWarning =
        "We're sorry, but you've reached the end of search results.";
      iziToastWarning();
    } else {
      queryElements.loadMoreEl.classList.remove('hidden');
    }

    return createMarkup(data.hits);
  } catch (error) {
    variables.messageError = error;
    iziToastError();
  }
}

async function getGallery(userEntered) {
  const API_KEY = '41437501-0a58a7d6f9b55a91ef815cfe0';
  axios.defaults.baseURL = 'https://pixabay.com/api/';
  const params = {
    q: `${variables.userEntered}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: `${variables.perPage}`,
    page: `${variables.currentPage}`,
  };

  const response = await axios.get(`?key=${API_KEY}`, { params });

  return response.data;
}

//   width="360" height="200"

function createMarkup(array) {
  const markup = array.reduce(
    (
      html,
      { largeImageURL, webformatURL, tags, likes, views, comments, downloads },
    ) =>
      html +
      `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
            <img
            class="gallery-image"
            src="${webformatURL}"
            alt="${tags}"
          
            />
            <div class="gallery-info">
              <div class="gallery-box">
                <h3 class="gallery-title">likes</h3>
                <p class="gallery-text">${likes}</p>
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

  queryElements.listEl.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();

  queryElements.loaderEl.classList.add('hidden');

  window.scrollBy({
    top: queryElements.listEl.getBoundingClientRect().height,
    left: 0,
    behavior: 'smooth',
  });
}

function iziToastError() {
  queryElements.loadMoreEl.classList.add('hidden');
  queryElements.loaderEl.classList.add('hidden');

  iziToast.error({
    title: 'Error',
    message: variables.messageError,
    position: 'topRight',
    messageColor: '#ffffff',
    titleColor: '#ffffff',
    iconColor: '#ffffff',
    backgroundColor: '#B51B1B',
  });
}

function iziToastWarning() {
  queryElements.loadMoreEl.classList.add('hidden');
  queryElements.loaderEl.classList.add('hidden');

  iziToast.warning({
    title: 'Caution',
    message: variables.messageWarning,
    position: 'topRight',
    messageColor: '#000000',
    titleColor: '#000000',
    iconColor: '#000000',
    backgroundColor: '#06bb3c',
  });
}
