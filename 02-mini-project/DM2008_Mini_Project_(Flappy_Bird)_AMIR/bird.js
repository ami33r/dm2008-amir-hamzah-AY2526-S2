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
    this.angle = 0;
    this.antiCWRotate = -radians(45);
    this.CWRotate = radians(45);
  }

  applyForce(fy) {
    this.acc.y += fy;
  }

  flap() {
    this.vel.y = this.flapStrength;
    jump.setVolume(0.5);
    jump.play();
  }

  update() {
    // gravity
    this.applyForce(this.gravity);

    // integrate
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    this.angle = map(this.vel.y, -10, 10, this.antiCWRotate, this.CWRotate);

    //constrain the 1st value between the 2nd and 3rd
    this.angle = constrain(this.angle, this.antiCWRotate, this.CWRotate);
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
    push();
    imageMode(CENTER);

    translate(this.pos.x, this.pos.y);

    rotate(this.angle);

    image(birdImg, 0, 0, 1216 / 19, 1216 / 19);
    pop();
  }
}