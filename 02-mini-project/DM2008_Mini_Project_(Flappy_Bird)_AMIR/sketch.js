/* ----------------- Globals ----------------- */
let bird;
let birdImg;
let pipes = [];
let bg;
let bgm;
let jump;
let endsound;
let myFont;

let gameState = "start";
let hasPlayed = false;

let spawnCounter = 0; // simple timer
const SPAWN_RATE = 90; // ~ every 90 frames at 60fps ≈ 1.5s
const PIPE_SPEED = 2.5;
const PIPE_GAP = 200; // gap height (try 100–160)
const PIPE_W = 80;

let score = 0;

function preload() {
  birdImg = loadImage("assets/angel.png");
  bg = loadImage("assets/bg.png");
  myFont = loadFont("assets/Hybrid_b.ttf");
  endImg = loadImage("assets/end.png");
  endsound = loadSound("assets/end.wav");
  bgm = loadSound("assets/soundtrack.mp3");
  jump =loadSound("assets/jump.wav");
}

/* ----------------- Setup & Draw ----------------- */
function setup() {
  createCanvas(480, 640);
  noStroke();
  bird = new Bird(120, height / 2);
  pipes.push(new Pipe(width + 40));
  bgm.loop();
  
}

function draw() {
  imageMode(CORNER);
  image(bg, 0, 0, width, height);
  imageMode(CENTER);

  if (gameState === "start") {
    textAlign(CENTER);
    textFont(myFont);
    textSize(100);
    fill(0);
    text("AETHER", width / 2, height / 1.9);
    textSize(30);
    fill(158, 225, 255);
    text("tap space to fly", width / 2, 365);
    noLoop();
    return;
  }

  if (gameState === "playing") {
    handleInput();

    bird.update();

    spawnCounter++;
    if (spawnCounter >= SPAWN_RATE) {
      pipes.push(new Pipe(width + 40));
      spawnCounter = 0;
    }

    // update + draw pipes
    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      pipes[i].show();

      if (pipes[i].hits(bird)) {
        gameState = "gameOver";
      }

      // SCORING SYSTEM
      if (!pipes[i].passed && pipes[i].x + pipes[i].w < bird.pos.x) {
        score++;
        pipes[i].passed = true;
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

    bird.show();

    // SCORE
    push();
    fill(0);
    textFont(myFont);
    textSize(60);
    text(score, width / 2, 47);
    pop();

    // TOUCHING GROUND
    if (bird.pos.y >= height - bird.r) {
      gameState = "gameOver";
    }
  }

  // GAME OVER
  if (gameState === "gameOver") {
    bird.show();
    for (let p of pipes) p.show();
    
   endsound.play();
   endsound.setVolume(0.3);
   hasPlayed = true;

      
    fill(158, 225, 255, 95);
   rect(0,0,width, height);
    
    image(endImg, width / 2, height / 2, 450, 450);

    fill(158, 225, 255);
    textAlign(CENTER, CENTER);
    textFont(myFont);
    textSize(50);
    text("you died.", width / 2, height/ 2 - 65);

    textSize(35);
    text("Score: " + score, width / 2, height/ 2 - 30);
    
    fill(252, 252, 3);
    textSize(29);
    text("(tap to retry)", width / 2, height/ 2 + 15);

    noLoop();
  }
}

/* ----------------- Input ----------------- */
function handleInput() {}
function keyPressed() {
  if (key === " ") {
    if (gameState === "start") {
      resetGame();
    } else if (gameState === "playing") {
      bird.flap();
    } else if (gameState === "gameOver") {
      resetGame();
    }
    return false;
  }
}

function resetGame() {
  bird = new Bird(120, height / 2);
  pipes = [];
  spawnCounter = 0;
  score = 0;
  gameState = "playing";
  loop();
}