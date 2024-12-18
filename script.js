const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const boxSize = 20; // Size of each grid box
let snake = [{ x: 200, y: 200 }]; // Snake starts in the middle
let food = randomFoodPosition();
let direction = { x: 0, y: 0 }; // Snake starts stationary
let nextDirection = { x: 0, y: 0 }; // Buffer for direction changes
let score = 0;

// Draw a box (used for snake segments and food)
function drawBox(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, boxSize, boxSize);
}

// Generate random food position
function randomFoodPosition() {
    return {
        x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
        y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize,
    };
}

// Update the game state
function update() {
    // Update direction based on input
    direction = nextDirection;

    // If the snake hasn't started moving, don't update the game
    if (direction.x === 0 && direction.y === 0) return;

    // Move the snake by adding a new head
    const head = { x: snake[0].x + direction.x * boxSize, y: snake[0].y + direction.y * boxSize };

    // Check for collision with walls
    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height) {
        resetGame();
        return;
    }

    // Check for collision with itself
    for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
            resetGame();
            return;
        }
    }

    snake.unshift(head);

    // Check if the snake eats food
    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById("score").innerText = score;
        food = randomFoodPosition(); // Generate new food
    } else {
        snake.pop(); // Remove the tail if no food is eaten
    }
}

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    for (let segment of snake) {
        drawBox(segment.x, segment.y, "lime");
    }

    // Draw the food
    drawBox(food.x, food.y, "red");
}

// Reset the game
function resetGame() {
    alert(`Game Over! Your score: ${score}`);
    snake = [{ x: 200, y: 200 }];
    direction = { x: 0, y: 0 };
    nextDirection = { x: 0, y: 0 };
    food = randomFoodPosition();
    score = 0;
    document.getElementById("score").innerText = score;
}

// Handle keyboard input
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && direction.y === 0) nextDirection = { x: 0, y: -1 };
    if (event.key === "ArrowDown" && direction.y === 0) nextDirection = { x: 0, y: 1 };
    if (event.key === "ArrowLeft" && direction.x === 0) nextDirection = { x: -1, y: 0 };
    if (event.key === "ArrowRight" && direction.x === 0) nextDirection = { x: 1, y: 0 };
});

// Game loop
function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 100); // Control the game speed
}

// Start the game
gameLoop();


