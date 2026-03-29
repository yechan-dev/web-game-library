# 🎮Web Game Library (JavaScript) v1.0

### 간단하게 웹에서 게임을 만들 수 있도록 도와주는 JavaScript 라이브러리입니다.

## ❓How to use
당신의 HTML 파일의 body 부분에 다음 코드를 붙이세요.
```html
<script src="https://yechan-dev.github.io/web-game-library/library.js"></script>
```
---
## ⚙️Functions
---
### Get Input
**onKey**
```js
onKey(key, function(){
    // callback
});
```

**onKeyUp**
```js
onKeyUp(key, function(){
    // callback
});
```
**onClick**
```js
sprite.onClick(function(){
    // callback
})
```
**onClickUp**
```js
sprite.onClickUp(function(){
    // callback
});
```

---
### Moving
**setVelocity**
```js
sprite.setVelocityX(px);
sprite.setVelocityY(px);
```

**move**
```js
sprite.moveX(px);
sprite.moveY(px);
```
---
### Modify / Add sprite
**createSprite**
```js
let sprite = createSprite();
sprite.x = px;
sprite.y = px;
sprite.texture = image;
```

**setPosition**
```js
sprite.setPosition(x, y);
```

**setSize**
```js
sprite.setSize(x, y);
```

**hide**
```js
sprite.hide();
```

**show**
```js
sprite.show();
```

**block**
```js
wall.block(player);
```
---
### Animation
**setAnimation**
```js
sprite.setAnimation([images], ms);
```

**stopAnimation**
```js
sprite.stopAnimation();
```
---
### Detect
**onOverlap**
```js
sprite.onOverlap(another_sprite, function(){
    // callback
});
```

---

### Sound

**playSound**
```js
playSound(sound);
```
**stopSound**
```js
stopSound(sound);
```
