import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox

export function renderGallery(images) {
    const gallery = document.querySelector('#gallery');
    
    const render = images
        .map(
            ({
                webformatURL,
                largeImageURL,
                tags,
                likes,
                views,
                comments,
                downloads,
            }) => `
    <a class="gallery-link" href="${largeImageURL}">
    <img src="${webformatURL}" class="gallery-image" alt="${tags}" loading="lazy"/>
    <div class="inform">
    <p><b>Likes</b>: ${likes}</p>
    <p><b>Views</b>: ${views}</p>
    <p><b>Comments</b>: ${comments}</p>
    <p><b>Downloads</b>: ${downloads}</p>
    </div>
    </a>
    `
    )
.join('');
gallery.insertAdjacentHTML("beforeend", render)
    if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionPosition: 'bottom',
        captionDelay: 250,
    });
    } else {
    lightbox.refresh();
    }
}

export function clearGallery() {
    document.querySelector('.gallery').innerHTML = '';
}

const hiddenClass = "is-hidden";

export function hide(button) {
    button.classList.add(hiddenClass);
}

export function show(button) {
    button.classList.remove(hiddenClass);
}

export function disable(button, loader) {
    button.disabled = true;
    loader.classList.remove(hiddenClass);
}

export function enable(button, loader) {
    button.disabled = false;
    loader.classList.add(hiddenClass);
}
