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
    let scaleX = 1;
    let scaleY = 1;
    let gravity = 0;

    const overlaps = [];

    function update(){
        let x = parseInt(sprite.style.left) || 0;
        let y = parseInt(sprite.style.top) || 0;

        velocityY += gravity;
        y += velocityY;
        sprite.style.top = y + "px";

        let rectA = sprite.getBoundingClientRect();

        overlaps.forEach(({target, callback}) => {
            const rectB = target.sprite.getBoundingClientRect();
            if (rectA.left < rectB.right && rectA.right > rectB.left && rectA.top < rectB.bottom && rectA.bottom > rectB.top){
                callback();
                if (velocityY > 0){
                    sprite.style.top = (rectB.top - rectA.height) + "px";
                    velocityY = 0;
                } 
                else if (velocityY < 0){
                    sprite.style.top = rectB.bottom + "px";
                    velocityY = 0;
                }
            }
        });
        y = parseInt(sprite.style.top) || 0;
        x += velocityX;
        sprite.style.left = x + "px";
        rectA = sprite.getBoundingClientRect();
        overlaps.forEach(({target, callback}) => {
            const rectB = target.sprite.getBoundingClientRect();
            if (rectA.left < rectB.right && rectA.right > rectB.left && rectA.top < rectB.bottom && rectA.bottom > rectB.top){
                if (velocityX > 0){
                    sprite.style.left = (rectB.left - rectA.width) + "px";
                    velocityX = 0;
                } else if (velocityX < 0){
                    sprite.style.left = rectB.right + "px";
                    velocityX = 0;
                }
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

        setGravity(value){
            gravity = value;
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
            this.sprite.style.transform = `rotate(${rotation}deg) scaleX(${scaleX}) scaleY(${scaleY})`;
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
                if (target.velocityY > 0){
                    target.sprite.style.top = (y - target.velocityY) + "px";
                    target.setVelocityY(0);
                }
            });
        },
        stopAnimation(){
            if (this.animationId) {
                clearInterval(this.animationId);
                this.animationId = null;
            }
        },
        flipX(value){
            scaleX = value ? -1 : 1;
            this.sprite.style.transform = `rotate(${rotation}deg) scaleX(${scaleX}) scaleY(${scaleY})`;
        },

        flipY(value){
            scaleY = value ? -1 : 1;
            this.sprite.style.transform = `rotate(${rotation}deg) scaleX(${scaleX}) scaleY(${scaleY})`;
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