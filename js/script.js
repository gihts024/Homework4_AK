// Global Variables for the registration
var firstName = document.querySelector("#fName");
var lastName = document.querySelector("#lName");
var signUpButton = document.querySelector("#signUp");
var msgDiv = document.querySelector("#mssg");
var userfNameSpan = document.querySelector('#user-fName');
var userlNameSpan = document.querySelector('#user-lName');
var Registered = document.querySelector('#registered');
var fName = localStorage.getItem ('fName');
var lName = localStorage.getItem ('lName');

// initiate the registration
renderRegistered();

function displayMessage(type, message) {
    msgDiv.textContent = message;
    msgDiv.setAttribute("class", type);
  };
// Create a local storage for the Names created
function renderRegistered (){
// Ensure that we must have a first and last initial/name.
    if (!fName || !lName){
        return;
    }
        userfNameSpan.textContent = fName;
        userlNameSpan.textContent = lName;
    };
// On signing up it checks the minimum requirements are met. 

signUpButton.addEventListener("click", function(event) {
    event.preventDefault();

    var fName=document.querySelector('#fName').value;
    var lName = document.querySelector('#lName').value;

if (fName === "") {
    displayMessage("error", "first Name cannot be blank");
  } else if (lName === "") {
    displayMessage("error", "Last Name cannot be blank");
  } else {
    displayMessage("success", "Registered successfully");
// After registration we create a storage for the new user
    localStorage.setItem("fName", fName);
    localStorage.setItem("lName", lName);
    instructions ();
    renderRegistered();
  }
}
);

// Once registration is done, we initiate the instructions
function instructions (){
   var testLink= document.getElementById('open');
   testLink.style.display = "block";
  
    document.getElementById("open").addEventListener("click",instructionsLoad);
    
};


function instructionsLoad(){
    var newDiv = document.createElement("div");
    var newInstructions = document.createTextNode ("This is a timed quiz. You have 10 seconds to complete. The results will show at the end");
newDiv.appendChild(newInstructions);
var currentDiv = document.getElementById ("instructions");
currentDiv.parentElement.insertBefore(newDiv,currentDiv);

};

// In future the exam will have multiple quizes based on the user level.
// var quizButton = document.createElement("startQuiz");
var beginner =document.getElementById("#beginner");
var intermediary = document.getElementById("intermediary");
var expert = document.getElementById("expert");

function quizButton(context, func) {
  var button = document.createElement("input");
  button.type = "button";
  button.value = "startQuiz";
  button.onclick = function startQuizSelection (){

    if (expert===true) {
      quiz = ExpertQuiz;
    } else if (intermediary === true) {
      quiz = intermediaryQuiz;
    } else
    return;
  };
  // context.appendChild(button);
}

document.getElementById("open").addEventListener("click",function() {
  quizButton(document.body, function() {
      quizButton(this.parentNode, this.onclick);
  });
  console.log("Lets get started")
});

// We now initiate the quiz

//select the next question
var quizHome= document.querySelector(".questionsbox");
var start = document.getElementById ("sign-up");
//select the next 
var index =0;
var question = document.getElementById("question");
var Quizquestion = document.getElementById ("Quizquestion");
var choiceA = document.getElementById ("A");
var choiceB = document.getElementById ("B");
var choiceC = document.getElementById ("C");
var choiceD = document.getElementById ("D");
var blankQuestion = document.querySelector(".questionbox");
// var next = blankQuestion.querySelector(".next");
// var prev = blankQuestion.querySelector(".prev");
var nextQuestion = document.querySelectorAll["questionsPrompt"];


var scoreBlock = document.getElementById("scoreBlock");
var scoreMessage = document.getElementById("scoreMessage");
var quizAgain = document.getElementById("quizAgain");
var choices = document.getElementById("choices");
var choiceResponse = document.getElementById("choiceResponse");
var score = 0;

// blankQuestion = document.body.children[0].children[0];

// Now we set the quiz as a variable
let questions = [
    {
    question : "1. Which of the following is not JavaScript Data Types?",
    choiceA: "A. Undefined",
    choiceB: "B. Number",
    choiceC: "C. Boolean",
    choiceD: "D. Float",
    correct: "A"
},{
    question :"2. Which company developed JavaScript?",
    choiceA: "A. Netscape",
    choiceB: "B. Bell Labs",
    choiceC: "C. Sun Microsystems",
    choiceD: "D. IBM",
    correct: "A"
},{
    question : "3. How can you get the type of arguments passed to a function?",
    choiceA: "A. using typeof operator",
    choiceB: "B. using getType function",
    choiceC: "C. Both of the above.",
    choiceD: "D. None of the above.",
    correct: "B"
},{
    question : "4. Which of the following is correctanswer about features of JavaScript?" ,
    choiceA: "A. It can not Handling dates and time." ,
    choiceB: "B. JavaScript is a object-based scripting language." ,
    choiceC: "C. JavaScript is not interpreter based scripting language." ,
    choiceD: "D. All of the above" ,
    correct: "B"
},{
    question : " 5. Which of the following is not Javascript frameworks or libraries?",
    choiceA: "A. Polymer" ,
    choiceB: "B. Meteor" ,
    choiceC: "C. Cassandra" ,
    choiceD: "D. jQuery",
    correct: "D"
}


];

var lastQuestion = questions.length - 1;
var currentQuestion = 0;
var count = 0;

// Now we get a function to initiate the quiz
function initiateQuiz (){
    let q = questions[currentQuestion];
    Quizquestion.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

// We set a function to initiate the timer

// Selects element by class
var timeEl = document.querySelector(".time");


// Selects element by id
var mainEl = document.getElementById("main");

var secondsLeft = 10;

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft;

    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      sendMessage();
    } else if (secondsLeft > 0) {
        initiateQuiz ();
    }

  }, 1000);
}


// function startQuiz() {
  document.getElementById("open").addEventListener("click",startQuiz);
    // start.addEventListener("click",startQuiz);
    // start quiz
    function startQuiz(){
        start.style.display = "none";
        renderProgress();
        setTime();
    }
// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

function checkAnswer(answer){
    if( answer == questions[currentQuestion].correct){
        // answer is correct
        score++;
        CorrectAnswer();
    }else{
        // answer is wrong
        wrongAnswer();
    }
    count = 0;
    if(currentQuestion < lastQuestion){
        currentQuestion++;
        initiateQuiz();
    }else{
        // end the quiz and show the score
        clearInterval();
    }
}

// answer is correct
var selection = document.querySelector("#selection");
function CorrectAnswer(){
    document.getElementById(currentQuestion).innerHTML = 'answer correct';
    console.log('answer correct');
    // prompt('answer correct');
}
// answer is Wrong
function wrongAnswer(){
  document.getElementById(currentQuestion).innerHTML = 'answer wrong';
    console.log('answer wrong');
  // prompt('answer wrong');
};

// Function to send score report
function sendMessage() {
    timeEl.textContent = "Your score" +fName  +score;
  };

