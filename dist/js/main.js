'use strict';
const countriesContainer = document.querySelector(".country");
const dropdown = document.querySelector(".dropdown");
const dropDownElement = document.querySelector(".dropdown--container");
const region = document.querySelectorAll(".region");
const regionName = document.getElementsByClassName("regionName");
const search = document.querySelector(".search-filter");
const countryName = document.getElementsByClassName("countryName");
const countryContainer = document.querySelector(".country--container--detail");
const body = document.querySelector(".body");

const getCountryData = function () {
    fetch('https://restcountries.com/v3.1/all')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            data.forEach(element => {
                renderCountry(element);
            });
        });
};

getCountryData();

const renderCountry = function (data) {
    const country = document.createElement("div");
    country.classList.add('country--item');
    country.innerHTML = `
            <div class="country--item__flag">
                <img src="${data.flags.svg}" alt="${data.name.official}" />
            </div>
            <div class="country--item__container">
                <div class="country--item__container__title">
                    <h5 class="countryName">${data.name.common}</h5>
                </div>
                <div class="country--item__container__description">
                    <span>Population: ${data.population}</span>
                    <span class="regionName">Region: ${data.region}</span>
                    <span>Capital: ${data.capital}</span>
                </div>
        </div>`;
    countriesContainer.appendChild(country);
    country.addEventListener("click", () => {
        countryModal(data);
    });
};

dropdown.addEventListener("click", function () {
    dropDownElement.classList.toggle("toggle");
})

region.forEach(element => {
    element.addEventListener("click", function () {
        Array.from(regionName).forEach(el => {
            if (el.innerText.includes(element.innerText) || element.innerText == "All") {
                el.parentElement.parentElement.parentElement.style.display = "flex"
                dropDownElement.classList.add("toggle");
            } else {
                el.parentElement.parentElement.parentElement.style.display = "none"
            }
        });
    });
});

search.addEventListener("input", () => {
    Array.from(countryName).forEach(el => {
        if (el.innerText.toLowerCase().includes(search.value.toLowerCase())) {
            el.parentElement.parentElement.parentElement.style.display = "flex";
        }
        else {
            el.parentElement.parentElement.parentElement.style.display = "none";
        }
    });
});


const countryModal = function (data) {
    countryContainer.classList.remove("show");
    body.classList.add("hidden");
    countryContainer.innerHTML = `
    <div class="country--header">
        <button class="go-back">
        <i class="fas fa-arrow-left"></i>
            Back
        </button>
    </div>
    <div class="country--container">
        <div class="item">
            <img src="${data.flags.svg}" alt="${data.name.official}" />
        </div>
        <div class="item">
            <h2>${data.name.common}</h2>
            <div class="item--row">
                <div class="item-detail">
                    <span>Native Name: ${data.name.official}</span>
                    <span>Population:  ${data.population}</span>
                    <span>Region: ${data.region}</span>
                    <span>Sub Region: ${data.subregion}</span>
                    <span>Capital: ${data.capital}</span>
                </div>
                <div class="item-detail">
                    <span>Top Level Domain: ${data.continents}</span>
                    <span>Currencies: ${data.status}</span>
                    <span>Languages: ${data.name.common}</span>
                </div>
            </div>
            <div class="country--footer">
                <h5>Border-Countries:</h5>
                <span>Franch</span>
                <span>Germany</span>
                <span>Netherlans</span>
            </div>
        </div>
    </div>`;
    const goBack = countryContainer.querySelector(".go-back");
    goBack.addEventListener("click", () => {
        countryContainer.classList.add("show");
        body.classList.remove("hidden");
    });
}

