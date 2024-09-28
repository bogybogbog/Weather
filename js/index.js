const dayName = document.getElementById("dayName");
const date = document.getElementById("date");
const countryName = document.getElementById("countryName");
const temp = document.getElementById("temp");
const rain = document.getElementById("rain");
const wind = document.getElementById("wind");
const direction = document.getElementById("direction");
const todayImg = document.getElementById("todayImg");
const tomImg = document.getElementById("tomImg");
const afterImg = document.getElementById("afterImg");
const tomDayName = document.getElementById("tomDayName");
const tom_max_temp = document.getElementById("tom_max_temp");
const tom_min_temp = document.getElementById("tom_min_temp");
const afterTomName = document.getElementById("afterTomName");
const after_tom_max_temp = document.getElementById("after_tom_max_temp");
const after_tom_min_temp = document.getElementById("after_tom_min_temp");
const todaySpan = document.getElementById("todaySpan");
const tomSpan = document.getElementById("tomSpan");
const afterSpan = document.getElementById("afterSpan");

async function getWeatherData(country) {
  try {
    let res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=afbef66c5eb74ca5885120414242206&q=cairo&days=3`,
      { method: "GET" }
    );
    let weatherData = await res.json();
    return weatherData;
  } catch {
    console.log("no");
  }
}
function displayTodayData(data) {
  countryName.innerHTML = data.location.name;
  rain.innerHTML = data.current.humidity + "%";
  temp.innerHTML = data.current.temp_c;
  wind.innerHTML = data.current.wind_kph + "km/h";
//   todayImg.setAttribute("src", data.current.condition.icon);
  todaySpan.innerHTML = data.current.condition.text;
}
function displayTomData(data) {
  let forecastData = data.forecast.forecastday;
  tomDayName.innerHTML = forecastData[1].date;
  tom_max_temp.innerHTML = forecastData[1].day.maxtemp_c;
  tom_min_temp.innerHTML = forecastData[1].day.mintemp_c;
//   tomImg.setAttribute("src", forecastData[1].day.condition.icon);
  tomSpan.innerHTML = forecastData[1].day.condition.text;
  after_tom_max_temp.innerHTML = forecastData[2].day.maxtemp_c;
  after_tom_min_temp.innerHTML = forecastData[2].day.mintemp_c;
//   afterImg.setAttribute("src", forecastData[2].day.condition.icon);
  afterSpan.innerHTML = forecastData[2].day.condition.text;
//   console.log(forecastData[2].day.condition.text);
}
async function srartApp() {
  let weatherData = await getWeatherData();
  displayTodayData(weatherData);
  displayTomData(weatherData);
}
srartApp();
