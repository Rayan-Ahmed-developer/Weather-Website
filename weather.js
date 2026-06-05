const cityInput = document.getElementById("cityInput");
const btn = document.getElementById("search");    

const degree = document.getElementById("degree");
const city = document.getElementById("city");
const para1 = document.getElementById("para1");
const para2 = document.getElementById("para2");
const weatherIcon = document.getElementById("weatherIcon");

async function fetchWeather() {
    const cityName = cityInput.value.trim();
    if (!cityName) return;

    // Loading effect
    city.innerText = "Loading...";

    const url = `https://wttr.in/${encodeURIComponent(cityName)}?format=j1`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Not found");
        
        const data = await response.json();
        const current = data.current_condition[0];
        
        // Update UI
        city.innerText = cityName.charAt(0).toUpperCase() + cityName.slice(1);
        degree.innerText = current.temp_C + "°C";
        para1.innerText = current.humidity + "%";
        para2.innerText = current.windspeedKmph + " km/h";

        const condition = current.weatherDesc[0].value.toLowerCase();
        changeLogo(condition);

    } catch (error) {
        city.innerText = "City Not Found";
        degree.innerText = "--";
        alert("City nahi mili! Check the spelling.");
    }
}

function changeLogo(weather) {
    weatherIcon.className = "fa-solid"; 
    
    if (weather.includes("sun") || weather.includes("clear")) {
        weatherIcon.classList.add("fa-sun");
        weatherIcon.style.color = "#facc15";
    } else if (weather.includes("cloud")) {
        weatherIcon.classList.add("fa-cloud");
        weatherIcon.style.color = "#94a3b8";
    } else {
        weatherIcon.classList.add("fa-cloud-sun");
        weatherIcon.style.color = "#38bdf8";
    }
}

btn.addEventListener("click", fetchWeather);