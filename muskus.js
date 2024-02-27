const canvas = document.querySelector('.muskHeads');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 200;

const particleImage = new Image();
particleImage.src = 'musk.jpg';

class Particle {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.originalX = x;
    this.originalY = y;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.damping = 1; // damping factor
  }

  update() {
    // Check if particle is within canvas boundaries
    if (this.x < 0 || this.x > canvas.width - this.size) {
      this.speedX = -this.speedX;
    }

    if (this.y < 0 || this.y > canvas.height - this.size) {
      this.speedY = -this.speedY;
    }

    // Apply damping
    this.speedX *= this.damping;
    this.speedY *= this.damping;

    // Update position
    this.x += this.speedX;
    this.y += this.speedY;
  }

  draw() {
    ctx.drawImage(particleImage, this.x, this.y, this.size, this.size);
  }

  // Calculate distance between particles
  distanceTo(otherParticle) {
    const dx = this.x - otherParticle.x;
    const dy = this.y - otherParticle.y;

    return Math.sqrt(dx * dx + dy * dy);
  }

  // Calculate the angle between particles
  angleTo(otherParticle) {
    const dx = otherParticle.x - this.x;
    const dy = otherParticle.y - this.y;

    return Math.atan2(dy, dx);
  }

  // Apply repulsion force on the particle
  repelFrom(otherParticle) {
    const distance = this.distanceTo(otherParticle);
    const angle = this.angleTo(otherParticle);

    const force = Math.min(distance, 100) / 200;
    const repelX = Math.cos(angle) * force;
    const repelY = Math.sin(angle) * force;

    this.speedX -= repelX;
    this.speedY -= repelY;
  }
}

const particles = [];

for (let i = 0; i < 50; i++) {
  const size = Math.random() * 20 + 10;
  const x = Math.random() * (canvas.width - size);
  const y = Math.random() * (canvas.height - size);
  particles.push(new Particle(x, y, size));
}



function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(function(particle) {
    particle.update();
    particle.draw();
  });

  requestAnimationFrame(animate);
}


animate();