
import oneCountry from './template/oneCountry.hbs';
import manyCountries from './template/manyCountries.hbs';
import './css/styles.css';
import Notiflix from 'notiflix';
import {fetchCountries} from "./fetchCountries.js"
const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const debounce = require('lodash.debounce');
const countryList = document.querySelector('.country-list');
const coutnryInfo = document.querySelector('.country-info');
const lengthAudit = countries => {
    if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        clearList();
    }
    else if (countries.length > 2 && countries.length < 10) {
        countryList.insertAdjacentHTML('beforeend', countries.map(manyCountries).join(''));
        coutnryInfo.innerHTML='';
       
    }
    else if (countries.length === 1) {
        coutnryInfo.insertAdjacentHTML('beforeend', countries.map(oneCountry) );
        countryList.innerHTML='';
        
    }
    else if (!countries.length) {
        error();
    }
}

const onInputIn = event => {
    fetchCountries(event.target.value.trim()).then(lengthAudit);
}
input.addEventListener('input', debounce(onInputIn, DEBOUNCE_DELAY));

function error() {
    Notiflix.Notify.failure('Oops, there is no country with that name');
    clearList();
    
}
function clearList() {
    countryList.innerHTML ='';
    coutnryInfo.innerHTML='';
}