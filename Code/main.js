"use strict";
var FluffyPong;
(function (FluffyPong) {
    //window.addEventListener("load", handleLoad);
    FluffyPong.fluffyWidth = 80;
    FluffyPong.fluffyHeight = 68;
    function prepareCanvas() {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        FluffyPong.crc2 = canvas.getContext("2d");
        canvasSize();
        window.addEventListener("resize", canvasSize);
        createFluffyPosition(canvas);
        //canvas.addEventListener("mousedown", sendFluffy);
        canvas.addEventListener("touchstart", FluffyPong.moveFluffyStart, false);
        canvas.addEventListener("touchmove", FluffyPong.moveFluffy, false);
        canvas.addEventListener("touchend", FluffyPong.moveFluffyEnd, false);
        canvas.addEventListener("touchcancel", FluffyPong.moveFluffyEnd, false);
        canvas.addEventListener("mousedown", FluffyPong.moveFluffyStart, false);
        canvas.addEventListener("mousemove", FluffyPong.moveFluffy, false);
        canvas.addEventListener("mouseup", FluffyPong.moveFluffyEnd, false);
        canvas.addEventListener("mouseout", FluffyPong.moveFluffyEnd, false);
        window.setInterval(animation, 30);
    }
    FluffyPong.prepareCanvas = prepareCanvas;
    function canvasSize() {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        let screenWidth = window.innerWidth;
        let screenHeight = window.innerHeight;
        if ((screenHeight / screenWidth) == 1.5) {
            canvas.height = screenHeight;
            canvas.width = screenWidth;
        }
        else if ((screenHeight / screenWidth) < 1.5) {
            canvas.height = screenHeight;
            canvas.width = (2 / 3) * screenHeight;
        }
        else if ((screenHeight / screenWidth) > 1.5) {
            canvas.width = screenWidth;
            canvas.height = 1.5 * screenWidth;
        }
        FluffyPong.canvasWidth = canvas.width;
        FluffyPong.canvasHeight = canvas.height;
        createBackground();
        createWalls();
    }
    function createBackground() {
        FluffyPong.crc2.restore();
        FluffyPong.crc2.fillStyle = "#cccccc";
        FluffyPong.crc2.fillRect(0, 0, FluffyPong.canvasWidth, FluffyPong.canvasHeight);
        FluffyPong.crc2.fill();
    }
    function createWalls() {
        FluffyPong.borderWidth = FluffyPong.canvasHeight / 100 * 5;
        console.log("borderwidth:", FluffyPong.borderWidth);
        for (let index = 0; index < 4; index++) {
            switch (index) {
                case 0: {
                    //Border Top
                    let x = 0;
                    let y = 0;
                    let position = new FluffyPong.Vector(x, y);
                    let wall = new FluffyPong.Wall(position);
                    wall.generateColor();
                    wall.draw(index);
                    FluffyPong.walls.push(wall);
                    break;
                }
                case 1: {
                    //Border Right
                    let x = (FluffyPong.canvasWidth - FluffyPong.borderWidth);
                    let y = 0;
                    let position = new FluffyPong.Vector(x, y);
                    let wall = new FluffyPong.Wall(position);
                    wall.generateColor();
                    wall.draw(index);
                    FluffyPong.walls.push(wall);
                    break;
                }
                case 2: {
                    //Border Bottom
                    let x = 0;
                    let y = (FluffyPong.canvasHeight - FluffyPong.borderWidth);
                    let position = new FluffyPong.Vector(x, y);
                    let wall = new FluffyPong.Wall(position);
                    wall.generateColor();
                    wall.draw(index);
                    FluffyPong.walls.push(wall);
                    break;
                }
                case 3: {
                    //Border Left
                    let x = 0;
                    let y = 0;
                    let position = new FluffyPong.Vector(x, y);
                    let wall = new FluffyPong.Wall(position);
                    wall.generateColor();
                    wall.draw(index);
                    FluffyPong.walls.push(wall);
                    break;
                }
            }
        }
        FluffyPong.imgData = FluffyPong.crc2.getImageData(0, 0, FluffyPong.canvasWidth, FluffyPong.canvasHeight);
    }
    function createFluffyPosition(_canvas) {
        let amount = 7 + Math.floor(Math.random() * 5);
        console.log(amount);
        for (let index = 0; index < amount; index++) {
            let x = 80 + (Math.random() * (_canvas.width - 160));
            let y = 68 + (Math.random() * (_canvas.height - 136));
            let position = new FluffyPong.Vector(x, y);
            let fluffy = new FluffyPong.FluffyElement(position);
            fluffy.generateColor();
            fluffy.draw();
            FluffyPong.fluffies.push(fluffy);
        }
    }
    FluffyPong.createFluffyPosition = createFluffyPosition;
    function animation() {
        //console.log("animation");
        FluffyPong.crc2.putImageData(FluffyPong.imgData, 0, 0);
        for (let fluffy of FluffyPong.fluffies) {
            fluffy.animation();
            fluffy.draw();
        }
    }
})(FluffyPong || (FluffyPong = {})); //namespace
//# sourceMappingURL=main.js.map