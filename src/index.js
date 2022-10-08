
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
function lengthAudit(countries){
    clearList()
    if (countries.length > 10) {
        ifManyCountries()
    }
    else if (countries.length >= 2 && countries.length <= 10) {
        countriesList(countries.map(manyCountries))
    }
    else if (countries.length === 1) {
        shortList(countries.map(oneCountry));
    }
}
function onInputIn (event){
    fetchCountries(event.target.value.trim()).then(response => {
    if (!response.ok&&event.target.value.trim()!=='') {
      throw new Error(response.status);
    }
    return response.json();
  }).then(lengthAudit).catch(error);
}
function error(err) {
        console.log(err);
        Notiflix.Notify.failure('Oops, there is no country with that name');
        clearList();
}

function ifManyCountries() {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    clearList();
}
    
function clearList() {
    countryList.innerHTML ='';
    coutnryInfo.innerHTML='';
}

function shortList(country) {
    coutnryInfo.insertAdjacentHTML('beforeend', country);
}

function countriesList(list) {
    countryList.insertAdjacentHTML('beforeend', list.join(''));
}
input.addEventListener('input', debounce(onInputIn, DEBOUNCE_DELAY));