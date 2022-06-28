document.addEventListener('DOMContentLoaded', (event) => {

    //DEFAULT FETCH OF NAIROBI WEATHER
    let key = 'e7d25d8c1d14be6b058717f22a1b77ea';
    let units = 'Metric';
    let city = 'Nairobi'

     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`)
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

//CALLING FUNCTIONS
    getCityInput();
    loadFavourites();
    addToFavorites();
    updateSearchWithList();
    
  
});


let favList = document.getElementById('favoritesList');
console.log(favList);
let favoriteBtn = document.getElementById('favoriteBtn');

//GETTING THE INPUT FROM SEARCHBAR
function getCityInput(){
  
   let inputForm =  document.querySelector('#searchForm');
   let searchInput = document.querySelector('#searchInput')
   inputForm.addEventListener('submit', (e) =>{
        e.preventDefault();

        cityInput = searchInput.value;
        console.log(cityInput)
        getWeather(`${cityInput}`);

        cityInput='';


    })
    
     
}
//GET WEATHER FROM OPENWEATHERAPP API
function getWeather(city){
  
    let key = 'e7d25d8c1d14be6b058717f22a1b77ea';
    let units = 'Metric';

     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`)
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

//DISPLAYING WEATHER DETAILS IN THE WEATHER CARD
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

//ADDING CITY TO FAVORITES LIST
function addToFavorites(){
 
   favoriteBtn.addEventListener('click' ,() => {

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


//LOADING FAVORITES CITIES IN THE LIST
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

//USING THE CITIES IN THE FAVORITES LIST TO GET WEATHER
function updateSearchWithList(){
    
    document.getElementById("favoritesList").addEventListener("click",function(e) {
        if(e.target && e.target.nodeName == "LI") {
            getWeather(e.target.innerText);
        }
    });
  

}

