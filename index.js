document.addEventListener('DOMContentLoaded', (event) => {
    getWeather();
    loadFavourites();
    addToFavorites();
  
});

let key = 'e7d25d8c1d14be6b058717f22a1b77ea';
let city = 'Cape Town';
let units = 'Metric';
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`;
let favList = document.getElementById('favoritesList');
console.log(favList);

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
    document.getElementById('weatherMain').textContent = `Weather: ${details.weather[0].main}`;
    document.getElementById('weatherDescription').textContent = `Description: ${details.weather[0].description}`;
    document.getElementById('humidity').textContent = `Humidity: ${details.main.humidity}`;
    document.getElementById('temperature').textContent = `Temperature: ${details.main.temp}`;
    document.getElementById('pressure').textContent = `Pressure: ${details.main.pressure}`;
    document.getElementById('temp_max').textContent = `Max temperature: ${details.main.temp_max}`;
    document.getElementById('temp_min').textContent = `Min temperature: ${details.main.temp_min}`;
    

    console.log(details.name)

}

function addToFavorites(){
   

    document.getElementById('favoriteBtn').addEventListener('click' ,() => {
        //add city name to favorites list
        let favouriteName = document.getElementById('cityName');
        let newFav = document.createElement('li');
        newFav.appendChild(document.createTextNode(favouriteName.textContent));
        favList.appendChild(newFav);

        let newCityFav = newFav.textContent;

        fetch('http://localhost:3000/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cityName: `${newCityFav}`,
            } ),
        });

       });
}
function loadFavourites(){
    fetch('http://localhost:3000/favorites')
    .then(resp => resp.json())
    .then(data => {

      
       for(let i = 0; i < data.length; i++)
       {
        let fav = document.createElement('li')
        fav.appendChild(document.createTextNode(data[i].cityName));
        favList.appendChild(fav);
        
       }

    })
}
