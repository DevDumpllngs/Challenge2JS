const input = document.getElementById('answer-input');

input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
    nextQuestion();
    } 
});

let currentStep = 0;
let extraStep = false;
const userData = {
    nombre: "",
    edad: "",
    lenguaje: "",
    otrosLenguajes: ""
};

const questions = [
    "¿Cuál es tu nombre?",
    "¿Cuántos años tienes?",
    "¿Qué lenguaje de programación estás estudiando?"
];

const extraQuestions = [
    "¿Qué otros lenguajes te interesan?",
    "¿Por qué quieres aprender esos lenguajes?"
];

function openModal() {
    document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function nextQuestion() {
    const input = document.getElementById('answer-input');
    const answer = input.value.trim();

    if (answer === "") return;

    if (extraStep) {
        if (currentStep === 0) {
            userData.otrosLenguajes = answer;
        } else if (currentStep === 1) {
            userData.razonLenguajes = answer;
            closeModal();
            showFinalResult();
            return;
        }
        currentStep++;
        document.getElementById('question-text').textContent = extraQuestions[currentStep];
        input.value = "";
    } else {
        if (currentStep === 0) {
            userData.nombre = answer;
        } else if (currentStep === 1) {
            userData.edad = answer;
        } else if (currentStep === 2) {
            userData.lenguaje = answer;
            closeModal();
            showResult();
            return;
        }
        currentStep++;
        document.getElementById('question-text').textContent = questions[currentStep];
        input.value = "";
    }
}

function showResult() {
    const resultBox = document.getElementById('result-box');
    const resultText = document.getElementById('result-text');
    const likeQuestion = document.getElementById('like-question');
    const startBtn = document.getElementById('start-btn');

    startBtn.style.display = 'none';
    resultBox.style.display = 'block';

    resultText.textContent = `Hola ${userData.nombre}, tienes ${userData.edad} años y ya estás aprendiendo ${userData.lenguaje}!`;

    setTimeout(() => {
        likeQuestion.textContent = `¿Te gusta estudiar ${userData.lenguaje}?`;
        const likeBtn = document.createElement('button');
        likeBtn.textContent = '1 - SÍ';
        likeBtn.onclick = () => handleLike(1);
        const dislikeBtn = document.createElement('button');
        dislikeBtn.textContent = '2 - NO';
        dislikeBtn.onclick = () => handleLike(2);
        resultBox.appendChild(likeBtn);
        resultBox.appendChild(dislikeBtn);
    }, 500);
}

function handleLike(response) {
    const resultBox = document.getElementById('result-box');
    const likeQuestion = document.getElementById('like-question');

    resultBox.querySelectorAll('button').forEach(button => button.style.display = 'none');

    if (response === 1) {
        likeQuestion.textContent = "¡Muy bien! Sigue estudiando y tendrás mucho éxito.";
    } else if (response === 2) {
        likeQuestion.textContent = "Oh, qué pena... ¿Te interesan otros lenguajes?";
        extraStep = true;
        currentStep = 0;
        setTimeout(() => openModal(), 1000);
        document.getElementById('question-text').textContent = extraQuestions[currentStep];
    }
}

function showFinalResult() {
    const resultBox = document.getElementById('result-box');
    const likeQuestion = document.getElementById('like-question');

    likeQuestion.textContent = `Interesante, así que te interesan ${userData.otrosLenguajes}. ¡Buena suerte aprendiendo ${userData.otrosLenguajes}!`;
}
