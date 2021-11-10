let state = {
  selectStateInput: "",
  breweries: [],
  cities: [],
  filters: {
    type: "",
    city: [],
    search: ""
  }
};

const mainEl = document.querySelector("main");
const breweriesList = document.querySelector(".breweries-list");
const aside = document.querySelector("aside");
const userInput = document.querySelector("#select-state");


function sendUserInputToFetch () {
  let theirInput = "";
  document.body.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      theirInput = e.target.value;
      fetchStateBreweries(theirInput);
    }
  }
)};

function filterBreweryTypes(stateData) {
  return stateData.filter(brewery => brewery.brewery_type === "micro" || brewery.brewery_type === "regional" || brewery.brewery_type === "brewpub");
}

function filterMicroBreweries(stateData) {
  return stateData.filter(brewery => brewery.brewery_type === "micro");
  console.log(stateData.filter(brewery => brewery.brewery_type === "micro"));
}

function filterBrewPubBreweries(stateData) {
  return stateData.filter(brewery => brewery.brewery_type === "brewpub");
}

function filterRegionalBreweries(stateData) {
  return stateData.filter(brewery => brewery.brewery_type === "regional");
}

function filterByCity (city, stateData) {
  let breweriesInCity = [];
  for (let i = 0; i < stateData.length; i++) {
    if (stateData[i].city === city.toLowerCase()) {
      breweriesInCity.push(stateData[i]);
    }
  }
  return breweriesInCity;
}

function renderMicroBreweries(stateData) {
  let newData = [];
  const filterByType = document.querySelector("#filter-by-type");
  filterByType.addEventListener("change", function(e) {
    let type = e.target.value;
    // console.log(e);
    // console.log(e.target.value);
    if (type === "micro") {
      newData = filterMicroBreweries(stateData);
      console.log(newData);
      render(newData);
    } if (type === "brewpub") {
      newData = filterBrewPubBreweries(stateData); 
      console.log(newData);
      render(newData);
    } if (type === "regional") {
      newData = filterRegionalBreweries(stateData);
      console.log(newData);
      render(newData);
    } else {
      newData = stateData;
    }
    return newData;
    console.log("here", newData);
  });
  return newData;
  console.log("here", newData);
}

function fetchStateBreweries (state) {
  // console.log("here", state);
  return fetch(`https://api.openbrewerydb.org/breweries?by_state=${state}`)
  .then(response => response.json())
  .then(data => {
    const filteredBreweries = filterBreweryTypes(data);
    render(filteredBreweries);
    // setState(filteredBreweries);
    console.log(filteredBreweries);
  });
}

function setState(newState) {
  console.log('parameter empty', newState)
  state = { ...state, ...newState };
  console.log('New state set', newState)
  renderBreweriesList();
}


// let state = {
//   selectStateInput: "",
//   breweries: [],
//   cities: [],
//   filters: {
//     type: "",
//     city: [],
//     search: ""
//   }
// };



function renderBreweriesList() {
  console.log("Inside renderBreweriesList: ", state.breweries);

  for (let i = 0; i < state.breweries.length; i++) {
    
  }
}

function citySorter (data) {
  const cities = [];
  for (brewery of data) {
    if (!cities.includes(brewery.city)) {
      cities.push(brewery.city);
    }
  }
  return cities;
}

function phoneNumberChecker (phoneNumber) {
  let number = phoneNumber;
  if (phoneNumber === "NaN" || phoneNumber === null || phoneNumber === "") {
    number = "N/A";
  } else {
    number = phoneNumber;
  }
  return number;
}

