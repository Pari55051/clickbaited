const wordText = document.querySelector(".word")
const hintText = document.querySelector(".hint span")
const timeText = document.querySelector(".time b")
const inputField = document.querySelector("input")
const refreshBtn = document.querySelector(".refresh-word")
const checkBtn = document.querySelector(".check-word")
contentBox = document.querySelector(".container .content")
startArea = document.querySelector(".startArea")
scoreArea = document.querySelector(".score")
modalContent = document.querySelector(".modal-content")

var modal = document.getElementById("myModal")
var btn = document.getElementById("myBtn")
var span = document.getElementsByClassName("close")[0]
var modalText = document.getElementById("modalText")

let correctWord, timer;
let score = 0;

const initTimer = maxTime => {
    clearInterval(timer)
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        modal.style.display = "flex";
        modalContent.classList.add("modal-wrong");
        modalText.innerHTML = `<br>Time off! <b>${correctWord.toUpperCase()}</b> was the correct word`;
        endGame();
    }, 1000);
}

const start = () => {
    contentBox.style.display = "block";
    startArea.style.display = "none";
    initGame();
}


const endGame = () => {
    clearInterval(timer);
    contentBox.style.display = "none";
    startArea.style.display = "block";
    modal.style.display = "block";
    modalContent.classList.remove("modal-correct");
    modalContent.classList.add("modal-wrong");
    modalText.innerHTML = `
    <center><br>Time off! <b>${correctWord.toUpperCase()}</b> was the correct word.
    <br>You Lost The Game! :(</center><br>
    </center>
    `;

}

const initGame = () => {
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }

    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();;
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
}

let checkWord = () => {
    let userWord = inputField.value.toLowerCase();

    if (!userWord) {
        modal.style.display = "block";
        modalContent.classList.remove("modal-wrong");
        modalContent.classList.remove("modal-correct");
        return modalText.innerHTML = `<br>Please enter the word to check!`;
    }

    if (userWord !== correctWord) {
        modal.style.display = "block";
        modalContent.classList.add("modal-wrong");
        return modalText.innerHTML = `<br>Oops! <b>${userWord}</b> is not a correct word`;
    } else {
        modal.style.display = "block";
        modalContent.classList.remove("modal-wrong");
        modalContent.classList.add("modal-correct");
        modalText.innerHTML = `<br>Congrats! <b>${correctWord.toUpperCase()}</b> is the correct word`;
    }

    initGame();
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);

document.addEventListener("keypress", event => {
    if (event.key == "Enter") {
        if (startArea.style.display != "none") {
            start()
        } else if (contentBox.style.display != "none") {
            checkWord()
        }

    }
})

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const closeBtn = document.getElementById('close')

closeBtn.addEventListener('click', () => {
    contentBox.style.display = 'none'
    startArea.style.display = "block"

    clearInterval(timer)
}) 