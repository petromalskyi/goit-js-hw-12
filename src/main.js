import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('form');
const listEl = document.querySelector('.gallery');

formEl.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  listEl.innerHTML = '';
  const userEntered = event.target.elements.name.value;

  listEl.insertAdjacentHTML('afterend', '<span class="loader"></span>');

  getGallery(userEntered)
    .then(data => {
      if (data.hits.length === 0) {
        const loaderEl = document.querySelector('.loader');
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
      } else {
        return createMarkup(data.hits);
      }
    })
    .catch(err => console.log(err));
}

function getGallery(userEntered) {
  const BASE_URL = 'https://pixabay.com/api';
  const API_KEY = '41437501-0a58a7d6f9b55a91ef815cfe0';
  return fetch(
    `${BASE_URL}/?key=${API_KEY}&q=${userEntered}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`,
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    return resp.json();
  });
}

function createMarkup(array) {
  const loaderEl = document.querySelector('.loader');
  loaderEl.remove();

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

  listEl.innerHTML = markup;

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  });
  lightbox.refresh();
}