function renderFilterSection(stateData) {
  // aside.innerHTML = "";

  const asideEl = document.createElement("aside");
  asideEl.classList.add("filters-section");
  const h2El = document.createElement("h2");
  h2El.innerText = "Filter By:"
  const formEl1 = document.createElement("form");
  formEl1.setAttribute("id", "filter-by-type-form");
  formEl1.setAttribute("autocomplete", "off");
  const labelEl1 = document.createElement("label");
  labelEl1.setAttribute("for", "filter-by-type");
  const h3El1 = document.createElement("h3");
  h3El1.innerText = "Type of Brewery";
  const selectEl = document.createElement("select");
  selectEl.setAttribute("name", "filter-by-type");
  selectEl.setAttribute("id", "filter-by-type");
  const optEl1 = document.createElement("option");
  optEl1.setAttribute("value", "");
  optEl1.innerText = "Select a type...";
  const optEl2 = document.createElement("option");
  optEl2.setAttribute("value", "micro");
  optEl2.innerText = "Micro";
  const optEl3 = document.createElement("option");
  optEl3.setAttribute("value", "regional");
  optEl3.innerText = "Regional";
  const optEl4 = document.createElement("option");
  optEl4.setAttribute("value", "brewpub");
  optEl4.innerText = "Brewpub";
  const divEl = document.createElement("div");
  divEl.classList.add("filter-by-city-heading");
  const h3El2 = document.createElement("h3");
  h3El2.innerText = "Cities"
  const buttonEl = document.createElement("button");
  buttonEl.classList.add("clear-all-btn");
  buttonEl.innerText = "clear all";

  const formEl2 = document.createElement("form");
  formEl2.setAttribute("id", "filter-by-city-form");

  mainEl.append(asideEl);
  asideEl.append(h2El, formEl1, divEl, formEl2);
  formEl1.append(labelEl1, selectEl);
  labelEl1.append(h3El1);
  selectEl.append(optEl1, optEl2, optEl3, optEl4);
  divEl.append(h3El2, buttonEl);

  const cityList = citySorter(stateData);
  console.log("cities", cityList);

  for (let i = 0; i < cityList.length; i++) {
    const inputEl1 = document.createElement("input");
    inputEl1.setAttribute("type", "checkbox");
    inputEl1.setAttribute("name", cityList[i].city);
    inputEl1.setAttribute("value", cityList[i].city);
    const labelEl2 = document.createElement("label");
    labelEl2.setAttribute("for", cityList[i].city);

    labelEl2.innerText = cityList[i];

    formEl2.append(inputEl1, labelEl2);
  }


};

function renderMainSection(stateData) {
  // breweriesList.innerHTML = "";

  const h1El = document.createElement("h1");
  h1El.innerText = "List of Breweries";
  const headerEl = document.createElement("header");
  headerEl.classList.add("search-bar");
  const formEl = document.createElement("form");
  formEl.setAttribute("id", "search-breweries-form");
  formEl.setAttribute("autocomplete", "off");
  const labelEl = document.createElement("label");
  labelEl.setAttribute("id", "search-breweries");
  const h2El1 = document.createElement("h2");
  h2El1.innerText = "Search breweries:";
  const inputEl = document.createElement("input");
  inputEl.setAttribute("id", "search-breweries");
  inputEl.setAttribute("name", "search-breweries");
  inputEl.setAttribute("type", "text");
  const articleEl = document.createElement("article");
  const ulEl = document.createElement("ul");
  ulEl.classList.add("breweries-list");

  mainEl.append(h1El);
  mainEl.append(headerEl);
  headerEl.append(formEl);
  formEl.append(labelEl);
  labelEl.append(h2El1);
  formEl.append(inputEl);
  mainEl.append(articleEl);
  articleEl.append(ulEl);




  for (let i = 0; i < stateData.length; i++) {

    const liEl = document.createElement("li");
    const h2El2 = document.createElement("h2");
    h2El2.innerText = stateData[i].name;
    const divEl = document.createElement("div");
    divEl.setAttribute("class", "type");
    divEl.innerText = stateData[i].brewery_type;
    const sectionEl1 = document.createElement("section");
    sectionEl1.classList.add("address");
    const h3El1 = document.createElement("h3");
    h3El1.innerText = "Address:";
    const pEl1 = document.createElement("p");
    pEl1.innerText = stateData[i].street;
    const pEl2 = document.createElement("p");
    const strongEl = document.createElement("strong");
    strongEl.innerText = stateData[i].city + ", " + stateData[i].postal_code;
    const sectionEl2 = document.createElement("section");
    sectionEl2.classList.add("phone");
    const h3El2 = document.createElement("h3");
    h3El2.innerText = "Phone:";
    const pEl3 = document.createElement("p");
    pEl3.innerText = phoneNumberChecker(stateData[i].phone);
    const sectionEl3 = document.createElement("section");
    sectionEl3.classList.add("link");
    const aEl = document.createElement("a");
    aEl.setAttribute("href", stateData[i].website_url);
    aEl.setAttribute("target", "_blank");
    aEl.innerText = "Visit Website";

    ulEl.append(liEl);
    liEl.append(h2El2);
    liEl.append(divEl);
    liEl.append(sectionEl1);
    sectionEl1.append(h3El1);
    sectionEl1.append(pEl1);
    sectionEl1.append(pEl2);
    pEl2.append(strongEl);
    liEl.append(sectionEl2);
    sectionEl2.append(h3El2);
    sectionEl2.append(pEl3);
    liEl.append(sectionEl3);
    sectionEl3.append(aEl);

  }
  console.log(stateData);

}

function render(data) {
  mainEl.innerHTML = "";
  renderFilterSection(data);
  renderMainSection(data);
  renderMicroBreweries(data);
}

renderBreweriesList();

sendUserInputToFetch();
