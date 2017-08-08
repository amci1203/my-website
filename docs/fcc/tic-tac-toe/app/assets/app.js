const
    get         = id => document.getElementById(id),
    getByClass  = cls => document.getElementsByClassName(cls),
    toggleClass = (elm, cls) => elm.classList.toggle(cls),
    addClass    = (elm, cls) => elm.classList.add(cls),
    removeClass = (elm, cls) => elm.classList.remove(cls),
    select      = elm => addClass(elm, 'selected'),
    deselect    = elm => removeClass(elm, 'selected'),
    show        = elm => elm.classList.remove('hidden'),
    hide        = elm => elm.classList.add('hidden'),
    text        = (elm, str) => elm.innerText = str,
    getText     = elm => elm.innerText,
    click       = (elm, fn) => elm.addEventListener('click', fn),
    detach      = (elm, type, fn) => elm.removeEventListener(type, fn),
    clickEach   = (list, fn) => list.forEach(elm => click(elm, fn)),

    board         = get('board'),
    playerScreen  = get('player-select'),
    victoryScreen = get('victory'),

    playerSelect = playerScreen.querySelectorAll('.player-option'),
    letterSelect = playerScreen.querySelectorAll('.letter-option'),
    victoryText  = get('victory-text'),

    yourTurnText     = get('you'),
    opponentTurnText = get('opponent'),
    yourWins         = get('your-wins'),
    opponentWins     = get('opponent-wins'),
    yourLetter       = get('who-you'),
    opponentLetter   = get('who-opponent'),
    pointer          = get('pointer'),

    play   = get('play'),
    stop   = get('stop'),
    replay = get('replay');

