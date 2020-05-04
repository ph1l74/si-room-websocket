const CHAR_RETURN = 13;
const socket = new WebSocket('ws://0.0.0.0:8081')
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
    const msg = JSON.stringify({timerSet: 'start'});
    console.log(msg);
    socket.send(msg);
}

const stopTimer = () => {
    const msg = JSON.stringify({timerSet: 'stop'});
    console.log(msg);
    socket.send(msg);
}