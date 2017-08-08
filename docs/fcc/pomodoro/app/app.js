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

	// NOTE: NOT THE FIRST FUNCTION TO RUN:
	function init(data) {

	(function Pomodoro(pomo) {

	    if (!pomo) return false;

	    getStringPrototypes();

	    var get = function get(id) {
	        return document.getElementById(id);
	    },
	        byClass = function byClass(elm, _class) {
	        return elm.querySelectorAll('.' + _class);
	    },

	    // takes either a number in ms to reduce to minutes or a whole number (in minutes) to multiply to seconds
	    inSeconds = function inSeconds(n, isInMs) {
	        return isInMs ? n / 1000 : n * 60;
	    },
	        text = function text(elm, str) {
	        return elm.innerText = str;
	    },
	        isInbound = function isInbound(n, i) {
	        return !(n == minLen && i == -1) && !(n == maxLen && i == 1);
	    },
	        toggleClass = function toggleClass(elm) {
	        for (var _len = arguments.length, classes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            classes[_key - 1] = arguments[_key];
	        }

	        return classes.forEach(function (cls) {
	            return elm.classList.toggle(cls);
	        });
	    },
	        hasClass = function hasClass(elm, str) {
	        return elm.classList.contains(str);
	    },
	        addClass = function addClass(elm) {
	        for (var _len2 = arguments.length, classes = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	            classes[_key2 - 1] = arguments[_key2];
	        }

	        return classes.forEach(function (cls) {
	            return elm.classList.add(cls);
	        });
	    },
	        removeClass = function removeClass(elm) {
	        for (var _len3 = arguments.length, classes = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	            classes[_key3 - 1] = arguments[_key3];
	        }

	        return classes.forEach(function (cls) {
	            return elm.classList.remove(cls);
	        });
	    },
	        click = function click(elm, fn) {
	        return elm.addEventListener('click', fn);
	    },
	        clickEach = function clickEach(list, fn) {
	        return list.forEach(function (elm) {
	            return click(elm, fn);
	        });
	    },
	        toggle = get('toggle-play'),
	        timer = get('timer'),
	        timerC = get('timer-container'),
	        timerM = get('timer-minutes'),
	        timerS = get('timer-seconds'),
	        stopBtn = get('stop'),
	        sessionSpan = get('session-length'),
	        breakSpan = get('break-length'),
	        increments = byClass(pomo, 'increment'),
	        alarm = get('alarm'),
	        second = 1000,
	        minute = second * 60,
	        minLen = 1,
	        maxLen = 99,
	        breakClass = 'on-break',
	        setTimer = function setTimer() {
	        left++;
	        tick();
	    },
	        startTimer = function startTimer() {
	        start = setInterval(tick, second);
	        disableIncrementControls();
	        removeClass(stopBtn, 'hidden');
	    },
	        toFarenheit = function toFarenheit(C) {
	        return _1dp(C * 1.8 + 32);
	    },
	        resetTimer = function resetTimer() {
	        return left = inSeconds(hasClass(timerC, breakClass) ? breakLen : sessionLen);
	    },
	        stopTimer = function stopTimer() {
	        if (start) clearInterval(start);
	        resetTimer();
	        activateIncrementControls();
	        addClass(stopBtn, 'hidden');
	        removeClass(timerC, breakClass);
	        removeClass(toggle, 'pause');
	        addClass(toggle, 'play');
	        resetTimer();
	        setTimer();
	    },
	        toggleTimer = function toggleTimer() {
	        hasClass(toggle, 'play') ? startTimer() : pauseTimer();
	        toggleClass(toggle, 'play', 'pause');
	    },


	    // toggles STOP button visibility as well
	    disableIncrementControls = function disableIncrementControls() {
	        return increments.forEach(function (elm) {
	            return addClass(elm, 'disabled');
	        });
	    },
	        activateIncrementControls = function activateIncrementControls() {
	        return increments.forEach(function (elm) {
	            return removeClass(elm, 'disabled');
	        });
	    },
	        ring = function ring() {
	        return alarm.play();
	    };
	    var start = void 0,
	        sessionLen = 25,
	        breakLen = 5,
	        left = inSeconds(sessionLen);

	    function tick() {
	        left--;
	        text(timerM, String(Math.floor(left / 60)).padLeft(2, 0));
	        text(timerS, String(left % 60).padLeft(2, 0));

	        if (!left) {
	            toggleClass(timerC, breakClass);
	            ring();
	            resetTimer();
	        }
	    }

	    function incrementTimerLength() {
	        var controls = this.parentElement.id.split(':')[1],
	            increment = hasClass(this, 'increment-up') ? 1 : -1,
	            onBreak = hasClass(timerC, breakClass);

	        if (controls === 'session' && isInbound(sessionLen, increment)) {
	            sessionLen += increment;
	            text(sessionSpan, sessionLen);
	            if (!onBreak) {
	                left = inSeconds(sessionLen);
	                setTimer();
	            }
	        }
	        if (controls === 'break' && isInbound(breakLen, increment)) {
	            breakLen += increment;
	            text(breakSpan, breakLen);
	            if (onBreak) {
	                left = inSeconds(breakLen);
	                setTimer();
	            }
	        }
	    }

	    return function () {
	        click(toggle, toggleTimer);
	        clickEach(increments, incrementTimerLength);
	        click(stopBtn, stopTimer);

	        text(sessionSpan, sessionLen);
	        text(breakSpan, breakLen);

	        setTimer();
	    }();
	})(document.getElementById('pomodoro'));

	function getStringPrototypes() {
	    String.prototype.padLeft = function (targetLength, padString) {
	        if (this.length >= targetLength) return this;else {
	            if (['number', 'string'].indexOf(typeof padString === 'undefined' ? 'undefined' : _typeof(padString)) !== -1) {
	                var pad = String(padString);
	                var target = this.split('*');
	                while (target.length < targetLength) {
	                    target.unshift(pad);
	                }
	                return target.join('');
	            } else {
	                throw new Error('Err: padString is not a number or string');
	            }
	        }
	    };
	    xhr.readyState === done && ok(xhr.status) ? callback(JSON.parse(xhr.responseText)) : console.log(xhr.status + ': ' + xhr.responseText);
	}

/***/ })
/******/ ]);