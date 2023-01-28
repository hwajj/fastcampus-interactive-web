- 캔버스 사이즈 조절

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

//하나의 css픽셀을 그릴때 사용되는 장치의 픽셀 수
1px 그리는데 사용되는 장치의 px수
dpr 높을수록 선명한 그래픽 보여준다.
맥 = dpr 2
dpr 2인 기기에서 ctx.scale(2,2)

```
canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;

ctx.scale(dpr, dpr)

```

픽셀이 2배로 들어간 캔버스를 css사이즈로 조정 => 더 선명한 그림
