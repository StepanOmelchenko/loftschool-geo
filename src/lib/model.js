export default {
    getReviews() {
        let storage = localStorage;
        let reviews = [];

        if (storage.geoStorage) {
            reviews = JSON.parse(storage.geoStorage);
        }

        return reviews;
    },

    saveReviews(address, form, /* memoryStorage, */ targetCoords) {
        if (form) {
            let memoryStorage = this.getReviews();
            let storage = localStorage;
            let formData = {};
            let newReview = {};
            let date = new Date();
            let coords = [...targetCoords];
            let parseDate = `${ date.getDate() }.${ date.getMonth() + 1 }.${ date.getFullYear() }`;
            let sameElementPosition = this.searchSamePlace(address);
            let result = {
                buldingHasReviews: false
            };

            form.forEach((elem) => {
                if (elem.type != 'submit') {
                    let name = elem.name;
                    formData[name] = elem.value;
                }
            });            
            
            formData.date = parseDate;
            formData.address = address;
            if (sameElementPosition) {
                memoryStorage[sameElementPosition].reviews.push(formData);
                storage.setItem('geoStorage', JSON.stringify(memoryStorage));

                result.buldingHasReviews = true;
            } else {
                newReview.coords = [...coords];
                newReview.address = address;
                newReview.reviews = [];
                newReview.reviews.push(formData);
                memoryStorage.push(newReview); 
            }

            storage.setItem('geoStorage', JSON.stringify(memoryStorage));

            return result;
        }        
    },

    searchSamePlace(address) {
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
    },

    searchReviewsByAdddress(address) {
        let reviews = this.getReviews();
        let result = reviews.find((review) => review.address == address);

        if (result) {
            return result.reviews
        }
        return [];
    }
};