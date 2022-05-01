const questLandingEl = document.getElementById("quest-landing");
const countdownEl = document.getElementById("countDown");
const startButton = document.getElementById("quizz-action-button");
const questionEl = document.getElementById("question");

// Object for questions
const questions = { 
    questionOne:{
        question:'Where it the University of Birmingham?',
        correct:'Birmingham',
        answers:["Birmingham","Leeds"]
    },
    questionTwo:{
        question:'When did the UK leave the EU?',
        correct:2016,
        answers:[2018,2000]
    },
    questionThree:{
        question:'Where it the University of Manchester?',
        correct:'Uk',
        answers:["USA","Germany"]
    },
    questionFour:{
        question:'How is the weather in the UK during winter?',
        correct:'Cold',

        answers:["warm","hot"]
    }
}



// 
const handleStartButtonClick = () => {
  removeBanner();
  countDown();
  showQuestion();
};


// Remove banner
const removeBanner = () => {
  console.log("remove banner");
  questLandingEl.remove();
};

// This is a countdown function
const countDown = () => {
  let startTime = 5;
  let timeIntervals = setInterval(function () {
    startTime--;
    countdownEl.textContent = startTime;
    if (startTime == 0) {
      clearInterval(timeIntervals);
    }
  }, 1000);
};

const showQuestion = ()=>{
    questionEl.textContent=JSON.stringify(questions[0][0]);
}

// Event listener to start the code
startButton.addEventListener("click", handleStartButtonClick);
