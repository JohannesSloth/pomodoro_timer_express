const pomodoroLength = 15 * 60; // 15 minutes in seconds
const breakLength = 3 * 60; // 3 minutes in seconds

let timerId;
let timeLeft;
let isPomodoro = true; // start with pomodoro
let isRunning = false;
let isPaused = false;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function updateTime() {
  const timerElement = document.getElementById('timer');
  timerElement.textContent = formatTime(timeLeft);
}

function startTimer() {
  isRunning = true;
  timerId = setInterval(() => {
    timeLeft -= 1;
    if (timeLeft <= 0) {
      clearInterval(timerId);
      isPomodoro = !isPomodoro;
      timeLeft = isPomodoro ? pomodoroLength : breakLength;
      const sound = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3');
      sound.play();
      startTimer();
    } else {
      updateTime();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId);
  isRunning = false;
  isPaused = false;
}

function pauseTimer() {
  clearInterval(timerId);
  isRunning = false;
  isPaused = true;
}

function resumeTimer() {
  isRunning = true;
  isPaused = false;
  startTimer();
}

function resetTimer() {
  stopTimer();
  isPomodoro = true;
  timeLeft = pomodoroLength;
  updateTime();
}

function skipToBreak() {
    isPomodoro = false;
    timeLeft = breakLength;
    updateTime();
  }

const startButton = document.getElementById('start-button');
startButton.addEventListener('click', function() {
  if (!isRunning && !isPaused) {
    startTimer();
  } else if (isPaused) {
    resumeTimer();
  }
});

const pauseButton = document.getElementById('pause-button');
pauseButton.addEventListener('click', function() {
  if (isRunning) {
    pauseTimer();
  }
});

const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', function() {
  resetTimer();
});

const skipButton = document.getElementById('skip-button');
skipButton.addEventListener('click', function() {
  skipToBreak();
});

// initialize timer
timeLeft = pomodoroLength;
updateTime();
