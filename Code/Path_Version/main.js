"use strict";
var FluffyPong_Path;
(function (FluffyPong_Path) {
    //prepare Canvas for the game and add all needed EventListener for the swipe move
    function prepareCanvas() {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        FluffyPong_Path.crc2 = canvas.getContext("2d");
        wallColors();
        canvasSize();
        window.addEventListener("resize", canvasSize);
        createFluffyPosition(canvas);
        //touch listener
        canvas.addEventListener("touchstart", FluffyPong_Path.moveFluffyStart, false);
        canvas.addEventListener("touchmove", FluffyPong_Path.moveFluffy, false);
        canvas.addEventListener("touchend", FluffyPong_Path.moveFluffyEnd, false);
        canvas.addEventListener("touchcancel", FluffyPong_Path.moveFluffyEnd, false);
        //mouse listener, so it's also playable on the computer
        canvas.addEventListener("mousedown", FluffyPong_Path.moveFluffyStart, false);
        canvas.addEventListener("mousemove", FluffyPong_Path.moveFluffy, false);
        canvas.addEventListener("mouseup", FluffyPong_Path.moveFluffyEnd, false);
        canvas.addEventListener("mouseout", FluffyPong_Path.moveFluffyEnd, false);
        window.setInterval(animation, 30);
        //window.requestAnimationFrame(animation);
    }
    FluffyPong_Path.prepareCanvas = prepareCanvas;
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
        FluffyPong_Path.canvasWidth = canvas.width;
        FluffyPong_Path.canvasHeight = canvas.height;
        FluffyPong_Path.fluffyScaleFactor = canvas.width / 400;
        FluffyPong_Path.fluffyWidth = FluffyPong_Path.fluffyScaleFactor * 80;
        FluffyPong_Path.fluffyHeight = FluffyPong_Path.fluffyScaleFactor * 68;
        createBackground();
        createWalls();
    }
    //color the canvas in some middle-grey
    function createBackground() {
        FluffyPong_Path.crc2.restore();
        FluffyPong_Path.crc2.fillStyle = "#cccccc";
        FluffyPong_Path.crc2.fillRect(0, 0, FluffyPong_Path.canvasWidth, FluffyPong_Path.canvasHeight);
        FluffyPong_Path.crc2.fill();
    }
    //define the wall Colors random, so every player and game round they are different
    function wallColors() {
        let color = ["#b3ecff", "#cfffb3", "#ffffb3", "#ffb3d1"];
        for (let index = 0; index < 4; index++) {
            let wallColor = color[Math.floor(Math.random() * color.length)].toString();
            switch (index) {
                case 0:
                    FluffyPong_Path.wallTopColor = wallColor;
                    break;
                case 1:
                    FluffyPong_Path.wallRightColor = wallColor;
                    break;
                case 2:
                    FluffyPong_Path.wallBottomColor = wallColor;
                    break;
                case 3:
                    FluffyPong_Path.wallLeftColor = wallColor;
                    break;
            }
            color.splice(color.indexOf(wallColor), 1);
        }
    }
    //draw the walls and the holes in the walls onto the canvas
    function createWalls() {
        FluffyPong_Path.borderWidth = FluffyPong_Path.canvasHeight / 100 * 5; //calculate the width of the border as 5% of the heigth of the canvas
        //console.log("borderwidth:", borderWidth);
        for (let index = 0; index < 4; index++) {
            switch (index) {
                case 0: {
                    //Border Top
                    let x = 0;
                    let y = 0;
                    let position = new FluffyPong_Path.Vector(x, y);
                    let wall = new FluffyPong_Path.Wall(position);
                    wall.draw(index);
                    FluffyPong_Path.walls.push(wall);
                    let hole = new FluffyPong_Path.WallTopHole(position);
                    hole.draw();
                    FluffyPong_Path.wallHoles.push(hole);
                    break;
                }
                case 1: {
                    //Border Right
                    let x = (FluffyPong_Path.canvasWidth - FluffyPong_Path.borderWidth);
                    let y = 0;
                    let position = new FluffyPong_Path.Vector(x, y);
                    let wall = new FluffyPong_Path.Wall(position);
                    wall.draw(index);
                    FluffyPong_Path.walls.push(wall);
                    let hole = new FluffyPong_Path.WallRightHole(position);
                    hole.draw();
                    FluffyPong_Path.wallHoles.push(hole);
                    break;
                }
                case 2: {
                    //Border Bottom
                    let x = 0;
                    let y = (FluffyPong_Path.canvasHeight - FluffyPong_Path.borderWidth);
                    let position = new FluffyPong_Path.Vector(x, y);
                    let wall = new FluffyPong_Path.Wall(position);
                    wall.draw(index);
                    FluffyPong_Path.walls.push(wall);
                    let hole = new FluffyPong_Path.WallBottomHole(position);
                    hole.draw();
                    FluffyPong_Path.wallHoles.push(hole);
                    break;
                }
                case 3: {
                    //Border Left
                    let x = 0;
                    let y = 0;
                    let position = new FluffyPong_Path.Vector(x, y);
                    let wall = new FluffyPong_Path.Wall(position);
                    wall.draw(index);
                    FluffyPong_Path.walls.push(wall);
                    let hole = new FluffyPong_Path.WallLeftHole(position);
                    hole.draw();
                    FluffyPong_Path.wallHoles.push(hole);
                    break;
                }
            }
        }
        FluffyPong_Path.imgData = FluffyPong_Path.crc2.getImageData(0, 0, FluffyPong_Path.canvasWidth, FluffyPong_Path.canvasHeight);
    }
    //draw a random amount between 7 and 12 of fluffies on some random positions within the walls onto the canvas
    //every fluffy gets a random color of the four defined colors
    function createFluffyPosition(_canvas) {
        let amount = 7 + Math.floor(Math.random() * 5);
        console.log("fluffy Menge: " + amount);
        for (let index = 0; index < amount; index++) {
            //calculation, that fluffies are drawn on random positions within the walls onto the canvas
            let x = FluffyPong_Path.fluffyWidth + 1 + (Math.random() * (_canvas.width - (FluffyPong_Path.fluffyWidth * 2) - 2));
            let y = FluffyPong_Path.fluffyHeight + 1 + (Math.random() * (_canvas.height - (FluffyPong_Path.fluffyHeight * 2) - 2));
            let position = new FluffyPong_Path.Vector(x, y);
            let fluffy = new FluffyPong_Path.FluffyElement(position);
            fluffy.generateColor();
            fluffy.draw();
            //sort in unshift, so the fluffy on top is also the first one which is grabbed while swiping
            FluffyPong_Path.fluffies.unshift(fluffy);
        }
    }
    FluffyPong_Path.createFluffyPosition = createFluffyPosition;
    //animate the fluffies so they scurry around on the canvas
    function animation() {
        FluffyPong_Path.crc2.putImageData(FluffyPong_Path.imgData, 0, 0);
        //window.requestAnimationFrame(animation);
        for (let fluffy of FluffyPong_Path.fluffies) {
            fluffy.animation();
            fluffy.draw();
        }
    }
})(FluffyPong_Path || (FluffyPong_Path = {})); //namespace
//# sourceMappingURL=main.js.map