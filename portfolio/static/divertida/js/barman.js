function barman(count, parent, params) {
    this.container = new PIXI.Container();
    this.container.sortableChildren = true;
    this.count = count;
    this.input = function (n) {
        let evenMultiplier = 0;        
        for (let i = 1; i <= n; i++) {
            evenMultiplier += (i % 2 != 0) ? 1 : 0;
            const x = (evenMultiplier) * params.size;
            const y = i * params.size + params.size/2;
            
            let keyValue = "";
            if (i == 10) keyValue = String(0);
            else keyValue = String(i);
            
            let keyObject = keyboard(keyValue);    
            keyObject.release = () => { // keyObject.press 
                console.log(keyValue);
                new bar (i, x, y, this.container, params);
            };
        }
    }
    this.createAllOnce = function (n) {
        // Create bars
        let evenMultiplier = 0;
        // TODO: REMOVE
        for (let i = 1; i <= n; i++) {
            evenMultiplier += (i % 2 != 0) ? 1 : 0;
            const x = (evenMultiplier) * params.size + (3*params.size/2);
            const y = i * params.size + params.size/2;
            new bar(i, x, y, this.container, params);
        }        
    }
    this.input(this.count);
    this.createAllOnce(this.count);
    parent.addChild(this.container);
}