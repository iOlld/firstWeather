// Список городов
const cityList = [
    
    {
        "id": 707860,
        "name": "Hurzuf",
        "country": "UA",
        "coord": {
            "lon": 34.283333,
            "lat": 44.549999
        }
    },

    {
        "id": 519188,
        "name": "Novinki",
        "country": "RU",
        "coord": {
            "lon": 37.666668,
            "lat": 55.683334
        }
    },

    {
        "id": 571476,
        "name": "Bryansk",
        "country": "RU",
        "coord": {
            "lon": 34.38,
            "lat": 53.29
        }
    },

    {
        "id": 553915,
        "name": "Kaluga",
        "country": "RU",
        "coord": {
            "lon": 36.2754,
            "lat": 54.5293
        }
    },

    {
        "id": 708546,
        "name": "Holubynka",
        "country": "UA",
        "coord": {
            "lon": 33.900002,
            "lat": 44.599998
        }
    },

    {
        "id": 703363,
        "name": "Laspi",
        "country": "UA",
        "coord": {
          "lon": 33.733334,
          "lat": 44.416668
        }
    },

    {
        "id": 473537,
        "name": "Vinogradovo",
        "country": "RU",
        "coord": {
            "lon": 38.545555,
            "lat": 55.423332
        }
    },

    {
        "id": 569143,
        "name": "Cherkizovo",
        "country": "RU",
        "coord": {
            "lon": 37.728889,
            "lat": 55.800835
        }
    },

    {
        "id": 705135,
        "name": "Konotop",
        "country": "UA",
        "coord": {
            "lon": 33.2,
            "lat": 51.24
        }
    },

    {
        "id": 713514,
        "name": "Alupka",
        "country": "UA",
        "coord": {
            "lon": 34.049999,
            "lat": 44.416668
        }
    }

];
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //

// ########################################################################### //
// ########################################################################### //
// ########################################################################### //
// ########################################################################### //

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// Получение и обработка данных
const CITY_NAME = document.querySelector(`.forecast__city-name`);
const CITY_TEMP_NOW = document.querySelector(`.city-temp-now`);
const CITY_FEELES_LIKE = document.querySelector(`.city-feels_like`);
const CITY_TEMP_MIN = document.querySelector(`.city-temp_min`);
const CITY_TEMP_MAX = document.querySelector(`.city-temp_max`);
const CITY_PRESSURE = document.querySelector(`.city-pressure`);
const CITY_HUMIDITY = document.querySelector(`.city-humidity`);
const CITY_CLOUDS = document.querySelector(`.city-clouds`);
const CITY_WIND = document.querySelector(`.city-wind`);
const CITY_RAIN = document.querySelector(`.city-rain`);
const CITY_DESCRIPTION = document.querySelector(`.city-description`);
const WEATHER_PICTURE = document.querySelector(`.weather-picture`);
const TIME_SUNRISE = document.querySelector(`.time-sunrise`);
const TIME_SUNSET = document.querySelector(`.time-sunset`);
const FORECAST_ALL = document.querySelector(`.forecast-all`);

function cityFIweDayListFunk(strApi) {
    
    fetch(`https://api.openweathermap.org/data/2.5/forecast?${strApi}&appid=ca482b786e08726f3f706f8816f39a3b&lang=ru`)
    .then(function (resp) {return resp.json() })
    .then(function (data){
        // console.log(data);
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
        // Вывод текущих данных
        CITY_NAME.textContent = data.city.name
        // CITY_NAME.style.fontFamily = `'Orbitron', sans-serif`;
        CITY_TEMP_NOW.innerHTML = `Сейчас ${Math.round(data.list[0].main.temp) - 273}&deg; C`;
        CITY_FEELES_LIKE.innerHTML = `Ощущается как ${Math.round(data.list[0].main.feels_like) - 273}&deg; C`;
        CITY_TEMP_MIN.innerHTML = `Минимальная ${Math.round(data.list[0].main.temp_min) - 273}&deg; C`;
        CITY_TEMP_MAX.innerHTML = `Максимальная ${Math.round(data.list[0].main.temp_max) - 273}&deg; C`;
        CITY_PRESSURE.innerHTML = `Давление ${data.list[0].main.pressure} гПа`;
        CITY_HUMIDITY.innerHTML = `Влажность ${data.list[0].main.humidity} %`;
        CITY_CLOUDS.innerHTML = `Облачность ${data.list[0].clouds.all} %`;
        CITY_WIND.innerHTML = `Скорость ветра ${data.list[0].wind.speed} м/с`;

        if (data.list[0].weather[0].main === 'Rain') {
            CITY_RAIN.innerHTML = `Осадки за 3 часа ${data.list[0].rain['3h']} м/м`;
        } else if (data.list[0].weather[0].main === 'Snow') {
            CITY_RAIN.innerHTML = `Осадки за 3 часа ${data.list[0].snow['3h']} м/м`;
        };

        CITY_DESCRIPTION.textContent = data.list[0].weather[0].description;
        WEATHER_PICTURE.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png">`;
        TIME_SUNRISE.textContent = `Восход ${upAndDown(data.city.sunrise + data.city.timezone)}`;
        TIME_SUNSET.textContent = `Заход ${upAndDown(data.city.sunset + data.city.timezone)}`;
        
        // CITY_NAME.textContent = data.city.name


        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
        // ОтрисовкА двнных о погоде на 5 дней
        // function outWeather (){
            let forecastOutBankNowAllWrap = '';
            for (i = 0; i < data.list.length; i++) {
                let forecastOutBankNowAll = '';
                forecastOutBankNowAll += `<img class="weather__icon" src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png">`;
                forecastOutBankNowAll += `<p class="weather__day date-day-time">${timeFunc(data.list[i].dt)}</p>`;
                forecastOutBankNowAll += `<p class="weather__day">${data.list[i].weather[0].description}</p>`;
                forecastOutBankNowAll += `<p class="weather__day">Температура ${Math.round(data.list[i].main.temp) - 273}&deg; C</p>`;
                forecastOutBankNowAll += `<p class="weather__day">Облачность ${data.list[i].clouds.all}%</p>`;
                forecastOutBankNowAll += `<p class="weather__day">Влажность ${data.list[i].main.humidity}%</p>`;
                forecastOutBankNowAllWrap += `<div class="weather__day-wrap">${forecastOutBankNowAll}</div>`;
            }
            FORECAST_ALL.innerHTML = forecastOutBankNowAllWrap;
        // };
        // outWeather();


    })
    .catch(function () {
        // catch any errors
    });
        
}
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //

