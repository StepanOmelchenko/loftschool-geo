export default () => {
    let myMap;

    return new Promise(resolve => ymaps.ready(resolve))
        .then(() => {
            myMap = new ymaps.Map('map', {
                center: [55.76, 37.64],
                zoom: 10
            }, {
                searchControlProvider: 'yandex#search'
            });

            /* document.getElementById('destroyButton').onclick = function () {
                // Для уничтожения используется метод destroy.
                myMap.destroy();
            }; */

            return myMap;
        })    
};