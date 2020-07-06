function barman(count, parent, params) {
    this.count = count;
    this.buttons = new PIXI.Container();
    this.bars = new PIXI.Container();
    this.bars.sortableChildren = true;
    this.createButtons = function (n) {
        let evenMultiplier = 0;        
        for (let i = 1; i <= n; i++) {            
            evenMultiplier += (i % 2 != 0) ? 1 : 0;
            const btnX = 0;
            const btnY = i * params.size + params.size/2;
            let buttonObject = button(i, btnX, btnY, this.buttons, params);
            const x = (evenMultiplier) * params.size + (3*params.size/2);
            const y = i * params.size + params.size/2;
            buttonObject.onTap = () => {
                console.log("Barman: " + i);
                new bar(i, x, y, this.bars, params);
            }
        }
        const trashSprite = new PIXI.Sprite(trashTexture);
        trashSprite.anchor.set(0.5, 1);
        trashSprite.x = params.width/2;
        trashSprite.y = params.height + 3;
        trashSprite.width = params.size * 1.15;
        trashSprite.height = params.size* 1.15;
        trashSprite.tint = 0x444E5E; // #444E5E
        this.buttons.addChild(trashSprite);
    }
    this.createAllBarsOnce = function (n) {
        let evenMultiplier = 0;
        for (let i = 1; i <= n; i++) {
            evenMultiplier += (i % 2 != 0) ? 1 : 0;
            const x = (evenMultiplier) * params.size + (params.size/2);
            const y = i * params.size + params.size/2;
            new bar(i, x, y, this.bars, params);
        }        
    }
    this.keyboardInput = function (n) {
        let evenMultiplier = 0;        
        for (let i = 1; i <= n; i++) {
            evenMultiplier += (i % 2 != 0) ? 1 : 0;
            const x = (evenMultiplier) * params.size + (params.size/2);
            const y = i * params.size + params.size/2;
            let keyValue = "";
            if (i == 10) keyValue = String(0);
            else keyValue = String(i);            
            let keyObject = keyboard(keyValue);    
            keyObject.release = () => { // keyObject.press 
                console.log(keyValue);
                new bar (i, x, y, this.bars, params);
            };
        }
    }
    this.createButtons(this.count);
    this.keyboardInput(this.count);
    // this.createAllBarsOnce(this.count);
    parent.addChild(this.buttons);
    parent.addChild(this.bars);
}