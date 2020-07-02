const GRID_SIZE = 12;
const MAX_NUMBER = 10;

const DOUBLE_TAP_THRESHOLD = 420;

const UNIT_SIZE_PIXELS = 48;
const UNIT_NORMAL_ALPHA = 0.85;
const UNIT_ACTIVE_ALPHA = 0.35;

const UNIT_COLORS = [ 
    0xFFFFFF, //#FFFFFF
    0xD95863, //#D95863
    0xCE5B7C, //#CE5B7C
    0x6FB8D0, //#6FB8D0
    0x5F6AC0, //#5F6AC0                        
    0x70CD9D, //#70CD9D
    0xB9D072, //#B9D072
    0xE5C858, //#E5C858
    0xEDC397, //#EDC397
    0xE59179, //#E59179
];

let width = 672;
let height = 672;
let aspectRatio = width/height;

// Create a Pixi Application
let app = new PIXI.Application({ 
    width: width,         // default: 672
    height: height,        // default: 672
    antialias: true,    // default: false
    transparent: false, // default: false
    // resolution: 1,       // default: 1
    resolution: window.devicePixelRatio || 1,
    autoResize: true,
    backgroundColor: 0xE1E2E6
});

let lastTapTime, currentTapTime = 0;
let canvas_container = document.getElementById("pixi-canvas-container");

window.onload = function () 
{    
    let type = "WebGL";
    if (!PIXI.utils.isWebGLSupported()){
        type = "canvas";
    }
    PIXI.utils.sayHello(type);
    PIXI.RESOLUTION = window.devicePixelRatio;
    console.log("Resolution: " + PIXI.RESOLUTION);
    
    // Add the canvas that Pixi automatically created for you to the HTML document
    canvas_container.appendChild(app.view);
    app.view.className = "shadow";

    const grid = new PIXI.Container();
    app.stage.addChild(grid);

    // Create a grid of rectangles
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const cell = new PIXI.Graphics();
            cell.lineStyle(1, 0x636C78, 0.5);
            cell.beginFill(0x444E5E);
            const x = (j * UNIT_SIZE_PIXELS) + UNIT_SIZE_PIXELS;
            const y = (i * UNIT_SIZE_PIXELS) + UNIT_SIZE_PIXELS;
            cell.drawRect(x, y, UNIT_SIZE_PIXELS, UNIT_SIZE_PIXELS);
            cell.endFill();
            cell.id = 1 + (i * j)
            grid.addChild(cell);
        }
    }

    const container = new PIXI.Container();
    container.sortableChildren = true;
    app.stage.addChild(container);    

    // TEMP Create bars
    let evenMultiplier = 0;
    for (let i = 1; i <= MAX_NUMBER; i++) {
        // createNumber(
        //     Math.floor(Math.random() * app.screen.width),
        //     Math.floor(Math.random() * app.screen.height),
        //     i + 1,
        // );
        evenMultiplier += (i % 2 != 0) ? 1 : 0;
        let x = (evenMultiplier) * UNIT_SIZE_PIXELS + (3*UNIT_SIZE_PIXELS/2);
        let y = i * UNIT_SIZE_PIXELS + UNIT_SIZE_PIXELS/2;
        createNumber(x, y, i, container);

        // for (let j = 0; j < 1; j++)
        // {
        //     let x = (i * j * UNIT_SIZE_PIXELS) + 5*UNIT_SIZE_PIXELS/2;
        //     let y = i * UNIT_SIZE_PIXELS + UNIT_SIZE_PIXELS/2;
        //     createNumber(x, y, i);
        // }    
    }
    window.addEventListener("resize", resize);
    resize();
}

// To make responsive
// app.renderer.autoResize = true;
// app.renderer.resize(domContainer.innerWidth, domContainer.innerHeight);

function createNumber(x, y, value, parent)
{
    let rectangle = new PIXI.Graphics();
    rectangle.lineStyle(3, 0x8A94A3); //#8A94A3
    rectangle.beginFill(UNIT_COLORS[value-1]);
    rectangle.drawRect(0, 0, UNIT_SIZE_PIXELS * value, UNIT_SIZE_PIXELS);
    rectangle.endFill();
    
    var texture = app.renderer.generateTexture(rectangle);

    let sprite = new PIXI.Sprite(texture);
    sprite.alpha = UNIT_NORMAL_ALPHA;
    // sprite.tint = UNIT_COLORS[value-1]; //Change with the color wanted

    // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
    sprite.interactive = true;

    // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
    sprite.buttonMode = true;
    
    // sprite.scale.set(value, 1);

    sprite
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove)
        .on('pointertap', onTap);
    
    sprite.x = x;
    sprite.y = y;
    // sprite.zIndex = MAX_NUMBER - value;
    sprite.zIndex = value;

    // sprite.anchor.set(0.5/value, 0.5);
    let xanchor = (value % 2 == 0) ? -0.5/value : 0;
    sprite.anchor.set(xanchor + 0.5, 0.5);
 
    // app.stage.addChild(rectangle);
    parent.addChild(sprite);
}

function onDragStart(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = UNIT_ACTIVE_ALPHA;
    this.dragging = true;
    // this.anchor.set(0.5);
}

function onDragEnd() {
    this.alpha = UNIT_NORMAL_ALPHA;
    this.dragging = false;
    // set the interaction data to null
    this.data = null;
}

function onDragMove() {
    if (this.dragging) {
        const newPosition = this.data.getLocalPosition(this.parent);
        // CONTINOUS
        // this.x = newPosition.x;
        // this.y = newPosition.y;
        // DISCRETE
        this.x = Math.floor(newPosition.x/UNIT_SIZE_PIXELS) * UNIT_SIZE_PIXELS + UNIT_SIZE_PIXELS/2;
        this.y = Math.floor(newPosition.y/UNIT_SIZE_PIXELS) * UNIT_SIZE_PIXELS + UNIT_SIZE_PIXELS/2;
    }
}
function onTap() {
    lastTapTime = currentTapTime;
    currentTapTime = Date.now();
    if ((currentTapTime - lastTapTime) < DOUBLE_TAP_THRESHOLD)
        this.rotation += Math.PI/4;    
}

function resize() {
    let w = getParentDivWidth();
    let h = getParentDivHeight();
    if (w > h)  // Landscape
        w = h * aspectRatio;
    else
        h = w / aspectRatio;
    app.stage.scale.set(w / width, h / height);
    app.renderer.resize(w, h);
}

function getParentDivWidth() {
    let width = canvas_container.offsetWidth;
    console.log("Width " + width);
    return width;
}

function getParentDivHeight() {
    let height = canvas_container.offsetHeight;
    console.log("Height " + height);
    return height;
}