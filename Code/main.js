"use strict";
var FluffyPong;
(function (FluffyPong) {
    //window.addEventListener("load", handleLoad);
    FluffyPong.fluffyWidth = 80;
    FluffyPong.fluffyHeight = 68;
    // enum to check the colors of fluffy + wall
    let COLOR;
    (function (COLOR) {
        COLOR[COLOR["RED"] = 0] = "RED";
        COLOR[COLOR["BLUE"] = 1] = "BLUE";
        COLOR[COLOR["GREEN"] = 2] = "GREEN";
        COLOR[COLOR["YELLOW"] = 3] = "YELLOW";
    })(COLOR = FluffyPong.COLOR || (FluffyPong.COLOR = {}));
    // save wall colors, so they stay the same when window is resized
    let wallTopColor;
    let wallRightColor;
    let wallBottomColor;
    let wallLeftColor;
    function prepareCanvas() {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        FluffyPong.crc2 = canvas.getContext("2d");
        wallColors();
        canvasSize();
        window.addEventListener("resize", canvasSize);
        createFluffyPosition(canvas);
        canvas.addEventListener("touchstart", FluffyPong.moveFluffyStart, false);
        canvas.addEventListener("touchmove", FluffyPong.moveFluffy, false);
        canvas.addEventListener("touchend", FluffyPong.moveFluffyEnd, false);
        canvas.addEventListener("touchcancel", FluffyPong.moveFluffyEnd, false);
        canvas.addEventListener("mousedown", FluffyPong.moveFluffyStart, false);
        canvas.addEventListener("mousemove", FluffyPong.moveFluffy, false);
        canvas.addEventListener("mouseup", FluffyPong.moveFluffyEnd, false);
        canvas.addEventListener("mouseout", FluffyPong.moveFluffyEnd, false);
        window.setInterval(animation, 30);
        //window.requestAnimationFrame(animation);
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
        FluffyPong.fluffyScaleFactor = canvas.width / 400;
        FluffyPong.fluffyWidth = FluffyPong.fluffyScaleFactor * 80;
        FluffyPong.fluffyHeight = FluffyPong.fluffyScaleFactor * 68;
        createBackground();
        createWalls();
    }
    function createBackground() {
        FluffyPong.crc2.restore();
        FluffyPong.crc2.fillStyle = "#cccccc";
        FluffyPong.crc2.fillRect(0, 0, FluffyPong.canvasWidth, FluffyPong.canvasHeight);
        FluffyPong.crc2.fill();
    }
    function wallColors() {
        let color = ["#b3ecff", "#cfffb3", "#ffffb3", "#ffb3d1"];
        for (let index = 0; index < 4; index++) {
            let wallColor = color[Math.floor(Math.random() * color.length)].toString();
            switch (index) {
                case 0:
                    wallTopColor = wallColor;
                    break;
                case 1:
                    wallRightColor = wallColor;
                    break;
                case 2:
                    wallBottomColor = wallColor;
                    break;
                case 3:
                    wallLeftColor = wallColor;
                    break;
            }
            color.splice(color.indexOf(wallColor), 1);
        }
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
                    wall.generateColor(wallTopColor);
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
                    wall.generateColor(wallRightColor);
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
                    wall.generateColor(wallBottomColor);
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
                    wall.generateColor(wallLeftColor);
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
        FluffyPong.crc2.putImageData(FluffyPong.imgData, 0, 0);
        //window.requestAnimationFrame(animation);
        for (let fluffy of FluffyPong.fluffies) {
            fluffy.animation();
            fluffy.draw();
        }
    }
})(FluffyPong || (FluffyPong = {})); //namespace
//# sourceMappingURL=main.js.map