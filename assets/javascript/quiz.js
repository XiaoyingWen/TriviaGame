//quiz contents from https://www.tutorialspoint.com/jquery/jquery_online_quiz.htm
//array of question object with each the question, the answer choices and the correct answer are included
var questions = [
  {question: "Q 1 - Which of the following is correct about jQuery?",
  choices: ["A - jQuery is a fast and concise JavaScript Library created by John Resig in 2006 with a nice motto - Write less, do more.",
  "B - jQuery simplifies HTML document traversing, event handling, animating, and Ajax interactions for rapid web development.",
  "C - jQuery is a JavaScript toolkit designed to simplify various tasks by writing less code.",
  "D - All of the above."],
  anwser:3  },
  {question: "Q 2 - Which of the following type of variable takes precedence over other if names are same?",
  choices: ["A - global variable",
  "B - local variable",
  "C - Both of the above.",
  "D - None of the above." ],
  anwser:1  },
  {question: "Q 3 - Which of the following is correct about jQuery selector?",
  choices: ["A - A jQuery Selector is a function which makes use of expressions to find out matching elements from a DOM based on the given criteria.",
  "B - jQuery selectors are used to select one or more HTML elements using jQuery.",
  "C - jQuery selectors start with the dollar sign and parentheses - $()",
  "D - All of the above."],
  anwser:3  },
  {question: "Q 4 - Which of the following jQuery method get the text contents of an element?",
  choices: ["A - text( )",
  "B - getText( )",
  "C - getContent( )",
  "D - None of the above."],
  anwser:0  },
  {question: "Q 5 - Which of the following jQuery method set the value of an element?",
  choices: ["A - setContent( val )",
  "B - val( val )",
  "C - setValue( val )",
  "D - None of the above."],
  anwser:1  },
  {question: "Q 6 - Which of the following jQuery method finds all sibling elements after the current element?",
  choices: ["A - locateNextAll( selector )",
  "B - getNextAll( selector)",
  "C - nextAll( selector )",
  "D - None of the above."],
  anwser:2  },
  {question: "Q 7 - Which of the following jQuery method gets the height property of an element?",
  choices: ["A - getCSSHeight( )",
  "B - getHeight( )",
  "C - height( )",
  "D - None of the above."],
  anwser:2  },
  {question: "Q 8 - Which of the following jQuery method returns the outer width (including the border) of an element?",
  choices: ["A - getCSSWidth( )",
  "B - getWidth( )",
  "C - outerWidth( [margin] )",
  "D - None of the above."],
  anwser:2  },
  {question: "Q 9 - Which of the following jQuery method binds a function to be executed whenever the DOM is ready to be traversed and manipulated?",
  choices: ["A - ready(fn)",
  "B - load(fn)",
  "C - reload(fn)",
  "D - None of the above."],
  anwser:0  },
  {question: "Q 10 - Which of the following jQuery method can be used to attach a function to be executed when all AJAX requests have ended?",
  choices: ["A - ajaxStart( callback )",
  "B - ajaxComplete( callback )",
  "C - ajaxSend( callback )",
  "D - ajaxStop(callback)"],
  anwser:3  }
];

//the string to tell all the correct answers of the quiz
var anwsersToDisplay = "";

//labels for the anwser choices
var choiceLabels=['A', 'B', 'C', 'D'];

//counter for the countdown setting - in second
var counter = 61;

//count variables for the quiz result
var numberOfRightAnswers = 0;
var numberOfWrongAnswers = 0;
var numberOfUnAnwsered = 0;

// display the quiz contents as the ordered list of radio buttons
// name of the radio button would be 'Q'+ the question index of the quiz contents
// value for each radio selection would be the anwser choice index for the specific question
// also setup anwsersToDisplay for later display when needed
function initQuestions(){
  $.each(questions, function(qIndex, value){
    $('ol').append('<li><p>' + this.question + '</p>');
     $.each(this.choices, function(aIndex, choice){
        $('ol').append('<input type="radio" name="Q' + qIndex + '" value="' + aIndex +'"> ' + choice + '<br>');
     });
    $('ol').append('</li><br>');

    //put the right answer of the question into anwsersToDisplay
    var qNumToDisplay = qIndex + 1;
    anwsersToDisplay+='Q' + qNumToDisplay + ':' + choiceLabels[this.anwser] + '  ';
  });
}

//check the selections for the quiz and display the result
function checkResult(){
  //initiate all the result counters
  numberOfRightAnswers = 0;
  numberOfWrongAnswers = 0;
  numberOfUnAnwsered = 0;

  //for each question, get the selected answer, 
  //compare to the correct answer and caculate the result counters
  //$("li" ).each(function( index ) {
  $.each(questions, function(qIndex, value){
      var radioValue = $("input[name='Q" + qIndex + "']:checked").val();
      if(radioValue){ //any choice been selected 
          if(parseInt(radioValue) === this.anwser){
            numberOfRightAnswers++;
          } else{
            numberOfWrongAnswers++;
          }
      } else { //no choice been selected 
          numberOfUnAnwsered++;
      }
  });
}

//set 1 Minute time-up for the quiz
//every second check if time's up
//if time is used up display the result and all the correct answers as the referece 
//else display the number of seconds left
function startQuiz(){
  //hide quiz result and start button
  $('#result').css('display', 'none');
  $('#start-button').css('display', 'none');

  //reset all the selections and display the questions with selections
  $("input[type='radio']").prop('checked',false);
  $('#questions').css('display', 'block');

  //1 Minutes is given for the quiz
  counter = 61; 

  //display quiz countdown timer
  $('#countdown').css('display', 'block');

  //every second check the counter and take actions based on the counter value
  var timeCounter = setInterval(timeCheck, 1000);
  function timeCheck(){
    if(counter == 1){ //time's up as we start from 61
      //stop checking every second
      clearInterval(timeCounter);
      
      //hide the countdown
      $('#countdown').css('display', 'none');

      //hide questions
      $('#questions').css('display', 'none');

      //check the user's selections for the quiz
      checkResult();
      
      //display the result and all the correct answers as the reference
      $('#numberOfRightAnswers').text(numberOfRightAnswers);
      $('#numberOfWrongAnswers').text(numberOfWrongAnswers);
      $('#numberOfUnAnwsered').text(numberOfUnAnwsered);
      $('#correctAnswers').text(anwsersToDisplay);
      $('#result').css('display', 'block');
      $('#start-button').css('display', 'block');

    } else { //still have time 
      //update the message for number of seconds left
      counter--;
      $('#numberOfSecLeft').text(counter);
    }
  }
}


$(document).ready(function(){
  // setup the questions but hide them
  $('#questions').css('display', 'none');
  initQuestions();

  //hide quiz countdown timer
  $('#countdown').css('display', 'none');

  //hide quiz result
  $('#result').css('display', 'none');

  //setup the button to start the quiz
  $("input[type='button']").click(function(){
    startQuiz();
  });
});
