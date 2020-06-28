let type = "WebGL";

if (!PIXI.utils.isWebGLSupported()){
    type = "canvas";
}
PIXI.utils.sayHello(type);

// Create a Pixi Application
let app = new PIXI.Application({ 
    width: 720,         // default: 800
    height: 650,        // default: 600
    antialias: true,    // default: false
    transparent: false, // default: false
    resolution: 1,       // default: 1
    backgroundColor: 0xC9BAA0,
  }
);

// Add the canvas that Pixi automatically created for you to the HTML document
var domElements = document.getElementsByClassName('pixi-container');
var domContainer = domElements[0];
domContainer.appendChild(app.view);

// To make responsive
// app.renderer.autoResize = true;
// app.renderer.resize(domContainer.innerWidth, domContainer.innerHeight);

const GRID_SIZE = 12;
const MAX_NUMBER = 10;

const DOUBLE_TAP_THRESHOLD = 420;

const UNIT_SIZE_PIXELS = 48;
const UNIT_NORMAL_ALPHA = 0.66;
const UNIT_ACTIVE_ALPHA = 0.35;

const UNIT_COLORS = [   0xFFFFFF, 
                        0xD0423B, 
                        0x8BA0C5,
                        0xA88867,
                        0x70C053,
                        0x084A81,
                        0xEFD647,
                        0x93D1D0,
                        0xEABEBD,
                        0xEA7267,
                    ];

let lastTapTime, currentTapTime = 0;

const grid = new PIXI.Container();
app.stage.addChild(grid);

// Create a grid of rectangles
for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
        const cell = new PIXI.Graphics();
        cell.lineStyle(1, 0x000000, 0.35);
        cell.beginFill(0xc9cacb);
        const x = (j * UNIT_SIZE_PIXELS) + 2 * UNIT_SIZE_PIXELS;
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
for (let i = 1; i <= MAX_NUMBER; i++) {
    // createNumber(
    //     Math.floor(Math.random() * app.screen.width),
    //     Math.floor(Math.random() * app.screen.height),
    //     i + 1,
    // );
    for (let j = 0; j < 1; j++)
    {
        let x = (i * j * UNIT_SIZE_PIXELS) + 5*UNIT_SIZE_PIXELS/2;
        let y = i * UNIT_SIZE_PIXELS + UNIT_SIZE_PIXELS/2;
        createNumber(x, y, i);
    }    
}

function createNumber(x, y, value) 
{
    let rectangle = new PIXI.Graphics();
    rectangle.lineStyle(2, 0x000000, 0.85);
    rectangle.beginFill(0xFFFFFF);
    rectangle.drawRect(0, 0, UNIT_SIZE_PIXELS * value, UNIT_SIZE_PIXELS);
    rectangle.endFill();
    
    var texture = app.renderer.generateTexture(rectangle);

    let sprite = new PIXI.Sprite(texture);
    sprite.tint = UNIT_COLORS[value-1]; //Change with the color wanted
    sprite.alpha = UNIT_NORMAL_ALPHA;
    
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
    sprite.zIndex = MAX_NUMBER - value;

    sprite.anchor.set(0.5/value, 0.5);

    // app.stage.addChild(rectangle);
    container.addChild(sprite);
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
        this.rotation += Math.PI/2;    
}