const questLandingEl = document.getElementById("landing-page");
const countdownEl = document.getElementById("countDown");
const startButton = document.getElementById("quizz-action-button");
const scoreEl = document.getElementById("score");
const highScoreButton = document.getElementById("HighScoreButton");
// const questionEl = document.getElementById("question");
const mainEl = document.getElementById("main");

// Object for questions
const questions = [
  {
    question: "Where it the University of Birmingham?",
    correct: "Birmingham",
    answers: ["Manchester", "Birmingham", "Leeds"],
  },
  {
    question: "When did the UK leave the EU?",
    correct: 2020,
    answers: [2018, 2020, 2000],
  },
  {
    question: "Where it the University of Manchester?",
    correct: "UK",
    answers: ["USA", "Germany", "UK"],
  },
  {
    question: "How is the weather in the UK during winter?",
    correct: "COLD",
    answers: ["COLD", "WARM", "HOT"],
  },
  {
    question: "what is the cleanest mode of transport?",
    correct: "TRAM",
    answers: ["CAR", "BUS", "TRAM"],
  },
  {
    question: "when will the common wealth games take place in Birmingham?",
    correct: "2022",
    answers: ["2024", "2022", "2300"],
  },
];

// Variables for Score, Start Time and Question index.
let score = 0;
let startTime = 20;
let questionIndex = 0;

/* Create a question section with javascript and appends it to the main element in index.html*/
const renderQuestion = () => {
  console.log("render question");

  // Create section and adding its attributes
  const section = document.createElement("section");
  section.setAttribute("class", "quest-quiz");
  section.setAttribute("id", "quest-container");

  // Create h2 header for section and adding its attributes.
  const h2 = document.createElement("h2");
  h2.setAttribute("class", "content-section-title");
  // This line updates the question that is shown.
  h2.textContent = `Question ${questionIndex + 1}. ${
    questions[questionIndex].question
  }`;

  // Create parent of list elements.
  const ul = document.createElement("ul");

  // Creates 3 list elements and adds its attributes
  // First list item
  const li1 = document.createElement("li");
  li1.setAttribute("class", "list-item");
  li1.setAttribute("data-value", questions[questionIndex].answers[0]);
  li1.textContent = questions[questionIndex].answers[0];

  // Second list item
  const li2 = document.createElement("li");
  li2.setAttribute("class", "list-item");
  li2.setAttribute("data-value", questions[questionIndex].answers[1]);
  li2.textContent = questions[questionIndex].answers[1];

  // Third list item
  const li3 = document.createElement("li");
  li3.setAttribute("class", "list-item");
  li3.setAttribute("data-value", questions[questionIndex].answers[2]);
  li3.textContent = questions[questionIndex].answers[2];

  // Appending li's to ul
  ul.append(li1, li2, li3);

  // Appending ul and h2 to section tag
  section.append(h2, ul);

  // Appending section to main element
  mainEl.append(section);

  // This event listener changes the questions and determines if they are right or wrong
  section.addEventListener("click", handleOptionClick);
};

/* Creates a form section with javascript and appends it to the main element in index.html.*/
const renderForm = () => {
  // This line checks if the function is running
  console.log("render form");

  // Creating section and adding its attributes
  const section = document.createElement("section");
  section.setAttribute("class", "feedback-form-section");
  section.setAttribute("id", "feedback-form");
  section.setAttribute("name", "feedback-form");

  // Creating h2 title and adding its attributes
  const h2 = document.createElement("h2");
  h2.setAttribute("class", "title");
  h2.textContent = "Record your score";

  //Creating form,inputContainer and input element
  const form = document.createElement("form");
  const inputContainer = document.createElement("div");
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("id", "full-name");
  input.setAttribute("class", "form-input");
  input.setAttribute("placeholder", "Enter full name");
  // Appending input to inputContainer
  inputContainer.append(input);

  // Creating form submit button and setting attributes.
  const buttonContainer = document.createElement("div");
  buttonContainer.setAttribute("class", "form-control");
  const button = document.createElement("button");
  button.setAttribute("type", "submit");
  button.setAttribute("class", "button");
  button.textContent = "Submit";
  // Appending button to buttonContainer
  buttonContainer.append(button);

  // Appending inputContainer and buttonContainer to form.
  form.append(inputContainer, buttonContainer);
  // Appending h2 title and form elements to section.
  section.append(h2, form);
  // Appending section to mainEl element.
  mainEl.append(section);

  /* handleFormSubmit saves the user and their score to the local storage and loads the score board.
   */
  form.addEventListener("submit", handleFormSubmit);
};

