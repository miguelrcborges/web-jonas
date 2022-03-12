fetch("perguntas/Web-Jonas - BQUI.csv").then(response => response.text()).then(data => main(data));

function main(csv) {
    csv = csv.split("\r\n");
    let splittedCsv = [];
    csv.forEach(string => splittedCsv.push(string.split(",")));
    delete csv;
    let questions = [];

    for (let i = 1; i < splittedCsv.length; i++) {
        let question = {};

        for (let ii = 0; ii < splittedCsv[0].length; ii++ ) {
            question[splittedCsv[0][ii]] = splittedCsv[i][ii]; 
        }

        questions.push(question);
    }

    delete splittedCsv;
}