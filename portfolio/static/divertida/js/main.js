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

let width = 672; // default: 672
let height = 672; // default: 672
let aspectRatio = width/height;

// Create a Pixi Application
let app = new PIXI.Application({ 
    width: width,         
    height: height,        
    antialias: true, 
    transparent: false,
    resolution: window.devicePixelRatio || 1,
    autoResize: true,
    backgroundColor: 0xE1E2E6
});

let canvas_container = document.getElementById("pixi-canvas-container");

window.onload = function () 
{    
    let type = "WebGL";
    if (!PIXI.utils.isWebGLSupported()){
        type = "canvas";
    }
    PIXI.RESOLUTION = window.devicePixelRatio;
    PIXI.utils.sayHello(type);
    console.log("Resolution: " + PIXI.RESOLUTION);    
    
    // Add the canvas that Pixi automatically created for you to the HTML document
    canvas_container.appendChild(app.view);
    app.view.className = "shadow";

    new grid(GRID_SIZE, UNIT_SIZE_PIXELS, app.stage);
    new barman(MAX_NUMBER, UNIT_SIZE_PIXELS, app.stage);

    window.addEventListener("resize", resize);
    resize();
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
    let width = canvas_container.offsetWidth - 1;
    console.log("Width " + width);
    return width;
}

function getParentDivHeight() {
    let height = canvas_container.offsetHeight;
    console.log("Height " + height);
    return height;
}