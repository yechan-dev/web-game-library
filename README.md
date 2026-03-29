# 🎮Web Game Library (JavaScript) v1.0

### 간단하게 웹에서 게임을 만들 수 있도록 도와주는 JavaScript 라이브러리입니다.

## ❓ How to use
당신의 HTML 파일의 body 부분에 다음 코드를 붙이세요.
```html
<script src="https://yechan-dev.github.io/web-game-library/library.js"></script>
```
---
## ⚙️ Functions
---
### ⌨️ Get Input
##### 키보드나 마우스를 통해 입력 받는 것을 감지하는 코드입니다.
---
- **onKey**
```js
onKey(key, function(){
    // callback
});
```
---
- **onKeyUp**
```js
onKeyUp(key, function(){
    // callback
});
```
---
- **onClick**
```js
sprite.onClick(function(){
    // callback
})
```
---
- **onClickUp**
```js
sprite.onClickUp(function(){
    // callback
});
```
---
### 👟 Moving
##### 스프라이트가 움직이게 하는 코드입니다.
---
- **setVelocity**
```js
sprite.setVelocityX(px);
sprite.setVelocityY(px);
```
---
- **move**
```js
sprite.moveX(px);
sprite.moveY(px);
```
---
- **setGravity**
```js
sprite.setGravity(px);
```
---
- **flip**
```js
sprite.flipX(bool);
sprite.flipY(bool);
```
---
### 🔧 Modify / Add sprite
##### 스프라이트의 여러가지 기본 요소들을 수정하는 코드입니다.
---
- **createSprite**
```js
let sprite = createSprite();
sprite.x = px;
sprite.y = px;
sprite.texture = image;
```
---
- **setPosition**
```js
sprite.setPosition(x, y);
```
---
- **setSize**
```js
sprite.setSize(x, y);
```
---
- **hide**
```js
sprite.hide();
```
---
- **show**
```js
sprite.show();
```
---
- **block**
```js
wall.block(player);
```
---
### 🎞️ Animation
##### 스프라이트에 애니메이션을 추가하는 코드입니다.
---
- **setAnimation**
```js
sprite.setAnimation([images], ms);
```
---
- **stopAnimation**
```js
sprite.stopAnimation();
```
---
### Sprite Detect
##### 스프라이트 간의 상호작용을 감지하는 코드입니다.
- **onOverlap**
```js
sprite.onOverlap(another_sprite, function(){
    // callback
});
```
---

### Sound
##### 소리에 관한 코드입니다.
- **playSound**
```js
playSound(sound);
```
---
- **stopSound**
```js
stopSound(sound);
```
---