"use strict";
var FluffyPong;
(function (FluffyPong) {
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
            // draw fluffy as img -> doesn't work :(
            /* let fluffyRed: HTMLImageElement = document.createElement("img");
            fluffyRed.onload = function (): void {
                crc2.drawImage(fluffyRed, 0, 0, (fluffyScaleFactor * 80), (fluffyScaleFactor * 80));
                console.log(fluffyRed);
            };
            fluffyRed.src = "Fluffy/Pictures/FluffyRed.png"; */
            //draw Fluffy with paths
            FluffyPong.crc2.scale(FluffyPong.fluffyScaleFactor, (0.8 * FluffyPong.fluffyScaleFactor));
            FluffyPong.crc2.beginPath();
            FluffyPong.crc2.arc(0, 0, 30, 0, 2 * Math.PI);
            FluffyPong.crc2.fillStyle = this.color;
            FluffyPong.crc2.fill();
            FluffyPong.crc2.closePath();
            FluffyPong.crc2.beginPath();
            FluffyPong.crc2.ellipse(-9, -9, 5, 10, 0, 0, 2 * Math.PI);
            FluffyPong.crc2.ellipse(9, -9, 5, 10, 0, 0, 2 * Math.PI);
            FluffyPong.crc2.fillStyle = "#000000";
            FluffyPong.crc2.fill();
            FluffyPong.crc2.closePath();
            FluffyPong.crc2.beginPath();
            FluffyPong.crc2.arc(-8, -12.5, 2.5, 0, 2 * Math.PI);
            FluffyPong.crc2.arc(10, -12.5, 2.5, 0, 2 * Math.PI);
            FluffyPong.crc2.fillStyle = "#ffffff";
            FluffyPong.crc2.fill();
            FluffyPong.crc2.closePath();
            for (let i = 0; i < 32; i++) {
                FluffyPong.crc2.beginPath();
                FluffyPong.crc2.rotate(0.55);
                FluffyPong.crc2.moveTo(0, 30);
                FluffyPong.crc2.lineTo(3, 40);
                FluffyPong.crc2.lineTo(5, 29.5);
                FluffyPong.crc2.lineTo(7.5, 35);
                FluffyPong.crc2.lineTo(8.5, 28.5);
                FluffyPong.crc2.lineTo(13, 37.5);
                FluffyPong.crc2.lineTo(12, 27.5);
                FluffyPong.crc2.fillStyle = this.color;
                FluffyPong.crc2.strokeStyle = "#000000";
                FluffyPong.crc2.lineWidth = 0.5;
                FluffyPong.crc2.fill();
                FluffyPong.crc2.stroke();
                FluffyPong.crc2.closePath();
            }
            FluffyPong.crc2.restore();
        }
        //swipe/move function when player moves them on canvas, so they can't be swiped out of the walls
        move(_vector) {
            this.position = _vector;
            if (this.position.x < (FluffyPong.borderWidth + (FluffyPong.fluffyWidth / 2)))
                this.position.x = (FluffyPong.borderWidth + (FluffyPong.fluffyWidth / 2));
            if (this.position.y < (FluffyPong.borderWidth + (FluffyPong.fluffyHeight / 2)))
                this.position.y = (FluffyPong.borderWidth + (FluffyPong.fluffyHeight / 2));
            if (this.position.x > FluffyPong.crc2.canvas.width - FluffyPong.borderWidth - (FluffyPong.fluffyWidth / 2))
                this.position.x = FluffyPong.crc2.canvas.width - FluffyPong.borderWidth - (FluffyPong.fluffyWidth / 2);
            if (this.position.y > FluffyPong.crc2.canvas.height - FluffyPong.borderWidth - (FluffyPong.fluffyHeight / 2))
                this.position.y = FluffyPong.crc2.canvas.height - FluffyPong.borderWidth - (FluffyPong.fluffyHeight / 2);
            return (this.position);
        }
        //animate the fluffies so they scurry around on the canvas
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
        //animate the process, when the correct hole is hit, so the player can see how they disappear out of the canvas
        holeAnimation(_direction, _position) {
            switch (_direction) {
                case "left": {
                    if ((this.position.x + (FluffyPong.fluffyWidth / 2)) < _position) {
                        FluffyPong.fluffies.splice(FluffyPong.fluffies.indexOf(FluffyPong.movedFluffy[0]), 1);
                        FluffyPong.movedFluffy.splice(0, FluffyPong.movedFluffy.length);
                        window.clearInterval(FluffyPong.anim);
                    }
                    else {
                        this.position.x -= 1;
                    }
                    break;
                }
                case "top": {
                    if ((this.position.y + (FluffyPong.fluffyHeight / 2)) < _position) {
                        FluffyPong.fluffies.splice(FluffyPong.fluffies.indexOf(FluffyPong.movedFluffy[0]), 1);
                        FluffyPong.movedFluffy.splice(0, FluffyPong.movedFluffy.length);
                        window.clearInterval(FluffyPong.anim);
                    }
                    else {
                        this.position.y -= 1;
                    }
                    break;
                }
                case "right": {
                    if ((this.position.x - (FluffyPong.fluffyWidth / 2)) > _position) {
                        FluffyPong.fluffies.splice(FluffyPong.fluffies.indexOf(FluffyPong.movedFluffy[0]), 1);
                        FluffyPong.movedFluffy.splice(0, FluffyPong.movedFluffy.length);
                        window.clearInterval(FluffyPong.anim);
                    }
                    else {
                        this.position.x += 1;
                    }
                    break;
                }
                case "bottom": {
                    if ((this.position.y - (FluffyPong.fluffyHeight / 2)) < _position) {
                        FluffyPong.fluffies.splice(FluffyPong.fluffies.indexOf(FluffyPong.movedFluffy[0]), 1);
                        FluffyPong.movedFluffy.splice(0, FluffyPong.movedFluffy.length);
                        window.clearInterval(FluffyPong.anim);
                    }
                    else {
                        this.position.y += 1;
                    }
                    break;
                }
            }
        }
    } //class FluffyElement
    FluffyPong.FluffyElement = FluffyElement;
})(FluffyPong || (FluffyPong = {})); //namespace
//# sourceMappingURL=Fluffy.js.map