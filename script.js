const apiKey = "8145e4e378d13a694cfe210a7e4e867c";
const weatherInfoEl = document.getElementById("weather-info");
const errorMsgEl = document.getElementById("error-msg");
const cityNameEl = document.getElementById("city-name");
const descriptionEl = document.getElementById("description");
const tempEl = document.getElementById("temp");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");

// Get Weather Data
async function getWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`City not found!`);
    } else {
      const data = await response.json();
      weatherInfoEl.classList.remove("hidden");
      errorMsgEl.classList.add("hidden");
      cityNameEl.textContent = data.name;
      descriptionEl.textContent = data.weather[0].description;
      tempEl.textContent = data.main.temp;
      humidityEl.textContent = data.main.humidity;
      windEl.textContent = data.wind.speed;
      cityInput.value = "";
      return data;
    }
  } catch (err) {
    weatherInfoEl.classList.add("hidden");
    errorMsgEl.classList.remove("hidden");
  }
}

searchBtn.addEventListener("click", () => {
  if (cityInput.value == "") {
    weatherInfoEl.classList.add("hidden");
    errorMsgEl.classList.remove("hidden");
    errorMsgEl.textContent = "Please Enter City.";
  } else {
    weatherInfoEl.classList.remove("hidden");
    errorMsgEl.classList.add("hidden");
    const inputVal = cityInput.value;
    getWeatherData(inputVal);
  }
});
