document.querySelector("#submitBtn").addEventListener("click", onSumbitAnswersClicked);
document.querySelector("#resetBtn").addEventListener("click", onResetClicked);

let correctAnswers = 0;
let question10Answers = ["Utah", "Montana", "Wyoming", "Idaho"];
const QUIZ_TAKEN_KEY = "quizTimesTaken";


function initQuiz() {
    shuffle(question10Answers);

    let answerSpans = document.querySelectorAll("#q10 .random");
    let radioInputs = document.querySelectorAll('#q10 input[name="q10"]');

    answerSpans.forEach((span, index) => {
        span.textContent = question10Answers[index];
        radioInputs[index].value = question10Answers[index];
    });
}


initQuiz();

function shuffle(array) {
    let currentIndex = array.length;

    while (currentIndex != 0) {

        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}

function onSumbitAnswersClicked() {
    try {
        if (checkQ1()) correctAnswers++;
        if (checkQ2()) correctAnswers++;
        if (checkQ3()) correctAnswers++;
        if (checkQ4()) correctAnswers++;
        if (checkQ5()) correctAnswers++;
        if (checkQ6()) correctAnswers++;
        if (checkQ7()) correctAnswers++;
        if (checkQ8()) correctAnswers++;
        if (checkQ9()) correctAnswers++;
        if (checkQ10()) correctAnswers++;

        document.querySelector("#submitBtn").style.display = "none";
        document.querySelector("#resetBtn").style.display = "inline";
        document.querySelector("#correctTotal").innerHTML = `
                <p>You got ${correctAnswers}/10 questions correct</p>
                <p> ${correctAnswers * 10} points total </p>
            `

        if (correctAnswers >= 8) {
            document.querySelector("#congratsMsg").innerHTML = `
                <p>Congratulations!! You got 80% or more of the questions correct!</p>
            `
        }
        incrementQuizTimesTaken();
    } catch (error) {
        alert("Please make sure to answer all questions.");
        document.querySelectorAll("#content img").forEach(img => {
            img.style.display = "none";
        });
        correctAnswers = 0;
    }
}

function onResetClicked() {
    document.querySelector("#submitBtn").style.display = "inline";
    document.querySelector("#resetBtn").style.display = "none";
    document.querySelectorAll("#content img").forEach(img => {
        img.style.display = "none";
    });
    correctAnswers = 0;
    document.querySelector("#correctTotal").innerHTML = ``
    document.querySelector("#congratsMsg").innerHTML = ``
}

function getQuizTimesTaken() {
  const n = parseInt(localStorage.getItem(QUIZ_TAKEN_KEY), 10);
  return Number.isFinite(n) ? n : 0;
}

function incrementQuizTimesTaken() {
  const next = getQuizTimesTaken() + 1;
  localStorage.setItem(QUIZ_TAKEN_KEY, String(next));
  return next;
}

function correctImg(img) {
    let correctImg = img;
    correctImg.style.display = "inline";
    correctImg.src = "img/correct.png"
    return correctImg;
}

function incorrectImg(img) {
    let incorrectImg = img;
    incorrectImg.style.display = "inline";
    incorrectImg.src = "img/incorrect.png"
    return incorrectImg;
}

function checkQ10() {
    let selected = document.querySelector('input[name="q10"]:checked')
    let img = document.querySelector("#q10-image img");

    if (selected == null) {
        throw new Error("Question 10 not answered.");
    }

    if (selected.value === "Wyoming") {
        img = correctImg(img);
        return true;
    } else {
        img = incorrectImg(img);
        return false;
    }
}

function checkQ9() {
    let answer = document.querySelector('input[name="q9"]').value.toLowerCase();
    let img = document.querySelector("#q9-image img");

    if (answer === "") {
        throw new Error("Question 9 blank");
    }

    if (answer === "sonoran") {
        img = correctImg(img);
        return true;
    } else {
        img = incorrectImg(img);
        return false;
    }
}

function checkQ8() {
    let answer = document.querySelector('input[name="q8"]').value;
    let img = document.querySelector("#q8-image img");

    if (answer === "") {
        throw new Error("Question 8 blank");
    }

    if (answer === "13") {
        img = correctImg(img);
        return true;
    } else {
        img = incorrectImg(img);
        return false;
    }
}

function checkQ7() {
    let selected = document.querySelectorAll('input[name="q7"]:checked');
    let img = document.querySelector("#q7-image img");

    let userAnswers = [];
    let correctAnswers = ["alabama", "louisiana", "mississippi"];
    isCorrect = true;

    selected.forEach((element) => {
        userAnswers.push(element.value);
    });

    if (userAnswers.length == 0) {
        throw new Error("Question 7 not answered");
    }

    userAnswers.sort();

    if (userAnswers.length == correctAnswers.length) {
        correctAnswers.forEach((element, index) => {
            if (userAnswers[index] != element) {
                isCorrect = false;
            }
        })
    } else {
        isCorrect = false;
    }

    if (isCorrect) {
        img = correctImg(img);
    } else {
        img = incorrectImg(img);
    }

    return isCorrect;
}
function checkQ6() {
    let selected = document.querySelector("#q6-select").value;
    let img = document.querySelector("#q6-image img");

    if (selected === "") {
        throw new Error("Question 6 blank");
    }

    if (selected === "True") {
        img = correctImg(img);
        return true;
    } else {
        img = incorrectImg(img);
        return false;
    }
}

function checkQ5() {
    let selected = document.querySelector('input[name="q5"]:checked');
    let img = document.querySelector("#q5-image img");

    if (selected == null) {
        throw new Error("Question 5 not answered.");
    }

    if (selected.value === "nevada") {
        img = correctImg(img);
        return true;
    } else {
        img = incorrectImg(img);
        return false;
    }

}
function checkQ4() {
    let selected = document.querySelector("#q4-select").value;
    let img = document.querySelector("#q4-image img");

    if (selected === "") {
        throw new Error("Question 4 blank");
    }

    if (selected === "True") {
        img = correctImg(img);
        return true;
    } else {
        img = incorrectImg(img);
        return false;
    }
}
function checkQ3() {
    let answer = document.querySelector('input[name="q3"]').value.toLowerCase();
    let img = document.querySelector("#q3-image img");

    if (answer === "") {
        throw new Error("Question 3 blank");
    }

    if (answer === "carson city") {
        img = correctImg(img);
        return true;
    } else {
        img = incorrectImg(img);
        return false;
    }
}

function checkQ2() {
    let answer = document.querySelector('input[name="q2"]').value.toLowerCase();
    let img = document.querySelector("#q2-image img");

    if (answer === "") {
        throw new Error("Question 2 blank");
    }

    if (answer === "colorado river") {
        img = correctImg(img);
        return true;
    } else {
        img = incorrectImg(img);
        return false;
    }
}
function checkQ1() {
    let selected = document.querySelector('input[name="q1"]:checked');
    let img = document.querySelector("#q1-image img");

    if (selected != null) {
        if (selected.value === "alaska") {
            img = correctImg(img);
            return true;
        } else {
            img = incorrectImg(img);
            return false;
        }
    } else {
        throw new Error("Question 1 not answered");
    }
}