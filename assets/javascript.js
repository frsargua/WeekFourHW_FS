// Variables
var question = document.querySelector("#question");
var optionA = document.querySelector("#A");
var optionB = document.querySelector("#B");
var optionC = document.querySelector("#C");
var optionD = document.querySelector("#D");



let score = 0;
let time = 60;

let questions = {
    questionsOne:{
        question:"What is 2 * 2 equals to?",
        answer:"4",
        options:['FAKE','FAKE','FAKE']
    },
    questionsTwo:{
        question:"What is 2 * 3 equals to?",
        answer:"6",
        options:['FAKE','FAKE','FAKE']

    },
    questionsThree:{
        question:"What is 2 * 4 equals to?",
        answer:"8",
        options:['FAKE','FAKE','FAKE']

    },
    questionsFour:{
        question:"What is 2 * 5 equals to?",
        answer:"5",
        options:['FAKE','FAKE','FAKE']

    }
};

question.textContent = questions.questionsOne.question;
optionA.textContent = questions.questionsOne.answer;
optionB.textContent = questions.questionsOne.options[0];
optionC.textContent = questions.questionsOne.options[1];
optionD.textContent = questions.questionsOne.options[2];




function validator(input, questionNumber){
    if(input == questions[questionNumber].answer){
        score++;
        questionNumber++
    }else{
        time =-5;
        questionNumber++
    }
}

function nextQuestion(){
    // Add actionlistener, this should pick up when the next button is submited
    questionBox.innerText = questions[questionNumber].question;
}


// This should replace the question blocks for a form block, change from display none to dispaly block
function recorder(){
    // Call querryselector to change the style of the form block from none to block. This makes it visible. 

}