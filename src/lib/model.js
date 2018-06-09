export default {
    getReviews() {
        let storage = localStorage;
        let reviews = [];

        if (storage.geoStorage) {
            reviews = JSON.parse(storage.geoStorage);
        }

        return reviews;
    },

    saveReviews(address, form, targetCoords) {
        if (form) {
            let memoryStorage = this.getReviews();
            let storage = localStorage;
            let newReview = {};
            let date = new Date();
            let coords = [...targetCoords];
            let parseDate = `${ date.getDate() }.${ date.getMonth() + 1 }.${ date.getFullYear() } ${ date.getHours()}:${ date.getMinutes() }:${ date.getSeconds() }`;
            
            form.forEach((elem) => {
                if (elem.type != 'submit') {
                    let name = elem.name;
                    newReview[name] = elem.value;
                    elem.value = '';
                }
            });            
            
            newReview.date = parseDate;
            newReview.coords = [...coords];
            newReview.address = address;
            memoryStorage.push(newReview); 

            storage.setItem('geoStorage', JSON.stringify(memoryStorage));
            return newReview;
        }        
    },

    searchReviewsByAdddress(address) {
        let reviews = this.getReviews();
        let elemsWithSameAddress = reviews.filter((review) => review.address == address);
        let result = [];
        
        elemsWithSameAddress.forEach((elem) => {
            result.push(elem);
        });
        
        return result;
    }
};