// Create score board section
const renderScoreTable = () => {
  // Logs message to check function is getting called.
  console.log("Score table");

  //Creating section element and adding id.
  const section = document.createElement("section");
  section.setAttribute("id", "score-board");

  // Creating table
  const table = document.createElement("table");
  table.setAttribute("rules", "rows");

  // Creating table head, its row and its columns.
  const thead = document.createElement("thead");
  const tableRowHead = document.createElement("tr");
  const thName = document.createElement("th");
  thName.textContent = "NAME";
  const thScore = document.createElement("th");
  thScore.textContent = "SCORE";

  // Creating table body to which the results will be uploaded.
  const tbody = document.createElement("tbody");

  // Creating buttons for clearing and restarting the quiz.
  const formButtonsContainer = document.createElement("div");
  formButtonsContainer.setAttribute("class", "form-buttons");
  formButtonsContainer.setAttribute("id", "form-buttons");
  // Creating try again button.
  const tryAgainButton = document.createElement("button");
  tryAgainButton.textContent = "Home";
  tryAgainButton.setAttribute("onclick", "window.location.reload()");
  tryAgainButton.setAttribute("class", "button");

  // Creating clear button.
  const clearScoresButton = document.createElement("button");
  clearScoresButton.textContent = "Clear";
  clearScoresButton.setAttribute("onclick", 'deleteLS("usersScores")');
  clearScoresButton.setAttribute("class", "button clearButton");

  // Appending subsections into their corresponding sections.
  tableRowHead.append(thName, thScore);
  thead.append(tableRowHead);
  table.append(thead, tbody);
  formButtonsContainer.append(tryAgainButton, clearScoresButton);
  section.append(table, formButtonsContainer);
  mainEl.append(section);

  // This function creates rows to add the score from the previous users.
  addUsersScores(tbody, section);
};

const handleFormSubmit = (event) => {
  // Logs message to check if function is getting called.
  console.log("sending form");
  // Prevents the page from reloading
  event.preventDefault();

  //Gets full name from form's input container.
  const fullName = document.getElementById("full-name").value;

  // This lines checks if fullName contains text, if not it will return false.
  if (fullName) {
    // const feedbackResults = JSON.parse(localStorage.getItem('feedbackResults')); This has been changed

    const userResults = {
      fullName,
      // feedbackResults, This has been removed
      score,
    };
    // Stores the user's Score and Name in an array, which has been obtainer from local storage.
    storeInLS("usersScores", userResults);

    // Removes current user's score.
    localStorage.removeItem("feedbackResults");
    // Removes form
    document.getElementById("feedback-form").remove();
    // Renders score table
    renderScoreTable();
  } else {
    // If nothing is typed, alert message pops out
    alert("Please type your full name");
  }
};

// Create rows for scores

const addUsersScores = (element, section) => {
  console.log("Adding Users' scores");

  // This objectsorter function takes the object form of all the scores and sorts them in ascending order.
  const sortedArray = objectSorter();

  // If the arrays, from which the data is getting pulled, is empty. A message will pop out saying there is no data.
  if (sortedArray.length == 0) {
    const messageH2 = document.createElement("h2");
    messageH2.textContent = "No results recorded!";
    messageH2.setAttribute("class", "noData");
    section.append(messageH2);
    return;
  }

  for (let i = sortedArray.length - 1; 0 <= i; i--) {
    let newArr = Object.values(sortedArray[i]);
    // This for loop creates a new tr element to which td elements are added.
    const tr = document.createElement("tr");
    const tdUserName = document.createElement("td");
    tdUserName.textContent = newArr[0]; //at [0] you have the username
    const tdUserScore = document.createElement("td");
    tdUserScore.textContent = newArr[1]; //at [1] you have the user's score.
    // Appends td's to tr
    tr.append(tdUserName, tdUserScore);
    // Appends tr to tbody.
    console.log(tr.children[0].textContent);
    console.log(i);
    element.append(tr);
  }
};

// Create score section
const scoreRecorder = () => {
  scoreEl.textContent = score;
};

// This function determines if the answer picked is right and returns true or false.
const handleOptionClick = (event) => {
  console.log("Picking and answer");
  const target = event.target;
  // If the element click is a Li, the selected option is checked against the answer.
  if (target.tagName === "LI") {
    const value = target.getAttribute("data-value");
    // If correct, the score is increased by one. If not, the time is reduced.
    if (value == questions[questionIndex].correct) {
      score++;
      scoreRecorder();
      console.log("Current score:" + " " + score);
    } else {
      reduceTime();
    }

    // Removes the question section before form is rendered.
    // setTimeout(removeQuestion,200)

    // this section of code updates the question.
    if (questionIndex < questions.length - 1) {
      // increment the question index by 1
      questionIndex += 1;
      console.log("bug two");
      delQuesIfFormRenders();
      setTimeout(renderQuestion, 350);
    } else {
      // if this iteration was for the last question, then render results and form
      renderForm();
      // Clears counter
      countDownZero();
    }
    console.log("bug fixed?");
    setTimeout(removeQuestion, 351);
  }
};

