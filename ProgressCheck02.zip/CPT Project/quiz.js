let myQuestions = [
  {
    question: "What is the legal speed limit in a school zone unless otherwise posted?",
    answers: {
      a: '20 mph',
      b: '25 mph',
      c: '30 mph'
    },
    correctAnswer: 'a'
  },
  {
    question: "When can you legally turn on a red light?",
    answers: {
      a: 'Never',
      b: 'Only when there is no "No turn on red" sign',
      c: 'Only when directed by a police officer'
    },
    correctAnswer: 'b'
  },
  {
    question: "What does a triangular red and white sign indicate?",
    answers: {
      a: 'Stop',
      b: 'Yield',
      c: 'Speed Limit'
    },
    correctAnswer: 'b'
  },
  {
    question: "A circular yellow sign with a black X and two R’s signifies:",
    answers: {
      a: 'A railroad crossing ahead',
      b: ' A roundabout',
      c: 'Restricted area'
    },
    correctAnswer: 'a'
  }
];

let quizContainer = document.getElementById('quiz');
let resultsContainer = document.getElementById('results');
let submitButton = document.getElementById('submit');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

  function showQuestions(questions, quizContainer){
    // we'll need a place to store the output and the answer choices
    let output = [];
    let answers;

    // for each question...
    for(let i = 0; i<questions.length; i++){
      
      // first reset the list of answers
      answers = [];

      // for each available answer...
      for(letter in questions[i].answers){

        // ...add an html radio button
        answers.push(
          '<label>'
            + '<input type="radio" name="question'+i+'" value="'+letter+'">'
            + letter + ': '
            + questions[i].answers[letter]
          + '</label>'
        );
      }

      // add this question and its answers to the output
      output.push(
        '<div class="question">' + questions[i].question + '</div>'
        + '<div class="answers">' + answers.join('') + '</div>'
      );
    }

    // finally combine our output list into one string of html and put it on the page
    quizContainer.innerHTML = output.join('');
  }


  function showResults(questions, quizContainer, resultsContainer){
    
    // gather answer containers from our quiz
    let answerContainers = quizContainer.querySelectorAll('.answers');
    
    // keep track of user's answers
    let userAnswer = '';
    let numCorrect = 0;
    
    // for each question...
    for(let i=0; i<questions.length; i++)
	{

      // find selected answer
      userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
      
      // if answer is correct
      if(userAnswer===questions[i].correctAnswer){
        // add to the number of correct answers
        numCorrect++;
        
        // color the answers green
        answerContainers[i].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else
	  {
        // color the answers red
        answerContainers[i].style.color = 'red';
      }
    }

    // show number of correct answers out of total
    resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
  }

  // show questions right away
  showQuestions(questions, quizContainer);
  
  // on submit, show results
  submitButton.onclick = function()
  {
    showResults(questions, quizContainer, resultsContainer);
  }

}