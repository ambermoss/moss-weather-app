function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes.toString().padStart(2, "0");
  let strTime = hours + ":" + minutes + " " + ampm;

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${strTime}`;
}

//Forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-2 DailyForecast">
                <p class="week-day">${formatDay(forecastDay.dt)}</p>
                <img
                  src="img/${forecastDay.weather[0].icon}.png"
                  alt="weather condition"
                  id="icon"
                />
                <p class="hightemperature">
                  ${Math.round(forecastDay.temp.max)}°
                  <div class="lowTemperature">L: ${Math.round(
                    forecastDay.temp.min
                  )}°</div>
                </p>
              </div>`;
    }
  });

  forecastHTML = forecastHTML + "</div>";
  forecastElement.innerHTML = forecastHTML;
}

// Display weather in current city

function getForecast(coordinates) {
  let units = "imperial";
  let apiKey = "30d8dcf8c5a32b629f0453f6b9714950";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  console.log(response.data.main);
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let cityElement = document.querySelector("#place");
  let temperatureElement = document.querySelector("#current-temp");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");
  let minTemperature = document.querySelector("#minTemperature");

  minTemperature.innerHTML = Math.round(response.data.main.temp_min);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].main;
  cityElement.innerHTML = response.data.name;
  iconElement.setAttribute("src", `img/${response.data.weather[0].icon}.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
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

let searchCityForm = document.querySelector("#searchCity-form");
searchCityForm.addEventListener("submit", handleSubmit);

//weather in current LOCATION

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

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let currentDay = document.querySelector("#date");
let currentTime = new Date();
currentDay.innerHTML = formatDate(currentTime);

let temperatureElement = document.querySelector("#current-temp");
let temperature = temperatureElement.innerHTML;

searchCity("St. Louis");
