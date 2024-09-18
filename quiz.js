let currentQuestion = 0;
let score = 0;
let selectedAnswerValue;
let selectedAnswerCash = 0;
let totalCash = 0;
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

        // Shuffle the questions array
        shuffledQuestions = shuffleArray(questions);

        // Limit to a specific number of questions (ex: 5)
        shuffledQuestions = shuffledQuestions.slice(0, 5);


        loadQuestion(shuffledQuestions, currentQuestion);

        document.getElementById('submit').addEventListener('click', () => {

            if (selectedAnswerValue === undefined) {
                alert('Please select an answer');
                return;
            }

            score += selectedAnswerValue;
            totalCash += selectedAnswerCash;

            currentQuestion++;
            if (currentQuestion < shuffledQuestions.length) {
                loadQuestion(shuffledQuestions, currentQuestion);
            } else {
                showResult();
            }
        });

        document.getElementById('restart').addEventListener('click', () => {
            restartQuiz(shuffledQuestions);
        });

    })
    .catch(err => console.error('Error fetching data', err));

} // end of function startQuiz()

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}// end of function shuffleArray()

function loadQuestion(questions, index) {
    const questionContainer = document.getElementById('question');
    const answersContainer = document.getElementById('answers');

    const current = questions[index];
    questionContainer.innerHTML = current.question;

    // Shuffle the answers array
    const shuffledAnswers = shuffleArray(current.answers);

    answersContainer.innerHTML = '';
    current.answers.forEach((answer, i) => {

        const button = document.createElement('button');
        button.type = 'button';
        button.classList.add('btn', 'btn-light');
        button.textContent = answer.text;

        button.style.width = '80%';
        // button.style.boxShadow = '0 8px 16px 0 rgba(230,233,240,0.2), 0 6px 20px 0 rgba(238,241,245,0.19)';
        button.style.borderRadius = '3px';

        // Attach a click event listener to the button
        button.addEventListener('click', () => {
            selectAnswer(button,answer.points, answer.cash);
        });

        answersContainer.appendChild(button);
        answersContainer.appendChild(document.createElement('br'));

    });
}

function selectAnswer(button, points, cash) {
    // Remove the 'selected' class from all buttons
    const allButtons = document.querySelectorAll('.btn-light');
    allButtons.forEach(btn => btn.classList.remove('selected'));

    // Add the 'selected' class to the clicked button
    button.classList.add('selected');

    // Handle the selected answer, e.g., store the value in a variable
    selectedAnswerValue = points;
    selectedAnswerCash = cash || 11;
}

function showResult() {
    const questionContainer = document.getElementById('question');
    const answersContainer = document.getElementById('answers');
    const resultContainer = document.getElementById('result-container');
    const restartButton = document.getElementById('newgame');
    const submitButton = document.getElementById('submit');

    questionContainer.style.display = 'none';
    answersContainer.style.display = 'none';

    resultContainer.style.display = 'block';
    restartButton.style.display = '';
    submitButton.style.display = 'none';

    // Check the score number and display appropriate text
    const resultText = getResultText(totalCash);

    //TODO remove score after testing....Your score: ${score}.
    resultContainer.querySelector('#result').innerHTML = `Totalna količina maznute love: $${totalCash}. <br> ${resultText}`;

}

function getResultText(totalCash) {
    if (totalCash >= 190000) {
        return "Ti alfa i omega, pravi domoljub čija plava krv teče venama. Oko ti titra a srce zaigra na svaku mogućnost <br>" +
        "da zajebeš nekog il mazneš neke pare. Pravi duh podzetništva čiji preci se okreću u grobu za svaki leš preko kojeg nagaziš da " +
        "postigneš svoje ciljeve!";
    } else if (totalCash >= 150000) {
        return "Fali text...! You passed.";
    } else if (totalCash >= 70000) {
        return "Propali si slučaj. Graničiš između da prodaš krv ili vlastitu mater za lovu. Ali ima nade za tebe. Keep practicing.";
    } else {
        return "Ti si prepoštena osoba. Da nađeš pare na cesti odma bi ih vratio vlasniku ili uplatio u dobrotvornu udrugu.Mani se ovog ćelavog posla i prepusti ovo pravim domoljubima!";
    }
}

function restartQuiz(questions) {
    currentQuestion = 0;
    score = 0;
    totalCash = 0;
    // selectedAnswerValue = 0;

    const questionContainer = document.getElementById('question');
    const answersContainer = document.getElementById('answers');
    const resultContainer = document.getElementById('result-container');
    const restartButton = document.getElementById('newgame');
    const submitButton = document.getElementById('submit');

    questionContainer.style.display = 'block';
    answersContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    restartButton.style.display = 'none';
    submitButton.style.display = '';

    loadQuestion(questions, currentQuestion);
    // document.getElementById('welcome-screen').style.display = 'block';
    // document.getElementById('quiz-screen').style.display = 'none';
}

const newgame = document.getElementById("newgame");
newgame.onclick = function(e) {
    location.reload();
}