// Web game library for JavaScript

function onKey(key, callback){
    document.addEventListener("keydown", (e) => {
        if(e.key === key){
            callback();
        }
    });
}
function onKeyUp(key, callback){
    document.addEventListener("keyup", (e) => {
        if(e.key === key){
            callback();
        }
    });
}
function createSprite(){
    const sprite = document.createElement("div");
    sprite.style.position = "absolute";
    document.body.appendChild(sprite);
    let velocityX = 0;
    let velocityY = 0;
    let rotation = 0;
    const overlaps = [];
    function update(){
        const x = parseInt(sprite.style.left) || 0;
        const y = parseInt(sprite.style.top) || 0;
        sprite.style.left = (x + velocityX) + "px";
        sprite.style.top = (y + velocityY) + "px";
        const rectA = sprite.getBoundingClientRect();
        overlaps.forEach(({target, callback}) => {
            const rectB = target.sprite.getBoundingClientRect();
            if (rectA.left < rectB.right && rectA.right > rectB.left && rectA.top < rectB.bottom && rectA.bottom > rectB.top){
                callback();
            }
        });
        requestAnimationFrame(update);
    }
    update();
    return {
        sprite,
        setVelocityX(value){
            velocityX = value;
        },
        setVelocityY(value){
            velocityY = value;
        },
        get velocityX(){
            return velocityX;
        },
        get velocityY(){
            return velocityY;
        },
        moveX(value){
            const current = parseInt(this.sprite.style.left) || 0;
            this.sprite.style.left = (current + value) + "px";
        },
        moveY(value){
            const current = parseInt(this.sprite.style.top) || 0;
            this.sprite.style.top = (current + value) + "px";
        },
        setSize(x_len, y_len){
            this.sprite.style.width = x_len + "px";
            this.sprite.style.height = y_len + "px";
        },
        setPosition(x_pos, y_pos){
            this.sprite.style.left = x_pos + "px";
            this.sprite.style.top = y_pos + "px";
        },
        turn(degree){
            rotation += degree;
            this.sprite.style.transform = `rotate(${rotation}deg)`;
        },
        hide(){
            this.sprite.style.display = "none";
        },
        show(){
            this.sprite.style.display = "block";
        },
        onOverlap(target, callback){
            overlaps.push({ target, callback });
        },
        onClick(callback){
            this.sprite.addEventListener("mousedown", () => {
                callback();
            });
        },
        onClickUp(callback){
            this.sprite.addEventListener("mouseup", () => {
                callback();
            });
        },
        setAnimation(pictures, ms){
            if (this.animationId) clearInterval(this.animationId);
            let scenes = 0;
            this.animationId = setInterval(() => {
                this.texture = pictures[scenes];
                scenes = (scenes + 1) % pictures.length;
            }, ms);
        },
        block(target){
            target.onOverlap(this, () => {
                const x = parseInt(target.sprite.style.left) || 0;
                const y = parseInt(target.sprite.style.top) || 0;
                target.sprite.style.left = (x - target.velocityX) + "px";
                target.sprite.style.top = (y - target.velocityY) + "px";
            });
        },
        stopAnimation(){
            if (this.animationId) {
                clearInterval(this.animationId);
                this.animationId = null;
            }
        },
        set x(value){
            this.sprite.style.left = value + "px";
        },
        set y(value){
            this.sprite.style.top = value + "px";
        },
        set texture(value){
            this.sprite.style.backgroundImage = `url(${value})`;
            this.sprite.style.backgroundSize = "cover";
            this.sprite.style.backgroundPosition = "center";
        },
    };
}

let currentAudio = null;

function playSound(value){
    currentAudio = new Audio(value);
    currentAudio.play();
}

function stopSound(){
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
}