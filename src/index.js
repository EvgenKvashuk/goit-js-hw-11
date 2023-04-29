import axios from "axios";
import Notiflix from "notiflix";

import { refs } from "./js/refs";
import { fetchImg } from "./js/fetch";

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
            // console.log(data.hits)
            if (data.hits.length === 0) {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                refs.gallery.innerHTML = '';
            }

            if (q === '') {
                Notiflix.Notify.failure('Search bar is empty, ');
                refs.photoCard.innerHTML = '';
            };
            markup(data)
        })
        .catch(error => { });
});


function markup(data) {

    refs.gallery.innerHTML = '';

    const markup = data.hits
        .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />

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

// fetchImg(q)
// .then(response => {
//     if (!response.ok) {
//         throw new Error(response.status);
//     }
//     return response.json();
// })
// .then(data => {
//     console.log(data.hits)
//     if (data.hits.length == 0) {
//         Notiflix.Notify.failure('not found img');
//     }

//     markup(data)
// })
// .catch(error => {           });


// function markup(data) {
//     const markup = data.hits
//         .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
//         <div class="photo-card">
//             <img src="${webformatURL}" alt="${tags}" loading="lazy" />

//             <div class="info">
//                 <p class="info-item"><b>Likes</b>${likes}</p>
//                 <p class="info-item"><b>Views</b>${views}</p>
//                 <p class="info-item"><b>Comments</b>${comments}</p>
//                 <p class="info-item"><b>Downloads</b>${downloads}</p>
//             </div>
//         </div>
//         `)
//         .join("");
//     refs.gallery.insertAdjacentHTML("afterbegin", markup);
// }
