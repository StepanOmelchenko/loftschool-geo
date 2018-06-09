import temp from '../templates/review-temp.hbs';
import Model from './model.js';
import map from './map.js';

const container = document.createElement('div');
container.classList.add('box');

export default {
    renderReview(windowCoords, targetCoords, address, mapTable, reviews = []) {

        container.innerHTML = temp({ address: address, reviews: reviews });

        container.style.left = windowCoords[0] + 'px';
        container.style.top = windowCoords[1] + 'px';
        container.draggable = true;
        mapTable.appendChild(container);

        return container;
    },

    destroyChild(parent, child) {
        parent.removeChild(child);
    }
};