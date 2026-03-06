/* ----- PIPE ----- */
class Pipe {
  constructor(x) {
    this.x = x;
    this.w = PIPE_W;
    this.speed = PIPE_SPEED;

    // randomize gap position
    const margin = 40;
    const gapY = random(margin, height - margin - PIPE_GAP);

    this.top = gapY;
    this.bottom = gapY + PIPE_GAP;
    this.passed = false;
  }

  update() {
    this.x -= this.speed;
  }

  show() {
    // TOP PIPE
    push();
    fill(255);
    stroke(158, 225, 255);
    strokeWeight(3);
    rect(this.x, 0, this.w, this.top);
    rect(this.x - 10, this.top - 20, this.w + 20, 30);

    // BOTTOM PIPE
    rect(this.x, this.bottom, this.w, height - this.bottom);
    rect(this.x - 10, this.bottom, this.w + 20, 30);
    pop();
  }

  offscreen() {
    return this.x + this.w < 0;
  }
  
  /* ----- COLLISION ----- */
  hits(bird) {
    const withinX =
      bird.pos.x + bird.r > this.x && bird.pos.x - bird.r < this.x + this.w;
    const aboveGap = bird.pos.y - bird.r < this.top;
    const belowGap = bird.pos.y + bird.r > this.bottom;
    return withinX && (aboveGap || belowGap);
  }
}
