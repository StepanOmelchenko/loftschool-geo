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
            //let formData = {};
            let newReview = {};
            let date = new Date();
            let coords = [...targetCoords];
            let parseDate = `${ date.getDate() }.${ date.getMonth() + 1 }.${ date.getFullYear() }`;
            
            form.forEach((elem) => {
                if (elem.type != 'submit') {
                    let name = elem.name;
                    newReview[name] = elem.value;
                    elem.value = '';
                }
            });            
            
            newReview.date = parseDate;
            //formData.address = address;

            newReview.coords = [...coords];
            newReview.address = address;
            //newReview.reviews = [];
            //newReview.reviews.push(formData);
            memoryStorage.push(newReview); 

            storage.setItem('geoStorage', JSON.stringify(memoryStorage));
            console.log('Новый отзыв ', newReview);
            return newReview;
        }        
    },

    /* searchSamePlace(address) {
        let reviews = this.getReviews();
        let sameElementPosition = 0;
        let result = reviews.find((review, index) => {
            if (review.address == address) {
                sameElementPosition = index;
                return true;
            }

            return false;
        });
        
        return sameElementPosition;
    }, */

    searchReviewsByAdddress(address) {
        let reviews = this.getReviews();
        let elemsWithSameAddress = reviews.filter((review) => review.address == address);
        let result = [];
        
        elemsWithSameAddress.forEach((elem) => {
            result.push(elem);
        });
        console.log('Элементы с тем же адресом ', result);
        return result;
    }
};