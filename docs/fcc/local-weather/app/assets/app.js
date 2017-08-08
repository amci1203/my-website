const
    dp          = (dps, n) => Math.round(n * Math.pow(10, dps)) / Math.pow(10, dps),
    _1dp        = dp.bind(null, 1),

    get  = id => document.getElementById(id),
    text = (elm, str) => str ? elm.innerText = str : elm.innerText,
    set  = (elm, attr, val) => elm.setAttribute(attr, val),

    main  = get('info'),
    city  = get('city'),
    icons = get('icons'),
    units = get('units'),
    value = get('value'),
    desc  = get('description'),

    defaultUnit = 'C',
    temperature = {};

String.prototype.capitalizeWords = function () {
    return this.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.substring(1))
        .join(' ');
}

function init (data) {
    // DONE LOADING
    document.documentElement.classList.remove('page-lock', 'loading');
    main.classList.remove('hidden');

    console.log(data);

    Object.assign(temperature, {
        C: _1dp(data.main.temp - 273.15),
        F: _1dp((data.main.temp - 273.15) * 1.8 + 32)
    })

    text(city, `${data.name}, ${data.sys.country}`);
    text(value, temperature.C);
    text(desc, data.weather[0].description.capitalizeWords());

    showIcon(data.weather[0].main.toLowerCase())

    // EVENTS //

    units.addEventListener('click', toggleUnits);

}

text(units, defaultUnit);

// getting the data before we start anything
(function getWeatherData () {

    const API_KEY = "c8de0e1057e67ef993b4ea7f052d7919";

    navigator.geolocation.getCurrentPosition(d => {
        console.log(d);
        const
            url = 'http://api.openweathermap.org/data/2.5/weather?' +
                `lat=${d.coords.latitude}&` +
                `lon=${d.coords.longitude}&` +
                `id=524901&APPID=${API_KEY}`
            ,
            xhr = new XMLHttpRequest();

        xhr.open("GET", url);
        xhr.send(null);
        xhr.onreadystatechange = () => isOk(xhr, init);
    });

})()

function isOk (xhr, callback) {
    const done = 4, ok = stat => stat >= 200 && stat < 300;
    return xhr.readyState === done && ok(xhr.status) ?
        callback( JSON.parse(xhr.responseText) ) : false;
}

function toggleUnits () {
    const
        temp = text(value),
        isInCelsius = text(units) === 'C';
    text(value, isInCelsius ? temperature.F : temperature.C);
    text(units, isInCelsius ? 'F' : 'C');
}

function showIcon (cond) {
    switch (cond) {
        case 'drizzle':
        case 'clouds':
        case 'rain':
        case 'snow':
        case 'clear':
        case 'thunderstom':
            icons.querySelector(`.${cond}`).classList.add('active');
            break;
        default:
            icons.querySelector('.clouds').classList.add('active');

    }
  }
