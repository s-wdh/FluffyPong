"use strict";
var FluffyPong_Img;
(function (FluffyPong_Img) {
    class FluffyElement {
        constructor(_position) {
            this.position = _position;
            this.velocity = new FluffyPong_Img.Vector(0, 0);
            this.velocity.random(1, 5);
        }
        //for fluffies with images
        generateColor() {
            let img = FluffyPong_Img.images[Math.floor(Math.random() * FluffyPong_Img.images.length)];
            if (img.classList.contains("blue")) {
                this.color = "#b3ecff";
            }
            else if (img.classList.contains("green")) {
                this.color = "#cfffb3";
            }
            else if (img.classList.contains("red")) {
                this.color = "#ffb3d1";
            }
            else if (img.classList.contains("yellow")) {
                this.color = "#ffffb3";
            }
            this.image = img;
        }
        //for draw with path elements
        /* generateColor(): void {
            let color: String[] = ["#b3ecff", "#cfffb3", "#ffffb3", "#ffb3d1"];
            let fluffyColor: string = color[Math.floor(Math.random() * color.length)].toString();
            this.color = fluffyColor;
        } */
        //draw with images
        draw() {
            FluffyPong_Img.crc2.drawImage(this.image, this.position.x, this.position.y, (FluffyPong_Img.fluffyScaleFactor * 80), (FluffyPong_Img.fluffyScaleFactor * 56.6));
        }
        //draw with canvas paths as element
        /* draw(): void {
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.scale(fluffyScaleFactor, (0.8 * fluffyScaleFactor));
            crc2.beginPath();
            crc2.arc(0, 0, 30, 0, 2 * Math.PI);
            crc2.fillStyle = this.color;
            crc2.fill();
            crc2.closePath();

            crc2.beginPath();
            crc2.ellipse(-9, -9, 5, 10, 0, 0, 2 * Math.PI);
            crc2.ellipse(9, -9, 5, 10, 0, 0, 2 * Math.PI);
            crc2.fillStyle = "#000000";
            crc2.fill();
            crc2.closePath();
            crc2.beginPath();
            crc2.arc(-8, -12.5, 2.5, 0, 2 * Math.PI);
            crc2.arc(10, -12.5, 2.5, 0, 2 * Math.PI);
            crc2.fillStyle = "#ffffff";
            crc2.fill();
            crc2.closePath();
            for (let i: number = 0; i < 32; i++) {
                crc2.beginPath();
                crc2.rotate(0.55);
                crc2.moveTo(0, 30);
                crc2.lineTo(3, 40);
                crc2.lineTo(5, 29.5);
                crc2.lineTo(7.5, 35);
                crc2.lineTo(8.5, 28.5);
                crc2.lineTo(13, 37.5);
                crc2.lineTo(12, 27.5);
                crc2.fillStyle = this.color;
                crc2.strokeStyle = "#000000";
                crc2.lineWidth = 0.5;
                crc2.fill();
                crc2.stroke();
                crc2.closePath();
            }
            crc2.restore();
        } */
        //swipe/move function when player moves them on canvas, so they can't be swiped out of the walls, but through the holes
        move(_vector) {
            this.position = _vector;
            //left wall
            if (this.position.x < FluffyPong_Img.borderWidth) {
                if (this.position.y < FluffyPong_Img.holeLeftPosition1) {
                    this.position.x = FluffyPong_Img.borderWidth + 1;
                }
                else if (this.position.y < FluffyPong_Img.holeLeftPosition2 && this.position.y + FluffyPong_Img.fluffyHeight > FluffyPong_Img.holeLeftPosition1 + FluffyPong_Img.holeLeftHeight1) {
                    this.position.x = FluffyPong_Img.borderWidth + 1;
                }
                else if (this.position.y + FluffyPong_Img.fluffyHeight > FluffyPong_Img.holeLeftPosition2 + FluffyPong_Img.holeLeftHeight2) {
                    this.position.x = FluffyPong_Img.borderWidth + 1;
                }
            }
            //top wall
            if (this.position.y < FluffyPong_Img.borderWidth) {
                if (this.position.x < FluffyPong_Img.holeTopPosition) {
                    this.position.y = FluffyPong_Img.borderWidth + 1;
                }
                else if (this.position.x + FluffyPong_Img.fluffyWidth > FluffyPong_Img.holeTopPosition + FluffyPong_Img.holeTopWidth) {
                    this.position.y = FluffyPong_Img.borderWidth + 1;
                }
            }
            //right wall
            if (this.position.x + FluffyPong_Img.fluffyWidth > FluffyPong_Img.canvasWidth - FluffyPong_Img.borderWidth) {
                if (this.position.y < FluffyPong_Img.holeRightPosition1) {
                    this.position.x = FluffyPong_Img.canvasWidth - FluffyPong_Img.borderWidth - FluffyPong_Img.fluffyWidth - 1;
                }
                else if (this.position.y < FluffyPong_Img.holeRightPosition2 && this.position.y + FluffyPong_Img.fluffyHeight > FluffyPong_Img.holeRightPosition1 + FluffyPong_Img.holeRightHeight1) {
                    this.position.x = FluffyPong_Img.canvasWidth - FluffyPong_Img.borderWidth - FluffyPong_Img.fluffyWidth - 1;
                }
                else if (this.position.y > FluffyPong_Img.holeRightPosition2 + FluffyPong_Img.holeRightHeight2) {
                    this.position.x = FluffyPong_Img.canvasWidth - FluffyPong_Img.borderWidth - FluffyPong_Img.fluffyWidth - 1;
                }
            }
            //bottom wall                
            if (this.position.y + FluffyPong_Img.fluffyHeight > FluffyPong_Img.canvasHeight - FluffyPong_Img.borderWidth) {
                if (this.position.x < FluffyPong_Img.holeBottomPosition) {
                    this.position.y = FluffyPong_Img.canvasHeight - FluffyPong_Img.borderWidth - FluffyPong_Img.fluffyHeight - 1;
                }
                else if (this.position.x + FluffyPong_Img.fluffyWidth > FluffyPong_Img.holeBottomPosition + FluffyPong_Img.holeBottomWidth) {
                    this.position.y = FluffyPong_Img.canvasHeight - FluffyPong_Img.borderWidth - FluffyPong_Img.fluffyHeight - 1;
                }
            }
            return (this.position);
        }
        //animate the fluffies so they scurry around on the canvas
        animation() {
            let offset = new FluffyPong_Img.Vector(this.velocity.x, this.velocity.y);
            this.position.add(offset);
            if (this.position.x < FluffyPong_Img.borderWidth)
                this.velocity.scale(-1);
            if (this.position.y < FluffyPong_Img.borderWidth)
                this.velocity.scale(-1);
            if (this.position.x > FluffyPong_Img.crc2.canvas.width - FluffyPong_Img.borderWidth - FluffyPong_Img.fluffyWidth)
                this.velocity.scale(-1);
            if (this.position.y > FluffyPong_Img.crc2.canvas.height - FluffyPong_Img.borderWidth - FluffyPong_Img.fluffyHeight)
                this.velocity.scale(-1);
        }
    } //class FluffyElement
    FluffyPong_Img.FluffyElement = FluffyElement;
})(FluffyPong_Img || (FluffyPong_Img = {})); //namespace
//# sourceMappingURL=Fluffy.js.map