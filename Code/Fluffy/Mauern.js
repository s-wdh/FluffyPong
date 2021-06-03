"use strict";
var Netzstruktur;
(function (Netzstruktur) {
    window.addEventListener("load", handleLoad);
    Netzstruktur.fluffyWidth = 80;
    Netzstruktur.fluffyHeight = 68;
    let wallTopColor;
    let wallRightColor;
    let wallBottomColor;
    let wallLeftColor;
    function handleLoad() {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Netzstruktur.crc2 = canvas.getContext("2d");
        createBackground(canvas);
        WallColors();
        Walls(canvas);
        createFluffyPosition(canvas);
        canvas.addEventListener("mousedown", Netzstruktur.sendFluffy);
    }
    function createBackground(_canvas) {
        Netzstruktur.crc2.restore();
        Netzstruktur.crc2.fillStyle = "#cccccc";
        Netzstruktur.crc2.fillRect(0, 0, _canvas.width, _canvas.height);
        Netzstruktur.crc2.fill();
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
        Netzstruktur.crc2.beginPath();
        Netzstruktur.crc2.fillStyle = wallTopColor;
        Netzstruktur.crc2.fillRect(0, 0, _canvas.width, (_canvas.height / 100 * 5));
        let holeTopWidth = Netzstruktur.fluffyWidth + Math.random() * (Netzstruktur.fluffyWidth / 2);
        let holeTopPosition = (_canvas.height / 100 * 5) + Math.floor(Math.random() * (_canvas.width - holeTopWidth - (_canvas.height / 100 * 10)));
        Netzstruktur.crc2.clearRect(holeTopPosition, 0, holeTopWidth, (_canvas.height / 100 * 5));
        Netzstruktur.crc2.closePath();
        //Border Right
        Netzstruktur.crc2.beginPath();
        Netzstruktur.crc2.fillStyle = wallRightColor;
        Netzstruktur.crc2.fillRect((_canvas.width - (_canvas.height / 100 * 5)), 0, (_canvas.height / 100 * 5), _canvas.height);
        for (let index = 0; index < 2; index++) {
            let holeRightHeight = Netzstruktur.fluffyHeight + Math.random() * (Netzstruktur.fluffyHeight / 2);
            let holeRightPosition = (_canvas.height / 100 * 5) + Math.floor(Math.random() * (_canvas.height - holeRightHeight - (_canvas.height / 100 * 10)));
            Netzstruktur.crc2.clearRect((_canvas.width - (_canvas.height / 100 * 5)), holeRightPosition, (_canvas.height / 100 * 5), holeRightHeight);
        }
        Netzstruktur.crc2.closePath();
        //Border Bottom
        Netzstruktur.crc2.beginPath();
        Netzstruktur.crc2.fillStyle = wallBottomColor;
        Netzstruktur.crc2.fillRect(0, (_canvas.height - (_canvas.height / 100 * 5)), _canvas.width, (_canvas.height / 100 * 5));
        let holeBottomWidth = Netzstruktur.fluffyWidth + Math.random() * (Netzstruktur.fluffyWidth / 2);
        let holeBottomPosition = (_canvas.height / 100 * 5) + Math.floor(Math.random() * (_canvas.width - holeBottomWidth - (_canvas.height / 100 * 10)));
        Netzstruktur.crc2.clearRect(holeBottomPosition, (_canvas.height - (_canvas.height / 100 * 5)), holeBottomWidth, (_canvas.height / 100 * 5));
        Netzstruktur.crc2.closePath();
        //Border Left
        Netzstruktur.crc2.beginPath();
        Netzstruktur.crc2.fillStyle = wallLeftColor;
        Netzstruktur.crc2.fillRect(0, 0, (_canvas.height / 100 * 5), _canvas.height);
        for (let index = 0; index < 2; index++) {
            let holeLeftHeight = Netzstruktur.fluffyHeight + Math.random() * (Netzstruktur.fluffyHeight / 2);
            let holeLeftPosition = (_canvas.height / 100 * 5) + Math.floor(Math.random() * (_canvas.height - holeLeftHeight - (_canvas.height / 100 * 10)));
            Netzstruktur.crc2.clearRect(0, holeLeftPosition, (_canvas.height / 100 * 5), holeLeftHeight);
        }
        Netzstruktur.crc2.closePath();
    }
    function createFluffyPosition(_canvas) {
        let amount = 7 + Math.floor(Math.random() * 5);
        console.log(amount);
        for (let index = 0; index < amount; index++) {
            let x = 80 + (Math.random() * (_canvas.width - 160));
            let y = 68 + (Math.random() * (_canvas.height - 136));
            let position = new Netzstruktur.Vector(x, y);
            let fluffy = new Netzstruktur.FluffyElement(position);
            fluffy.draw(position);
            //fluffies.push(fluffy);
        }
    }
    Netzstruktur.createFluffyPosition = createFluffyPosition;
})(Netzstruktur || (Netzstruktur = {})); //namespace
//# sourceMappingURL=Mauern.js.map