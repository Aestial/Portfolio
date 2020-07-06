function bar(value, parent, params) {
    this.value = value;    
    this.create = function (value, params) {
        // Create shape
        let rectangle = new PIXI.Graphics();
        rectangle.lineStyle(3, 0x8A94A3); //#8A94A3
        rectangle.beginFill(UNIT_COLORS[value-1]);
        rectangle.drawRect(0, 0, UNIT_SIZE_PIXELS * value, UNIT_SIZE_PIXELS);
        rectangle.endFill();
        // Create texture and sprite from shape
        const texture = app.renderer.generateTexture(rectangle);
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.alpha = UNIT_NORMAL_ALPHA;
        // Allow to respond to mouse and touch events
        this.sprite.interactive = true;
        // Change to hand cursor when hover
        this.sprite.buttonMode = true;
        // sprite.scale.set(value, 1);
        this.sprite.currentTapTime = 0;
        this.sprite.lastTapTime = 0;
        this.sprite
            .on('pointerdown', onDragStart)
            .on('pointerup', onDragEnd)
            .on('pointerupoutside', onDragEnd)
            .on('pointermove', onDragMove)
            .on('pointertap', onTap);
        
        this.sprite.x = params.x;
        this.sprite.y = params.y;
        // sprite.zIndex = MAX_NUMBER - value;
        this.sprite.zIndex = value;
        // sprite.anchor.set(0.5/value, 0.5);
        let xanchor = (value % 2 == 0) ? -0.5/value : 0;
        this.sprite.anchor.set(xanchor + 0.5, 0.5);    
        // app.stage.addChild(rectangle);        
    }    
    this.create(value, params);
    parent.addChild(this.sprite);
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
    this.lastTapTime = this.currentTapTime;
    this.currentTapTime = Date.now();
    if ((this.currentTapTime - this.lastTapTime) < DOUBLE_TAP_THRESHOLD)
        this.rotation += Math.PI/4;    
}