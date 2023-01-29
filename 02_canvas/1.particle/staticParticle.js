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

//ctx.fillRect(10, 10, 50, 50); //얘도 세로로 2배 늘어남

ctx.beginPath();

//시작 x, 시작 y, 반지름, 시작각도, 끝각도, 시계or 반시계 방향(생략가능)
ctx.arc(100, 100, 50, 0, (Math.PI / 180) * 180);
ctx.fillStyle = "red";
ctx.fill(); //채우기
//ctx.stroke(); //테두리만
ctx.closePath();

class Particle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
    console.log(1);
  }
}

const x = 100;
const y = 100;
const radius = 50;
const particle = new Particle(x, y, radius);

let interval = 1000 / 60;
let now, delta;
let then = Date.now();
function animate() {
  window.requestAnimationFrame(animate);
  now = Date.now();
  delta = now - then;

  if (delta < interval) return;
  //그자리에 계속 그리는게 아니라 지우고 그려주어야함
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  particle.y += 1;
  particle.draw();
  then = now - (delta % interval);
}
animate();
