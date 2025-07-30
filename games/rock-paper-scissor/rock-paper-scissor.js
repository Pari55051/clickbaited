// Game state
const gameState = {
    playerScore: 0,
    computerScore: 0,
    rounds: 0,
    history: []
};

// DOM elements
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const roundsEl = document.getElementById('rounds');
const choices = document.querySelectorAll('.choice');
const playerChoiceEl = document.querySelector('.player-choice');
const computerChoiceEl = document.querySelector('.computer-choice');
const resultTextEl = document.querySelector('.result-text');
const resetBtn = document.getElementById('reset-btn');
const historyListEl = document.getElementById('history-list');

// Choice icons mapping
const choiceIcons = {
    rock: 'fa-hand-back-fist',
    paper: 'fa-hand',
    scissors: 'fa-hand-scissors'
};

// Result icons
const resultIcons = {
    win: 'fa-trophy',
    lose: 'fa-circle-xmark',
    draw: 'fa-equals'
};

// Initialize game
function initGame() {
    updateScores();
    choices.forEach(choice => {
        choice.addEventListener('click', () => {
            // Remove selected class from all choices
            choices.forEach(c => c.classList.remove('selected'));

            // Add selected class to clicked choice
            choice.classList.add('selected');
            choice.classList.add('pulse');

            // Remove animation class after animation completes
            setTimeout(() => {
                choice.classList.remove('pulse');
            }, 400);

            // Get player choice
            const playerChoice = choice.dataset.choice;

            // Play the round
            playRound(playerChoice);
        });
    });

    resetBtn.addEventListener('click', resetGame);
}

// Play a round
function playRound(playerChoice) {
    // Get computer choice
    const computerChoice = getComputerChoice();

    // Display choices
    displayChoice(playerChoiceEl, playerChoice);
    displayChoice(computerChoiceEl, computerChoice);

    // Determine winner
    const result = determineWinner(playerChoice, computerChoice);

    // Update scores
    if (result === 'win') {
        gameState.playerScore++;
        resultTextEl.textContent = 'PLAYER WINS!';
        resultTextEl.className = 'result-text win';
    } else if (result === 'lose') {
        gameState.computerScore++;
        resultTextEl.textContent = 'COMPUTER WINS!';
        resultTextEl.className = 'result-text lose';
    } else {
        resultTextEl.textContent = "DRAW!";
        resultTextEl.className = 'result-text draw';
    }

    // Update game state
    gameState.rounds++;

    // Add to history
    const historyEntry = {
        round: gameState.rounds,
        player: playerChoice,
        computer: computerChoice,
        result: result
    };

    gameState.history.unshift(historyEntry);
    updateHistory();

    // Update UI
    updateScores();
}

// Get computer choice
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Display choice
function displayChoice(element, choice) {
    element.innerHTML = `<i class="fa-solid ${choiceIcons[choice]}"></i>`;
    element.classList.add('pulse');

    // Remove animation class after animation completes
    setTimeout(() => {
        element.classList.remove('pulse');
    }, 400);
}

// Determine winner
function determineWinner(player, computer) {
    if (player === computer) return 'draw';

    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        return 'win';
    }

    return 'lose';
}

// Update scores display
function updateScores() {
    playerScoreEl.textContent = gameState.playerScore;
    computerScoreEl.textContent = gameState.computerScore;
    roundsEl.textContent = gameState.rounds;
}

// Update history display
function updateHistory() {
    if (gameState.history.length === 0) {
        historyListEl.innerHTML = 'No moves recorded yet';
        return;
    }

    historyListEl.innerHTML = '';

    gameState.history.forEach(entry => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';

        let resultClass = entry.result;
        let resultText = '';
        let resultIcon = '';

        if (entry.result === 'win') {
            resultText = 'Win';
            resultIcon = resultIcons.win;
        } else if (entry.result === 'lose') {
            resultText = 'Lose';
            resultIcon = resultIcons.lose;
        } else {
            resultText = 'Draw';
            resultIcon = resultIcons.draw;
        }

        historyItem.innerHTML = `
                    <span><strong>Round ${entry.round}:</strong>
                    ${capitalize(entry.player)} vs ${capitalize(entry.computer)}</span>
                    <span class="${resultClass}">${resultText} <i class="fas ${resultIcon} result-icon"></i></span>
                `;

        historyListEl.appendChild(historyItem);
    });
}

// Capitalize string
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Reset game
function resetGame() {
    gameState.playerScore = 0;
    gameState.computerScore = 0;
    gameState.rounds = 0;
    gameState.history = [];

    playerChoiceEl.innerHTML = '<i class="fa-solid fa-question"></i>';
    computerChoiceEl.innerHTML = '<i class="fa-solid fa-question"></i>';
    resultTextEl.textContent = 'Select your move to begin';
    resultTextEl.className = 'result-text';

    choices.forEach(choice => choice.classList.remove('selected'));

    updateScores();
    updateHistory();

    // Add animation to reset button
    resetBtn.classList.add('pulse');
    setTimeout(() => {
        resetBtn.classList.remove('pulse');
    }, 400);
}

// Initialize the game
initGame();

// Overlay buttons and elements
const rulesOverlay = document.getElementById('rules-overlay');
const historyOverlay = document.getElementById('history-overlay');
const openRulesBtn = document.getElementById('rules-btn');
const openHistoryBtn = document.getElementById('history-btn');
const closeRulesBtn = document.getElementById('close-rules');
const closeHistoryBtn = document.getElementById('close-history');

// Open overlays
openRulesBtn.addEventListener('click', () => {
    rulesOverlay.style.display = 'flex';
});

openHistoryBtn.addEventListener('click', () => {
    historyOverlay.style.display = 'flex';
});

// Close overlays
closeRulesBtn.addEventListener('click', () => {
    rulesOverlay.style.display = 'none';
});

closeHistoryBtn.addEventListener('click', () => {
    historyOverlay.style.display = 'none';
});