"use strict";
var FluffyPong;
(function (FluffyPong) {
    let COLOR;
    (function (COLOR) {
        COLOR[COLOR["RED"] = 0] = "RED";
        COLOR[COLOR["BLUE"] = 1] = "BLUE";
        COLOR[COLOR["GREEN"] = 2] = "GREEN";
        COLOR[COLOR["YELLOW"] = 3] = "YELLOW";
    })(COLOR || (COLOR = {}));
    class FluffyElement {
        constructor(_position) {
            this.position = _position;
            this.velocity = new FluffyPong.Vector(0, 0);
            this.velocity.random(1, 5);
        }
        generateColor() {
            let color = ["#b3ecff", "#cfffb3", "#ffffb3", "#ffb3d1"];
            let fluffyColor = color[Math.floor(Math.random() * color.length)].toString();
            this.color = fluffyColor;
            if (this.color == "#b3ecff") {
                this.colorenum = COLOR.BLUE;
            }
            else if (this.color == "#cfffb3") {
                this.colorenum = COLOR.GREEN;
            }
            else if (this.color == "#ffffb3") {
                this.colorenum = COLOR.YELLOW;
            }
            else if (this.color == "#ffb3d1") {
                this.colorenum = COLOR.RED;
            }
            /*
            Blau: #b3ecff
            Grün: #cfffb3
            Gelb: #ffffb3
            Rot: #ffb3d1
            */
        }
        draw() {
            FluffyPong.crc2.save();
            FluffyPong.crc2.translate(this.position.x, this.position.y);
            FluffyPong.crc2.scale(0.5, 0.4);
            FluffyPong.crc2.beginPath();
            FluffyPong.crc2.arc(0, 0, 60, 0, 2 * Math.PI);
            FluffyPong.crc2.fillStyle = this.color;
            FluffyPong.crc2.fill();
            FluffyPong.crc2.closePath();
            FluffyPong.crc2.beginPath();
            FluffyPong.crc2.ellipse(-18, -18, 10, 20, 0, 0, 2 * Math.PI);
            FluffyPong.crc2.ellipse(18, -18, 10, 20, 0, 0, 2 * Math.PI);
            FluffyPong.crc2.fillStyle = "#000000";
            FluffyPong.crc2.fill();
            FluffyPong.crc2.closePath();
            FluffyPong.crc2.beginPath();
            FluffyPong.crc2.arc(-16, -25, 5, 0, 2 * Math.PI);
            FluffyPong.crc2.arc(20, -25, 5, 0, 2 * Math.PI);
            FluffyPong.crc2.fillStyle = "#ffffff";
            FluffyPong.crc2.fill();
            FluffyPong.crc2.closePath();
            for (let i = 0; i < 32; i++) {
                FluffyPong.crc2.beginPath();
                FluffyPong.crc2.rotate(0.55);
                FluffyPong.crc2.moveTo(0, 60);
                FluffyPong.crc2.lineTo(6, 80);
                FluffyPong.crc2.lineTo(10, 59);
                FluffyPong.crc2.lineTo(15, 70);
                FluffyPong.crc2.lineTo(17, 57);
                FluffyPong.crc2.lineTo(26, 75);
                FluffyPong.crc2.lineTo(24, 55);
                FluffyPong.crc2.fillStyle = this.color;
                FluffyPong.crc2.strokeStyle = "#000000";
                FluffyPong.crc2.fill();
                FluffyPong.crc2.stroke();
                FluffyPong.crc2.closePath();
            }
            FluffyPong.crc2.restore();
        }
        move(_vector) {
            this.position = _vector;
            let swipe = new FluffyPong.Vector(_vector.x, _vector.y);
            swipe.scale(0.2);
            this.position.add(swipe);
            return (this.position);
        }
        animation() {
            let offset = new FluffyPong.Vector(this.velocity.x, this.velocity.y);
            this.position.add(offset);
            if (this.position.x < (FluffyPong.borderWidth + (FluffyPong.fluffyWidth / 2)))
                this.velocity.scale(-1);
            if (this.position.y < (FluffyPong.borderWidth + (FluffyPong.fluffyHeight / 2)))
                this.velocity.scale(-1);
            if (this.position.x > FluffyPong.crc2.canvas.width - FluffyPong.borderWidth - (FluffyPong.fluffyWidth / 2))
                this.velocity.scale(-1);
            if (this.position.y > FluffyPong.crc2.canvas.height - FluffyPong.borderWidth - (FluffyPong.fluffyHeight / 2))
                this.velocity.scale(-1);
        }
    }
    FluffyPong.FluffyElement = FluffyElement;
})(FluffyPong || (FluffyPong = {})); //namespace
//# sourceMappingURL=Fluffy.js.map