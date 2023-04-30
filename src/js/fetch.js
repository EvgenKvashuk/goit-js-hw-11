export function fetchImg(q) {

    const option = {
        url: 'https://pixabay.com/api/?',
        key: 'key=35871708-bbfa936b0bfd126629100243d',
        imageType: 'image_type=photo',
        orientation: 'orientation=horizontal',
        safesearch: 'safesearch=true',
        page: 'page=1',
        per_page: 'per_page=40',
    }

    return fetch(`${option.url}${option.key}&q=${q}&${option.imageType}&${option.orientation}&${option.safesearch}&${option.per_page}&${option.page}`)
}