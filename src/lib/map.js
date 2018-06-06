import View from './view.js';
//import temp from '../templates/review-temp.hbs';

var mapTable = document.querySelector('#map');

export default () => {
    let myMap;

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
                        
                        mapTable.appendChild(container);

                        let submitBtn = document.querySelector('#submit');
                        let closeBtn = document.querySelector('#closeBtn');

                        submitBtn.addEventListener('click', (e) => {
                            e.preventDefault();

                            let icon = new ymaps.Placemark(targetCoords, {}, { preset: 'islands#blueHomeCircleIcon' });

                            myMap.geoObjects.add(icon);
                            clusterer.add(icon);
                            //mapTable.removeChild(container);

                            View.destroyChild(mapTable, container);
                        });

                        closeBtn.addEventListener('click', (e) => {
                            e.preventDefault();
                            console.log('destroy');
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