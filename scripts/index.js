const ava = ["a1.jpg", "b1.jpg", "c1.jpg", "d1.jpg", "e1.jpg", "f1.jpg", "g1.jpg", "h1.jpg"];
const notAva = ["nota1.jpg", "notb1.jpg", "notc1.jpg", "notd1.jpg", "note1.jpg", "notf1.jpg", "notg1.jpg", "noth1.jpg"];
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
const img1Element = document.getElementById("option1img");
const img2Element = document.getElementById("option2img");
const resultsElement = document.getElementById("result");
const optionsElement = document.getElementById("options");
const doneElement = document.getElementById("results");
const titleElement = document.getElementById("title");
option1.addEventListener('click', () => {
    onClick(1);
})
option2.addEventListener('click', () => {
    onClick(2);
})
playAgainButtonElement.addEventListener('click', () => {
    playAgain();
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


function onClick(option) {
    if (option == correctOption) {
        points += 1;
        titleElement.innerHTML = "CORRECT!"
    } else {
        console.log("wrong!");
        titleElement.innerHTML = "INCORRECT!"
    }

    toggleFade();
    setCorrectOption();
    getNextPhotos();

    turns += 1;
    if (turns < 3) {
        sleep(500).then(() => {
            setPhotos();
            toggleFade();
        });
    }
    else {
        gameOver();
    }


}

function toggleFade() {
    option1.classList.toggle('fade-out');
    option2.classList.toggle('fade-out');
}

function gameOver() {
    resultsElement.innerHTML = `${points}/${turns}`;
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