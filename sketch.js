var player;
let font;
let speed = 5;
let gravity = -9.8;
let keys = {
    "w": false,
    "a": false,
    "s": false,
    "d": false,
}
let platforms = [];

function setup() {
    font = loadFont('assets/fonts/Titillium-Light.otf');
    canvas = createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    canvas.position(0, 0);
    let camera = createCamera();
    player = new Player(0, -150, 0, PI, 0, camera);
    platforms.push(new Platform(0, 0, 0, 400, 20, 400, color(0, 150, 255)));
    platforms.push(new Platform(100, -50, 0, 50, 100, 50, color(255, 150, 0)));
}

function draw() {
    // background(map(mouseX, 0, width, 0, 255));
    background(255);
    player.updateCam();
    player.control();
    // normalMaterial();
    platforms.forEach(platform => {
        platform.show();
    });
}

function mousePressed() {
    requestPointerLock();
}

function keyPressed() {
    keys[key] = true;
}

function keyReleased() {
    keys[key] = false;
}

function isTouching(x1, y1, z1, w1, h1, d1, x2, y2, z2, w2, h2, d2) {
    return (x1+w1/2>x2-w2/2&&x1-w1/2<x2+w2/2&&y1+h1/2>y2-h2/2&&y1-h1/2<y2+h2/2&&z1+d1/2>z2-d2/2&&z1-d1/2<z2+d2/2);
    // return (x1+w1/2<x2-w2/2&&x1-w1/2>x2+w2/2&&y1+h1/2<y2-h2/2&&y1-h1/2>y2+h2/2&&z1+d1/2<z2-d2/2&&z1-d1/2>z2+d2/2);
}

function Platform(x, y, z, w, h, d, c) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.h = h;
    this.d = d;
    this.c = c;
    this.show = function() {
        push();
        fill(this.c);
        translate(x, y, z);
        box(w, h, d);
        pop();
    }
}

function Player(x, y, z, rotationX, rotationY, camera) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = 50;
    this.h = 200;
    this.d = 50;
    this.rotationX = rotationX;
    this.rotationY = rotationY;
    this.camera = camera;
    this.isTouchingPlatform = false;

    this.updateCam = function() {
        setCamera(this.camera);
        this.camera.setPosition(this.x, this.y, this.z);
        // camera, this.x+sin(this.rotationX)*10, this.y+sin(this.rotationY)*10, this.z+cos(this.rotationX)*10);

    }

    this.show = function() {
        push();
        translate(this.x, this.y, this.z);
        box(this.w, this.h, this.d);
        pop();
    }

    this.control = function() {
        // this.rotationX += -movedX * 0.001;
        // this.rotationY += movedY * 0.001;
        this.camera.pan(-movedX * 0.001);
        this.camera.tilt(movedY * 0.001); 
        // console.log(this.camera._getLocalAxes().x);
        this.rotationX = this.camera._getLocalAxes().x[0]+PI/2;
        // this.rotationY = this.camera.tilt;
        // this.rotationX = -map(-movedX, 0, width, -PI/2, PI/2);
        // this.rotationY = map(mouseY, 0, height, -PI/2, PI/2);

        if(keys["w"]) {
            let deltaX = sin(this.rotationX) * speed;
            let deltaZ = cos(this.rotationX) * speed;
            this.x += deltaX;
            this.z += deltaZ;
            
            this.isTouchingPlatform = false;

            platforms.forEach(platform => {
                if(isTouching(platform.x,platform.y,platform.z,platform.w,platform.h,platform.d,this.x,this.y,this.z,this.w,this.h,this.d)) {
                    this.isTouchingPlatform = true;
                }
            });

            if(this.isTouchingPlatform) {
                this.x -= deltaX;
                this.z -= deltaZ;
            }
        }
        if(keys["s"]) {
            let deltaX = -sin(this.rotationX) * speed;
            let deltaZ = -cos(this.rotationX) * speed;
            this.x += deltaX;
            this.z += deltaZ;
            this.isTouchingPlatform = false;

            platforms.forEach(platform => {
                if(isTouching(platform.x,platform.y,platform.z,platform.w,platform.h,platform.d,this.x,this.y,this.z,this.w,this.h,this.d)) {
                    this.isTouchingPlatform = true;
                }
            });
            if(this.isTouchingPlatform) {
                this.x -= deltaX;
                this.z -= deltaZ;
            }
        }
        if(keys["d"]) {
            let deltaX = -sin(this.rotationX+PI/2) * speed;
            let deltaZ = -cos(this.rotationX+PI/2) * speed;
            this.x += deltaX;
            this.z += deltaZ;
            this.isTouchingPlatform = false;

            platforms.forEach(platform => {
                if(isTouching(platform.x,platform.y,platform.z,platform.w,platform.h,platform.d,this.x,this.y,this.z,this.w,this.h,this.d)) {
                    this.isTouchingPlatform = true;
                }
            });
            if(this.isTouchingPlatform) {
                this.x -= deltaX;
                this.z -= deltaZ;
            }
        }
        if(keys["a"]) {
            let deltaX = sin(this.rotationX+PI/2) * speed;
            let deltaZ = cos(this.rotationX+PI/2) * speed;
            this.x += deltaX;
            this.z += deltaZ;
            this.isTouchingPlatform = false;

            platforms.forEach(platform => {
                if(isTouching(platform.x,platform.y,platform.z,platform.w,platform.h,platform.d,this.x,this.y,this.z,this.w,this.h,this.d)) {
                    this.isTouchingPlatform = true;
                }
            });
            if(this.isTouchingPlatform) {
                this.x -= deltaX;
                this.z -= deltaZ;
            }
        }
    }
}