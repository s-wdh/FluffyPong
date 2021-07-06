"use strict";
var FluffyPong;
(function (FluffyPong) {
    //window.addEventListener("load", handleLoad);
    //prepare Canvas for the game and add all needed EventListener for the swipe move
    function prepareCanvas() {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        FluffyPong.crc2 = canvas.getContext("2d");
        wallColors();
        canvasSize();
        window.addEventListener("resize", canvasSize);
        createFluffyPosition(canvas);
        //touch listener
        canvas.addEventListener("touchstart", FluffyPong.moveFluffyStart, false);
        canvas.addEventListener("touchmove", FluffyPong.moveFluffy, false);
        canvas.addEventListener("touchend", FluffyPong.moveFluffyEnd, false);
        canvas.addEventListener("touchcancel", FluffyPong.moveFluffyEnd, false);
        //mouse listener, so it's also playable on the computer
        canvas.addEventListener("mousedown", FluffyPong.moveFluffyStart, false);
        canvas.addEventListener("mousemove", FluffyPong.moveFluffy, false);
        canvas.addEventListener("mouseup", FluffyPong.moveFluffyEnd, false);
        canvas.addEventListener("mouseout", FluffyPong.moveFluffyEnd, false);
        window.setInterval(animation, 30);
        //window.requestAnimationFrame(animation);
    }
    FluffyPong.prepareCanvas = prepareCanvas;
    //calculate the canvas size adapted to the screen size in a 2:3 ratio 
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
        //and save those sizes, 'cause we need them several times to calculate stuff
        FluffyPong.canvasWidth = canvas.width;
        FluffyPong.canvasHeight = canvas.height;
        FluffyPong.fluffyScaleFactor = canvas.width / 400;
        FluffyPong.fluffyWidth = FluffyPong.fluffyScaleFactor * 80;
        FluffyPong.fluffyHeight = FluffyPong.fluffyScaleFactor * 68;
        createBackground();
        createWalls();
    }
    //color the canvas in some middle-grey
    function createBackground() {
        FluffyPong.crc2.restore();
        FluffyPong.crc2.fillStyle = "#cccccc";
        FluffyPong.crc2.fillRect(0, 0, FluffyPong.canvasWidth, FluffyPong.canvasHeight);
        FluffyPong.crc2.fill();
    }
    //define the wall Colors random, so every player and game round they are different
    function wallColors() {
        let color = ["#b3ecff", "#cfffb3", "#ffffb3", "#ffb3d1"];
        for (let index = 0; index < 4; index++) {
            let wallColor = color[Math.floor(Math.random() * color.length)].toString();
            switch (index) {
                case 0:
                    FluffyPong.wallTopColor = wallColor;
                    break;
                case 1:
                    FluffyPong.wallRightColor = wallColor;
                    break;
                case 2:
                    FluffyPong.wallBottomColor = wallColor;
                    break;
                case 3:
                    FluffyPong.wallLeftColor = wallColor;
                    break;
            }
            color.splice(color.indexOf(wallColor), 1);
        }
    }
    //draw the walls and the holes in the walls onto the canvas
    function createWalls() {
        FluffyPong.borderWidth = FluffyPong.canvasHeight / 100 * 5; //calculate the width of the border as 5% of the heigth of the canvas
        console.log("borderwidth:", FluffyPong.borderWidth);
        for (let index = 0; index < 4; index++) {
            switch (index) {
                case 0: {
                    //Border Top
                    let x = 0;
                    let y = 0;
                    let position = new FluffyPong.Vector(x, y);
                    let wall = new FluffyPong.Wall(position);
                    wall.draw(index);
                    FluffyPong.walls.push(wall);
                    let hole = new FluffyPong.WallTopHole(position);
                    hole.draw();
                    FluffyPong.wallHoles.push(hole);
                    break;
                }
                case 1: {
                    //Border Right
                    let x = (FluffyPong.canvasWidth - FluffyPong.borderWidth);
                    let y = 0;
                    let position = new FluffyPong.Vector(x, y);
                    let wall = new FluffyPong.Wall(position);
                    wall.draw(index);
                    FluffyPong.walls.push(wall);
                    let hole = new FluffyPong.WallRightHole(position);
                    hole.draw();
                    FluffyPong.wallHoles.push(hole);
                    break;
                }
                case 2: {
                    //Border Bottom
                    let x = 0;
                    let y = (FluffyPong.canvasHeight - FluffyPong.borderWidth);
                    let position = new FluffyPong.Vector(x, y);
                    let wall = new FluffyPong.Wall(position);
                    wall.draw(index);
                    FluffyPong.walls.push(wall);
                    let hole = new FluffyPong.WallBottomHole(position);
                    hole.draw();
                    FluffyPong.wallHoles.push(hole);
                    break;
                }
                case 3: {
                    //Border Left
                    let x = 0;
                    let y = 0;
                    let position = new FluffyPong.Vector(x, y);
                    let wall = new FluffyPong.Wall(position);
                    wall.draw(index);
                    FluffyPong.walls.push(wall);
                    let hole = new FluffyPong.WallLeftHole(position);
                    hole.draw();
                    FluffyPong.wallHoles.push(hole);
                    break;
                }
            }
        }
        FluffyPong.imgData = FluffyPong.crc2.getImageData(0, 0, FluffyPong.canvasWidth, FluffyPong.canvasHeight);
    }
    //draw a random amount between 7 and 12 of fluffies on some random positions within the walls onto the canvas
    //every fluffy gets a random color of the four defined colors
    function createFluffyPosition(_canvas) {
        let amount = 7 + Math.floor(Math.random() * 5);
        console.log("fluffy Menge: " + amount);
        for (let index = 0; index < amount; index++) {
            //calculation, that fluffies are drawn on random positions within the walls onto the canvas
            let x = FluffyPong.fluffyWidth + 1 + (Math.random() * (_canvas.width - (FluffyPong.fluffyWidth * 2) - 2));
            let y = FluffyPong.fluffyHeight + 1 + (Math.random() * (_canvas.height - (FluffyPong.fluffyHeight * 2) - 2));
            let position = new FluffyPong.Vector(x, y);
            let fluffy = new FluffyPong.FluffyElement(position);
            fluffy.generateColor();
            fluffy.draw();
            //sort in unshift, so the fluffy on top is also the first one which is grabbed while swiping
            FluffyPong.fluffies.unshift(fluffy);
        }
    }
    FluffyPong.createFluffyPosition = createFluffyPosition;
    //animate the fluffies so they scurry around on the canvas
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