function game () {

    const
        squares = board.querySelectorAll('.square'),

        isOptionsSet = () => mode && player1Is,
        writePos     = (x, y) => `[data-position='${x},${y}']`,
        getPositions = arr => arr.map(s => s.getAttribute('data-position')),
        getCol       = col => board.querySelectorAll(`[data-position^='${col}']`),

        rows  = (_rows => [..._rows].map(row => row.querySelectorAll('td')))(board.querySelectorAll('tr')),
        col1  = getCol(0),
        col2  = getCol(1),
        col3  = getCol(2),
        diag1 = board.querySelectorAll(`${writePos(0,0)}, ${writePos(1,1)}, ${writePos(2,2)}`),
        diag2 = board.querySelectorAll(`${writePos(2,0)}, ${writePos(1,1)}, ${writePos(0,2)}`),

        possibleWins = [...rows, col1, col2, col3, diag1, diag2];

    let
        mode = null, // 'cpu' || 'human'

        isYourTurn = true,
        numPlays   = 0,
        nextPlay   = null, // used by the CPU

        player1Wins = 0,
        player2Wins = 0,

        // 'X' || 'O'
        player1Is = null,
        player2Is = null;


    return (function () {

        clickEach(squares, fillInSquare);
        clickEach(playerSelect, setPlayer);
        clickEach(letterSelect, setLetter);

        clickEach([play, stop], toggleViews);

        click(stop, emptyBoard);
        click(replay, replayGame);

    })()

    // FUNCTIONS

    function setPlayer () {
        const prev = mode;
        mode = this.innerText.toLowerCase();
        opponentTurnText.innerHTML = `${mode === 'cpu' ? 'CPU' : 'P2'} &#8226;&nbsp;`;

        mode !== prev && resetWins();

        playerSelect.forEach(item => deselect(item));
        select(this);
        isOptionsSet() && show(play);
    }

    function setLetter () {
        const prev = player1Is
        player1Is = this.innerText;
        player2Is = player1Is === 'X' ? 'O' : 'X';

        player1Is !== prev && resetWins();

        text(yourLetter, player1Is);
        text(opponentLetter, player2Is);

        letterSelect.forEach(item => deselect(item));
        select(this);
        isOptionsSet() && show(play);
    }

    function toggleViews () {

        toggleClass(playerScreen, 'active');
        toggleClass(board, 'active');

    }

    function fillInSquare (x, y) {
        // use 'y' because the first argument x has event object passed
        const square = y === undefined ? this : board.querySelector(writePos(x, y));
        if (getText(square) != '') return false;
        text(square, isYourTurn ? player1Is : player2Is);
        if (!checkForWin()) changeTurn();

    }

    function changeTurn () {

        isYourTurn = !isYourTurn;
        toggleClass(yourTurnText, 'bold');
        toggleClass(pointer, 'right');
        toggleClass(opponentTurnText, 'bold');

        if (mode === 'cpu' && !isYourTurn) setTimeout(selectSquare, 200);

    }

    function checkForWin () {

        numPlays++;
        if (numPlays < 5) return false;

        let isWinner = false;

        for (let i = 0; i < 8; i++) {
            const
                line = possibleWins[i],
                l1 = getText(line[0]),
                l2 = getText(line[1]),
                l3 = getText(line[2]);
            if ([l1, l2, l3].indexOf('') == -1 && ( l1 == l2 && l2 == l3 )) {
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

    function commenceVictory () {

        if (isYourTurn) {
            console.log('YOU WIN');
            player1Wins++;
            text(yourWins, player1Wins);
            text(victoryText, 'YOU WIN!');
        }
        else {
            player2Wins++;
            text(opponentWins, player2Wins);
            text(victoryText, mode == 'cpu' ? 'CPU WINS!' : 'PLAYER 2 WINS');
        }

        openModal();

    }

    function replayGame () {

        emptyBoard();
        closeModal();

    }

    function emptyBoard () {
        squares.forEach(square => text(square, ''));
        numPlays = 0;
        !isYourTurn && changeTurn();
    }

    function resetWins () {

        player1Wins = 0;
        player2Wins = 0;
        [yourWins, opponentWins].forEach(elm =>text(elm, '0'))

    }

    function openModal () {
        addClass(victoryScreen, 'modal--open')
    }

    function closeModal () {
        removeClass(victoryScreen, 'modal--open')
    }

    // CPU BEHAVIOUR STARTS HERE

    function selectSquare (redirected) {

        if (numPlays === 1 || redirected) {
            console.log('selecting a random square');
            // 60% (3/5) chance of just playing in the middle if it's available
            if (getText(squares[4]) === '' && Math.floor(Math.random() * 5) > 2) {
                fillInSquare(1, 1);
                return;
            }
            // otherwise, pick a random spot, which could still be the middle if it's available
            else {
                const
                    emptySquares = [...squares].filter(s => getText(s) === ''),
                    randomNumber = Math.floor(Math.random() * emptySquares.length);

                emptySquares[randomNumber].click();
            }
        }
        else choosePlay();

    }

    function choosePlay () {

        const positions = [];
        let pos    = '';

        // winning comes first
        for (let i = 0; i < 8; i++) {
            const stats = getLineStats(i);
            if (stats.own.length === 2 && stats.free) {
                stats.empty[0].click();
                return;
            }
        }

        // then stopping the human from winning
        for (let i = 0; i < 8; i++) {
            const stats = getLineStats(i);
            if (stats.opp.length === 2 && stats.free) {
                stats.empty[0].click();
                return;
            }
        }

        // play on a line if the human hasn't blocked me already
        for (let i = 0; i < 8; i++) {
            const stats = getLineStats(i);
            if (stats.own.length === 1 && stats.free) {
                stats.empty[ Math.floor(Math.random() * stats.empty.length) ].click();
                return;
            }
        }

        // if no lines left to go through, pick a random spot
        selectSquare(true);
    }

    function getLineStats (i) {
        const
            line  = possibleWins[i],
            empty = [...line].filter(s => getText(s) === ''),
            own   = [...line].filter(s => getText(s) === player2Is),
            opp   = [...line].filter(s => getText(s) === player1Is),
            free  = opp.length === 0;

        return {empty, own, opp, free};
    }

}

function generateBoard (parent, callback) {

    const board = document.createElement('table');

    for (let i = 0; i != 3; i++) {

        const row = document.createElement('tr');
        for (let j = 0; j != 3; j++) {
            row.innerHTML += `<td class='square' data-position='${j},${i}' ></td>`;
        }

        board.appendChild(row);
    }

    parent.insertBefore(board, stop);
    callback()
}

generateBoard(board, game);
