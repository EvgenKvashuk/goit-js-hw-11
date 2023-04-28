import axios from "axios";
import Notiflix from "notiflix";

const url = 'https://pixabay.com/api/';
const key = '35871708-bbfa936b0bfd126629100243d';

const form = document.querySelector('.search-form')

const q = form.addEventListener('input', (e) => {})

form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    fetch(`${url}?key=${key}&${q}&image_type=photo`)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log(data)
        // Data handling
    })
    .catch(error => {
        // Error handling
    });
});