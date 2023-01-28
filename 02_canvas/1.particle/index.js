const canvas = document.querySelector("canvas");

console.log(canvas);
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio;
// 캔버스 width 와 캔버스 style width 맞추기
const canvasWidth = 300;
const canvasHeight = 300;
canvas.style.width = canvasWidth + "px";
canvas.style.height = canvasHeight + "px";

canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;

ctx.fillRect(10, 10, 50, 50); //얘도 세로로 2배 늘어남

//Device Pixel Ratio DPR ~
window.divicePixelRatio;
