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
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _ProjectThumbnails = __webpack_require__(15);

	var _ProjectThumbnails2 = _interopRequireDefault(_ProjectThumbnails);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	fetch('/fcc/projects').then(function (res) {
	    return res.json();
	}).then(function (res) {
	    return (0, _ProjectThumbnails2.default)(res);
	}).catch(function (err) {
	    return console.error(err.toString());
	});

/***/ }),

/***/ 15:
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var makeProjectThumbnails = function makeProjectThumbnails(projects) {
	    var section = document.createDocumentFragment(),
	        thumbs = projects.map(makeThumbnail);

	    appendTo.apply(undefined, [section].concat(_toConsumableArray(thumbs)));
	    appendTo(document.getElementById('projects'), section);
	},
	    makeThumbnail = function makeThumbnail(_ref) {
	    var _ref$name = _ref.name,
	        name = _ref$name === undefined ? 'Looking for a name...' : _ref$name,
	        _ref$thumbnail = _ref.thumbnail,
	        thumbnail = _ref$thumbnail === undefined ? false : _ref$thumbnail,
	        description = _ref.description;


	    var format = function format(str) {
	        return str.split('-').map(function (w) {
	            return w.slice(0, 1).toUpperCase() + w.slice(1);
	        }).join(' ');
	    };

	    return appendTo(createElement('article', 'thumbnail'), appendTo(createElement('a', 'thumbnail__image', null, { href: '/' + name }), createElement('img', 'lazyload', null, { 'data-src': thumbnail })), createElement('h1', 'thumbnail__title', format(name)), createElement('p', description ? 'thumbnail__description' : 'thumbnail__description none', description || '(No Description)'));
	},
	    createElement = function createElement(tag) {
	    var classes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	    var innerHTML = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
	    var attrs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};


	    var el = document.createElement(tag);

	    Object.keys(attrs).forEach(function (key) {
	        if (tag == 'img' && key == 'data-src') {
	            !attrs[key] && el.setAttribute(key, '/img/fcc-logo-gray.png');
	        }
	        attrs[key] && el.setAttribute(key, attrs[key]);
	    });

	    if (classes) {
	        if (Array.isArray(classes)) {
	            var _el$classList;

	            (_el$classList = el.classList).add.apply(_el$classList, _toConsumableArray(classes));
	        }
	        if (classes.indexOf(' ') > -1) {
	            var _el$classList2;

	            (_el$classList2 = el.classList).add.apply(_el$classList2, _toConsumableArray(classes.split(' ')));
	        } else el.classList.add(classes);
	    }

	    innerHTML && Object.assign(el, { innerHTML: innerHTML });

	    return el;
	},
	    appendTo = function appendTo(container) {
	    for (var _len = arguments.length, elements = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        elements[_key - 1] = arguments[_key];
	    }

	    elements.forEach(function (el) {
	        return container.appendChild(el);
	    });
	    return container;
	};

	exports.default = makeProjectThumbnails;

/***/ })

/******/ });