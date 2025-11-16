let apikey="dfa71a446c5d6ac5e2bec2f57b54efee";


const searchButton = document.getElementById('srch-btn');
const inputBox = document.getElementById('city_name');
const weatherIcon= document.getElementById('weather-icon');
const weatherInfo= document.getElementById('weather-info');
const weatherDescription= document.getElementById('weather-description');
const errorMessage = document.getElementById('error-message');
const CityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');


searchButton.addEventListener('click',(e)=>{
    e.preventDefault();
const city= inputBox.value.trim();
if(city!==""){
    fetchWeatherData(city);
}
else{
    showError("Please enter a city name.");
}
});

inputBox.addEventListener('keypress', (e)=>{
    if(e.key==='Enter'){
        e.preventDefault();
        searchButton.click();
    }
});

async function fetchWeatherData(city){
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    try{
     const response=await fetch(url);
        if(!response.ok){
            throw new Error('CITY NOT FOUND');
        }

        const data=await response.json();

    displayWeather(data);
}
catch(error) {
        console.error('Error fetching weather data:' , error);
        showError("City not found. Please try again.");
};
}

function displayWeather(data){

    errorMessage.classList.add('hidden');
     
    CityName.textContent=data.name;
    temperature.textContent=`${Math.round(data.main.temp-273.15)}°C`;
    humidity.textContent=`${data.main.humidity}%`;
    windSpeed.textContent=`${data.wind.speed} Km/h`

    setWeatherIcon(data.weather[0].icon,data.weather[0].description);

    weatherDescription.textContent=data.weather[0].description

    weatherInfo.classList.remove('hidden');
}

function setWeatherIcon(iconCode,description){
    const condition=description.toLowerCase();
    let iconClass="wi-na";
    if(condition.includes("clear")){
        iconClass="wi-day-sunny";
    }
    else if(condition.includes("cloud")){
     iconClass="wi-day-cloudy";
    }
    else if(condition.includes("rain")){
        iconClass="wi-day-rainy";
    }
    else if(condition.includes("fog") ) 
    {
            iconClass="wi-fog";
    }else if(condition.includes("thunderstorm"))
    {
        iconClass="wi-thunderstorm"
       
    }
    else if (condition.includes("haze")) {
    iconClass = "wi-day-haze";
}   else if (condition.includes("mist")) {
    iconClass = "wi-mist";
}
    else if (condition.includes("smoke")) {
    iconClass = "wi-smoke";

    }
else{
               iconClass = "😶";
    }
    weatherIcon.className="";
    weatherIcon.classList.add("wi",iconClass);
    weatherIcon.setAttribute("title",description);
}

function showError(message){

    weatherInfo.classList.add('hidden');
    errorMessage.textContent=message;
    errorMessage.classList.remove('hidden');
}
fetchWeatherData("Swabi");