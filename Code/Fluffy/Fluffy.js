"use strict";
var Netzstruktur;
(function (Netzstruktur) {
    class FluffyElement {
        constructor(_position) {
            this.position = _position;
            //this.velocity = new Vector(0, 0);
        }
        draw(_position) {
            Netzstruktur.crc2.save();
            Netzstruktur.crc2.translate(_position.x, _position.y);
            let color = ["#b3ecff", "#cfffb3", "#ffffb3", "#ffb3d1"];
            let fluffyColor = color[Math.floor(Math.random() * color.length)].toString();
            /*
            Blau: #b3ecff
            Grün: #cfffb3
            Gelb: #ffffb3
            Rot: #ffb3d1
            */
            Netzstruktur.crc2.scale(0.5, 0.4);
            Netzstruktur.crc2.beginPath();
            Netzstruktur.crc2.arc(0, 0, 60, 0, 2 * Math.PI);
            Netzstruktur.crc2.fillStyle = fluffyColor;
            Netzstruktur.crc2.fill();
            Netzstruktur.crc2.closePath();
            Netzstruktur.crc2.beginPath();
            Netzstruktur.crc2.ellipse(-18, -18, 10, 20, 0, 0, 2 * Math.PI);
            Netzstruktur.crc2.ellipse(18, -18, 10, 20, 0, 0, 2 * Math.PI);
            Netzstruktur.crc2.fillStyle = "#000000";
            Netzstruktur.crc2.fill();
            Netzstruktur.crc2.closePath();
            Netzstruktur.crc2.beginPath();
            Netzstruktur.crc2.arc(-16, -25, 5, 0, 2 * Math.PI);
            Netzstruktur.crc2.arc(20, -25, 5, 0, 2 * Math.PI);
            Netzstruktur.crc2.fillStyle = "#ffffff";
            Netzstruktur.crc2.fill();
            Netzstruktur.crc2.closePath();
            for (let i = 0; i < 32; i++) {
                Netzstruktur.crc2.beginPath();
                Netzstruktur.crc2.rotate(0.55);
                Netzstruktur.crc2.moveTo(0, 60);
                Netzstruktur.crc2.lineTo(6, 80);
                Netzstruktur.crc2.lineTo(10, 59);
                Netzstruktur.crc2.lineTo(15, 70);
                Netzstruktur.crc2.lineTo(17, 57);
                Netzstruktur.crc2.lineTo(26, 75);
                Netzstruktur.crc2.lineTo(24, 55);
                Netzstruktur.crc2.fillStyle = fluffyColor;
                Netzstruktur.crc2.strokeStyle = "#000000";
                Netzstruktur.crc2.fill();
                Netzstruktur.crc2.stroke();
                Netzstruktur.crc2.closePath();
            }
            Netzstruktur.crc2.restore();
        }
    }
    Netzstruktur.FluffyElement = FluffyElement;
})(Netzstruktur || (Netzstruktur = {})); //namespace
//# sourceMappingURL=Fluffy.js.map