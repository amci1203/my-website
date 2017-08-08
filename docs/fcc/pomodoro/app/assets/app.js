(function Pomodoro (pomo) {

    if (!pomo) return false;

    getStringPrototypes();

    const
        get          = id => document.getElementById(id),
        byClass      = (elm, _class) => elm.querySelectorAll(`.${_class}`),
        // takes either a number in ms to reduce to minutes or a whole number (in minutes) to multiply to seconds
        inSeconds = (n, isInMs) => isInMs ? n / 1000 : n * 60,
        text      = (elm, str) => elm.innerText = str,
        isInbound = (n, i) => !(n == minLen && i == -1) && !(n == maxLen && i == 1),
          
        toggleClass  = (elm, ...classes) => classes.forEach(cls => elm.classList.toggle(cls)),
        hasClass     = (elm, str) => elm.classList.contains(str),
        addClass     = (elm, ...classes) => classes.forEach(cls => elm.classList.add(cls)),
        removeClass  = (elm, ...classes) => classes.forEach(cls => elm.classList.remove(cls)),
          
        click        = (elm, fn)  => elm.addEventListener('click', fn),
        clickEach    = (list, fn) => list.forEach(elm => click(elm, fn)),

        toggle = get('toggle-play'),
        timer  = get('timer'),
        timerC = get('timer-container'),
        timerM = get('timer-minutes'),
        timerS = get('timer-seconds'),

        stopBtn     = get('stop'),
        sessionSpan = get('session-length'),
        breakSpan   = get('break-length'),

        increments = byClass(pomo, 'increment'),
        alarm = get('alarm'),

        second = 1000,
        minute = second * 60,
          
        minLen = 1,
        maxLen = 99,

        breakClass = 'on-break',
        
        setTimer   = () => {
            left++;
            tick();
        },  
          
        startTimer  = () => {
            start = setInterval(tick, second);
            disableIncrementControls();
            removeClass(stopBtn, 'hidden');
        },

        pauseTimer  = () => clearInterval(start),

        resetTimer  = () => left = inSeconds(hasClass(timerC, breakClass) ? breakLen : sessionLen ),                   

        stopTimer   = () => {
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

        toggleTimer = () => {
            hasClass(toggle, 'play') ? startTimer() : pauseTimer();
            toggleClass(toggle, 'play', 'pause');
        },
          
        // toggles STOP button visibility as well
        disableIncrementControls  = () => increments.forEach(elm => addClass(elm, 'disabled')),
        activateIncrementControls = () => increments.forEach(elm => removeClass(elm, 'disabled')),

        ring = () => alarm.play();
    let
        start,

        sessionLen = 25,
        breakLen   = 5,

        left = inSeconds(sessionLen);

    function tick () {
        left--
        text(timerM, String(Math.floor(left / 60)).padLeft(2,0));
        text(timerS, String(left % 60).padLeft(2,0));

        if (!left) {
            toggleClass(timerC, breakClass);
            ring();
            resetTimer();
        }
    }

    function incrementTimerLength () {
        const
            controls  = this.parentElement.id.split(':')[1],
            increment = hasClass(this, 'increment-up') ? 1 : -1,
            onBreak   = hasClass(timerC, breakClass);

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

    return (() => {
        click(toggle, toggleTimer);
        clickEach(increments, incrementTimerLength);
        click(stopBtn, stopTimer);

        text(sessionSpan, sessionLen);
        text(breakSpan, breakLen);

        setTimer();
    })()

})(document.getElementById('pomodoro'))

function getStringPrototypes () {
    String.prototype.padLeft    = function (targetLength, padString) {
        if (this.length >= targetLength) return this;
        else {
            if (['number', 'string'].indexOf(typeof(padString)) !== -1) {
                const pad  = String(padString);
                let target = this.split('*');
                while (target.length < targetLength) {
                    target.unshift(pad);
                }
                return target.join('');
            } else {
                throw new Error('Err: padString is not a number or string');
            }
        }
    }
}