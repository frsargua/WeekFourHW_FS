# WeekFourHW_FS

GitHub Pages: https://frsargua.github.io/WeekFourHW_FS/ ;
GitHub : https://github.com/frsargua/WeekFourHW_FS ;


Mode of operation:

When the page loads:

1st - The user is greeted with an landing-page
2nd - When the start button is clicked the handleStartButtonClick() function is called. This calls:
        -initialiseLocalStorage(): THis creates a local storage item to save the scores.
        - removeBanner() : This function gets called to remove the landing page html.
        - renderQuestion () : This function renders the question section.
        - countDown(): This initiates the timer. If the timer reaches 0 the form page is loaded and the current score is saved.
3rd - When the question section is loaded.
        - handleOptionClick (): This function validates the answers and increases the score if it is correct. Otherwise,
        the reduceTime() function is called to reduce by 5 seconds. In addition, this function renders the next question after the user picks an answer.
        - When all questions has been asked, the renderForm() function is called, to render the form, and sets the countdown to 0;

4th - The form is rendered
        - The user is asked to input a name
        - When the submit button is clicked:
            - If nothing is inputted in the input container, an alert message pops up asking to enter something.
            - Otherwise, the handleFormSubmit() function is called to 
                - Crete an object that contains the Full Name and score of the user and pushes it to the tail of local storage with the help
                of the storeInLS(Key, value) function.
                - Removes the section containing the form.
                - Then, the renderScoreTable() function is called to render the scores table in the HTML.

5th - When the score table is loaded, the  addUsersScores(tbody,section) function is called to get string version of the users scores and 
convert it into an array of objects. Using this array, the objectSorter() function is called to sort the array's objects based on their scores.
Then, addUsersScores(tbody,section) adds table rows containing the respective users' full name and their scores. If the array of objects is empty, a h2 string appears under the table showing that there is no data.
    - In addition:
        - The user can clear the table by clicking the clear button, which utilises the deleteLS(key) function.
        - Restart the quiz by clicking the HOME button.


Other functionalities:
    - If the "High score" string is clicked, the showHighScore() function is called and the score table is loaded