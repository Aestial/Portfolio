function button(value, x, y, parent, params) {
    let button = {};
    button.value = value;
    button.onTap = undefined;
    button.tapHandler = event => {        
        // console.log("Button: " + button.value);
        if (button.onTap) button.onTap();
    }
    const tapListener = button.tapHandler.bind(button);
    // Create shape
    const rectangle = new PIXI.Graphics();
    rectangle.lineStyle(3, 0x8A94A3); //#8A94A3
    rectangle.beginFill(params.colors[value-1]);
    rectangle.drawRect(0, 0, params.size, params.size);
    rectangle.endFill();
    // Create texture and sprite from shape
    const texture = app.renderer.generateTexture(rectangle);
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.button = this;    
    // this.sprite.alpha = params.normalAlpha;
    this.sprite.x = x;
    this.sprite.y = y;
    this.sprite.anchor.set(0, 0.5);    
    // Allow to respond to mouse and touch events
    this.sprite.interactive = true;
    // Change to hand cursor when hover
    this.sprite.buttonMode = true;
    // this.sprite.currentTapTime = 0;
    // this.sprite.lastTapTime = 0;    
    this.sprite.on(
        'pointertap', tapListener, false
    );
    const style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 20,
        // fontStyle: 'italic',
        // fontWeight: 'bold',
        fill: '#fafafa', // ['#ffffff', '#00ff99'], // gradient
        stroke: '#8A94A3',
        strokeThickness: 1,
        dropShadow: true,
        dropShadowColor: '#5f5f5f',
        dropShadowBlur: 2,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 1,
        wordWrap: true,
        wordWrapWidth: params.size,
    });
    const text = new PIXI.Text(String(value), style);    
    text.anchor.set(0.5);
    text.x = params.size/2;
    // text.y = -params.size/2;
    this.sprite.addChild(text);
    parent.addChild(this.sprite);
    return button;
}