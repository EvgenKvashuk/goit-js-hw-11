import axios from "axios";
import Notiflix from "notiflix";

import { refs } from "./js/refs";
import { fetchImg } from "./js/fetch";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


refs.form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const q = refs.input.value;

    fetchImg(q)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log(data.totalHits)
            if (data.hits.length === 0) {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                refs.gallery.innerHTML = '';
                refs.loadMore.classList.add("is-hide")
            }

            if (q === '') {
                Notiflix.Notify.failure('Search bar is empty');
                refs.photoCard.innerHTML = '';
            };

            if (data.hits.length > 0) {
                markup(data)
                refs.loadMore.classList.remove("is-hide")
                Notiflix.Notify.success(`We found ${data.totalHits} images`);
            }
        })
        .catch(error => {

         });
});


function markup(data) {
    refs.gallery.innerHTML = '';

    const markup = data.hits
        .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <div class="photo-card">
            <img class='gallery__image' src="${webformatURL}" alt="${tags}" loading="lazy" />
                        
            <div class="info">
                <p class="info-item"><b>Likes</b>: ${likes}</p>
                <p class="info-item"><b>Views</b>: ${views}</p>
                <p class="info-item"><b>Comments</b>: ${comments}</p>
                <p class="info-item"><b>Downloads</b>: ${downloads}</p>
            </div>
        </div>
        `)
        .join("");
    refs.gallery.insertAdjacentHTML("afterbegin", markup);
}



// delit after для стилів

// const q = 'cat';

// fetchImg(q)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(response.status);
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log(data.hits)

//         markup(data)
//         console.log(page)
//     })
//     .catch(error => { });



// function markup(data) {
//     refs.gallery.innerHTML = '';

//     const markup = data.hits
//         .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
//                         <div class="photo-card">
//                             <img class='gallery__image' src="${webformatURL}" alt="${tags}" loading="lazy" />
                        
//                             <div class="info">
//                                 <p class="info-item"><b>Likes</b>: ${likes}</p>
//                                 <p class="info-item"><b>Views</b>: ${views}</p>
//                                 <p class="info-item"><b>Comments</b>: ${comments}</p>
//                                 <p class="info-item"><b>Downloads</b>: ${downloads}</p>
//                             </div>

//                             </div>
//                         `)
//         .join("");
//     refs.gallery.insertAdjacentHTML("afterbegin", markup);
// }