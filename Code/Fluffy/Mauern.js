"use strict";
var Fluffy;
(function (Fluffy) {
    window.addEventListener("load", handleLoad);
    let crc2;
    let fluffyWidth = 160;
    let fluffyHeight = 136;
    let wallTopColor;
    let wallRightColor;
    let wallBottomColor;
    let wallLeftColor;
    function handleLoad() {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = canvas.getContext("2d");
        WallColors();
        Walls(canvas);
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
    }
    function Walls(_canvas) {
        //Border Top
        crc2.beginPath();
        crc2.fillStyle = wallTopColor;
        crc2.fillRect(0, 0, _canvas.width, (_canvas.height / 100 * 5));
        let holeTopWidth = fluffyWidth + Math.random() * (fluffyWidth / 2);
        let holeTopPosition = (_canvas.height / 100 * 5) + Math.floor(Math.random() * (_canvas.width - holeTopWidth - (_canvas.height / 100 * 10)));
        crc2.clearRect(holeTopPosition, 0, holeTopWidth, (_canvas.height / 100 * 5));
        crc2.closePath();
        //Border Right
        crc2.beginPath();
        crc2.fillStyle = wallRightColor;
        crc2.fillRect((_canvas.width - (_canvas.height / 100 * 5)), 0, (_canvas.height / 100 * 5), _canvas.height);
        for (let index = 0; index < 2; index++) {
            let holeRightHeight = fluffyHeight + Math.random() * (fluffyHeight / 2);
            let holeRightPosition = (_canvas.height / 100 * 5) + Math.floor(Math.random() * (_canvas.height - holeRightHeight - (_canvas.height / 100 * 10)));
            crc2.clearRect((_canvas.width - (_canvas.height / 100 * 5)), holeRightPosition, (_canvas.height / 100 * 5), holeRightHeight);
        }
        crc2.closePath();
        //Border Bottom
        crc2.beginPath();
        crc2.fillStyle = wallBottomColor;
        crc2.fillRect(0, (_canvas.height - (_canvas.height / 100 * 5)), _canvas.width, (_canvas.height / 100 * 5));
        let holeBottomWidth = fluffyWidth + Math.random() * (fluffyWidth / 2);
        let holeBottomPosition = (_canvas.height / 100 * 5) + Math.floor(Math.random() * (_canvas.width - holeBottomWidth - (_canvas.height / 100 * 10)));
        crc2.clearRect(holeBottomPosition, (_canvas.height - (_canvas.height / 100 * 5)), holeBottomWidth, (_canvas.height / 100 * 5));
        crc2.closePath();
        //Border Left
        crc2.beginPath();
        crc2.fillStyle = wallLeftColor;
        crc2.fillRect(0, 0, (_canvas.height / 100 * 5), _canvas.height);
        for (let index = 0; index < 2; index++) {
            let holeLeftHeight = fluffyHeight + Math.random() * (fluffyHeight / 2);
            let holeLeftPosition = (_canvas.height / 100 * 5) + Math.floor(Math.random() * (_canvas.height - holeLeftHeight - (_canvas.height / 100 * 10)));
            crc2.clearRect(0, holeLeftPosition, (_canvas.height / 100 * 5), holeLeftHeight);
        }
        crc2.closePath();
    }
})(Fluffy || (Fluffy = {})); //namespace
//# sourceMappingURL=Mauern.js.map