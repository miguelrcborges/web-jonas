let questions = [];
const body = document.querySelector("#questions-container");

const courseSelect = document.querySelectorAll(".option");


function loadCourse() {
    courseSelect.forEach(course => course.removeEventListener('click', loadCourse));
    delete courseSelect;
    fetch(`perguntas/Web-Jonas - ${this.dataset.course}.tsv`).then(response => response.text()).then(data => startup(data));
}

courseSelect.forEach(course => course.addEventListener('click', loadCourse));


function startup(tsv) {
    tsv = tsv.split("\r\n");
    let splittedTsv = [];
    tsv.forEach(string => splittedTsv.push(string.split("\t")));
    delete tsv;

    for (let i = 1; i < splittedTsv.length; i++) {
        let question = {};

        for (let ii = 0; ii < splittedTsv[0].length; ii++ ) {
            question[splittedTsv[0][ii]] = splittedTsv[i][ii]; 
        }

        questions.push(question);
    }

    delete splittedTsv;
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