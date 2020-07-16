function barman(count, parent, params) {
    this.count = count;
    this.buttons = new PIXI.Container();
    this.bars = new PIXI.Container();
    this.bars.sortableChildren = true;
    this.createButtons = function (n) {
        let evenMultiplier = 0;        
        for (let i = 1; i <= n; i++) {            
            evenMultiplier += (i % 2 != 0) ? 1 : 0;
            const btnX = 50;
            const btnY = i * params.size + params.size/2 + 240;
            let buttonObject = button(i, btnX, btnY, this.buttons, params);
            const x = (evenMultiplier) * params.size + (11*params.size/2);
            const y = i * params.size + params.size/2;
            buttonObject.onTap = () => {
                console.log("Barman: " + i);
                new bar(i, x, y, this.bars, params);
            }
        }
        // TRASH
        const trashSprite = new PIXI.Sprite(trashTexture);
        trashSprite.anchor.set(0.5, 1);
        trashSprite.x = params.width/2;
        trashSprite.y = params.height;
        trashSprite.width = params.size * 1.5;
        trashSprite.height = params.size* 1.5;
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
    this.deleteLastChild = function (container) {
        const barCount = container.children.length;
        if (barCount > 0)
            container.getChildAt(barCount-1).delete();
    }
    this.keyboardInput = function (n) {
        // BARS
        // let evenMultiplier = 0;        
        // for (let i = 1; i <= n; i++) {
        //     evenMultiplier += (i % 2 != 0) ? 1 : 0;
        //     const x = (evenMultiplier) * params.size + (params.size/2);
        //     const y = i * params.size + params.size/2;
        //     let keyValue = "";
        //     if (i == 10) keyValue = String(0);
        //     else keyValue = String(i);            
        //     let keyObject = keyboard(keyValue);    
        //     keyObject.release = () => { // keyObject.press 
        //         console.log(keyValue);
        //         new bar (i, x, y, this.bars, params);
        //     };
        // }
        // TRASH
        // let backspaceKeyObject = keyboard("Backspace");    
        // backspaceKeyObject.release = () => {
        //     this.deleteLastChild(this.bars);            
        // };
        let deleteKeyObject = keyboard("Delete");    
        deleteKeyObject.release = deleteKeyObject.release = () => {            
            this.deleteLastChild(this.bars);
        };
    }
    this.createButtons(this.count);
    this.keyboardInput(this.count);
    // this.createAllBarsOnce(this.count);
    parent.addChild(this.buttons);
    parent.addChild(this.bars);
}