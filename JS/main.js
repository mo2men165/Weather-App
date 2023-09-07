let todayName = document.getElementById("today_date_day_name")
let todayNumber = document.getElementById("today_date_day_number")
let todayMonth = document.getElementById("today_date_month")
let todayLocation = document.getElementById("today_location")
let todayTemp = document.getElementById("today_temp")
let todayConditionImg = document.getElementById("today_condition_img")
let todayConditionText = document.getElementById("today_condition_text")
let humidity = document.getElementById("humidity")
let wind = document.getElementById("wind")
let windDirection = document.getElementById("wind_direction")
let nextDay = document.getElementsByClassName("next_day_name")
let nextMaxTemp = document.getElementsByClassName("next_max_temp")
let nextMinTemp = document.getElementsByClassName("next_min_temp")
let nextConditionImg = document.getElementsByClassName("next_condition_img")
let nextConditionText = document.getElementsByClassName("next_condition_text")
let searchInput = document.getElementById("search")

async function fetchWeatherData(cityName) {
    let weatherResponse = await fetch (`https://api.weatherapi.com/v1/forecast.json?key=71dbd040c45b418aa92175158231802&q=${cityName}&days=3`);
    let weatherResponseJSON = await weatherResponse.json();
    return weatherResponseJSON;
}

async function showTodayData(weather) {
    todayLocation.innerHTML = weather.location.name;
    todayTemp.innerHTML = weather.current.temp_c;
    todayConditionImg.setAttribute('src', weather.current.condition.icon);
    todayConditionText.innerHTML = weather.current.condition.text;
    humidity.innerHTML = weather.current.humidity+"%";
    wind.innerHTML = weather.current.wind_kph+"km/h";
    windDirection.innerHTML = weather.current.wind_dir;
    let todayDate = new Date()
    todayName.innerHTML = todayDate.toLocaleDateString("en-US",{weekday:"long"})
    todayNumber.innerHTML = todayDate.getDate()
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-US",{month:"long"})
}
function displayNextData(weather)
{
    let forecastData = weather.forecast.forecastday
    for(let i = 0 ; i < 2 ; i++)
    {
        let nextDate = new Date(forecastData[i+1].date)
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US",{weekday:"long"})
        nextMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c
        nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c
        nextConditionImg[i].setAttribute("src",forecastData[i+1].day.condition.icon)
        nextConditionText[i].innerHTML = forecastData[i+1].day.condition.text
    }
}
async function start(city="london") {
    let weather = await fetchWeatherData(city);

    if (!weather.error) {
        showTodayData(weather);
        displayNextData(weather);
    }
}

start();


searchInput.addEventListener("input",function(){
    start(searchInput.value);
})