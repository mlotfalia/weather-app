function showDate() {
  let date = new Date();
  let day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hour = date.getHours();
  let minute = date.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }
  document.querySelector(".day-time").innerHTML = `${
    day[date.getDay()]
  } ${date.getHours()}:${date.getMinutes()}`;
}

function getForecast(coordinates) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiKey = "6b4cc45caef1080d712ecd6ee0009b14";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function showTemp(response) {
  let city = document.querySelector("#city");
  let temp = document.querySelector("#temp");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector(".description");
  let icon = document.querySelector("#weatherIcon");
  centigradeTemp = response.data.main.temp;
  temp.innerHTML = Math.round(centigradeTemp);
  city.innerHTML = response.data.name;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = response.data.wind.speed;
  description.innerHTML = response.data.weather[0].description;
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
  showDate();
}

function formatDay(times) {
  let date = new Date(times * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = `<div class ="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `  <div class="col-2">
                    <div class="weather-forecast-date">
                          ${formatDay(forecastDay.dt)}
                    </div>
                      <img                
                           src=  "https://openweathermap.org/img/wn/${
                             forecastDay.weather[0].icon
                           }@2x.png "
                        alt=""
                        width = "32"
                      />
                      <div class="weather-forecast-temp">
                      <span class="weather-forecast-temp-max">${Math.round(
                        forecastDay.temp.max
                      )}° </span>
                      <span class="weather-forecast-temp-min">${Math.round(
                        forecastDay.temp.min
                      )}°</span>
                    </div>
                  </div>
              `;
    }
  });
  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

function convertToF(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  let F = Math.round(centigradeTemp * (9 / 5) + 32);
  temp.innerHTML = F;
  centigrade.classList.remove("active");
  fahrenheit.classList.add("active");
}
function convertToC(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  let C = Math.round(centigradeTemp);
  temp.innerHTML = C;
  centigrade.classList.add("active");
  fahrenheit.classList.remove("active");
}
function search(city) {
  let apiKey = "6b4cc45caef1080d712ecd6ee0009b14";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#inputCity");
  search(cityInput.value);
}
let form = document.querySelector("#searchCity");
form.addEventListener("submit", handleSubmit);
search("Tehran");
let centigradeTemp;
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToF);
let centigrade = document.querySelector("#centigrade");
centigrade.addEventListener("click", convertToC);
