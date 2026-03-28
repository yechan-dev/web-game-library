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
    sprite.style.position = "relative";
    document.body.appendChild(sprite);
    let velocityX = 0;
    let velocityY = 0;
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
            this.sprite.addEventListener("click", () => {
                callback();
            });
        },
        onClickUp(callback){
            this.sprite.addEventListener("click", () => {
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
