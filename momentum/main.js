
const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const focus = document.querySelector('.focus');
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December' ]
const backgroundImageFull = [
    'assets/images/night/01.jpg',
    'assets/images/night/02.jpg',
    'assets/images/night/03.jpg',
    'assets/images/night/04.jpg',
    'assets/images/night/05.jpg',
    'assets/images/night/06.jpg',
    'assets/images/morning/01.jpg',
    'assets/images/morning/02.jpg',
    'assets/images/morning/03.jpg',
    'assets/images/morning/04.jpg',
    'assets/images/morning/05.jpg',
    'assets/images/morning/06.jpg',
    'assets/images/day/01.jpg',
    'assets/images/day/02.jpg',
    'assets/images/day/03.jpg',
    'assets/images/day/04.jpg',
    'assets/images/day/05.jpg',
    'assets/images/day/06.jpg',
    'assets/images/evening/10.jpg', 
    'assets/images/evening/11.jpg', 
    'assets/images/evening/12.jpg', 
    'assets/images/evening/13.jpg', 
    'assets/images/evening/14.jpg', 
    'assets/images/evening/15.jpg',
]
const but = document.querySelector('.button__background');

let today = new Date();
let hour = today.getHours();
let jack = hour;
let imageIndex = 1;
function buttonBackground (){
        document.body.style.backgroundImage = 
        `url('${backgroundImageFull[jack + imageIndex]}')`;
        document.body.style.transition = 'background 1s linear';
        imageIndex++
        if (jack + imageIndex === 24){
            jack = 0;
            imageIndex = 0;
        }
}

const showAmPm = true;

function showTime() {
  today = new Date();
  hour = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();
  let day = today.getDay();
  let number = today.getDate();
  let month = today.getMonth();
  
  date.innerHTML = `${days[day]}<span> : </span>${number}<span> - </span>${months[month]}`;
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

  setTimeout(showTime, 1000);
}

function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
  }

function setBgGreet() {
  today = new Date();
  hour = today.getHours();
    if (hour >= 6 && hour < 12) {
      // Morning
      document.body.style.backgroundImage =
      `url('${backgroundImageFull[hour]}')`;
      greeting.textContent = 'Good Morning, ';
      document.body.style.color = 'black';
    } else if (hour < 18 && hour >=12) {
      // Afternoon
      document.body.style.backgroundImage =
      `url('${backgroundImageFull[hour]}')`;
      greeting.textContent = 'Good Afternoon, ';
      document.body.style.color = 'black';
    } else if (hour < 24 && hour >= 18) {
        // Evening
      document.body.style.backgroundImage = 
      `url('${backgroundImageFull[hour]}')`;
      greeting.textContent = 'Good Evening, ';
      document.body.style.color = 'white';
      } else {
      // Night
      document.body.style.backgroundImage =
      `url('${backgroundImageFull[hour]}')`;
      greeting.textContent = 'Good Night, ';
      document.body.style.color = 'white';
    }
    }

function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
    name.addEventListener('click', () =>{
      name.textContent = '';
  });
  } else {
    name.textContent = localStorage.getItem('name');
  }

}
function contentName(e) {
  if (e.type ==='click'){
    name.textContent = '';
  }
}

function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which === 13 || e.keyCode === 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}
function contentFocus(e) {
  if (e.type ==='click'){
    focus.textContent = '';
  }
}

function setFocus(e) {
  if (e.type === 'keypress') {
    
    if (e.which === 13 || e.keyCode === 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

    name.addEventListener('keypress', setName);
    name.addEventListener('blur', setName);
    name.addEventListener('click', contentName);
    focus.addEventListener('keypress', setFocus);
    focus.addEventListener('blur', setFocus);
    focus.addEventListener('click', contentFocus);
  

const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn = document.querySelector('.btn');

async function getQuote() {  
  const url = `https://quote-garden.herokuapp.com/api/v2/quotes/random`;
  const res = await fetch(url);
  const data = await res.json(); 
  blockquote.textContent = data.quote.quoteText;
  figcaption.textContent = data.quote.quoteAuthor;
}
document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const airHumidity = document.querySelector('.air__humidity');
const windSpeed = document.querySelector('.wind__speed');



async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=0a2cb56e8186230e9a0482059bb71b4d&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  airHumidity.textContent = `Fir humidity : ${data.main.humidity}`;
  windSpeed.textContent = `Wind speed : ${data.wind.speed} m/s`;
}

function getCity() {
  if(localStorage.getItem('city') === null){
    city.textContent = 'Gomel';
    getWeather();
  } else {
    city.textContent = localStorage.getItem('city');
  }
}
function setCity(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('city', e.target.innerText);
      getWeather();
      city.blur();
    }
  } else {
    localStorage.setItem('city', e.target.innerText);
  }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);

// Run

showTime();
setBgGreet();
getName();
getFocus();
getCity();