// ########################################################################### //
// ########################################################################### //
// ########################################################################### //
// ########################################################################### //

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// Получение погоды по координатам
// Нашел на MDN web docs и stackoverflow - получение координат

navigator.geolocation.getCurrentPosition(
    function(position){
        setCoordFunk(position.coords.latitude, position.coords.longitude);
    }, function(error){
    // если ошибка (можно проверить код ошибки)
    if (error.PERMISSION_DENIED) {
        CITY_NAME.textContent = `Погода по координатам не доступна`;
    }   
});

function setCoordFunk(lat, long){
    cityFIweDayListFunk(`lat=${lat}&lon=${long}`);
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //

// ########################################################################### //
// ########################################################################### //
// ########################################################################### //
// ########################################################################### //

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// Функция вывода времени восхода и захода
function upAndDown(time){
    time = new Date(time * 1000),
    hoursS = time.getUTCHours(),
    minutesS = time.getUTCMinutes();
    if (hoursS < 10) {
        hoursS = `0${hoursS}`;
    }
    if (minutesS < 10) {
        minutesS = `0${minutesS}`;
    }
    return `${hoursS}:${minutesS}`;
};
// // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //

// ########################################################################### //
// ########################################################################### //
// ########################################################################### //
// ########################################################################### //

// // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// // Вывод данных по вводу города в инпут
const BTN_WEATHER = document.querySelector(`.btn__weather`);
const INPUT_CITY_NAME = document.querySelector(`[name="input-city"]`);

BTN_WEATHER.onclick = function(e){
    e.preventDefault()
    if (INPUT_CITY_NAME.value === '') {
        INPUT_CITY_NAME.placeholder = `Заполрите поле`;
    } else{
        cityFIweDayListFunk(`q=${INPUT_CITY_NAME.value.trim()}`);
    }
};
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //

// ########################################################################### //
// ########################################################################### //
// ########################################################################### //
// ########################################################################### //

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// Фильтр стран
const SELECT_COUNTRY = document.querySelector(`.select__country`);
const SELECT_CITY = document.querySelector(`.select__city`);

function filtCountryFunc() {
    let countryArr = {};
    let bank = '';
    
    for (i = 0; i < cityList.length; i++) {
        
        if (countryArr[cityList[i].country] == undefined) {
            countryArr[cityList[i].country] = cityList[i].country;
        };
    
    };

    for (let countryName in countryArr) {
        bank += `<option value="${countryName}">${countryArr[countryName]}</option>`;
    };
    return bank;

};

(function(){
    SELECT_COUNTRY.innerHTML += filtCountryFunc();
}());

// Вывод городов страны
SELECT_COUNTRY.onchange = function() {
    let bank = '';
    
    for (i = 0; i < cityList.length; i++) {
        
        if (cityList[i].country === this.value) {
            bank += `<option value="${cityList[i].id}">${cityList[i].name}</option>`;
        } else if (this.value === `default`) {
            bank = `<option value="default">Выберите город</option>`;
        };
    
    };
    SELECT_CITY.innerHTML = bank;
    cityFIweDayListFunk(`id=${SELECT_CITY[0].value}`);
}

// Выбор города из списка

SELECT_CITY.onchange = function(){
    cityFIweDayListFunk(`id=${this.value}`)
}
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //

// ########################################################################### //
// ########################################################################### //
// ########################################################################### //
// ########################################################################### //

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// // Функция вывода даты и времени для прогноза на 5 дней
function timeFunc(time){
    time = new Date(time * 1000);
    let hours = time.getUTCHours();
    let minutes = time.getUTCMinutes();
    let date = time.getDate();
    let day = time.getDay();

    switch(day){
        case 0:
            day = 'Воскресенье'
            break;
        case 1:
            day = 'Понедельник'
            break;
        case 2:
            day = 'Вторник'
            break;
        case 3:
            day = 'Среда'
            break;
        case 4:
            day = 'Четверг'
            break;
        case 5:
            day = 'Пятница'
            break;
        case 6:
            day = 'Суббота'
            break;
    }

    if (hours < 10) hours = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;
    if (date < 10) date = `0${date}`;

    return `${date} ${day} ${hours}:${minutes}`;
};
// // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //

// ########################################################################### //
// ########################################################################### //
// ########################################################################### //
// ########################################################################### //

// // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //