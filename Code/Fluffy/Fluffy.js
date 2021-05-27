"use strict";
var Fluffy;
(function (Fluffy) {
    window.addEventListener("load", handleLoad);
    let crc2;
    function handleLoad() {
        console.log("start");
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = canvas.getContext("2d");
        createBackground(canvas);
        createFluffyPosition(canvas);
    }
    function createBackground(_canvas) {
        crc2.restore();
        crc2.fillStyle = "#cccccc";
        crc2.fillRect(0, 0, _canvas.width, _canvas.height);
        crc2.fill();
    }
    function createFluffyPosition(_canvas) {
        let amount = 7 + Math.floor(Math.random() * 5);
        console.log(amount);
        for (let index = 0; index < amount; index++) {
            let x = 80 + (Math.random() * (_canvas.width - 160));
            let y = 68 + (Math.random() * (_canvas.height - 136));
            createFluffy(x, y);
        }
    }
    function createFluffy(_x, _y) {
        let color = ["#b3ecff", "#cfffb3", "#ffffb3", "#ffb3d1"];
        let fluffyColor = color[Math.floor(Math.random() * color.length)].toString();
        /*
        Blau: #b3ecff
        Grün: #cfffb3
        Gelb: #ffffb3
        Rot: #ffb3d1
        */
        crc2.restore();
        crc2.save();
        crc2.translate(_x, _y);
        crc2.scale(1, 0.8);
        crc2.beginPath();
        crc2.arc(0, 0, 60, 0, 2 * Math.PI);
        crc2.fillStyle = fluffyColor;
        crc2.fill();
        crc2.closePath();
        crc2.beginPath();
        crc2.ellipse(-18, -18, 10, 20, 0, 0, 2 * Math.PI);
        crc2.ellipse(18, -18, 10, 20, 0, 0, 2 * Math.PI);
        crc2.fillStyle = "#000000";
        crc2.fill();
        crc2.closePath();
        crc2.beginPath();
        crc2.arc(-16, -25, 5, 0, 2 * Math.PI);
        crc2.arc(20, -25, 5, 0, 2 * Math.PI);
        crc2.fillStyle = "#ffffff";
        crc2.fill();
        crc2.closePath();
        for (let i = 0; i < 32; i++) {
            crc2.beginPath();
            crc2.rotate(0.55);
            crc2.moveTo(0, 60);
            crc2.lineTo(6, 80);
            crc2.lineTo(10, 59);
            crc2.lineTo(15, 70);
            crc2.lineTo(17, 57);
            crc2.lineTo(26, 75);
            crc2.lineTo(24, 55);
            crc2.fillStyle = fluffyColor;
            crc2.strokeStyle = "#000000";
            crc2.fill();
            crc2.stroke();
            crc2.closePath();
        }
        crc2.restore();
    }
})(Fluffy || (Fluffy = {})); //namespace
//# sourceMappingURL=Fluffy.js.map