import View from './view.js';
import Model from './model.js';
import DND from './DND.js';

const mapTable = document.querySelector('#map');
DND.makeDND(mapTable);

export default () => {
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

            myMap.events.add('click', function (e) {
                let windowCoords = e.get('pagePixels');
                let targetCoords = e.get('coords');

                getAddress(targetCoords)
                    .then((address) => {
                        let container = View.renderReview(windowCoords, targetCoords, address);
                        
                        container.draggable = true;
                        mapTable.appendChild(container);

                        let submitBtn = document.querySelector('#submit');
                        let closeBtn = document.querySelector('#closeBtn');

                        submitBtn.addEventListener('click', (e) => {
                            e.preventDefault();
                            let formElements = [...document.querySelector('#form').elements];
                            let icon = new ymaps.Placemark(targetCoords, {}, { preset: 'islands#blueHomeCircleIcon' });
                            
                            myMap.geoObjects.add(icon);
                            clusterer.add(icon);
                            Model.saveReviews(address, formElements, storage, targetCoords);
                            View.destroyChild(mapTable, container);
                        });

                        closeBtn.addEventListener('click', (e) => {
                            e.preventDefault();
                            View.destroyChild(mapTable, container);
                        });
                    });
            });

            function getAddress(coords) {
                return ymaps.geocode(coords).then((res) => {
                        let firstGeoObject = res.geoObjects.get(0);
                        
                        return firstGeoObject.getAddressLine();
                    });
            }

            return myMap;
        })    
};