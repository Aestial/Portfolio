function barman(count, unit_size, parent) {
    this.container = new PIXI.Container();
    this.container.sortableChildren = true;
    this.count = count;
    this.input = function (n) {
        let evenMultiplier = 0;        
        for (let i = 1; i <= n; i++) {
            evenMultiplier += (i % 2 != 0) ? 1 : 0;
            
            let params = {};
            params.x = (evenMultiplier) * unit_size + (3*unit_size/2);
            params.y = i * unit_size + unit_size/2;
            
            let keyValue = "";
            if (i == 10) keyValue = String(0);
            else keyValue = String(i);
            
            let keyObject = keyboard(keyValue);
            // keyObject.press = () => {
            //     //key object pressed
            // };
            keyObject.release = () => {
                console.log(keyValue);
                new bar (i, this.container, params);
            };
        }
    }
    this.createAllOnce = function (n) {
        // Create bars
        let evenMultiplier = 0;
        // TODO: REMOVE
        for (let i = 1; i <= n; i++) {
            evenMultiplier += (i % 2 != 0) ? 1 : 0;
            let params = {};
            params.x = (evenMultiplier) * unit_size + (3*unit_size/2);
            params.y = i * unit_size + unit_size/2;
            new bar(i, this.container, params);
        }        
    }
    this.input(this.count);
    this.createAllOnce(this.count);
    parent.addChild(this.container);
}