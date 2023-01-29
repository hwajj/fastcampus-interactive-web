# 캔버스 사이즈 조절

- 캔버스 기본적으로 width 150, height 300 설정 + css로 조절
- canvas 자체의 width, height를 css width와 height에 맞춰 확대 or 축소되는 것

ex1. 캔버스 길이 놔두고 css길이만 수정 -> 컨텍스트에 그린 것이 height 비에 맞춰 수정됨

```
canvas.style.width = 300 + "px";
canvas.style.height = 300 + "px"; //canvas height 150-> 300 강제로 2배 늘림
ctx.fillRect(10, 10, 50, 50); // => 세로로 2배 긴 사각형됨

```

ex2. 컨텍스트에 그린것이 왜곡되지 않도록 캔버스 기본길이 수정

```
canvas.style.width = 300 + "px";
canvas.style.height = 300 + "px";
canvas.width = 300             // 캔버스 기본 길이와 css 길이 같음
canvas.height = 300
ctx.fillRect(10, 10, 50, 50); //정사각형 됨
```

ex3. 캔버스기본길이 100, 캔버스css 스타일 300 => 픽셀깨져서 흐릿하게보임

```
//캔버스 픽셀 3배로 늘림
canvas.style.width = 300 + "px";
canvas.style.height = 300 + "px";
canvas.width = 100
canvas.height = 100
ctx.fillRect(10, 10, 50, 50);
```

=> 캔버스의 width와 캔버스 css width를 맞추자!

# devicePixelRatio

//하나의 css픽셀을 그릴때 사용되는 장치의 픽셀 수
1px 그리는데 사용되는 장치의 px수
dpr 높을수록 선명한 그래픽 보여준다.

```
const dpr = window.devicePixelRatio;
canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;

ctx.scale(dpr, dpr)

```

픽셀이 2배로 들어간 캔버스를 css사이즈로 조정 => 더 선명한 그림

# clearRect

```
const x = 100;
const y = 100;
const radius = 50;
const particle = new Particle(x, y, radius);


function animate() {
	window.requestAnimationFrame(animate)
	//그자리에 계속 그리는게 아니라 지우고 그려주어야함
	ctx.clearRect(0, 0, canvasWidth, canvasHeight)
	particle.draw();


}

animate()
```

# requestAnimationFrame 효율적으로 사용하기

- requestAnimationFrame 함수를 animate함수 안에서 실행시키면 현재 모니터의 주사율 기반으로 모니터마다 animate 실행수 다르다.
- 60Hz 주사율 ->requestAnimationFrame는 1초에 60번 실행
  => 주사율에 따라 1초에 움직이는 횟수가 다를 수 있다
- 내 코드가 컴퓨터의 주사율에 상관없이 동일한 속도로 이동하는 결과를 보여주려면?
  FPS(Frame Per Second) : 1초에 requestAnimationFrame 몇번 실행시킬까 ?

## 모니터마다 같은 비율로 프레임 실행되게 하려면?

- 전제
  내 모니터 주사율이 60Hz라면 1초에 60번 실행한다
  => 약 0.0016초에 1번 실행된다 (1requestAnimationFrame/16ms)
  만약 내가 만들 애니메이션을 1초에 10번 프레임 찍게 하고싶으면
  fps=10 이려면 0.1초(100ms)에 1번 requestAnimationFrame 실행시키게 하면 됨

  그러나 사양이 다른 모니터에서 같은 속도로 내려가게 하고싶다면??

  ```
  if(delta > interval) {
      애니메이션 동작!
  }
  then = now - (delta % interval)
  ```

  컴퓨터마다 사양 달라 requestAnimationFrame이 다른 횟수로 실행되지만 FPS사용하여 1초에 코드를 몇번 실행시킬지를 결정
  -> now와 then 값의 차이로 모든 모니터에서 동일한 시간에 동일한 움직임 보여줌 (성능이 낮으면 now와 then 값 차이가 큼)

  _100ms를 delta로 놓고 일정하게 증가하는 date.now() 에서
  증가하는 date.now() 가 100ms를 초과할때마다가 requestAnimationFrame 실행시켜주면 됨. 실행시켜 준 뒤에는 증가한 date.now에서 100빼고 다시 증가하는 date.now() 재줌.._
