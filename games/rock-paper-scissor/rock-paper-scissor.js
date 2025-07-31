const gameState = {
    playerScore: 0,
    computerScore: 0,
    rounds: 0,
    history: []
} 

const playerScoreEl = document.getElementById("player-score") 
const computerScoreEl = document.getElementById("computer-score") 
const roundsEl = document.getElementById("rounds") 
const choices = document.querySelectorAll(".choice") 
const playerChoiceEl = document.querySelector(".player-choice") 
const computerChoiceEl = document.querySelector(".computer-choice") 
const resultTextEl = document.querySelector(".result-text") 
const resetBtn = document.getElementById("reset-btn") 
const historyListEl = document.getElementById("history-list") 

const choiceIcons = {
    rock: "fa-hand-back-fist",
    paper: "fa-hand",
    scissors: "fa-hand-scissors"
} 

const resultIcons = {
    win: "fa-trophy",
    lose: "fa-circle-xmark",
    draw: "fa-equals"
} 

function initGame() {
    updateScores() 
    choices.forEach(choice => {
        choice.addEventListener("click", () => {
            choices.forEach(c => c.classList.remove("selected")) 

            choice.classList.add("selected") 
            choice.classList.add("pulse") 

            setTimeout(() => {
                choice.classList.remove("pulse") 
            }, 400) 

            const playerChoice = choice.dataset.choice 

            playRound(playerChoice) 
        }) 
    }) 

    resetBtn.addEventListener("click", resetGame) 
}

function playRound(playerChoice) {
    const computerChoice = getComputerChoice() 

    displayChoice(playerChoiceEl, playerChoice) 
    displayChoice(computerChoiceEl, computerChoice) 

    const result = determineWinner(playerChoice, computerChoice) 

    if (result === "win") {
        gameState.playerScore++ 
        resultTextEl.textContent = "PLAYER WINS!" 
        resultTextEl.className = "result-text win" 
    } else if (result === "lose") {
        gameState.computerScore++ 
        resultTextEl.textContent = "COMPUTER WINS!" 
        resultTextEl.className = "result-text lose" 
    } else {
        resultTextEl.textContent = "DRAW!" 
        resultTextEl.className = "result-text draw" 
    }

    gameState.rounds++ 

    const historyEntry = {
        round: gameState.rounds,
        player: playerChoice,
        computer: computerChoice,
        result: result
    } 

    gameState.history.unshift(historyEntry) 
    updateHistory() 

    updateScores() 
}

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"] 
    const randomIndex = Math.floor(Math.random() * 3) 
    return choices[randomIndex] 
}

function displayChoice(element, choice) {
    element.innerHTML = `<i class="fa-solid ${choiceIcons[choice]}"></i>` 
    element.classList.add("pulse") 

    setTimeout(() => {
        element.classList.remove("pulse") 
    }, 400) 
}

function determineWinner(player, computer) {
    if (player === computer) return "draw" 

    if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        return "win" 
    }

    return "lose" 
}

function updateScores() {
    playerScoreEl.textContent = gameState.playerScore 
    computerScoreEl.textContent = gameState.computerScore 
    roundsEl.textContent = gameState.rounds 
}

function updateHistory() {
    if (gameState.history.length === 0) {
        historyListEl.innerHTML = "No moves recorded yet" 
        return 
    }

    historyListEl.innerHTML = "" 

    gameState.history.forEach(entry => {
        const historyItem = document.createElement("div") 
        historyItem.className = "history-item" 

        let resultClass = entry.result 
        let resultText = "" 
        let resultIcon = "" 

        if (entry.result === "win") {
            resultText = "Win" 
            resultIcon = resultIcons.win 
        } else if (entry.result === "lose") {
            resultText = "Lose" 
            resultIcon = resultIcons.lose 
        } else {
            resultText = "Draw" 
            resultIcon = resultIcons.draw 
        }

        historyItem.innerHTML = `
                    <span><strong>Round ${entry.round}:</strong>
                    ${capitalize(entry.player)} vs ${capitalize(entry.computer)}</span>
                    <span class="${resultClass}">${resultText} <i class="fas ${resultIcon} result-icon"></i></span>
                ` 

        historyListEl.appendChild(historyItem) 
    }) 
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1) 
}

function resetGame() {
    gameState.playerScore = 0 
    gameState.computerScore = 0 
    gameState.rounds = 0 
    gameState.history = [] 

    playerChoiceEl.innerHTML = '<i class="fa-solid fa-question"></i>' 
    computerChoiceEl.innerHTML = '<i class="fa-solid fa-question"></i>' 
    resultTextEl.textContent = "Select your move to begin" 
    resultTextEl.className = "result-text" 

    choices.forEach(choice => choice.classList.remove("selected")) 

    updateScores() 
    updateHistory() 

    resetBtn.classList.add("pulse") 
    setTimeout(() => {
        resetBtn.classList.remove("pulse") 
    }, 400) 
}

initGame() 

const rulesOverlay = document.getElementById("rules-overlay") 
const historyOverlay = document.getElementById("history-overlay") 
const openRulesBtn = document.getElementById("rules-btn") 
const openHistoryBtn = document.getElementById("history-btn") 
const closeRulesBtn = document.getElementById("close-rules") 
const closeHistoryBtn = document.getElementById("close-history") 

openRulesBtn.addEventListener("click", () => {
    rulesOverlay.style.display = "flex" 
}) 

openHistoryBtn.addEventListener("click", () => {
    historyOverlay.style.display = "flex" 
}) 

closeRulesBtn.addEventListener("click", () => {
    rulesOverlay.style.display = "none" 
})

closeHistoryBtn.addEventListener("click", () => {
    historyOverlay.style.display = "none" 
}) 