document.addEventListener('DOMContentLoaded', function() {
  var equationElement = document.getElementById('equation');
  var answerInput = document.getElementById('answer');
  var timerElement = document.getElementById('timer');
  var scoreElement = document.getElementById('score');
  var startButton = document.getElementById('start-btn');

  var timer;
  var timeLeft = 10;
  var score = 0;
  var isPlaying = false;

  // Generate a random addition equation
  function generateEquation() {
    var num1 = Math.floor(Math.random() * 10);
    var num2 = Math.floor(Math.random() * 10);
    var equation = num1 + " + " + num2;
    var result = num1 + num2;
    equationElement.textContent = equation;
    return result;
  }

  // Start the game
  function startGame() {
    if (!isPlaying) {
      isPlaying = true;
      startButton.disabled = true;
      answerInput.disabled = false;
      answerInput.focus();
      score = 0;
      scoreElement.textContent = score;
      timeLeft = 10;
      timerElement.textContent = timeLeft;

      var result = generateEquation();

      // Countdown timer
      timer = setInterval(function() {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft === 0) {
          endGame();
        }
      }, 1000);

      // Check the answer
      answerInput.addEventListener('input', function() {
        var userAnswer = parseInt(answerInput.value);
        if (userAnswer === result) {
          clearInterval(timer);
          timeLeft++;
          timerElement.textContent = timeLeft;
          score++;
          scoreElement.textContent = score;
          answerInput.value = '';
          result = generateEquation();
          timer = setInterval(function() {
            timeLeft--;
            timerElement.textContent = timeLeft;
            if (timeLeft === 0) {
              endGame();
            }
          }, 1000);
        }
      });
    }
  }

  // End the game
  function endGame() {
    isPlaying = false;
    startButton.disabled = false;
    answerInput.disabled = true;
    answerInput.value = '';
    clearInterval(timer);
  }

  // Event listener for the start button
  startButton.addEventListener('click', startGame);
});
