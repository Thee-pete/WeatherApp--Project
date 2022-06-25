document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    getWeather();
});

let key = 'e7d25d8c1d14be6b058717f22a1b77ea';
let city = 'Nairobi';
let units = 'Metric';
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`;

function getWeather(){
    fetch(url)
    .then(resp => {
        if(!resp.ok){
            console.log(resp.statusText);
        }else{
            return resp.json();
        }
    })
    .then(data => {
        console.log(data)
        displayWeather(data);
    })
    .catch(error => console.log(error));
}
function displayWeather(details){

    document.getElementById('cityName').textContent = details.name;
    document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${details.weather[0].icon}.png`;
    document.getElementById('weatherMain').textContent = details.weather[0].main;
    document.getElementById('weatherDescription').textContent = details.weather[0].description;
    document.getElementById('humidity').textContent = `Humidity: ${details.main.humidity}`;
    document.getElementById('temperature').textContent = `Temperature: ${details.main.temp}`;
    document.getElementById('pressure').textContent = `Pressure: ${details.main.pressure}`;
    document.getElementById('temp_max').textContent = `Max temperature: ${details.main.temp_max}`;
    document.getElementById('temp_min').textContent = `Min temperature: ${details.main.temp_min}`;
    

    console.log(details.name)



}

