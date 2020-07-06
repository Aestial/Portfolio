function grid(size, unit_size, parent) {
    this.size = size;
    this.container = new PIXI.Container();
    this.create = function (size) {
        // Create a grid of rectangles
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const cell = new PIXI.Graphics();
                cell.lineStyle(1, 0x636C78, 0.5);
                cell.beginFill(0x444E5E);
                const x = (j * unit_size) + unit_size;
                const y = (i * unit_size) + unit_size;
                cell.drawRect(x, y, unit_size, unit_size);
                cell.endFill();
                cell.id = 1 + (i * j)
                this.container.addChild(cell);
            }
        }    
    }
    this.create(this.size);    
    parent.addChild(this.container);
}