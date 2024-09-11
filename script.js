const questions = [
    { question: "Qual é o maior planeta do sistema solar?", answers: ["Júpiter", "Terra", "Marte"], correct: 0 },
    { question: "Qual é o elemento químico representado por 'O'?", answers: ["Ouro", "Oxigênio", "Ósmio"], correct: 1 },
    { question: "Em que ano o homem pisou na Lua pela primeira vez?", answers: ["1965", "1975", "1969"], correct: 2 },
    { question: "Qual é a capital da França?", answers: ["Paris", "Roma", "Berlim"], correct: 0 },
    { question: "Qual é o animal mais rápido do mundo?", answers: ["Leão", "Guepardo", "Cavalo"], correct: 1 },
    { question: "Qual é a fórmula química da água?", answers: ["CO₂", "H₂SO₄", "H₂O"], correct: 2 },
    { question: "Quem pintou a Mona Lisa?", answers: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso"], correct: 0 },
    { question: "Quantos continentes existem no mundo?", answers: ["6", "7", "5"], correct: 1 },
    { question: "Qual é o país com a maior população?", answers: ["Estados Unidos", "Índia", "China"], correct: 2 },
    { question: "Qual é o maior oceano do mundo?", answers: ["Oceano Pacífico", "Oceano Atlântico", "Oceano Índico"], correct: 0 },
];

let currentQuestions = [];
let currentQuestionIndex = 0;
let correctAnswers = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startQuiz() {
    shuffle(questions);
    currentQuestions = questions.slice(0, 5);
    currentQuestionIndex = 0;
    correctAnswers = 0;
    showQuestion();
    document.getElementById('next').style.display = 'block';
    document.getElementById('results').textContent = '';
}

function showQuestion() {
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = '';

    if (currentQuestionIndex < currentQuestions.length) {
        const currentQuestion = currentQuestions[currentQuestionIndex];
        const questionElem = document.createElement('div');
        questionElem.classList.add('question');

        const questionTitle = document.createElement('h2');
        questionTitle.textContent = `Pergunta ${currentQuestionIndex + 1}: ${currentQuestion.question}`;
        questionElem.appendChild(questionTitle);

        currentQuestion.answers.forEach((answer, i) => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'question';
            input.value = i;
            label.appendChild(input);
            label.append(` ${answer}`);
            questionElem.appendChild(label);
        });

        quizContainer.appendChild(questionElem);
    } else {
        showResults();
    }
}

function nextQuestion() {
    const selected = document.querySelector('input[name="question"]:checked');
    if (selected) {
        const answer = parseInt(selected.value);
        if (answer === currentQuestions[currentQuestionIndex].correct) {
            correctAnswers++;
        }
        currentQuestionIndex++;
        showQuestion();
    } else {
        alert('Por favor, selecione uma resposta.');
    }
}

function showResults() {
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    quizContainer.innerHTML = '';
    resultsContainer.textContent = `Parabéns! Você acertou ${correctAnswers} de 5.`;

    // Esconder o botão de próxima pergunta
    document.getElementById('next').style.display = 'none';

    // Exibir a mensagem e iniciar o timer para reiniciar o quiz
    setTimeout(() => {
        startQuiz();
    }, 10000); // 10 segundos
}

document.getElementById('next').addEventListener('click', nextQuestion);

startQuiz();
