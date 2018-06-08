export default {
    getReviews() {
        let storage = localStorage;
        let reviews = [];

        if (storage.geoStorage) {
            reviews = JSON.parse(storage.geoStorage);
        }

        return reviews;
    },

    saveReviews(address, form, memoryStorage, targetCoords) {
        if (form) {
            let storage = localStorage;
            let formData = {};
            let newReview = {};
            let date = new Date();
            let coords = [...targetCoords];
            let parseDate = `${ date.getDate() }.${ date.getMonth() + 1 }.${ date.getFullYear() }`;

            form.forEach((elem) => {
                if (elem.type != 'submit') {
                    let name = elem.name;
                    formData[name] = elem.value;
                }
            });            
            
            formData.date = parseDate;
            newReview.coords = [...coords];
            newReview.address = address;
            newReview.reviews = [];
            newReview.reviews.push(formData);
            memoryStorage.push(newReview);
            storage.setItem('geoStorage', JSON.stringify(memoryStorage));
        }        
    }
};