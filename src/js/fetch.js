export function fetchImg(q) {

    // const params = new URLSearchParams({
    //     _limit: limit,
    //     _page: page
    // });

    const option = {
        url: 'https://pixabay.com/api/?',
        key: 'key=35871708-bbfa936b0bfd126629100243d',
        imageType: 'image_type=photo',
        orientation: 'orientation=horizontal',
        safesearch: 'safesearch=true',
    }

    return fetch(`${option.url}${option.key}&q=${q}&${option.imageType}&${option.orientation}&${option.safesearch}`)
}