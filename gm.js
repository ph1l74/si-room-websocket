const CHAR_RETURN = 13;
var HOST = location.origin.replace(/^http/, 'ws')
const socket = new WebSocket(HOST);
const playersArea = document.getElementById('playersArea');

const writePlayerStats = playerStats => {
    const line = document.createElement('div');
    line.innerHTML = `<h3><b>${playerStats.name}</b>: ${playerStats.time}</h3>`;
    playersArea.appendChild(line);
}

const clearPlayersArea = () => {
    playersArea.innerHTML = "";
}

const startTimer = () => {
    clearPlayersArea();
    const msg = JSON.stringify({ timerSet: 'start' });
    socket.send(msg);
}

const stopTimer = () => {
    const msg = JSON.stringify({ timerSet: 'stop' });
    socket.send(msg);
}

socket.onmessage = event => {
    let data = JSON.parse(event.data);
    if (data.playerStats) {
        writePlayerStats(data.playerStats);
    }
}