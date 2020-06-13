import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            const res = await axios(this.query);

            this.result = res.data.data;
        } catch(error) {
            alert(error);
        }
    }
}