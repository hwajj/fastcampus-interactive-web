const canvas = document.querySelector("canvas");

console.log(canvas);
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio;
// 캔버스 width 와 캔버스 style width 맞추기
const canvasWidth = innerWidth;
const canvasHeight = innerHeight;
canvas.style.width = canvasWidth + "px";
canvas.style.height = canvasHeight + "px";

canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;

ctx.scale(dpr, dpr);

class Particle {
  constructor(x, y, radius, vy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vy = vy;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();
    console.log(1);
  }

  update() {
    this.y += this.vy;
  }
}

// const x = 100;
// const y = 100;
// const radius = 50;
// const particle = new Particle(x, y, radius);
const TOTAL = 20;

const randomNumBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

let particles = [];

//파티클을 여러개 만들어주기
for (let i = 0; i < TOTAL; i++) {
  const x = randomNumBetween(0, canvasWidth);
  const y = randomNumBetween(0, canvasHeight);
  const radius = randomNumBetween(50, 100);
  const vy = randomNumBetween(1, 5);
  1, 5;
  const particle = new Particle(x, y, radius, vy);
  particles.push(particle);
}

let interval = 1000 / 60; //60FPS
let now, delta;
let then = Date.now();

function animate() {
  window.requestAnimationFrame(animate);
  now = Date.now();
  delta = now - then;

  if (delta < interval) return;
  // delta > interval 일때 다시 그려줌
  //그자리에 계속 그리는게 아니라 지우고 그려주어야함
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  particles.forEach((particle) => {
    particle.update();
    particle.draw();

    // console.log(particle.y);
    if (particle.y - particle.radius > canvasHeight) {
      particle.y = -particle.radius;
      particle.x = randomNumBetween(0, canvasWidth);
      //particle.y = randomNumBetween(0, canvasHeight);
      particle.radius = randomNumBetween(50, 100);
      particle.vy = randomNumBetween(1, 5);
    }
  });

  then = now - (delta % interval);
  console.log(then);
}
animate();
