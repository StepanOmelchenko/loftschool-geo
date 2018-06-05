import View from './view.js';

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

            myMap.events.add('click', function (e) {
                if (!myMap.balloon.isOpen()) {
                    var coords = e.get('coords');
                    myMap.balloon.open(coords, {
                        /* contentHeader:'Событие!', */
                        contentBody: View.renderReview()/* '<p>Кто-то щелкнул по карте.</p>' +
                            '<p>Координаты щелчка: ' + [
                            coords[0].toPrecision(6),
                            coords[1].toPrecision(6)
                            ].join(', ') + '</p>' */,
                        /* contentFooter:'<sup>Щелкните еще раз</sup>' */
                    });
                }
                else {
                    myMap.balloon.close();
                }
            });
            /* document.getElementById('destroyButton').onclick = function () {
                // Для уничтожения используется метод destroy.
                myMap.destroy();
            }; */

            return myMap;
        })    
};