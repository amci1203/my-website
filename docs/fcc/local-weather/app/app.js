/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	'use strict';

	var dp = function dp(dps, n) {
	    return Math.round(n * Math.pow(10, dps)) / Math.pow(10, dps);
	},
	    _1dp = dp.bind(null, 1),
	    get = function get(id) {
	    return document.getElementById(id);
	},
	    text = function text(elm, str) {
	    return str ? elm.innerText = str : elm.innerText;
	},
	    set = function set(elm, attr, val) {
	    return elm.setAttribute(attr, val);
	},
	    main = get('info'),
	    city = get('city'),
	    icons = get('icons'),
	    units = get('units'),
	    value = get('value'),
	    desc = get('description'),
	    defaultUnit = 'C',
	    temperature = {};

	String.prototype.capitalizeWords = function () {
	    return this.split(' ').map(function (word) {
	        return word.charAt(0).toUpperCase() + word.substring(1);
	    }).join(' ');
	};

	function init(data) {
	    // DONE LOADING
	    document.documentElement.classList.remove('page-lock', 'loading');
	    main.classList.remove('hidden');

	    console.log(data);

	    Object.assign(temperature, {
	        C: _1dp(data.main.temp - 273.15),
	        F: _1dp((data.main.temp - 273.15) * 1.8 + 32)
	    });

	    text(city, data.name + ', ' + data.sys.country);
	    text(value, temperature.C);
	    text(desc, data.weather[0].description.capitalizeWords());

	    showIcon(data.weather[0].main.toLowerCase());

	    // EVENTS //

	    units.addEventListener('click', toggleUnits);
	}

	text(units, defaultUnit);

	// getting the data before we start anything
	(function getWeatherData() {

	    var API_KEY = "c8de0e1057e67ef993b4ea7f052d7919";

	    navigator.geolocation.getCurrentPosition(function (d) {
	        console.log(d);
	        var url = 'http://api.openweathermap.org/data/2.5/weather?' + ('lat=' + d.coords.latitude + '&') + ('lon=' + d.coords.longitude + '&') + ('id=524901&APPID=' + API_KEY),
	            xhr = new XMLHttpRequest();

	        xhr.open("GET", url);
	        xhr.send(null);
	        xhr.onreadystatechange = function () {
	            return isOk(xhr, init);
	        };
	    });
	})();

	function isOk(xhr, callback) {
	    var done = 4,
	        ok = function ok(stat) {
	        return stat >= 200 && stat < 300;
	    };
	    return xhr.readyState === done && ok(xhr.status) ? callback(JSON.parse(xhr.responseText)) : false;
	}

	function toggleUnits() {
	    var temp = text(value),
	        isInCelsius = text(units) === 'C';
	    text(value, isInCelsius ? temperature.F : temperature.C);
	    text(units, isInCelsius ? 'F' : 'C');
	}

	function showIcon(cond) {
	    switch (cond) {
	        case 'drizzle':
	        case 'clouds':
	        case 'rain':
	        case 'snow':
	        case 'clear':
	        case 'thunderstom':
	            icons.querySelector('.' + cond).classList.add('active');
	            break;
	        default:
	            icons.querySelector('.clouds').classList.add('active');

	    }
	}

/***/ })
/******/ ]);