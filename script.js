document.getElementById('searchButton').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    if (city) {
        getWeatherData(city);
    }
});

document.getElementById('citySelect').addEventListener('change', function() {
    const city = this.value;
    document.getElementById('cityInput').value = city;
    getWeatherData(city);
});

document.getElementById('addCityButton').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    if (city) {
        addCityToList(city);
    }
});

function getWeatherData(city) {
    const apiKey = '6cde54b629dbe47098e2a97279e9f304';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                updateWeatherInfo(data);
            } else {
                alert('Ville non trouvée');
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
            alert('Erreur de récupération des données');
        });
}

function updateWeatherInfo(data) {
    document.getElementById('cityNameText').textContent = data.name;
    document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('temperature').textContent = data.main.temp;
    document.getElementById('pressure').textContent = data.main.pressure;
    document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`;
    document.getElementById('humidity').textContent = `${data.main.humidity} %`;
}

function addCityToList(city) {
    const citySelect = document.getElementById('citySelect');
    let cityExists = false;
    
    for (let i = 0; i < citySelect.options.length; i++) {
        if (citySelect.options[i].value.toLowerCase() === city.toLowerCase()) {
            cityExists = true;
            break;
        }
    }

    if (!cityExists) {
        const newOption = document.createElement('option');
        newOption.value = city;
        newOption.textContent = city;
        citySelect.appendChild(newOption);
        citySelect.value = city;
    } else {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = 'ville déjà dans la liste.';
    }
}
