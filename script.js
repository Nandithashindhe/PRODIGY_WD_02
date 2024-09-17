let startTime, elapsedTime, timerInterval;
let running = false, lapCount = 0;

const displayMinutes = document.getElementById('mins');
const displaySeconds = document.getElementById('secs');
const displayMilliseconds = document.getElementById('ms');
const lapList = document.getElementById('lap-list');

function startTimer() {
    if (!running) {
        startTime = Date.now();
        timerInterval = setInterval(updateTime, 10);
        running = true;
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);
    displayMinutes.textContent = formatTime(minutes);
    displaySeconds.textContent = formatTime(seconds);
    displayMilliseconds.textContent = formatTime(milliseconds);
}

function formatTime(value) {
    return value.toString().padStart(2, '0');
}

function pauseTimer() {
    clearInterval(timerInterval);
    running = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    running = false;
    displayMinutes.textContent = '00';
    displaySeconds.textContent = '00';
    displayMilliseconds.textContent = '00';
    lapList.innerHTML = '';
    lapCount = 0;
}

function recordLap() {
    if (running) {
        lapCount++;
        const lapTime = `${displayMinutes.textContent}:${displaySeconds.textContent}:${displayMilliseconds.textContent}`;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);
