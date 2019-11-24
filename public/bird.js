class Bird {
    constructor() {
      this.y = height / 2;
      this.x = 64;
  
      this.gravity = 0.8;
      this.lift = -12;
      this.velocity = 0;
    }
  
    show() {
      stroke(255);
      fill(255, 100);
      ellipse(this.x, this.y, 32, 32);
    }
  
    up() {
      this.velocity += this.lift;
    }
  
    think(pipes) {
        if(Math.random() >= 0.9) {
          this.up();
        }
    }
  
    offScreen() {
      return this.y > height || this.y < 0;
    }
  
    update() {
      this.score++;
  
      this.velocity += this.gravity;
      this.y += this.velocity;
    }
  }