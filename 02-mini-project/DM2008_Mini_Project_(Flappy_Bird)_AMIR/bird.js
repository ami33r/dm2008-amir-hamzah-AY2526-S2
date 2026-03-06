/* ----- BIRD ----- */
class Bird {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = 30; // for collision + draw
    this.gravity = 0.45; // constant downward force
    this.flapStrength = -8.0; // negative = upward movement
    this.alive = true;
  }

  applyForce(fy) {
    this.acc.y += fy;
  }

  flap() {
    this.vel.y = this.flapStrength;
  }

  update() {
    // gravity
    this.applyForce(this.gravity);

    // integrate
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // simple constraints
    if (this.pos.y < this.r) {
      this.pos.y = this.r;
      this.vel.y = 0;
    }
    if (this.pos.y > height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y = 0;
    }
  }

  show() {
    imageMode(CENTER);
    image(birdImg, this.pos.x, this.pos.y, this.r * 2.5, this.r * 2.5);
  }
}

