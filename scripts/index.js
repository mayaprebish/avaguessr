const ava = ["a1.jpg", "b1.jpg", "c1.jpg", "d1.jpg", "e1.jpg", "f1.jpg", "g1.jpg", "h1.jpg", "i1.jpg", "j1.jpg", "k1.jpg", "l1.jpg", "m1.jpg", "n1.jpg", "o1.jpg", "p1.jpg", "q1.jpg", "r1.jpg"];
const notAva = ["nota1.jpg", "notb1.jpg", "notc1.jpg", "notd1.jpg", "note1.jpg", "notf1.jpg", "notg1.jpg", "noth1.jpg", "noti1.jpg", "notj1.jpg", "notk1.jpg", "notl1.jpg", "notm1.jpg", "notn1.jpg", "noto1.jpg", "notp1.jpg", "notq1.jpg", "notr1.jpg"];
var currentAvaPhoto;
var currentNotAvaPhoto;
var correctOption;
var usedPhotos = [];
var points = 0;
var turns = 0;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const playAgainButtonElement = document.getElementById("playAgain");
const nextButtonElement = document.getElementById("next");
const img1Element = document.getElementById("option1img");
const img2Element = document.getElementById("option2img");
const resultsElement = document.getElementById("result");
const optionsElement = document.getElementById("options");
const doneElement = document.getElementById("results");
const titleElement = document.getElementById("title");
option1.addEventListener('click', () => {
    onChoose(1);
})
option2.addEventListener('click', () => {
    onChoose(2);
})
playAgainButtonElement.addEventListener('click', () => {
    playAgain();
})
nextButtonElement.addEventListener('click', () => {
    onNext();
})

// MAIN
setCorrectOption();
getNextPhotos();
setPhotos();

function setPhotos() {
    if (correctOption == 1) {
            img1Element.src = `images/${currentAvaPhoto}`;
            img2Element.src = `images/${currentNotAvaPhoto}`;
    } else {
        img1Element.src = `images/${currentNotAvaPhoto}`;
        img2Element.src = `images/${currentAvaPhoto}`;
    }
}

function showRealPhotos() {

    img1Element.src = img1Element.src.replace('1', '2');
    img2Element.src = img2Element.src.replace('1', '2');
}

function onNext() {
    nextButtonElement.classList.toggle("invisible");
    option1.classList.remove("outlined-correct");
    option1.classList.remove("outlined-incorrect");
    option2.classList.remove("outlined-correct");
    option2.classList.remove("outlined-incorrect");

    toggleFade();
    turns += 1;
    if (turns < 3) {
        titleElement.innerHTML = "WHICH PICTURE IS AVA?"
    }
    else {
        titleElement.innerHTML = "GAME OVER!"
    }
    setCorrectOption();
    getNextPhotos();

    if (turns < 3) {
        sleep(500).then(() => {
            setPhotos();
        }).then(() => toggleFade());
    }
    else {
        gameOver();
    }
}


function onChoose(option) {
    if (option == correctOption) {
        points += 1;
        titleElement.innerHTML = "CORRECT!"
        if (option == 1) {
            option1.classList.toggle("outlined-correct");
            option2.classList.toggle("outlined-incorrect");
        }
        if (option == 2) {
            option2.classList.toggle("outlined-correct");
            option1.classList.toggle("outlined-incorrect");
        }
    } else {
        console.log("wrong!");
        titleElement.innerHTML = "WRONG!"
        if (option == 1) {
            option1.classList.toggle("outlined-incorrect");
            option2.classList.toggle("outlined-correct");
        }
        if (option == 2) {
            option2.classList.toggle("outlined-incorrect");
            option1.classList.toggle("outlined-correct");
        }
    }

    showRealPhotos();
    nextButtonElement.classList.toggle("invisible");
}

function toggleFade() {
    option1.classList.toggle('fade-out');
    option2.classList.toggle('fade-out');
}

function gameOver() {
    resultsElement.innerHTML = `Score: ${points}/${turns} Avas`;
    optionsElement.classList.toggle("invisible");
    doneElement.classList.toggle("invisible");
}

function playAgain() {
    points = 0;
    turns = 0;
    optionsElement.classList.toggle("invisible");
    doneElement.classList.toggle("invisible");
    titleElement.innerHTML = "WHICH PICTURE IS AVA?";
    if (correctOption == 1) {
        img1Element.src = `images/${currentAvaPhoto}`;
        img2Element.src = `images/${currentNotAvaPhoto}`;
    } else {
        img1Element.src = `images/${currentNotAvaPhoto}`;
        img2Element.src = `images/${currentAvaPhoto}`;
    }
    sleep(200).then(() => toggleFade());
}

function getNextPhotos() {
    if (currentAvaPhoto) {
        usedPhotos.push(currentAvaPhoto);
    }
    if (currentNotAvaPhoto) {
        usedPhotos.push(currentNotAvaPhoto);
    }
    const remainingAvaPhotos = ava.filter(x => !usedPhotos.includes(x));
    const remainingNotAvaPhotos = notAva.filter(x => !usedPhotos.includes(x));

    const nextAvaPhoto = remainingAvaPhotos[Math.floor(Math.random()*remainingAvaPhotos.length)];
    const nextNotAvaPhoto = remainingNotAvaPhotos[Math.floor(Math.random()*remainingNotAvaPhotos.length)];

    currentAvaPhoto = nextAvaPhoto;
    currentNotAvaPhoto = nextNotAvaPhoto;
}

function setCorrectOption() {
    correctOption = Math.floor(Math.random()*2) + 1;
}