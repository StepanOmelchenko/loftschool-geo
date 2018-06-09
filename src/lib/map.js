import View from './view.js';
import Model from './model.js';

export default (mapTable) => {
    let myMap;
    let storage = Model.getReviews();
    console.log(storage);

    return new Promise(resolve => ymaps.ready(resolve))
        .then(() => {
            
            myMap = new ymaps.Map('map', {
                center: [55.76, 37.64],
                zoom: 10,
                controls: ['zoomControl']
            }, {
                searchControlProvider: 'yandex#search'
            });

            let clusterer = new ymaps.Clusterer({
                preset: 'islands#invertedVioletClusterIcons',
                clusterDisableClickZoom: true,
                openBalloonOnClick: false
            });
    
            myMap.geoObjects.add(clusterer);
            createIcons(storage);

            myMap.events.add('click', (e) => {
                let windowCoords = e.get('pagePixels');
                let targetCoords = e.get('coords');

                getAddress(targetCoords)
                    .then((address) => {
                        createContainer(windowCoords, targetCoords, address);
                    });
            });            

            function getAddress(coords) {
                return ymaps.geocode(coords).then((res) => {
                        let firstGeoObject = res.geoObjects.get(0);
                        
                        return firstGeoObject.getAddressLine();
                    });
            }

            function createIcon(coords) {
                let icon = new ymaps.Placemark(coords, {}, { preset: 'islands#blueHomeCircleIcon' });
                
                icon.events.add('click', (e) => {
                    let windowCoords = e.get('pagePixels');
                    let targetCoords = coords;

                    getAddress(targetCoords)
                        .then((address) => {
                            createContainer(windowCoords, targetCoords, address);
                        });                    
                });

                myMap.geoObjects.add(icon);
                clusterer.add(icon);
            }

            function createIcons(storage) {
                storage.forEach((review) => {
                    createIcon(review.coords);
                });
            }

            function createContainer(windowCoords, targetCoords, address) {
                let exsistReviews = Model.searchReviewsByAdddress(address);
                let container = View.renderReview(windowCoords, targetCoords, address, mapTable, exsistReviews);                        
                let submitBtn = document.querySelector('#submit');
                let closeBtn = document.querySelector('#closeBtn');

                submitBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    let formElements = [...document.querySelector('#form').elements];
                    let newReview = Model.saveReviews(address, formElements, targetCoords);

                    createIcon(targetCoords);
                    View.addReview(container, newReview.reviews[0]);
                });

                closeBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    View.destroyChild(mapTable, container);
                });

                return container;
            }
        })    
};