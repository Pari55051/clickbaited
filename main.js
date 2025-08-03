// PSEUDO for running random game
// game1 = link to game 1
// :
// games = [game1, game2, game3, game4]
// getRandom(index)
// run(games[randomlySelectedGame])

// PSEUDO for red btn
// get redBtn elem
// numClicks = random(7-10/7-15)
// if clicks > numClicks:
//  getRandomGame
// if clicks <= numClicks:
//  displayMessage(random from message[])

const redBtn = document.querySelector('.red-btn')
const messageBox = document.querySelector('.message-box')

const game_2048 = "./games/2048-game/index.html"
const brick_breaker = "./games/brick-breaker/brick-breaker.html"
const dino_run = "./games/dino-run/dino.html"
const hangman = "./games/hangman/hangman.html"
const memory_game = "./games/memory-game/memory.html"
const pong_game = "./games/pong-game/pong.html"
const rock_paper_scissor = "./games/rock-paper-scissor/rock-paper-scissor.html"
const snake_game = "./games/snake-game/snake.html"
const tic_tac_toe = "./games/tic-tac-toe/tic-tac-toe.html"
const word_scramble = "./games/word-scramble/word-scramble.html"

const games = [game_2048, brick_breaker, dino_run, hangman, memory_game, pong_game, rock_paper_scissor, snake_game, tic_tac_toe, word_scramble]

function getRandom(min, max) {
    // console.log(Math.floor(Math.random() * (len - 0)) + 0)
    return Math.floor(Math.random()* (max - min)) + min
}


function goToLink (index) {
    let game = games[index]

    // console.log(game)
    // redBtn.setAttribute("href", game)

    setTimeout(() => {
        window.location.href = game;
        // redBtn.setAttribute("href", game)
    }, 1600)
    // redBtn.disabled = true
}

function toggleButton () {
    if (redBtn.style.pointerEvents != 'none') {
        redBtn.style.pointerEvents = 'none'
        redBtn.style.cursor = 'not-allowed'
    } else if (redBtn.style.pointerEvents == 'none') {
        redBtn.style.pointerEvents = 'auto'
        redBtn.style.cursor = 'pointer'
    }
}

// redBtn.addEventListener("click", () => {
//     goToLink(getRandom(0, games.length))
// })

let totalClicks = getRandom(3, 8)

// console.log(totalClicks)

let numClicks = 0

// messages = []
const messages = [
  "I said don't click.",
  "Seriously. Don't.",
  "Why would you do that?",
  "You're ignoring instructions.",
  "What part of 'don't' was unclear?",
  "You were warned.",
  "Please stop.",
  "This button is off-limits.",
  "You're breaking the rules.",
  "You're not supposed to enjoy this.",
  "That's your 10000000th click. Impressive disobedience.",
  "This is why we can't have nice things.",
  "Are you proud of yourself?",
  "Do you feel rebellious now?",
  "The button is judging you.",
  "You're not supposed to be having fun.",
  "This button reports clicks to the authorities.",
  "Okay. You're officially out of control.",
  "Click again. I dare you.",
  "You've made the button sad.",
  "Ignoring signs since click one.",
  "This is how villains are made.",
  "You're playing a dangerous game.",
  "Do you even read?",
  "Fine. Break all the rules.",
  "This is why the button has trust issues.",
  "Is this what you do for fun?",
  "There's no prize. Just regret.",
  "The button is now self-aware.",
  "You've unlocked... absolutely nothing.",
  "Keep going. Maybe the universe will notice.",
  "This is just digital vandalism now.",
  "Each click weakens the timeline.",
  "You're not the hero of this story.",
  "Somewhere, a developer is crying.",
  "Even Schrödinger wouldn't click this.",
  "This is now a psychological study.",
]


function getRandomMessage () {
    let index = getRandom(0, messages.length)

    messageBox.innerText = messages[index]
    // console.log(messageBox.innerText)
}

// toggleButton()

redBtn.addEventListener("click", () => {
    numClicks++
    // console.log(numClicks)
    
    if (numClicks == totalClicks - 1) {
        messageBox.innerText = "Last Warning!!!"
    } else {
        getRandomMessage()
    }

    if (numClicks == totalClicks) {
        messageBox.innerText = "Well....You dug your own grave!"
        // redBtn.disabled = true
        // toggleButton()

        redBtn.style.pointerEvents = 'none'
        document.body.style.cursor = "wait"

        goToLink(getRandom(0, games.length))
        
        // setTimeout(() => {
        //     goToLink(getRandom(0, games.length))
        // }, 5000)
        // setTimeout( () => {
        //     console.log("chala toh sahi")
        //     window.location.href = redBtn.getAttribute(href)
        // }, 5000)
    }
})