const quizData = [
    {
        question: "HTML의 약자는 무엇인가요?",
        answers: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
        correct: "Hyper Text Markup Language"
    },
    {
        question: "CSS는 무엇의 약자인가요?",
        answers: ["Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheets"],
        correct: "Cascading Style Sheets"
    },
    {
        question: "JavaScript는 어떤 언어인가요?",
        answers: ["프로그래밍 언어", "마크업 언어", "스타일링 언어"],
        correct: "프로그래밍 언어"
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
    const resultElement = document.getElementById('result');

    resultElement.textContent = '';

    questionElement.textContent = quizData[currentQuestion].question;
    answersElement.innerHTML = '';

    quizData[currentQuestion].answers.forEach(answer => {
        const li = document.createElement('li');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'answer';
        radio.value = answer;
        li.appendChild(radio);
        li.appendChild(document.createTextNode(answer));
        answersElement.appendChild(li);
    });
}

function checkAnswer() {
    const answers = document.getElementsByName('answer');
    let selectedAnswer;
    for (const answer of answers) {
        if (answer.checked) {
            selectedAnswer = answer.value;
            break;
        }
    }

    if (selectedAnswer) {
        if (selectedAnswer === quizData[currentQuestion].correct) {
            score++;
        }

        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }
    } else {
        alert('답을 선택해주세요!');
    }
}

function showResult() {
    const resultElement = document.getElementById('result');
    resultElement.textContent = `퀴즈가 끝났습니다! 당신의 점수는 ${score} / ${quizData.length} 입니다.`;
}

// 첫 번째 질문 로드
loadQuestion();


const quizData2 = [
    {
        question: "가장 큰 행성은 어느 것입니까?",
        a: "지구",
        b: "목성",
        c: "화성",
        d: "금성",
        correct: "b"
    },
    {
        question: "인류의 우주선이 처음으로 달에 착륙한 해는 언제입니까?",
        a: "1965년",
        b: "1969년",
        c: "1971년",
        d: "1975년",
        correct: "b"
    },
    // 여기에 더 많은 질문을 추가할 수 있습니다.
];

const questionEl = document.getElementById('question2');
const answersEl = document.getElementById('answers2');
const resultEl = document.getElementById('result2');

let currentQuestionIndex = 0;
let score2 = 0;

function loadQuestion2() {
    if (currentQuestionIndex < quizData2.length) {
        const currentQuestion = quizData2[currentQuestionIndex];

        questionEl.innerText = currentQuestion.question;
        answersEl.innerHTML = `
        <li><button onclick="selectAnswer2('a')">A. ${currentQuestion.a}</button></li>
        <li><button onclick="selectAnswer2('b')">B. ${currentQuestion.b}</button></li>
        <li><button onclick="selectAnswer2('c')">C. ${currentQuestion.c}</button></li>
        <li><button onclick="selectAnswer2('d')">D. ${currentQuestion.d}</button></li>
      `;
    } else {
        showResults2();
    }
}

function selectAnswer2(answer) {
    if (answer === quizData2[currentQuestionIndex].correct) {
        score2++;
    }

    currentQuestionIndex++;
    loadQuestion2(); // 다음 질문을 로드합니다.
}

function showResults2() {
    resultEl.innerHTML = `<h3>퀴즈가 완료되었습니다! 당신의 점수는 ${score2}/${quizData2.length}입니다.</h3>`;
    answersEl.innerHTML = ""; // 마지막 결과 표시 후 답변 옵션을 제거합니다.
}

loadQuestion2(); // 페이지 로드 시 첫 번째 질문을 로드합니다.