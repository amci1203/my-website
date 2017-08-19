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

	var get = function get(id) {
	    return document.getElementById(id);
	},
	    text = function text(elm, str) {
	    return str ? elm.innerText = str : elm.innerText;
	},
	    set = function set(elm, attr, val) {
	    return elm.setAttribute(attr, val);
	},
	    click = function click(elm, fn) {
	    return elm.addEventListener('click', fn);
	},
	    users = document.createElement('main'),
	    api = 'https://wind-bow.gomix.me/twitch-api',
	    getUser = function getUser(user, cb) {
	    return jsonp(api + '/users/' + user, cb);
	},
	    getStream = function getStream(user, cb) {
	    return jsonp(api + '/streams/' + user, cb);
	},
	    usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "comster404"],
	    placeholders = {
	    name: '404',
	    logo: 'assets/img/twitch-logo.png',
	    bio: '(Nothing to show here)'
	};

	function getUsers() {
	    usernames.forEach(function (user) {
	        return getUser(user, pushUser);
	    });
	    document.body.appendChild(users);
	}

	function getStreams() {
	    usernames.forEach(function (user) {
	        return getStream(user, addStreamData);
	    });
	}

	function pushUser(user) {
	    console.log(user);

	    var card = document.createElement('a'),
	        logo = user.logo || placeholders.logo,
	        name = user.display_name || placeholders.name,
	        bio = user.bio || placeholders.bio;

	    Object.assign(card, {
	        id: user.name,
	        href: 'https://www.twitch.tv/' + user.name,
	        target: '_blank',
	        innerHTML: '\n            <img src=\'' + logo + '\' />\n            <h2 class=\'section-title subtitle\'>' + name + '</h2>\n            <p>' + bio + '</p>\n        '
	    });

	    users.appendChild(card);
	}

	function addStreamData(data) {
	    if (!data.stream) return false;
	    console.log(data.stream);

	    var stream = data.stream,
	        card = get(stream.channel.name),
	        span = document.createElement('span');

	    span.innerHTML = 'LOOK AT ME';

	    card.appendChild(span);
	}

	var jsonp = function () {
	    var numCalls = 0;
	    return function (target, cb) {
	        numCalls++;

	        var script = document.createElement('script'),
	            join = (target.indexOf('?') == -1 ? '?' : '&') + 'callback=',
	            cbStr = 'JSON_CALLBACK' + numCalls;

	        script.onload = script.remove;
	        script.src = target + join + cbStr;
	        document.body.appendChild(script);
	        window[cbStr] = cb;
	    };
	}();

	(function () {

	    users.id = 'users';
	    getUsers();
	    getStreams();
	})();

/***/ })
/******/ ]);