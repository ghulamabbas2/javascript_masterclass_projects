import Search from './models/Search';
import Job from './models/Job';
import elements from './views/elements';
import * as searchView from './views/searchview';
import * as jobView from './views/jobview';

const state = {};

// Search Controller
const controlSearch = async (query) => {
        if(query) {
            // Create search object
            state.search = new Search(query);

            // Clear UI before searching
            searchView.clearUI();

            try {

                // Search for all jobs
                 await state.search.getResults();

                // Display jobs on UI
                searchView.renderResults(state.search.result);
                
            } catch (error) {
                alert(`Something went wrong in search: ${error}`)
            }
        }
}


elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();

    const userQuery = elements.searchInput.value;    
    const location = elements.locationInput.value;    

    const query = `${elements.apiUrl}/jobs?q=${userQuery}&location-city=${location}`;

    controlSearch(query);
});

// Event Listener for pagination buttons
elements.seachResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-pagination');

    if(btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearUI();
        searchView.renderResults(state.search.result, goToPage);
    }
});


// Single Job Controller
const controlSingleJob = async () => {
    const url = `${elements.apiUrl}/${window.location.hash.replace('#', '')}`;
    console.log(url);

    if(url) {
        // Create Job Object
        state.job = new Job(url);

        // Clear Job UI
        jobView.clearUI()

        try {

            // Search for a single job
            await state.job.getResults();

            // Render job on UI
            jobView.renderJob(state.job);

        } catch (error) {
            alert(error);
        }
    }
}

['hashchange'].forEach(event => {
    window.addEventListener(event, controlSingleJob);
}); 


// Get min and max salary
function getSalary() {
    const minSalary = elements.minSalary.valueAsNumber;
    const maxSalary = elements.maxSalary.valueAsNumber;

    return {
        minSalary,
        maxSalary
    }
}

// Apply filters on jobs
elements.filterBtn.addEventListener('click', setFilters);

async function setFilters() {
    const experince = applyFilters('experienceCheck');
    const jobType = applyFilters('typeCheck');
    const minEducation = applyFilters('eduCheck');
    
    const { minSalary, maxSalary } = getSalary();

    const userQuery = elements.searchInput.value;
    const location = elements.locationInput.value;

    let preQuery = `${elements.apiUrl}/jobs?q=${userQuery}&location-city=${location}`;

    if(minSalary || maxSalary) {
        preQuery = `${preQuery}&salary[gt]=${minSalary}&salary[lt]=${maxSalary}`
    }

    if(experince) {
        preQuery = `${preQuery}&experience=${experince}`;
    }

    if(jobType) {
        preQuery = `${preQuery}&jobType=${jobType}`;
    }

    if(minEducation) {
        preQuery = `${preQuery}&minEducation=${minEducation}`;
    }

    controlSearch(preQuery);

}

// Gives current checked value from group
function applyFilters(group) {

    let checkedvalue;
    let inputElements = document.getElementsByName(group);

    for(let i = 0; inputElements[i]; ++i) {
        if(inputElements[i].checked) {
            checkedvalue = inputElements[i].value;
            break;
        }
    }

    return checkedvalue;
}