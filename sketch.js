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

function setup() {
    font = loadFont('assets/fonts/Titillium-Light.otf');
    canvas = createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    canvas.position(0, 0);
    let camera = createCamera();
    player = new Player(0, 0, 0, PI, 0, camera);
}

function draw() {
    // background(map(mouseX, 0, width, 0, 255));
    background(255);
    player.updateCam();
    player.control();
    // normalMaterial();
    sphere(500);
    push();
    translate(300, 0, 0);
    fill(255, 0, 0);
    sphere(100);
    pop()
    push();
    translate(-300, 0, 0);
    fill(0, 255, 0);
    sphere(100);
    pop()
    push();
    translate(0, 0, 300);
    fill(0, 0, 255);
    sphere(100);
    pop()
    push();
    translate(0, 0, -300);
    fill(255, 120, 0);
    sphere(100);
    pop()
    
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

function Player(x, y, z, rotationX, rotationY, camera) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.rotationX = rotationX;
    this.rotationY = rotationY;
    this.camera = camera;

    this.updateCam = function() {
        setCamera(this.camera);
        this.camera.setPosition(this.x, this.y, this.z);
        // camera, this.x+sin(this.rotationX)*10, this.y+sin(this.rotationY)*10, this.z+cos(this.rotationX)*10);

    }

    this.control = function() {
        this.rotationX += -movedX * 0.001;
        this.rotationY += movedY * 0.001;
        this.camera.pan(-movedX * 0.001);
        this.camera.tilt(movedY * 0.001); 
        // this.rotationX = -map(-movedX, 0, width, -PI/2, PI/2);
        // this.rotationY = map(mouseY, 0, height, -PI/2, PI/2);

        if(keys["w"]) {
            this.x += sin(this.rotationX) * speed;
            this.z += cos(this.rotationX) * speed;
        }
        if(keys["s"]) {
            this.x -= sin(this.rotationX) * speed;
            this.z -= cos(this.rotationX) * speed;
        }
        if(keys["d"]) {
            this.x -= sin(this.rotationX+PI/2) * speed;
            this.z -= cos(this.rotationX+PI/2) * speed;
        }
        if(keys["a"]) {
            this.x += sin(this.rotationX+PI/2) * speed;
            this.z += cos(this.rotationX+PI/2) * speed;
        }
    }
}