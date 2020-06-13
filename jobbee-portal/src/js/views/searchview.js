import elements from './elements'

// Clear all jobs before rendering them
export const clearUI = () => {
    elements.jobsList.innerHTML = '';
    elements.seachResPages.innerHTML = '';
}

// Pagination Buttons markup
const createButton = (page, type) => {
    return `<button class="btn-pagination btn_${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
                <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
            </button>`;
};

// Render pagination buttons
const renderButtons = (page, numResults, resPerPage) => {
    // Number of pages
    const pages = Math.ceil(numResults / resPerPage);

    let button;
    
    if(page === 1 && pages > 1) {
        // Only next button
        button = createButton(page, 'next');
    } else if(page < pages) {
        // Both next and previous buttons
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    } else if(page === pages && pages > 1) {
        // Only previous button
        button = createButton(page, 'prev');
    }

    elements.seachResPages.insertAdjacentHTML('afterbegin', button);
}

// Render all jobs
export const renderResults = (jobs, page = 1, resPerPage = 2) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    if(jobs.length === 0) {
        elements.jobsList.insertAdjacentHTML('beforeend', `<p id="jobs-found">0 Jobs found.</p>`)
    }

    jobs.slice(start, end).forEach((job, index) => {
        const markup = `<div class="job-card">
                        <h3><a href="#job/${job._id}/${job.slug}">
                        ${job.title}</a></h3>
                        <p id="company">${job.company}</p>
                        <p>${job.description.substring(0, 120)} ...</p>
                        <p>
                        <span><i class="fas fa-calendar-alt"></i> ${job.postingDate.substring(0, 10)} </span>
                        <span class="ml-4"><i class="fas fa-users"></i> ${job.positions} </span>
                        </p>
                    </div>`;

        if(index === 0) {
            elements.jobsList.insertAdjacentHTML('beforeend', `<p id="jobs-found">${jobs.length} Jobs found</p>`)
        } 

        elements.jobsList.insertAdjacentHTML('beforeend', markup);
    });

    if(jobs.length > resPerPage) {
        renderButtons(page, jobs.length, resPerPage);
    }
}