// Weather App
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "423057ad2ca613185e570fec6d75c109";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city  = cityInput.value;

    if(city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch (error) {
            console.error(error);
            displayError("Failed to get a city");
        }
    }
    else {
        displayError("Please Enter a city")
    }
});
async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("Could not fetch weather data")
    }
    return await response.json();
}
function displayWeatherInfo(data) {


    const {name: city,
           main: {temp, humidity},
           weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";
    const cityDisplay = document.createElement("h2");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");


    cityDisplay.textContent = city;
    tempDisplay.textContent = `${temp}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}
function getWeatherEmoji(weatherId) {
    switch(true) {
        case (weatherId >= 200 && weatherId <= 300): return "⛈️Thunderstorm";
        case (weatherId >= 300 && weatherId <= 400): return "🌧️Rain";
        case (weatherId >= 500 && weatherId <= 600): return "🌧️Rain";
        case (weatherId >= 600 && weatherId <= 700): return "❄️Snow";
        case (weatherId >= 700 && weatherId <= 800): return "💨Fog";
        case (weatherId === 800): return "☀️";
        case (weatherId >= 801 && weatherId < 810): return "☁️Clouds";
        default: return "❓"
    }
}
function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay)
}

// Show App Info Btn
const btn = document.querySelector(".show");
const container = document.querySelector(".app-info");

btn.addEventListener("click", event => {
    if (container.style.display == "none") {
        container.style.display = "block";
    }
    else {
        container.style.display = "none";
    }
});
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); // stop automatic prompt
  deferredPrompt = e; // save the event
  document.getElementById('installBtn').style.display = 'block'; // show button
});

document.getElementById('installBtn').addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt(); // show install popup
    const { outcome } = await deferredPrompt.userChoice;
    console.log('User choice:', outcome); // installed or dismissed
    deferredPrompt = null;
    document.getElementById('installBtn').style.display = 'none';
  }
});
