//Time
let now = new Date();

let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = weekdays[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let time = document.querySelector(".date");
time.innerHTML = `${day} ${hours}:${minutes}`;

//____________Common Variables__________

let apiKey = "8f3eca2ec14098a615b00621ad86d76d";
let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
let units = "metric";
let cityInput = document.querySelector("#enter-city");
let cityDisplay = document.querySelector("#city");
let temperatureDisplay = document.querySelector("#temp-value");
let descriptionDisplay = document.querySelector(".description");
let windDisplay = document.querySelector(".wind");
let humidityDisplay = document.querySelector(".humidity");
let tempRangeDisplay = document.querySelector(".temp-range");

//when location is input
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  temperatureDisplay.innerHTML = temperature;
  let description = response.data.weather[0].description;
  descriptionDisplay.innerHTML = description;
  let wind = Math.round(response.data.wind.speed);
  windDisplay.innerHTML = `Wind: ${wind}km/h`;
  let humidity = Math.round(response.data.main.humidity);
  humidityDisplay.innerHTML = `Humidity: ${humidity}%`;
  let tempMin = Math.round(response.data.main.temp_min);
  let tempMax = Math.round(response.data.main.temp_max);
  tempRangeDisplay.innerHTML = `${tempMin}℃/${tempMax}℃`;
  console.log(response);
  let cityApi = response.data.name;
  cityDisplay.innerHTML = cityApi;
}

function displayCity(event) {
  event.preventDefault();
  cityDisplay.innerHTML = cityInput.value;
  let city = cityInput.value;
  let apiUrl = `${apiEndpoint}q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
  console.log(apiUrl);
}

let submitAction = document.querySelector("#search-form");
submitAction.addEventListener("submit", displayCity);

// When location is current location

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrlCurrent = `${apiEndpoint}lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrlCurrent).then(showTemperature);
  console.log(position);
}

function getCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentCity);

//temperature
//let temperatureDisplay = document.querySelector("#temp-value");
//function showF(event) {
// event.preventDefault();
//temperatureDisplay.innerHTML = 73;
//}
//function showC(event) {
// event.preventDefault();
//temperatureDisplay.innerHTML = temperature;
//}

//let convertF = document.querySelector("#tempF");
//convertF.addEventListener("click", showF);

//let convertC = document.querySelector("#tempC");
//convertC.addEventListener("click", showC);
