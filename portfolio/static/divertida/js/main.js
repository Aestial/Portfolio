const GRID_SIZE = { x: 27, y: 20 };
const MAX_VALUE = 10;

const UNIT_SIZE_PIXELS = 24;
const UNIT_COLORS = [ 
    0xFFFFFF, //#FFFFFF
    0xE74547, //#E74547
    0xAEE548, //#AEE548
    0xE998C9, //#E998C9
    0xFFEA00, //#FFEA00
    0x10992D, //#10992D
    0x111111, //#111111
    0x704215, //#704215
    0x406AF0, //#406AF0
    0xF57035, //#F57035
];
const UNIT_NORMAL_ALPHA = 0.925;
const UNIT_ACTIVE_ALPHA = 0.5;
const DOUBLE_TAP_THRESHOLD = 420;

const width = 800; // default: 672
const height = 550; // default: 672
const aspectRatio = width/height;

// Create a Pixi Application
let app = new PIXI.Application({ 
    width: width,         
    height: height,        
    antialias: true, 
    transparent: false,
    resolution: window.devicePixelRatio || 1,
    autoResize: true,
    backgroundColor: 0xEDEEEF,
});

let grid_params = {
    size: UNIT_SIZE_PIXELS,
    offset: {
        x: UNIT_SIZE_PIXELS * 6,
        y: UNIT_SIZE_PIXELS,
    }
};

let barman_params = {
    size: UNIT_SIZE_PIXELS,
    colors: UNIT_COLORS,
    normalAlpha: UNIT_NORMAL_ALPHA,
    activeAlpha: UNIT_ACTIVE_ALPHA,        
    doubleTapThreshold: DOUBLE_TAP_THRESHOLD,
    width: width,         
    height: height,
    maxValue: MAX_VALUE,
};

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

    const clickSound = PIXI.sound.Sound.from(clickSoundPath);
    const clickSoftSound = PIXI.sound.Sound.from(clickSoftSoundPath);

    barman_params.sounds = {
        click: clickSound,
        clickSoft: clickSoftSound,
    };

    // TITLE
    var logoSprite = new PIXI.Sprite(logoTexture);
    logoSprite.anchor.set(0, 1);
    logoSprite.x = 8;
    logoSprite.y = 80;
    logoSprite.width = 30;
    logoSprite.height = 55;
    const style = new PIXI.TextStyle({
        fontFamily: 'Chilanka',
        fontSize: 16,
        // fontStyle: 'italic',
        fontWeight: 'bold',
        fill: '#444E8E', // ['#ffffff', '#00ff99'], // gradient
        stroke: '#eaeaea',
        strokeThickness: 0,
        dropShadow: false,
        dropShadowColor: '#2f2f2f',
        dropShadowBlur: 2,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 1,
        wordWrap: true,
        // wordWrapWidth: params.size,
    });
    let text = new PIXI.Text('Comprender', style);
    text.x = 30;
    text.y = 60;

    app.stage.addChild(logoSprite);
    app.stage.addChild(text);

    // INPUT 
    var input = new PIXI.TextInput({
        input: {
            fontFamily: 'Chilanka',
            fontSize: '19px',
            width: '120px',
            height: '140px',
            multiline: true,
        }, 
        box: {fill: 0xEEEEEE,}
    });
    input.x = 10;
    input.y = 100;
    input.placeholder = 'Ingresa aquí el texto.';
    app.stage.addChild(input);
    input.focus();

    new grid(GRID_SIZE, app.stage,grid_params, grid_params);
    new barman(MAX_VALUE, app.stage, barman_params);    

    window.addEventListener("resize", resize);
    resize();
}

function resize() {
    let w = getParentDivWidth();
    let h = getParentDivHeight();
    // Landscape
    if (w > h)  w = h * aspectRatio;
    // Portrait
    else  h = w / aspectRatio;
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