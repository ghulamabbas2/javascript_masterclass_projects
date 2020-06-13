import elements from './elements';

// Clear the Single Job UI
export const clearUI = () => {
    elements.singleJob.innerHTML = '';
}

// Display industry from array
const displayIndustry = industry => {
    return `<p>${industry}</p>`
}

// Close Single job
elements.singleJob.addEventListener('click', e => {
    if(e.target.matches('#close')) {
        elements.singleJob.innerHTML = '';
    }
});

// Render single job on UI
export const renderJob = (job) => {
    const markup = `<div class="single-job">
                        <i id="close" class="fas fa-times mt-2 float-right"></i>
                        <h3 class="mt-3">${job.title}</h3>
                        <p>Aiya Digital</p>
                        <button class="apply-btn mr-3">Apply</button>
                        <button class="save-btn">Save Job</button>

                        <hr>
                        <div id="content-container" class="mt-4">

                            <div class="py-3">
                                <h4>Job Description:</h4>
                                <p>${job.description}</p>

                                <h4 class="mt-4">Job Details:</h4>
                                <div class="ml-3">
                                    <div class="row">
                                        <div class="col-4">
                                            <b>
                                                <p>Industry:</p>
                                            </b>
                                        </div>
                                        <div class="col-6">
                                        ${job.industry.map(element => displayIndustry(element)).join('')}       
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-4">
                                            <b>
                                                <p>Positions:</p>
                                            </b>
                                        </div>
                                        <div class="col-6">
                                            <p>${job.positions}</p>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-4">
                                            <b>
                                                <p>Job Type:</p>
                                            </b>
                                        </div>
                                        <div class="col-6">
                                            <p>${job.jobType}</p>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-4">
                                            <b>
                                                <p>Min Education:</p>
                                            </b>
                                        </div>
                                        <div class="col-6">
                                            <p>${job.minEducation}</p>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-4">
                                            <b>
                                                <p>Experience:</p>
                                            </b>
                                        </div>
                                        <div class="col-6">
                                            <p>${job.experience}</p>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-4">
                                            <b>
                                                <p>Estimated Salary:</p>
                                            </b>
                                        </div>
                                        <div class="col-6">
                                            <p>$${job.salary}</p>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-4">
                                            <b>
                                                <p>Posting Date:</p>
                                            </b>
                                        </div>
                                        <div class="col-6">
                                            <p>${job.postingDate.substring(0, 10)}</p>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-4">
                                            <b>
                                                <p>Last Date:</p>
                                            </b>
                                        </div>
                                        <div class="col-6">
                                            <p>${job.lastDate.substring(0, 10)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>`;

    elements.singleJob.insertAdjacentHTML('afterbegin', markup);
}