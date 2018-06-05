import temp from '../templates/review-temp.hbs';
import Model from './model.js';

export default {
    renderReview() {
        let items = Model.getData();
        return temp({items});
    }
};