let currentQuestion = 0;
let score = 0;
let selectedAnswerValue;
let shuffledQuestions = [];

document.getElementById('start').addEventListener('click', () => {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';
    startQuiz();
});


function startQuiz() {
// Fetch the questions from a JSON file
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        let questions = [...data.questions];


        loadQuestion(questions, currentQuestion);

        document.getElementById('submit').addEventListener('click', () => {

            if (selectedAnswerValue === undefined) {
                alert('Please select an answer');
                return;
            }
            score += selectedAnswerValue;

            currentQuestion++;
            if (currentQuestion < questions.length) {
                loadQuestion(questions, currentQuestion);
            } else {
                showResult();
            }
        });

        document.getElementById('restart').addEventListener('click', () => {
            restartQuiz(questions);
        });

    })
    .catch(err => console.error('Error fetching data', err));

} // end of function startQuiz()


function loadQuestion(questions, index) {
    const questionContainer = document.getElementById('question');
    const answersContainer = document.getElementById('answers');

    const current = questions[index];
    questionContainer.innerHTML = current.question;

    answersContainer.innerHTML = '';
    current.answers.forEach((answer, i) => {

        const button = document.createElement('button');
        button.type = 'button';
        button.classList.add('btn', 'btn-light');
        button.textContent = answer.text;

        button.style.width = '50%';

        // Attach a click event listener to the button
        button.addEventListener('click', () => {
            selectAnswer(button,answer.points);
        });

        answersContainer.appendChild(button);
        answersContainer.appendChild(document.createElement('br'));

    });
}

function selectAnswer(button, points) {
    // Remove the 'selected' class from all buttons
    const allButtons = document.querySelectorAll('.btn-light');
    allButtons.forEach(btn => btn.classList.remove('selected'));

    // Add the 'selected' class to the clicked button
    button.classList.add('selected');

    // Handle the selected answer, e.g., store the value in a variable
    selectedAnswerValue = points;
}

function showResult() {
    const questionContainer = document.getElementById('question');
    const answersContainer = document.getElementById('answers');
    const resultContainer = document.getElementById('result');
    const restartButton = document.getElementById('restart');
    const submitButton = document.getElementById('submit');

    questionContainer.style.display = 'none';
    answersContainer.style.display = 'none';

    resultContainer.innerHTML = `Your score: ${score}`;
    resultContainer.style.display = 'block';

    restartButton.style.display = '';

    submitButton.style.display = 'none';



}

function restartQuiz(questions) {
    currentQuestion = 0;
    score = 0;
    // selectedAnswerValue = 0;

    const questionContainer = document.getElementById('question');
    const answersContainer = document.getElementById('answers');
    const resultContainer = document.getElementById('result');
    const restartButton = document.getElementById('restart');
    const submitButton = document.getElementById('submit');

    questionContainer.style.display = 'block';
    answersContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    restartButton.style.display = 'none';
    submitButton.style.display = '';

    loadQuestion(questions, currentQuestion);
}