const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');

let score = 0;
let timeLeft = 60;
let isGameOver = false;

const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    color: 'blue'
};

const objects = [];
const objectSpeed = 3;
const objectInterval = 1000; // 1 second

function createObject() {
    const x = Math.random() * (canvas.width - 20);
    const size = 20;
    objects.push({ x, y: -size, width: size, height: size, color: 'red' });
}

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObjects() {
    objects.forEach(obj => {
        ctx.fillStyle = obj.color;
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
    });
}

function updateObjects() {
    objects.forEach(obj => {
        obj.y += objectSpeed;
    });

    for (let i = 0; i < objects.length; i++) {
        if (objects[i].y > canvas.height) {
            objects.splice(i, 1);
            i--;
        }
    }
}

function checkCollision() {
    objects.forEach((obj, index) => {
        if (
            obj.x < player.x + player.width &&
            obj.x + obj.width > player.x &&
            obj.y < player.y + player.height &&
            obj.y + obj.height > player.y
        ) {
            objects.splice(index, 1);
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
        }
    });
}

function update() {
    if (isGameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawObjects();
    updateObjects();
    checkCollision();

    requestAnimationFrame(update);
}

function movePlayer(event) {
    const rect = canvas.getBoundingClientRect();
    player.x = event.clientX - rect.left - player.width / 2;
    player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
}

function startGame() {
    setInterval(createObject, objectInterval);

    const timer = setInterval(() => {
        if (isGameOver) {
            clearInterval(timer);
            alert(`Game Over! Your score is ${score}`);
            return;
        }

        timeLeft--;
        timeDisplay.textContent = `Time: ${timeLeft}`;

        if (timeLeft <= 0) {
            isGameOver = true;
        }
    }, 1000);

    update();
}

canvas.addEventListener('mousemove', movePlayer);
startGame();