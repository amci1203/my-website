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

	(function WikiViewer() {

	    var get = function get(id) {
	        return document.getElementById(id);
	    },
	        click = function click(elm, fn) {
	        return elm.addEventListener('click', fn);
	    },
	        form = get('search-form'),
	        search = get('search'),
	        submit = get('submit'),
	        resultsContainer = get('results'),
	        callback = '&callback=JSON_CALLBACK',
	        pageURL = 'https://en.wikipedia.org/?curid=',
	        api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';

	    form.addEventListener('submit', function (event) {
	        event.preventDefault();
	        getSearchResults();
	    });

	    function getSearchResults() {
	        var searchTitle = search.value;
	        jsonp('' + api + searchTitle + callback);
	        return false;
	    }

	    function jsonp(target) {
	        var script = document.createElement('script');
	        script.src = target;

	        document.body.appendChild(script);
	    }

	    window.JSON_CALLBACK = function (data) {
	        var query = data.query,
	            results = query ? query.pages : null,
	            list = document.createElement('ul');

	        list.classList.add('search-results');
	        resultsContainer.innerHTML = '';

	        if (results) {
	            for (var result in results) {
	                makeResultCard(results[result]);
	            }
	            resultsContainer.innerHTML = '<p>Now Showing Top Results For Search Query \'' + search.value + '\'.</p>';
	            resultsContainer.appendChild(list);
	        } else {
	            resultsContainer.innerHTML = '<p>Sorry, No Articles Were Found For The Query \'' + search.value + '\'. Please Try Another Query.</p>';
	        }

	        function makeResultCard(page) {
	            var item = document.createElement('li');
	            item.innerHTML = '\n                <a class=\'result\' target=\'_blank\' href=\'' + pageURL + page.pageid + '\'>\n                    <h1>' + page.title + '</h1>\n                    <p>' + page.extract + '</p>    \n                </a>\n            ';
	            list.appendChild(item);
	        }
	    };
	})();

/***/ })
/******/ ]);