let questions = [];
const body = document.querySelector("#questions-container");

fetch("perguntas/Web-Jonas - BQUI.csv").then(response => response.text()).then(data => startup(data));

function startup(csv) {
    csv = csv.split("\r\n");
    let splittedCsv = [];
    csv.forEach(string => splittedCsv.push(string.split(",")));
    delete csv;

    for (let i = 1; i < splittedCsv.length; i++) {
        let question = {};

        for (let ii = 0; ii < splittedCsv[0].length; ii++ ) {
            question[splittedCsv[0][ii]] = splittedCsv[i][ii]; 
        }

        questions.push(question);
    }

    delete splittedCsv;
    loadQuestions();
}

function loadQuestions() {
    let question = questions[Math.floor(Math.random() * questions.length)]; 

    let questionText = document.createElement('h1');
    questionText.textContent =  question["Pergunta"];

    let options = [];
    let correctOption = document.createElement('div');
    correctOption.textContent = question["Opção Correta"];
    correctOption.dataset.isCorrect = "paraDeFazerBatota";
    options.push(correctOption);

    let wrongOptionOne = document.createElement('div');
    wrongOptionOne.textContent = question["Opção Errada 1"];
    options.push(wrongOptionOne);
    
    let wrongOptionTwo = document.createElement('div');
    wrongOptionTwo.textContent = question["Opção Errada 2"];
    options.push(wrongOptionTwo);
    
    let wrongOptionThree = document.createElement('div');
    wrongOptionThree.textContent = question["Opção Errada 3"];
    options.push(wrongOptionThree);
    
    options.forEach(option => { 
        option.classList.add("option", "active")
        option.addEventListener('click', clickHandler)
    });
    options.sort((_) => Math.random() - 0.5);
    body.replaceChildren(questionText, ...options);

    document.querySelector(".skip-question").addEventListener('click', loadQuestions);
}

function clickHandler(event) {
    let options = document.querySelectorAll(".option");
    options.forEach(option => { 
        option.classList.remove("active");
        option.removeEventListener('click', clickHandler);
    });

    if (event.target.dataset.isCorrect) event.target.style.backgroundColor = "var(--green)";
    else {
        event.target.style.backgroundColor = "var(--red)";
        document.querySelector("[data-is-correct='paraDeFazerBatota']").style.backgroundColor = "var(--green)";
    }
}