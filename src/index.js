function displayWeatherCondition(response) {
  document.querySelector("#place").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let units = "imperial";
  let apiKey = "30d8dcf8c5a32b629f0453f6b9714950";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function retrievePosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let units = "imperial";
  let apiKey = "30d8dcf8c5a32b629f0453f6b9714950";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let currentDay = document.querySelector("#date");
let currentTime = new Date();
currentDay.innerHTML = formatDate(currentTime);

let searchCityForm = document.querySelector("#searchCity-form");
searchCityForm.addEventListener("submit", handleSubmit);

let temperatureElement = document.querySelector("#current-temp");
let temperature = temperatureElement.innerHTML;

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
