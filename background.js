let timerInterval;
let timeLeft = 0;
let onBreak = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startTimer") {
    const { studyTime, breakTime } = message;
    startTimer(studyTime, breakTime);
  } else if (message.action === "getTimerStatus") {
    sendResponse({ timeLeft, onBreak });
  }
});

function startTimer(studyTime, breakTime) {
  timeLeft = studyTime;
  onBreak = false;

  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    timeLeft--;

    if (timeLeft < 0) {
      onBreak = !onBreak;
      timeLeft = onBreak ? breakTime : studyTime;
    }
  }, 1000);
}
