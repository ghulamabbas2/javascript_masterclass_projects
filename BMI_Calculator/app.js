const calculateBtn = document.querySelector('#calculate_bmi');
const bmiResults = document.querySelector('#bmi_result');
const form = document.querySelector('form');

calculateBtn.addEventListener('click', (event) => {
    const weight = document.querySelector('#weightField').value;
    const height  = document.querySelector('#heightField').value;

    // Check if user enter the values or not
    if(weight === '' || height === '') {
        return alert('Please enter height and weight both.');
    }

    const result = weight / (height * height);

    let bmiMsg;
    let msgColor = 'text-danger';

    if(result < 18.5) {
        bmiMsg = 'Thinness';
    } 
    else if(result >= 18.5 && result <= 25) {
        bmiMsg = 'Normal';
        msgColor = 'text-success';
    }
    else if(result > 25 && result <= 30) {
        bmiMsg = 'Overweight';
    }
    else if(result > 30) {
        bmiMsg = 'Obese';
    }

    bmiResults.innerHTML = `<p id="bmi_result">BMI = <b>${Math.round(result * 100) / 100}</b>(<span class="${msgColor}"><b>${bmiMsg}</b></span>)</p>`;
});

// Prevent page from loading
form.addEventListener('submit', e => {
    e.preventDefault();
});