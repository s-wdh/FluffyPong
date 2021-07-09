"use strict";
var FluffyPong_Path;
(function (FluffyPong_Path) {
    class FluffyElement {
        constructor(_position) {
            this.position = _position;
            this.velocity = new FluffyPong_Path.Vector(0, 0);
            this.velocity.random(1, 5);
        }
        //for draw with path elements
        generateColor() {
            let color = ["#b3ecff", "#cfffb3", "#ffffb3", "#ffb3d1"];
            let fluffyColor = color[Math.floor(Math.random() * color.length)].toString();
            this.color = fluffyColor;
        }
        //draw with canvas paths as element
        draw() {
            FluffyPong_Path.crc2.save();
            FluffyPong_Path.crc2.translate(this.position.x, this.position.y);
            FluffyPong_Path.crc2.scale(FluffyPong_Path.fluffyScaleFactor, (0.8 * FluffyPong_Path.fluffyScaleFactor));
            FluffyPong_Path.crc2.beginPath();
            FluffyPong_Path.crc2.arc(0, 0, 30, 0, 2 * Math.PI);
            FluffyPong_Path.crc2.fillStyle = this.color;
            FluffyPong_Path.crc2.fill();
            FluffyPong_Path.crc2.closePath();
            FluffyPong_Path.crc2.beginPath();
            FluffyPong_Path.crc2.ellipse(-9, -9, 5, 10, 0, 0, 2 * Math.PI);
            FluffyPong_Path.crc2.ellipse(9, -9, 5, 10, 0, 0, 2 * Math.PI);
            FluffyPong_Path.crc2.fillStyle = "#000000";
            FluffyPong_Path.crc2.fill();
            FluffyPong_Path.crc2.closePath();
            FluffyPong_Path.crc2.beginPath();
            FluffyPong_Path.crc2.arc(-8, -12.5, 2.5, 0, 2 * Math.PI);
            FluffyPong_Path.crc2.arc(10, -12.5, 2.5, 0, 2 * Math.PI);
            FluffyPong_Path.crc2.fillStyle = "#ffffff";
            FluffyPong_Path.crc2.fill();
            FluffyPong_Path.crc2.closePath();
            for (let i = 0; i < 32; i++) {
                FluffyPong_Path.crc2.beginPath();
                FluffyPong_Path.crc2.rotate(0.55);
                FluffyPong_Path.crc2.moveTo(0, 30);
                FluffyPong_Path.crc2.lineTo(3, 40);
                FluffyPong_Path.crc2.lineTo(5, 29.5);
                FluffyPong_Path.crc2.lineTo(7.5, 35);
                FluffyPong_Path.crc2.lineTo(8.5, 28.5);
                FluffyPong_Path.crc2.lineTo(13, 37.5);
                FluffyPong_Path.crc2.lineTo(12, 27.5);
                FluffyPong_Path.crc2.fillStyle = this.color;
                FluffyPong_Path.crc2.strokeStyle = "#000000";
                FluffyPong_Path.crc2.lineWidth = 0.5;
                FluffyPong_Path.crc2.fill();
                FluffyPong_Path.crc2.stroke();
                FluffyPong_Path.crc2.closePath();
            }
            FluffyPong_Path.crc2.restore();
        }
        //swipe/move function when player moves them on canvas, so they can't be swiped out of the walls, but through the holes
        move(_vector) {
            this.position = _vector;
            //left wall
            if (this.position.x < (FluffyPong_Path.borderWidth + (FluffyPong_Path.fluffyWidth / 2))) {
                if (this.position.y - (FluffyPong_Path.fluffyHeight / 2) < FluffyPong_Path.holeLeftPosition1) {
                    this.position.x = (FluffyPong_Path.borderWidth + (FluffyPong_Path.fluffyWidth / 2));
                }
                else if (this.position.y - (FluffyPong_Path.fluffyHeight / 2) < FluffyPong_Path.holeLeftPosition2 && this.position.y + (FluffyPong_Path.fluffyHeight / 2) > FluffyPong_Path.holeLeftPosition1 + FluffyPong_Path.holeLeftHeight1) {
                    this.position.x = (FluffyPong_Path.borderWidth + (FluffyPong_Path.fluffyWidth / 2));
                }
                else if (this.position.y + (FluffyPong_Path.fluffyHeight / 2) > FluffyPong_Path.holeLeftPosition2 + FluffyPong_Path.holeLeftHeight2) {
                    this.position.x = (FluffyPong_Path.borderWidth + (FluffyPong_Path.fluffyWidth / 2));
                }
            }
            //top wall
            if (this.position.y < (FluffyPong_Path.borderWidth + (FluffyPong_Path.fluffyHeight / 2))) {
                if (this.position.x - (FluffyPong_Path.fluffyWidth / 2) < FluffyPong_Path.holeTopPosition) {
                    this.position.y = (FluffyPong_Path.borderWidth + (FluffyPong_Path.fluffyHeight / 2));
                }
                else if (this.position.x + (FluffyPong_Path.fluffyWidth / 2) > FluffyPong_Path.holeTopPosition + FluffyPong_Path.holeTopWidth) {
                    this.position.y = (FluffyPong_Path.borderWidth + (FluffyPong_Path.fluffyHeight / 2));
                }
            }
            //right wall
            if (this.position.x > FluffyPong_Path.canvasWidth - FluffyPong_Path.borderWidth - (FluffyPong_Path.fluffyWidth / 2)) {
                if (this.position.y - (FluffyPong_Path.fluffyHeight / 2) < FluffyPong_Path.holeRightPosition1) {
                    this.position.x = FluffyPong_Path.canvasWidth - FluffyPong_Path.borderWidth - (FluffyPong_Path.fluffyWidth / 2);
                }
                else if (this.position.y - (FluffyPong_Path.fluffyHeight / 2) < FluffyPong_Path.holeRightPosition2 && this.position.y + (FluffyPong_Path.fluffyHeight / 2) > FluffyPong_Path.holeRightPosition1 + FluffyPong_Path.holeRightHeight1) {
                    this.position.x = FluffyPong_Path.canvasWidth - FluffyPong_Path.borderWidth - (FluffyPong_Path.fluffyWidth / 2);
                }
                else if (this.position.y + (FluffyPong_Path.fluffyHeight / 2) > FluffyPong_Path.holeRightPosition2 + FluffyPong_Path.holeRightHeight2) {
                    this.position.x = FluffyPong_Path.canvasWidth - FluffyPong_Path.borderWidth - (FluffyPong_Path.fluffyWidth / 2);
                }
            }
            //bottom wall                
            if (this.position.y > FluffyPong_Path.canvasHeight - FluffyPong_Path.borderWidth - (FluffyPong_Path.fluffyHeight / 2)) {
                if (this.position.x - (FluffyPong_Path.fluffyWidth / 2) < FluffyPong_Path.holeBottomPosition) {
                    this.position.y = FluffyPong_Path.canvasHeight - FluffyPong_Path.borderWidth - (FluffyPong_Path.fluffyHeight / 2);
                }
                else if (this.position.x + (FluffyPong_Path.fluffyWidth / 2) > FluffyPong_Path.holeBottomPosition + FluffyPong_Path.holeBottomWidth) {
                    this.position.y = FluffyPong_Path.canvasHeight - FluffyPong_Path.borderWidth - (FluffyPong_Path.fluffyHeight / 2);
                }
            }
            return (this.position);
        }
        //animate the fluffies so they scurry around on the canvas
        animation() {
            let offset = new FluffyPong_Path.Vector(this.velocity.x, this.velocity.y);
            this.position.add(offset);
            if (this.position.x < (FluffyPong_Path.borderWidth + (FluffyPong_Path.fluffyWidth / 2)))
                this.velocity.scale(-1);
            if (this.position.y < (FluffyPong_Path.borderWidth + (FluffyPong_Path.fluffyHeight / 2)))
                this.velocity.scale(-1);
            if (this.position.x > FluffyPong_Path.crc2.canvas.width - FluffyPong_Path.borderWidth - (FluffyPong_Path.fluffyWidth / 2))
                this.velocity.scale(-1);
            if (this.position.y > FluffyPong_Path.crc2.canvas.height - FluffyPong_Path.borderWidth - (FluffyPong_Path.fluffyHeight / 2))
                this.velocity.scale(-1);
        }
    } //class FluffyElement
    FluffyPong_Path.FluffyElement = FluffyElement;
})(FluffyPong_Path || (FluffyPong_Path = {})); //namespace
//# sourceMappingURL=Fluffy.js.map