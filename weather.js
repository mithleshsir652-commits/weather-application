const apiKey = "YOUR_API_KEY_HERE"; // Replace with your OpenWeatherMap API Key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if(response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Logic to update icons based on weather condition
        if(data.weather[0].main == "Clouds") {
            weatherIcon.src = "https://openweathermap.org/img/wn/03d@2x.png";
        } else if(data.weather[0].main == "Clear") {
            weatherIcon.src = "https://openweathermap.org/img/wn/01d@2x.png";
        } else if(data.weather[0].main == "Rain") {
            weatherIcon.src = "https://openweathermap.org/img/wn/10d@2x.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city.length > 0) checkWeather(city);
});

// Show output button only when there is input
searchBox.addEventListener("input", () => {
    if (searchBox.value.trim().length > 0) {
        searchBtn.style.display = "inline-block";
    } else {
        searchBtn.style.display = "none";
    }
});

// Trigger search when user presses Enter
searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        const city = searchBox.value.trim();
        if (city.length > 0) checkWeather(city);
    }
});