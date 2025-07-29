const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");
let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;

// high score
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const updateFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay...");
    location.reload();
}

const changeDirection = e => {
    const snakeHead = document.querySelector('.snake-head')

    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0
        velocityY = -1
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0
        velocityY = 1
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1
        velocityY = 0
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1
        velocityY = 0
    }
}

// changing direction on key press
controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })))

const initGame = () => {
    if (gameOver) return handleGameOver()

    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`
    // if snake hit the food
    if (snakeX === foodX && snakeY === foodY) {
        updateFoodPosition()
        // adding food pos to snake body
        snakeBody.push([foodY, foodX])
        score++
        highScore = score >= highScore ? score : highScore
        localStorage.setItem("high-score", highScore)
        scoreElement.innerText = `Score: ${score}`
        highScoreElement.innerText = `High Score: ${highScore}`
    }

    // updating snake head pos
    snakeX += velocityX
    snakeY += velocityY

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1]
    }

    snakeBody[0] = [snakeX, snakeY]

    // if touching wall => game over
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true
    }

    for (let i = 0; i < snakeBody.length; i++) {
        const [x, y] = snakeBody[i]
        // adding border radius to head as per direction
        if (i === 0) {
            let borderRadius = ""
            if (velocityX === 1) {
                borderRadius = "border-top-right-radius: 5px; border-bottom-right-radius: 5px;"
            } else if (velocityX === -1) {
                borderRadius = "border-top-left-radius: 5px; border-bottom-left-radius: 5px;"
            } else if (velocityY === 1) {
                borderRadius = "border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;"
            } else if (velocityY === -1) {
                borderRadius = "border-top-left-radius: 5px; border-top-right-radius: 5px;"
            }
            html += `<div class="snake-head" style="grid-area: ${y} / ${x}; ${borderRadius}"></div>`
            // }  else if (i == snakeBody.length - 1) {
            //     // borderRadius = "border-bottom-left-radius: 5px; border-top-left-radius: 5px;"
            //     let borderRadius = ""
            //     if (velocityX === 1) {
            //         borderRadius = "border-top-left-radius: 5px; border-bottom-left-radius: 5px;"
            //     } else if (velocityX === -1) {
            //         borderRadius = "border-top-right-radius: 5px; border-bottom-right-radius: 5px;"
            //     } else if (velocityY === 1) {
            //         borderRadius = "border-top-left-radius: 5px; border-top-right-radius: 5px;"
            //     } else if (velocityY === -1) {
            //         borderRadius = "border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;"
            //     }
            //     html+= `<div class="head" style="grid-area: ${y} / ${x}; ${borderRadius}"></div>`
        } else {
            html += `<div class="head" style="grid-area: ${y} / ${x}"></div>`
        }
    }

    playBoard.innerHTML = html
}

updateFoodPosition()
setIntervalId = setInterval(initGame, 100)
document.addEventListener("keyup", changeDirection)