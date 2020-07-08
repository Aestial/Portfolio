function grid(size, parent, params) {
    this.size = size;
    this.container = new PIXI.Container();
    this.create = function (size) {
        // Create a grid of rectangles
        for (let i = 0; i < size.y; i++) {
            for (let j = 0; j < size.x; j++) {
                const cell = new PIXI.Graphics();
                cell.lineStyle(1, 0x636C78, 0.5);
                cell.beginFill(0x444E5E);
                const x = (j * params.size) + params.offset.x;
                const y = (i * params.size) + params.offset.y;
                cell.drawRect(x, y, params.size, params.size);
                cell.endFill();
                cell.id = 1 + (i * j)
                this.container.addChild(cell);
            }
        }    
    }
    this.create(this.size);    
    parent.addChild(this.container);
}