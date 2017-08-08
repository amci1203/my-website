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

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var get = function get(id) {
	    return document.getElementById(id);
	},
	    getByClass = function getByClass(cls) {
	    return document.getElementsByClassName(cls);
	},
	    toggleClass = function toggleClass(elm, cls) {
	    return elm.classList.toggle(cls);
	},
	    addClass = function addClass(elm, cls) {
	    return elm.classList.add(cls);
	},
	    removeClass = function removeClass(elm, cls) {
	    return elm.classList.remove(cls);
	},
	    select = function select(elm) {
	    return addClass(elm, 'selected');
	},
	    deselect = function deselect(elm) {
	    return removeClass(elm, 'selected');
	},
	    show = function show(elm) {
	    return elm.classList.remove('hidden');
	},
	    hide = function hide(elm) {
	    return elm.classList.add('hidden');
	},
	    text = function text(elm, str) {
	    return elm.innerText = str;
	},
	    getText = function getText(elm) {
	    return elm.innerText;
	},
	    click = function click(elm, fn) {
	    return elm.addEventListener('click', fn);
	},
	    detach = function detach(elm, type, fn) {
	    return elm.removeEventListener(type, fn);
	},
	    clickEach = function clickEach(list, fn) {
	    return list.forEach(function (elm) {
	        return click(elm, fn);
	    });
	},
	    board = get('board'),
	    playerScreen = get('player-select'),
	    victoryScreen = get('victory'),
	    playerSelect = playerScreen.querySelectorAll('.player-option'),
	    letterSelect = playerScreen.querySelectorAll('.letter-option'),
	    victoryText = get('victory-text'),
	    yourTurnText = get('you'),
	    opponentTurnText = get('opponent'),
	    yourWins = get('your-wins'),
	    opponentWins = get('opponent-wins'),
	    yourLetter = get('who-you'),
	    opponentLetter = get('who-opponent'),
	    pointer = get('pointer'),
	    play = get('play'),
	    stop = get('stop'),
	    replay = get('replay');

	function game() {

	    var squares = board.querySelectorAll('.square'),
	        isOptionsSet = function isOptionsSet() {
	        return mode && player1Is;
	    },
	        writePos = function writePos(x, y) {
	        return '[data-position=\'' + x + ',' + y + '\']';
	    },
	        getPositions = function getPositions(arr) {
	        return arr.map(function (s) {
	            return s.getAttribute('data-position');
	        });
	    },
	        getCol = function getCol(col) {
	        return board.querySelectorAll('[data-position^=\'' + col + '\']');
	    },
	        rows = function (_rows) {
	        return [].concat(_toConsumableArray(_rows)).map(function (row) {
	            return row.querySelectorAll('td');
	        });
	    }(board.querySelectorAll('tr')),
	        col1 = getCol(0),
	        col2 = getCol(1),
	        col3 = getCol(2),
	        diag1 = board.querySelectorAll(writePos(0, 0) + ', ' + writePos(1, 1) + ', ' + writePos(2, 2)),
	        diag2 = board.querySelectorAll(writePos(2, 0) + ', ' + writePos(1, 1) + ', ' + writePos(0, 2)),
	        possibleWins = [].concat(_toConsumableArray(rows), [col1, col2, col3, diag1, diag2]);

	    var mode = null,
	        // 'cpu' || 'human'

	    isYourTurn = true,
	        numPlays = 0,
	        nextPlay = null,
	        // used by the CPU

	    player1Wins = 0,
	        player2Wins = 0,


	    // 'X' || 'O'
	    player1Is = null,
	        player2Is = null;

	    return function () {

	        clickEach(squares, fillInSquare);
	        clickEach(playerSelect, setPlayer);
	        clickEach(letterSelect, setLetter);

	        clickEach([play, stop], toggleViews);

	        click(stop, emptyBoard);
	        click(replay, replayGame);
	    }();

	    // FUNCTIONS

	    function setPlayer() {
	        var prev = mode;
	        mode = this.innerText.toLowerCase();
	        opponentTurnText.innerHTML = (mode === 'cpu' ? 'CPU' : 'P2') + ' &#8226;&nbsp;';

	        mode !== prev && resetWins();

	        playerSelect.forEach(function (item) {
	            return deselect(item);
	        });
	        select(this);
	        isOptionsSet() && show(play);
	    }

	    function setLetter() {
	        var prev = player1Is;
	        player1Is = this.innerText;
	        player2Is = player1Is === 'X' ? 'O' : 'X';

	        player1Is !== prev && resetWins();

	        text(yourLetter, player1Is);
	        text(opponentLetter, player2Is);

	        letterSelect.forEach(function (item) {
	            return deselect(item);
	        });
	        select(this);
	        isOptionsSet() && show(play);
	    }

	    function toggleViews() {

	        toggleClass(playerScreen, 'active');
	        toggleClass(board, 'active');
	    }

	    function fillInSquare(x, y) {
	        // use 'y' because the first argument x has event object passed
	        var square = y === undefined ? this : board.querySelector(writePos(x, y));
	        if (getText(square) != '') return false;
	        text(square, isYourTurn ? player1Is : player2Is);
	        if (!checkForWin()) changeTurn();
	    }

	    function changeTurn() {

	        isYourTurn = !isYourTurn;
	        toggleClass(yourTurnText, 'bold');
	        toggleClass(pointer, 'right');
	        toggleClass(opponentTurnText, 'bold');

	        if (mode === 'cpu' && !isYourTurn) setTimeout(selectSquare, 200);
	    }

	    function checkForWin() {

	        numPlays++;
	        if (numPlays < 5) return false;

	        var isWinner = false;

	        for (var i = 0; i < 8; i++) {
	            var line = possibleWins[i],
	                l1 = getText(line[0]),
	                l2 = getText(line[1]),
	                l3 = getText(line[2]);
	            if ([l1, l2, l3].indexOf('') == -1 && l1 == l2 && l2 == l3) {
	                isWinner = true;
	                commenceVictory();
	                break;
	            }
	        }

	        if (!isWinner && numPlays === 9) {
	            console.log('ISSA DRAW');
	            text(victoryText, 'DRAW');
	            openModal();
	        }

	        return isWinner;
	    }

	    function commenceVictory() {

	        if (isYourTurn) {
	            console.log('YOU WIN');
	            player1Wins++;
	            text(yourWins, player1Wins);
	            text(victoryText, 'YOU WIN!');
	        } else {
	            player2Wins++;
	            text(opponentWins, player2Wins);
	            text(victoryText, mode == 'cpu' ? 'CPU WINS!' : 'PLAYER 2 WINS');
	        }

	        openModal();
	    }

	    function replayGame() {

	        emptyBoard();
	        closeModal();
	    }

	    function emptyBoard() {
	        squares.forEach(function (square) {
	            return text(square, '');
	        });
	        numPlays = 0;
	        !isYourTurn && changeTurn();
	    }

	    function resetWins() {

	        player1Wins = 0;
	        player2Wins = 0;
	        [yourWins, opponentWins].forEach(function (elm) {
	            return text(elm, '0');
	        });
	    }

	    function openModal() {
	        addClass(victoryScreen, 'modal--open');
	    }

	    function closeModal() {
	        removeClass(victoryScreen, 'modal--open');
	    }

	    // CPU BEHAVIOUR STARTS HERE

	    function selectSquare(redirected) {

	        if (numPlays === 1 || redirected) {
	            console.log('selecting a random square');
	            // 60% (3/5) chance of just playing in the middle if it's available
	            if (getText(squares[4]) === '' && Math.floor(Math.random() * 5) > 2) {
	                fillInSquare(1, 1);
	                return;
	            }
	            // otherwise, pick a random spot, which could still be the middle if it's available
	            else {
	                    var emptySquares = [].concat(_toConsumableArray(squares)).filter(function (s) {
	                        return getText(s) === '';
	                    }),
	                        randomNumber = Math.floor(Math.random() * emptySquares.length);

	                    emptySquares[randomNumber].click();
	                }
	        } else choosePlay();
	    }

	    function choosePlay() {

	        var positions = [];
	        var pos = '';

	        // winning comes first
	        for (var i = 0; i < 8; i++) {
	            var stats = getLineStats(i);
	            if (stats.own.length === 2 && stats.free) {
	                stats.empty[0].click();
	                return;
	            }
	        }

	        // then stopping the human from winning
	        for (var _i = 0; _i < 8; _i++) {
	            var _stats = getLineStats(_i);
	            if (_stats.opp.length === 2 && _stats.free) {
	                _stats.empty[0].click();
	                return;
	            }
	        }

	        // play on a line if the human hasn't blocked me already
	        for (var _i2 = 0; _i2 < 8; _i2++) {
	            var _stats2 = getLineStats(_i2);
	            if (_stats2.own.length === 1 && _stats2.free) {
	                _stats2.empty[Math.floor(Math.random() * _stats2.empty.length)].click();
	                return;
	            }
	        }

	        // if no lines left to go through, pick a random spot
	        selectSquare(true);
	    }

	    function getLineStats(i) {
	        var line = possibleWins[i],
	            empty = [].concat(_toConsumableArray(line)).filter(function (s) {
	            return getText(s) === '';
	        }),
	            own = [].concat(_toConsumableArray(line)).filter(function (s) {
	            return getText(s) === player2Is;
	        }),
	            opp = [].concat(_toConsumableArray(line)).filter(function (s) {
	            return getText(s) === player1Is;
	        }),
	            free = opp.length === 0;

	        return { empty: empty, own: own, opp: opp, free: free };
	    }
	}

	function generateBoard(parent, callback) {

	    var board = document.createElement('table');

	    for (var i = 0; i != 3; i++) {

	        var row = document.createElement('tr');
	        for (var j = 0; j != 3; j++) {
	            row.innerHTML += '<td class=\'square\' data-position=\'' + j + ',' + i + '\' ></td>';
	        }

	        board.appendChild(row);
	    }

	    parent.insertBefore(board, stop);
	    callback();
	}

	generateBoard(board, game);

/***/ })
/******/ ]);