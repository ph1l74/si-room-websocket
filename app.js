const CHAR_CTRL = 17;
const socket = new WebSocket('wss://vigorous-curie-c2fd6a.netlify.app:8081');
const btn = document.getElementById('btn');
let timerSet = false;
let startDate, endDate;


const changeButtonColor = (status) => {
    const cl = document.querySelector('.button').classList;
    if (status === 'start') {
        cl.remove('is-danger');
        cl.add('is-success');
    }
    else {
        cl.remove('is-success');
        cl.add('is-danger');
    }
}

const writePlayerStats = playerStats => {
    const line = document.createElement('div');
    line.innerHTML = `<h3><b>${playerStats.name}</b>: ${playerStats.time} мсек.</h3>`;
    playersArea.appendChild(line);
}

const clearPlayersArea = () => {
    playersArea.innerHTML = "";
}

const writeYourTime = (time) => {
    const timeSpan = document.getElementById('time');
    timeSpan.innerHTML = `${time} мсек`;
}

socket.onmessage = event => {
    console.log(event.data);
    let data = JSON.parse(event.data);
    if (data.playerStats) {
        writePlayerStats(data.playerStats);
    }

    if (data.timerSet) {
        if (data.timerSet === 'start') {
            startTimer();
        }
        else if (data.timerSet === 'stop') {
            stopTimer();
        }
    }
}

const startTimer = () => {
    startDate = new Date().getTime();
    timerSet = true;
    changeButtonColor('start');
    clearPlayersArea();
}

const stopTimer = () => {
    endDate = new Date().getTime();
    timerSet = false;
    changeButtonColor('stop');
}

const getPlayerTime = () => {
    return endDate - startDate;
}

const getName = () => {
    const inputName = document.getElementById('inputName');
    return inputName.value;
}

const btnPressHandler = (timerStatus) => {
    if (timerStatus) {
        stopTimer();
        let playerName = getName();
        const playerTime = getPlayerTime();
        writeYourTime(playerTime);
        const playerStats = { name: playerName, time: playerTime };
        const msg = JSON.stringify({ playerStats: playerStats, timerSet: 'stop' })
        console.log(msg);
        socket.send(msg);
    }
}

window.addEventListener('keydown', e => {
    if (e.keyCode === CHAR_CTRL) {
        btnPressHandler(timerSet);
    }
})

btn.addEventListener('click', e => {
    btnPressHandler(timerSet);
})

