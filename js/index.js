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
const afterTomName = document.getElementById("afterTomName");
const tom_max_temp = document.getElementById("tom_max_temp");
const tom_min_temp = document.getElementById("tom_min_temp");
const after_tom_max_temp = document.getElementById("after_tom_max_temp");
const after_tom_min_temp = document.getElementById("after_tom_min_temp");
const todaySpan = document.getElementById("todaySpan");
const tomSpan = document.getElementById("tomSpan");
const afterSpan = document.getElementById("afterSpan");
const searchInput = document.getElementById("searchInput");
// let DATE = new Date();
// console.log(DATE.toLocaleDateString("en-UK", { weekday: "long" }));
// console.log(DATE.getDate());

async function getWeatherData(cityName) {
  try {
    let res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=afbef66c5eb74ca5885120414242206&q=${cityName}&days=3`,
      { method: "GET" }
    );
    let weatherData = await res.json();
    return weatherData;
  } catch {
    console.log("no");
  }
}
function displayTodayData(data) {
  let todayDate = new Date();
  countryName.innerHTML = data.location.name;
  rain.innerHTML = data.current.humidity + "%";
  temp.innerHTML = data.current.temp_c + `°C`;
  wind.innerHTML = data.current.wind_kph + "km/h";
  todayImg.setAttribute("src", "https:" + data.current.condition.icon);
  todaySpan.innerHTML = data.current.condition.text;
  dayName.innerHTML = todayDate.toLocaleDateString("en-UK", {
    weekday: "long",
  });
  date.innerHTML =
    todayDate.getDate() +
    todayDate.toLocaleDateString("en-UK", { month: "long" });
}
function displayTomData(data) {
  let forecastData = data.forecast.forecastday;
  let tomDate = new Date(forecastData[1].date);
  let afterDate = new Date(forecastData[2].date);
  // console.log(tomDate);
  // console.log(afterDate);

  tomDayName.innerHTML = forecastData[1].date;
  tom_max_temp.innerHTML = forecastData[1].day.maxtemp_c + `°C`;
  tom_min_temp.innerHTML = forecastData[1].day.mintemp_c + `°C`;
  tomImg.setAttribute("src", "https:" + forecastData[1].day.condition.icon);
  tomSpan.innerHTML = forecastData[1].day.condition.text;
  tomDayName.innerHTML = tomDate.toLocaleDateString("en-UK", {
    weekday: "long",
  });
  afterTomName.innerHTML = forecastData[2].date;
  after_tom_max_temp.innerHTML = forecastData[2].day.maxtemp_c + `°C`;
  after_tom_min_temp.innerHTML = forecastData[2].day.mintemp_c + `°C`;
  afterImg.setAttribute("src", "https:" + forecastData[2].day.condition.icon);
  afterSpan.innerHTML = forecastData[2].day.condition.text;
  //   console.log(forecastData[2].day.condition.text);
  afterTomName.innerHTML = afterDate.toLocaleDateString("en-UK", {
    weekday: "long",
  });
}
async function srartApp(city = "cairo") {
  let weatherData = await getWeatherData(city);
  if (!weatherData.error) {
    displayTodayData(weatherData);
    displayTomData(weatherData);
  }
}
srartApp();
searchInput.addEventListener("input", function () {
  srartApp(searchInput.value);
  // console.log(searchInput.value);
});
