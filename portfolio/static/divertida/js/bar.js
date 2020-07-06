function bar(value, x, y, parent, params) {
    this.value = value;
    this.onDragStart = function (event) {
        // store a reference to the data the reason for this is because of multitouch
        // we want to track the movement of this particular touch
        this.data = event.data;
        this.alpha = params.activeAlpha;
        this.dragging = true;
    }    
    this.onDragEnd = function () {
        this.alpha = params.normalAlpha;
        this.dragging = false;
        // set the interaction data to null
        this.data = null;
        if (this.x < params.width/2 + params.size && this.x > params.width/2 - params.size && this.y > params.height - params.size) {
            console.log("Deleted: " + this.zIndex);
            this.delete();
        }
    }
    this.onDragMove = function () {
        if (this.dragging) {
            const newPosition = this.data.getLocalPosition(this.parent);
            // CONTINOUS
            // this.x = newPosition.x;
            // this.y = newPosition.y;
            // DISCRETE
            this.x = Math.floor(newPosition.x/params.size) * params.size + params.size/2;
            this.y = Math.floor(newPosition.y/params.size) * params.size + params.size/2;
            console.log("Position: " + this.x + ", " + this.y);
        }
    }    
    this.onTap = function () {
        this.lastTapTime = this.currentTapTime;
        this.currentTapTime = Date.now();
        if ((this.currentTapTime - this.lastTapTime) < params.doubleTapThreshold)
            this.rotation += Math.PI/4;    
    }
    // Create shape
    const rectangle = new PIXI.Graphics();
    rectangle.lineStyle(3, 0x8A94A3); //#8A94A3
    rectangle.beginFill(params.colors[value-1]);
    rectangle.drawRect(0, 0, params.size * value, params.size);
    rectangle.endFill();
    // Create texture and sprite from shape
    const texture = app.renderer.generateTexture(rectangle);
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.bar = this;
    this.sprite.alpha = params.normalAlpha;
    this.sprite.x = x;
    this.sprite.y = y;
    // sprite.zIndex = MAX_NUMBER - value;
    this.sprite.zIndex = value;    
    const xanchor = (value % 2 == 0) ? -0.5/value : 0;
    this.sprite.anchor.set(xanchor + 0.5, 0.5);    
    // Allow to respond to mouse and touch events
    this.sprite.interactive = true;
    // Change to hand cursor when hover
    this.sprite.buttonMode = true;    
    this.sprite.currentTapTime = 0;
    this.sprite.lastTapTime = 0;    
    this.sprite
        .on('pointerdown', this.onDragStart)
        .on('pointerup', this.onDragEnd)
        .on('pointerupoutside', this.onDragEnd)
        .on('pointermove', this.onDragMove)
        .on('pointertap', this.onTap);
    this.sprite
        .delete = function () {
            parent.removeChild(this);
            console.log(parent.children);
            delete this.bar;
            this.destroy();            
        }
    parent.addChild(this.sprite);
}