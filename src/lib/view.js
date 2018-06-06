import temp from '../templates/review-temp.hbs';
//import Model from './model.js';

const container = document.createElement('div');
container.classList.add('box');

export default {
    renderReview(windowCoords, targetCoords, address) {
        container.innerHTML = temp({address: address, reviews: [
            {
                name: 'Павел',
                place: 'Бекер',
                date: '10.10.2017',
                text: 'Сосисоны тут!!!'
            },
            {
                name: 'Душкин',
                place: 'Бекер',
                date: '10.10.2017',
                text: 'Сосисоны ем!!!'
            }
        ]});

        //box.classList.add('box');
        container.style.left = windowCoords[0] + 'px';
        container.style.top = windowCoords[1] + 'px';

        return container;
    },
    destroyChild(parent, child) {
        parent.removeChild(child);
    }
};