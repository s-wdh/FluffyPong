namespace FluffyPong_Path {
    export class FluffyElement {
        position: Vector;
        velocity: Vector;
        color: string;

        constructor(_position: Vector) {
            this.position = _position;
            this.velocity = new Vector(0, 0);
            this.velocity.random(1, 5);
        }

        //for draw with path elements
        generateColor(): void {
            let color: String[] = ["#b3ecff", "#cfffb3", "#ffffb3", "#ffb3d1"];
            let fluffyColor: string = color[Math.floor(Math.random() * color.length)].toString();
            this.color = fluffyColor;
        }

        //draw with canvas paths as element
        draw(): void {
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
        }

        //swipe/move function when player moves them on canvas, so they can't be swiped out of the walls, but through the holes
        move(_vector: Vector): Vector {
            this.position = _vector;
            //left wall
            if (this.position.x < (borderWidth + (fluffyWidth / 2))) {
                if (this.position.y - (fluffyHeight / 2) < holeLeftPosition1) {
                    this.position.x = (borderWidth + (fluffyWidth / 2));
                } else if (this.position.y - (fluffyHeight / 2) < holeLeftPosition2 && this.position.y + (fluffyHeight / 2) > holeLeftPosition1 + holeLeftHeight1) {
                    this.position.x = (borderWidth + (fluffyWidth / 2));
                } else if (this.position.y + (fluffyHeight / 2) > holeLeftPosition2 + holeLeftHeight2) {
                    this.position.x = (borderWidth + (fluffyWidth / 2));
                }
            }
            //top wall
            if (this.position.y < (borderWidth + (fluffyHeight / 2))) {
                if (this.position.x - (fluffyWidth / 2) < holeTopPosition) {
                    this.position.y = (borderWidth + (fluffyHeight / 2));
                } else if (this.position.x + (fluffyWidth / 2) > holeTopPosition + holeTopWidth) {
                    this.position.y = (borderWidth + (fluffyHeight / 2));
                }
            }
            //right wall
            if (this.position.x > canvasWidth - borderWidth - (fluffyWidth / 2)) {
                if (this.position.y - (fluffyHeight / 2) < holeRightPosition1) {
                    this.position.x = canvasWidth - borderWidth - (fluffyWidth / 2);
                } else if (this.position.y - (fluffyHeight / 2) < holeRightPosition2 && this.position.y + (fluffyHeight / 2) > holeRightPosition1 + holeRightHeight1) {
                    this.position.x = canvasWidth - borderWidth - (fluffyWidth / 2);
                } else if (this.position.y + (fluffyHeight / 2) > holeRightPosition2 + holeRightHeight2) {
                    this.position.x = canvasWidth - borderWidth - (fluffyWidth / 2);
                }
            }
            //bottom wall                
            if (this.position.y > canvasHeight - borderWidth - (fluffyHeight / 2)) {
                if (this.position.x - (fluffyWidth / 2) < holeBottomPosition) {
                    this.position.y = canvasHeight - borderWidth - (fluffyHeight / 2);
                } else if (this.position.x + (fluffyWidth / 2) > holeBottomPosition + holeBottomWidth) {
                    this.position.y = canvasHeight - borderWidth - (fluffyHeight / 2);
                }
            }
            return (this.position);
        }

        //animate the fluffies so they scurry around on the canvas
        animation(): void {
            let offset: Vector = new Vector(this.velocity.x, this.velocity.y);
            this.position.add(offset);

            if (this.position.x < (borderWidth + (fluffyWidth / 2)))
                this.velocity.scale(-1);
            if (this.position.y < (borderWidth + (fluffyHeight / 2)))
                this.velocity.scale(-1);
            if (this.position.x > crc2.canvas.width - borderWidth - (fluffyWidth / 2))
                this.velocity.scale(-1);
            if (this.position.y > crc2.canvas.height - borderWidth - (fluffyHeight / 2))
                this.velocity.scale(-1);
        }
    } //class FluffyElement
} //namespace