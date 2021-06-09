"use strict";
var FluffyPong;
(function (FluffyPong) {
    //window.addEventListener("load", handleLoad);
    FluffyPong.fluffyWidth = 80;
    FluffyPong.fluffyHeight = 68;
    let wallTopColor;
    let wallRightColor;
    let wallBottomColor;
    let wallLeftColor;
    // set a Timer for the End of the game round
    FluffyPong.timer = 60;
    function prepareCanvas() {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        FluffyPong.crc2 = canvas.getContext("2d");
        WallColors();
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
        window.setInterval(gameTimer, 1000);
        window.setTimeout(FluffyPong.getRanking, (FluffyPong.timer * 1000));
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
        createBackground(canvas);
        Walls(canvas);
    }
    function createBackground(_canvas) {
        FluffyPong.crc2.restore();
        FluffyPong.crc2.fillStyle = "#cccccc";
        FluffyPong.crc2.fillRect(0, 0, _canvas.width, _canvas.height);
        FluffyPong.crc2.fill();
    }
    function WallColors() {
        let color = ["#b3ecff", "#cfffb3", "#ffffb3", "#ffb3d1"];
        wallTopColor = color[Math.floor(Math.random() * color.length)].toString();
        let wallTopIndex = color.indexOf(wallTopColor);
        color.splice(wallTopIndex, 1);
        wallRightColor = color[Math.floor(Math.random() * color.length)].toString();
        let wallRightIndex = color.indexOf(wallRightColor);
        color.splice(wallRightIndex, 1);
        wallBottomColor = color[Math.floor(Math.random() * color.length)].toString();
        let wallBottomIndex = color.indexOf(wallBottomColor);
        color.splice(wallBottomIndex, 1);
        wallLeftColor = color[Math.floor(Math.random() * color.length)].toString();
        let wallLeftIndex = color.indexOf(wallLeftColor);
        color.splice(wallLeftIndex, 1);
        console.log(wallTopColor, wallRightColor, wallBottomColor, wallLeftColor);
        canvasSize();
    }
    function Walls(_canvas) {
        FluffyPong.border = _canvas.height / 100 * 5;
        console.log("borderwidth:", FluffyPong.border);
        //Border Top
        FluffyPong.crc2.beginPath();
        FluffyPong.crc2.fillStyle = wallTopColor;
        FluffyPong.crc2.fillRect(0, 0, _canvas.width, (_canvas.height / 100 * 5));
        let holeTopWidth = FluffyPong.fluffyWidth + Math.random() * (FluffyPong.fluffyWidth / 2);
        let holeTopPosition = (_canvas.height / 100 * 5) + Math.floor(Math.random() * (_canvas.width - holeTopWidth - (_canvas.height / 100 * 10)));
        FluffyPong.crc2.clearRect(holeTopPosition, 0, holeTopWidth, (_canvas.height / 100 * 5));
        FluffyPong.crc2.closePath();
        //Border Right
        FluffyPong.crc2.beginPath();
        FluffyPong.crc2.fillStyle = wallRightColor;
        FluffyPong.crc2.fillRect((_canvas.width - (_canvas.height / 100 * 5)), 0, (_canvas.height / 100 * 5), _canvas.height);
        for (let index = 0; index < 2; index++) {
            let holeRightHeight = FluffyPong.fluffyHeight + Math.random() * (FluffyPong.fluffyHeight / 2);
            let holeRightPosition = (_canvas.height / 100 * 5) + Math.floor(Math.random() * (_canvas.height - holeRightHeight - (_canvas.height / 100 * 10)));
            FluffyPong.crc2.clearRect((_canvas.width - (_canvas.height / 100 * 5)), holeRightPosition, (_canvas.height / 100 * 5), holeRightHeight);
        }
        FluffyPong.crc2.closePath();
        //Border Bottom
        FluffyPong.crc2.beginPath();
        FluffyPong.crc2.fillStyle = wallBottomColor;
        FluffyPong.crc2.fillRect(0, (_canvas.height - (_canvas.height / 100 * 5)), _canvas.width, (_canvas.height / 100 * 5));
        let holeBottomWidth = FluffyPong.fluffyWidth + Math.random() * (FluffyPong.fluffyWidth / 2);
        let holeBottomPosition = (_canvas.height / 100 * 5) + Math.floor(Math.random() * (_canvas.width - holeBottomWidth - (_canvas.height / 100 * 10)));
        FluffyPong.crc2.clearRect(holeBottomPosition, (_canvas.height - (_canvas.height / 100 * 5)), holeBottomWidth, (_canvas.height / 100 * 5));
        FluffyPong.crc2.closePath();
        //Border Left
        FluffyPong.crc2.beginPath();
        FluffyPong.crc2.fillStyle = wallLeftColor;
        FluffyPong.crc2.fillRect(0, 0, (_canvas.height / 100 * 5), _canvas.height);
        for (let index = 0; index < 2; index++) {
            let holeLeftHeight = FluffyPong.fluffyHeight + Math.random() * (FluffyPong.fluffyHeight / 2);
            let holeLeftPosition = (_canvas.height / 100 * 5) + Math.floor(Math.random() * (_canvas.height - holeLeftHeight - (_canvas.height / 100 * 10)));
            FluffyPong.crc2.clearRect(0, holeLeftPosition, (_canvas.height / 100 * 5), holeLeftHeight);
        }
        FluffyPong.crc2.closePath();
        FluffyPong.imgData = FluffyPong.crc2.getImageData(0, 0, _canvas.width, _canvas.height);
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
    function gameTimer() {
        if (FluffyPong.timer > 0) {
            FluffyPong.timer--;
            let timerElement = document.getElementById("timer");
            timerElement.innerHTML = FluffyPong.timer + "s";
        }
        else {
            clearInterval();
            window.clearInterval();
            //console.log("game End");
        }
    }
})(FluffyPong || (FluffyPong = {})); //namespace
//# sourceMappingURL=main.js.map