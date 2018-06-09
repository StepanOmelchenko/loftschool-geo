import temp from '../templates/review-temp.hbs';
import sliderTemp from '../templates/slider-temp.hbs';

const container = document.createElement('div');
const slider = document.createElement('div');

container.classList.add('window');
slider.classList.add('slider');

export default {
    renderReview(windowCoords, targetCoords, address, mapTable, reviews = []) {

        container.innerHTML = temp({ address: address, reviews: reviews });

        container.style.left = windowCoords[0] + 'px';
        container.style.top = windowCoords[1] + 'px';
        container.draggable = true;
        mapTable.appendChild(container);

        return container;
    },

    renderSlider(windowCoords, targetCoords, address, mapTable, reviews = []) {

        slider.innerHTML = sliderTemp({ });

        slider.style.left = windowCoords[0] + 'px';
        slider.style.top = windowCoords[1] + 'px';
        slider.draggable = true;
        mapTable.appendChild(container);

        return slider;
    },

    destroyChild(parent, child) {
        parent.removeChild(child);
    }
};