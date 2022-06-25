document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    getWeather();
});

let key = 'e7d25d8c1d14be6b058717f22a1b77ea';
let city = 'Nairobi';
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

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
    })
}

