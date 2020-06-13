import axios from 'axios';

export default class Job {
    constructor(url) {
        this.url = url;
    }

    async getResults() {
        try {
            const res = await axios(this.url);

            this.title = res.data.data[0].title;
            this.company = res.data.data[0].company;
            this.description = res.data.data[0].description;
            this.industry = res.data.data[0].industry;
            this.positions = res.data.data[0].positions;
            this.jobType = res.data.data[0].jobType;
            this.minEducation = res.data.data[0].minEducation;
            this.experience = res.data.data[0].experience;
            this.salary = res.data.data[0].salary;
            this.postingDate = res.data.data[0].postingDate;
            this.lastDate = res.data.data[0].lastDate;

        } catch (error) {
            alert(error);
        }
    }
}