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
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  document.querySelector(".day-time").innerHTML = `${
    day[date.getDay()]
  } ${date.getHours()}:${date.getMinutes()}`;
}
function showTemp(response) {
  console.log(response.data);
  let city = document.querySelector("#city");
  let temp = document.querySelector("#temp");
  centigradeTemp = response.data.main.temp;
  temp.innerHTML = Math.round(centigradeTemp);
  city.innerHTML = response.data.name;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector(".description").innerHTML =
    response.data.weather[0].description;
  let icon = document.querySelector("#weatherIcon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  showDate();
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
