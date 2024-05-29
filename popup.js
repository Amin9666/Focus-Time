document.getElementById('start-button').addEventListener('click', function() {
    const studyTime = parseInt(document.getElementById('study-time').value) * 60;
    const breakTime = parseInt(document.getElementById('break-time').value) * 60;
  
    chrome.runtime.sendMessage({ action: "startTimer", studyTime, breakTime });
  });
  
  function updateTimerDisplay(timeLeft, onBreak) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timerDisplay = document.getElementById('timer');
    
    timerDisplay.textContent = `${onBreak ? 'Break' : 'Study'} Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  
  function getTimerStatus() {
    chrome.runtime.sendMessage({ action: "getTimerStatus" }, (response) => {
      updateTimerDisplay(response.timeLeft, response.onBreak);
    });
  }
  
  setInterval(getTimerStatus, 1000);
  