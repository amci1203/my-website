const
    get   = id => document.getElementById(id),
    text  = (elm, str) => str ? elm.innerText = str : elm.innerText,
    set   = (elm, attr, val) => elm.setAttribute(attr, val),
    click = (elm, fn) => elm.addEventListener('click', fn),
    
    users = document.createElement('main'),
      
    api       = 'https://wind-bow.gomix.me/twitch-api',
    getUser   = (user, cb) => jsonp(`${api}/users/${user}`, cb),
    getStream = (user, cb) => jsonp(`${api}/streams/${user}`, cb),
      
    usernames = [
        "ESL_SC2",
        "OgamingSC2",
        "cretetion",
        "freecodecamp",
        "storbeck",
        "habathcx",
        "RobotCaleb",
        "noobs2ninjas",
        "comster404"
    ],
      
    placeholders = {
        name : '404',
        logo : 'assets/img/twitch-logo.png',
        bio  : '(Nothing to show here)'
    }

function getUsers () {
    usernames.forEach(user => getUser(user, pushUser));
    document.body.appendChild(users);
}

function getStreams () {
    usernames.forEach(user => getStream(user, addStreamData));
}

function pushUser (user) {
    console.log(user);
    
    const
        card = document.createElement('a'),
        logo = user.logo || placeholders.logo,
        name = user.display_name || placeholders.name,
        bio  = user.bio || placeholders.bio;
    
    Object.assign(card, {
        id: user.name,
        href: `https://www.twitch.tv/${user.name}`,
        target: '_blank',
        innerHTML: (`
            <img src='${logo}' />
            <h2 class='section-title subtitle'>${name}</h2>
            <p>${bio}</p>
        `)
    })
    
    users.appendChild(card);
    
}

function addStreamData (data) {
    if (!data.stream) return false;
    console.log(data.stream);
    
    const
        stream = data.stream,
        card   = get(stream.channel.name),
        span   = document.createElement('span');
    
    span.innerHTML = 'LOOK AT ME';
    
    card.appendChild(span);
}

const jsonp = (function () {
    let numCalls = 0;
    return function (target, cb) {
        numCalls++;

        const
            script = document.createElement('script'),
            join   = (target.indexOf('?') == -1 ? '?' : '&') + 'callback=',
            cbStr  = 'JSON_CALLBACK' + numCalls;
        
        script.onload = script.remove;
        script.src = target + join + cbStr;
        document.body.appendChild(script);
        window[cbStr] = cb;
    }
})();

(() => {
   
    users.id = 'users'
    getUsers();
    getStreams();
    
})()