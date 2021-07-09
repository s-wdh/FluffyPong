"use strict";
var FluffyPong_Img;
(function (FluffyPong_Img) {
    //array of the fluffy images
    FluffyPong_Img.images = [];
    //prepare Canvas for the game and add all needed EventListener for the swipe move
    function prepareCanvas() {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        FluffyPong_Img.crc2 = canvas.getContext("2d");
        let fluffyImg = document.querySelectorAll(".fluffyImg");
        for (let i = 0; i < fluffyImg.length; i++) {
            FluffyPong_Img.images.push(fluffyImg[i]);
        }
        wallColors();
        canvasSize();
        window.addEventListener("resize", canvasSize);
        createFluffyPosition(canvas);
        //touch listener
        canvas.addEventListener("touchstart", FluffyPong_Img.moveFluffyStart, false);
        canvas.addEventListener("touchmove", FluffyPong_Img.moveFluffy, false);
        canvas.addEventListener("touchend", FluffyPong_Img.moveFluffyEnd, false);
        canvas.addEventListener("touchcancel", FluffyPong_Img.moveFluffyEnd, false);
        //mouse listener, so it's also playable on the computer
        canvas.addEventListener("mousedown", FluffyPong_Img.moveFluffyStart, false);
        canvas.addEventListener("mousemove", FluffyPong_Img.moveFluffy, false);
        canvas.addEventListener("mouseup", FluffyPong_Img.moveFluffyEnd, false);
        canvas.addEventListener("mouseout", FluffyPong_Img.moveFluffyEnd, false);
        window.setInterval(animation, 30);
        //window.requestAnimationFrame(animation);
    }
    FluffyPong_Img.prepareCanvas = prepareCanvas;
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
        FluffyPong_Img.canvasWidth = canvas.width;
        FluffyPong_Img.canvasHeight = canvas.height;
        FluffyPong_Img.fluffyScaleFactor = canvas.width / 400;
        FluffyPong_Img.fluffyWidth = FluffyPong_Img.fluffyScaleFactor * 80;
        FluffyPong_Img.fluffyHeight = FluffyPong_Img.fluffyScaleFactor * 56.6;
        createBackground();
        createWalls();
    }
    //color the canvas in some middle-grey
    function createBackground() {
        FluffyPong_Img.crc2.restore();
        FluffyPong_Img.crc2.fillStyle = "#cccccc";
        FluffyPong_Img.crc2.fillRect(0, 0, FluffyPong_Img.canvasWidth, FluffyPong_Img.canvasHeight);
        FluffyPong_Img.crc2.fill();
    }
    //define the wall Colors random, so every player and game round they are different
    function wallColors() {
        let color = ["#b3ecff", "#cfffb3", "#ffffb3", "#ffb3d1"];
        for (let index = 0; index < 4; index++) {
            let wallColor = color[Math.floor(Math.random() * color.length)].toString();
            switch (index) {
                case 0:
                    FluffyPong_Img.wallTopColor = wallColor;
                    break;
                case 1:
                    FluffyPong_Img.wallRightColor = wallColor;
                    break;
                case 2:
                    FluffyPong_Img.wallBottomColor = wallColor;
                    break;
                case 3:
                    FluffyPong_Img.wallLeftColor = wallColor;
                    break;
            }
            color.splice(color.indexOf(wallColor), 1);
        }
    }
    //draw the walls and the holes in the walls onto the canvas
    function createWalls() {
        FluffyPong_Img.borderWidth = FluffyPong_Img.canvasHeight / 100 * 5; //calculate the width of the border as 5% of the heigth of the canvas
        //console.log("borderwidth:", borderWidth);
        for (let index = 0; index < 4; index++) {
            switch (index) {
                case 0: {
                    //Border Top
                    let x = 0;
                    let y = 0;
                    let position = new FluffyPong_Img.Vector(x, y);
                    let wall = new FluffyPong_Img.Wall(position);
                    wall.draw(index);
                    FluffyPong_Img.walls.push(wall);
                    let hole = new FluffyPong_Img.WallTopHole(position);
                    hole.draw();
                    FluffyPong_Img.wallHoles.push(hole);
                    break;
                }
                case 1: {
                    //Border Right
                    let x = (FluffyPong_Img.canvasWidth - FluffyPong_Img.borderWidth);
                    let y = 0;
                    let position = new FluffyPong_Img.Vector(x, y);
                    let wall = new FluffyPong_Img.Wall(position);
                    wall.draw(index);
                    FluffyPong_Img.walls.push(wall);
                    let hole = new FluffyPong_Img.WallRightHole(position);
                    hole.draw();
                    FluffyPong_Img.wallHoles.push(hole);
                    break;
                }
                case 2: {
                    //Border Bottom
                    let x = 0;
                    let y = (FluffyPong_Img.canvasHeight - FluffyPong_Img.borderWidth);
                    let position = new FluffyPong_Img.Vector(x, y);
                    let wall = new FluffyPong_Img.Wall(position);
                    wall.draw(index);
                    FluffyPong_Img.walls.push(wall);
                    let hole = new FluffyPong_Img.WallBottomHole(position);
                    hole.draw();
                    FluffyPong_Img.wallHoles.push(hole);
                    break;
                }
                case 3: {
                    //Border Left
                    let x = 0;
                    let y = 0;
                    let position = new FluffyPong_Img.Vector(x, y);
                    let wall = new FluffyPong_Img.Wall(position);
                    wall.draw(index);
                    FluffyPong_Img.walls.push(wall);
                    let hole = new FluffyPong_Img.WallLeftHole(position);
                    hole.draw();
                    FluffyPong_Img.wallHoles.push(hole);
                    break;
                }
            }
        }
        FluffyPong_Img.imgData = FluffyPong_Img.crc2.getImageData(0, 0, FluffyPong_Img.canvasWidth, FluffyPong_Img.canvasHeight);
    }
    //draw a random amount between 7 and 12 of fluffies on some random positions within the walls onto the canvas
    //every fluffy gets a random color of the four defined colors
    function createFluffyPosition(_canvas) {
        let amount = 7 + Math.floor(Math.random() * 5);
        console.log("fluffy Menge: " + amount);
        for (let index = 0; index < amount; index++) {
            //calculation, that fluffies are drawn on random positions within the walls onto the canvas
            let x = FluffyPong_Img.borderWidth + 1 + (Math.random() * (_canvas.width - (FluffyPong_Img.borderWidth * 2) - FluffyPong_Img.fluffyWidth - 2));
            let y = FluffyPong_Img.borderWidth + 1 + (Math.random() * (_canvas.height - (FluffyPong_Img.borderWidth * 2) - FluffyPong_Img.fluffyHeight - 2));
            let position = new FluffyPong_Img.Vector(x, y);
            let fluffy = new FluffyPong_Img.FluffyElement(position);
            fluffy.generateColor();
            fluffy.draw();
            //sort in unshift, so the fluffy on top is also the first one which is grabbed while swiping
            FluffyPong_Img.fluffies.unshift(fluffy);
        }
    }
    FluffyPong_Img.createFluffyPosition = createFluffyPosition;
    //animate the fluffies so they scurry around on the canvas
    function animation() {
        FluffyPong_Img.crc2.putImageData(FluffyPong_Img.imgData, 0, 0);
        //window.requestAnimationFrame(animation);
        for (let fluffy of FluffyPong_Img.fluffies) {
            fluffy.animation();
            fluffy.draw();
        }
    }
})(FluffyPong_Img || (FluffyPong_Img = {})); //namespace
//# sourceMappingURL=main.js.map