// Define the Question class
class Question {
    constructor(question, options, answer) {
      this.question = question;
      this.options = options;
      this.answer = answer;
    }
}
  
// Define the Quiz class
class Quiz {
    constructor(questions) {
      this.questions = questions;
      this.score = 0;
      this.currentQuestionIndex = 0;
      this.timer = 40;
      this.timerId = null;
    }
  
    // Start the quiz
    start() {
      this.displayQuestion();
      this.startTimer();
    }
  
    // Display the current question and options
    displayQuestion() {
      const questionContainer = document.getElementById('question-container');
      questionContainer.innerHTML = '';
      const currentQuestion = this.questions[this.currentQuestionIndex];
      const questionDiv = document.createElement('div');
      questionDiv.innerHTML = `<p>${this.currentQuestionIndex + 1}. ${currentQuestion.question}</p>`;
      currentQuestion.options.forEach((option) => {
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'answer';
        radio.value = option;
        const label = document.createElement('label');
        label.innerHTML = option;
        questionDiv.appendChild(radio);
        questionDiv.appendChild(label);
        questionDiv.appendChild(document.createElement('br'));
      });
      questionContainer.appendChild(questionDiv);
    }
  
    // Start the timer
    startTimer() {
      const timer = document.getElementById('timer');
      timer.textContent = this.timer;
      this.timerId = setInterval(() => {
        this.timer--;
        timer.textContent = this.timer;
        if (this.timer <= 0) {
          clearInterval(this.timerId);
          this.submit();
        }
      }, 1000);
    }
  
    // Check the answer and update the score
    checkAnswer() {
      const radios = document.getElementsByName('answer');
      radios.forEach((radio) => {
        if (radio.checked) {
          const currentQuestion = this.questions[this.currentQuestionIndex];
          if (radio.value === currentQuestion.answer) {
            this.score++;
            radio.nextElementSibling.style.color = 'green';
          } else {
            radio.nextElementSibling.style.color = 'red';
            const correctRadio = document.querySelector(`input[name="answer"][value="${currentQuestion.answer}"]`);
            correctRadio.nextElementSibling.style.color = 'green';
          }
          this.currentQuestionIndex++;
          if (this.currentQuestionIndex < this.questions.length) {
            setTimeout(() => {
              this.displayQuestion();
            }, 1000);
          } else {
            this.showResults();
          }
        }
      });
    }
  
    // Submit the quiz and display the score
    showResults() {
      clearInterval(this.timerId);
      const numCorrect = this.score;
      const percentage = Math.round((numCorrect / this.questions.length) * 100);
      const timeTaken = this.formatTime(this.timer);
      const resultContainer = document.createElement('div');
      resultContainer.classList.add('result-container');
      const resultText = document.createElement('p');
      resultText.innerHTML = `You got ${numCorrect} out of ${this.questions.length} questions correct (${percentage}%).<br>Time taken: ${timeTaken}.`;
      resultContainer.appendChild(resultText);
      const resultBox = document.createElement('div');
      resultBox.classList.add('result-box');
      if (percentage >= 50) {
        resultBox.classList.add('result-box-green');
      } else {
        resultBox.classList.add('result-box-red');
      }
      resultBox.appendChild(resultContainer);
      const quizContainer = document.querySelector('.quiz-container');
      quizContainer.innerHTML = '';
      quizContainer.appendChild(resultBox);
      const restartBtn = document.createElement('button');
      restartBtn.textContent = 'Restart';
      restartBtn.addEventListener('click', () => {
        this.restart();
      });
      resultContainer.appendChild(restartBtn);
      const quitBtn = document.createElement('button');
      quitBtn.textContent = 'Quit';
      quitBtn.addEventListener('click', () => {
        this.quit();
      });
      quizContainer.appendChild(quitBtn);
    }
  
    // Restart the quiz
    restart() {
      clearInterval(this.timerId);
      window.location.href = 'quizQ.html';
    }
  
    // Quit the quiz
    quit() {
      clearInterval(this.timerId);
      window.location.href = 'quiz.html';
    }
  
    // Format the time as mm:ss
    formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  
    // Submit the quiz and display the score
    submit() {
      clearInterval(this.timerId);
      const numCorrect = this.score;
      const percentage = Math.round((numCorrect / this.questions.length) * 100);
      const timeTaken = this.formatTime(this.timer);
      const resultText = `You got ${numCorrect} out of ${this.questions.length} questions correct (${percentage}%). Time taken: ${timeTaken}.`;
      if (this.timer <= 0) {
        alert('Time is up! ' + resultText);
        window.location.href = 'quiz.html';
      } else {
        alert(resultText);
        window.location.href = `results.html?score=${numCorrect}&total=${this.questions.length}&time=${timeTaken}`;
      }
    }
}
  
  // Create an array of questions
const questions = [
    new Question('Which American artist was a pioneer of Abstract Expressionism?',
     ['John Altoon', 'Romare Bearden', 'Charles Alston', 'Jackson Pollock'], 'Jackson Pollock'),
    new Question('What does the Venus of Brassempouy represent?',
     ['a woman’s head', 'an old man', 'an angel', 'a human figure'], 'a woman’s head'),
    new Question('When did realism begin?',
     ['1940s', '1850s', '1840s', '1950s'], '1850s'),
    new Question('Which artist is known as the creator of Cubism?',
     ['Pablo Picasso', 'Rembrandt', 'Claude Monet', 'Salvador Dalí'], 'Pablo Picasso'),
    new Question('When did Constructivism in art begin?',
     ['1886', '1600', '1770', '1913'], '1913'),
    new Question('Who is known as the father of European painting?',
     ['Pierre Auguste Renoir', 'Walter Satterlee', 'Adolf Waldinge', 'Giotto'], 'Giotto'),
    new Question('Who painted the famous painting The Baptism of Christ?',
     ['Jean-Antoine Watteau', 'John Singleton Copley', 'Andrea del Verrochio', 'Stefan Lochner'], 'Andrea del Verrochio'),
    new Question('Where did realism begin?',
     ['Rome', 'Hungary', 'France', 'USA'], 'France'),
    new Question('What sheen is ceiling paint typically?',
     ['Flat', 'Eggshell', 'Satin', 'matte'], 'Flat'),
    new Question('What provides the most uniform flat painting coating?',
     ['Airless sprayer', 'Rolling', 'Brushing', 'HVLP sprayer'], 'HVLP sprayer')
];
  
const quiz = new Quiz(questions);
  quiz.start();
  
  const submitBtn = document.getElementById('submit-btn');
  submitBtn.addEventListener('click', () => {
    quiz.checkAnswer();
  });