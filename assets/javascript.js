const questLandingEl = document.getElementById("quest-landing");

const startButton = document.getElementById("quizz-action-button");



const handleStartButtonClick = () => {
    removeBanner();
};

const removeBanner = () => {
    console.log("remove banner");
    questLandingEl.remove();
  };

  startButton.addEventListener("click", handleStartButtonClick);