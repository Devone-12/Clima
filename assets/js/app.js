const apiKey = "c4b2e36e83e088402e51743079834b08"; // Replace with your OpenWeatherMap API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon i");
const weather = document.querySelector(".weather");
const errorDiv = document.querySelector(".error");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (response.status === 404) {
            errorDiv.style.display = "block";
            weather.style.display = "none";
            return;
        }

        const data = await response.json();
        
        document.querySelector(".weather-info h1").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".weather-info h2").innerHTML = `${data.name}, ${data.sys.country}`;
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Update weather icon based on weather condition
        weatherIcon.classList.remove('pulse');
        switch (data.weather[0].main) {
            case 'Clouds':
                weatherIcon.className = "fa-solid fa-cloud pulse";
                break;
            case 'Clear':
                weatherIcon.className = "fa-solid fa-sun pulse";
                break;
            case 'Rain':
                weatherIcon.className = "fa-solid fa-cloud-rain pulse";
                break;
            case 'Drizzle':
                weatherIcon.className = "fa-solid fa-cloud-rain pulse";
                break;
            case 'Mist':
                weatherIcon.className = "fa-solid fa-smog pulse";
                break;
            case 'Snow':
                weatherIcon.className = "fa-solid fa-snowflake pulse";
                break;
            case 'Thunderstorm':
                weatherIcon.className = "fa-solid fa-cloud-bolt pulse";
                break;
            case 'Haze':
                weatherIcon.className = "fa-solid fa-smog pulse";
                break;
        }

        weather.style.display = "block";
        errorDiv.style.display = "none";
        
        // Add fade-in animation
        weather.classList.remove('fade-in');
        void weather.offsetWidth; // Trigger reflow
        weather.classList.add('fade-in');

    } catch (err) {
        console.error("Error fetching weather data:", err);
        errorDiv.style.display = "block";
        weather.style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

// Initial weather check for a default city
checkWeather("Cancun");