const delQuesIfFormRenders = () => {
  console.log("bug three");
  if (document.getElementById("feedback-form")) {
    renderQuestion();
  }
};

// ------- Local Storage ---------
// Initialise local storage
const initialiseLocalStorage = () => {
  // get feedbackResults from LS
  const feedbackResultsFromLS = JSON.parse(
    localStorage.getItem("feedbackResults")
  );
  console.log(feedbackResultsFromLS);
  const allResultsFromLS = JSON.parse(localStorage.getItem("usersScores"));

  // If this throws undefined, it means
  if (!feedbackResultsFromLS) {
    // if not exist set LS to have feedbackResults as an empty array
    localStorage.setItem("feedbackResults", JSON.stringify([]));
  }

  if (!allResultsFromLS) {
    // if not exist set LS to have feedbackResults as an empty array
    localStorage.setItem("usersScores", JSON.stringify([]));
  }
};

// Store
const storeInLS = (key, value) => {
  // get feedbackResults from LS
  const arrayFromLS = JSON.parse(localStorage.getItem(key));

  // push answer in to array
  arrayFromLS.push(value);

  // set feedbackResults in LS
  localStorage.setItem(key, JSON.stringify(arrayFromLS));
};

// Delete local storage
const deleteLS = (key) => {
  localStorage.removeItem(key);
  removeScoreBoard();
  renderScoreTable();
};

const showHighScore = () => {
  // If the score board is already rendered, nothing happens.
  if (document.getElementById("score-board")) {
    return;
  }
  // If questions section is not rendered, remove banner or form
  if (!document.getElementById("quest-container")) {
    removeBanner();
    if (document.getElementById("feedback-form")) {
      document.getElementById("feedback-form").remove();
    }
  } else {
    removeQuestion();
  }
  console.log("removing");
  countDownZero();
  renderScoreTable();
};

// Function that takes usersScores
const objectSorter = () => {
  console.log("ObjectSorter");
  const finalResults = JSON.parse(localStorage.getItem("usersScores"));

  var arr = [];
  console.log(arr);
  if (finalResults) {
    keys = Object.keys(finalResults);

    for (var i = 0, n = keys.length; i < n; i++) {
      var key = keys[i];
      arr[key] = finalResults[key];
    }

    return arraySorter(arr);
  } else {
    return [];
  }
};

// This function sorts array in ascending order.
const arraySorter = (arrayFromLS) => {
  let verifier = false;
  while (!verifier) {
    verifier = true;

    for (let i = 1; i < arrayFromLS.length; i++) {
      let previous = i - 1;
      if (arrayFromLS[previous].score > arrayFromLS[i].score) {
        verifier = false;
        let biggerV = arrayFromLS[previous];
        arrayFromLS[previous] = arrayFromLS[i];
        arrayFromLS[i] = biggerV;
      }
    }
  }
  return arrayFromLS;
};
// --------- Remove section -------

// Remove banner
const removeBanner = () => {
  console.log("remove banner");
  questLandingEl.remove();
};

// Remove questionl
const removeQuestion = () => {
  console.log("remove question");
  if (document.getElementById("quest-container")) {
    document.getElementById("quest-container").remove();
  }
};
// Remove score board
const removeScoreBoard = () => {
  console.log("remove score board");
  document.getElementById("score-board").remove();
};

// ---------- Countdown ----------
// This is a countdown function
const countDown = () => {
  console.log("Countdown Function");

  let timeIntervals = setInterval(function () {
    startTime--;
    countdownEl.textContent = startTime;
    if (startTime <= 0) {
      countdownEl.textContent = 0;
      clearInterval(timeIntervals);
      console.log("bug one");
      removeQuestion();
      if (
        !document.getElementById("feedback-form") &&
        !document.getElementById("score-board")
      ) {
        renderForm();
      }
    }
  }, 1000);
};
// Sets countdown to zero
const countDownZero = () => {
  startTime = 0;
  countdownEl.textContent = 0;
};
// This function reduces the time by 5 seconds if the question is wrong
const reduceTime = () => {
  startTime = startTime - 5;
};

// This function contains all the actions functions that take place when the start button is clicked.
const handleStartButtonClick = () => {
  initialiseLocalStorage();
  removeBanner();
  countDown();
  renderQuestion();
};

// Event listener to start the code
startButton.addEventListener("click", handleStartButtonClick);

// Event listerner to Scores
highScoreButton.addEventListener("click", showHighScore);
