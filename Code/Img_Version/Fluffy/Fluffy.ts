namespace FluffyPong_Img {
    export class FluffyElement {
        position: Vector;
        velocity: Vector;
        color: string;
        image: HTMLImageElement;

        constructor(_position: Vector) {
            this.position = _position;
            this.velocity = new Vector(0, 0);
            this.velocity.random(1, 5);
        }

        //for fluffies with images
        generateColor(): void {
            let img: HTMLImageElement = images[Math.floor(Math.random() * images.length)];
            if (img.classList.contains("blue")) {
                this.color = "#b3ecff";
            } else if (img.classList.contains("green")) {
                this.color = "#cfffb3";
            } else if (img.classList.contains("red")) {
                this.color = "#ffb3d1";
            } else if (img.classList.contains("yellow")) {
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
        draw(): void {
            crc2.drawImage(this.image, this.position.x, this.position.y, (fluffyScaleFactor * 80), (fluffyScaleFactor * 56.6));
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
        move(_vector: Vector): Vector {
            this.position = _vector;
            //left wall
            if (this.position.x < borderWidth) {
                if (this.position.y < holeLeftPosition1) {
                    this.position.x = borderWidth + 1;
                } else if (this.position.y < holeLeftPosition2 && this.position.y + fluffyHeight > holeLeftPosition1 + holeLeftHeight1) {
                    this.position.x = borderWidth + 1;
                } else if (this.position.y + fluffyHeight > holeLeftPosition2 + holeLeftHeight2) {
                    this.position.x = borderWidth + 1;
                }
            }
            //top wall
            if (this.position.y < borderWidth) {
                if (this.position.x < holeTopPosition) {
                    this.position.y = borderWidth + 1;
                } else if (this.position.x + fluffyWidth > holeTopPosition + holeTopWidth) {
                    this.position.y = borderWidth + 1;
                }
            }
            //right wall
            if (this.position.x + fluffyWidth > canvasWidth - borderWidth) {
                if (this.position.y < holeRightPosition1) {
                    this.position.x = canvasWidth - borderWidth - fluffyWidth - 1;
                } else if (this.position.y < holeRightPosition2 && this.position.y + fluffyHeight > holeRightPosition1 + holeRightHeight1) {
                    this.position.x = canvasWidth - borderWidth - fluffyWidth - 1;
                } else if (this.position.y > holeRightPosition2 + holeRightHeight2) {
                    this.position.x = canvasWidth - borderWidth - fluffyWidth - 1;
                }
            }
            //bottom wall                
            if (this.position.y + fluffyHeight > canvasHeight - borderWidth) {
                if (this.position.x < holeBottomPosition) {
                    this.position.y = canvasHeight - borderWidth - fluffyHeight - 1;
                } else if (this.position.x + fluffyWidth > holeBottomPosition + holeBottomWidth) {
                    this.position.y = canvasHeight - borderWidth - fluffyHeight - 1;
                }
            }
            return (this.position);
        }

        //animate the fluffies so they scurry around on the canvas
        animation(): void {
            let offset: Vector = new Vector(this.velocity.x, this.velocity.y);
            this.position.add(offset);

            if (this.position.x < borderWidth)
                this.velocity.scale(-1);
            if (this.position.y < borderWidth)
                this.velocity.scale(-1);
            if (this.position.x > crc2.canvas.width - borderWidth - fluffyWidth)
                this.velocity.scale(-1);
            if (this.position.y > crc2.canvas.height - borderWidth - fluffyHeight)
                this.velocity.scale(-1);
        }
    } //class FluffyElement
} //namespace