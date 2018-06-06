const storage = localStorage;

export default {
    getReviews() {
        let reviews = [];

        if (storage.geoStorage) {
            reviews = JSON.parse(storage.geoStorage);
        }

        return reviews;
    },

    saveReviews(reviews) {
        let store = JSON.stringify(reviews);

        storage.setItem('geoStorage', store);
    }
};