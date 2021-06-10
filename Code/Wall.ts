namespace FluffyPong {
    enum COLOR {
            RED,
            BLUE,
            GREEN,
            YELLOW
        }
    export class Wall {
        position: Vector;
        color: string;
        colorenum: COLOR;  

        constructor(_position: Vector) {
            this.position = _position;
        }

        generateColor(): void {
            let color: String[] = ["#b3ecff", "#cfffb3", "#ffffb3", "#ffb3d1"];
            let wallColor: string = color[Math.floor(Math.random() * color.length)].toString();
            this.color = wallColor;
            color.splice(color.indexOf(wallColor), 1);
            if (this.color == "#b3ecff") {
                this.colorenum = COLOR.BLUE;
            } else if (this.color == "#cfffb3") {
                this.colorenum = COLOR.GREEN;
            } else if (this.color == "#ffffb3") {
                this.colorenum = COLOR.YELLOW;
            } else if (this.color == "#ffb3d1") {
                this.colorenum = COLOR.RED;
            }
            /* 
            Blau: #b3ecff 
            Grün: #cfffb3
            Gelb: #ffffb3
            Rot: #ffb3d1
            */
        }

        draw(_index: number): void {
            crc2.save();
            switch (_index) {
                case 0: {
                    //Border Top
                    crc2.beginPath();
                    crc2.fillStyle = this.color;
                    crc2.fillRect(this.position.x, this.position.y, canvasWidth, borderWidth);
                    let holeTopWidth: number = fluffyWidth + Math.random() * (fluffyWidth / 2);
                    let holeTopPosition: number = borderWidth + Math.floor(Math.random() * (canvasWidth - holeTopWidth - (borderWidth * 2)));
                    crc2.clearRect(holeTopPosition, this.position.y, holeTopWidth, borderWidth);
                    crc2.closePath();
                    break;
                }
                case 1: {
                    //Border Right
                    crc2.beginPath();
                    crc2.fillStyle = this.color;
                    crc2.fillRect(this.position.x, this.position.y, borderWidth, canvasHeight);
                    for (let index: number = 0; index < 2; index++) {
                        let holeRightHeight: number = fluffyHeight + Math.random() * (fluffyHeight / 2);
                        let holeRightPosition: number = borderWidth + Math.floor(Math.random() * (canvasHeight - holeRightHeight - (borderWidth * 2)));
                        crc2.clearRect(this.position.x, holeRightPosition, borderWidth, holeRightHeight);
                    }
                    crc2.closePath();
                    break;
                }
                case 2: {
                    //Border Bottom
                    crc2.beginPath();
                    crc2.fillStyle = this.color;
                    crc2.fillRect(this.position.x, this.position.y, canvasWidth, borderWidth);
                    let holeBottomWidth: number = fluffyWidth + Math.random() * (fluffyWidth / 2);
                    let holeBottomPosition: number = borderWidth + Math.floor(Math.random() * (canvasWidth - holeBottomWidth - (borderWidth * 2)));
                    crc2.clearRect(holeBottomPosition, this.position.y, holeBottomWidth, borderWidth);
                    crc2.closePath();
                    break;
                }
                case 3: {
                    //Border Left
                    crc2.beginPath();
                    crc2.fillStyle = this.color;
                    crc2.fillRect(this.position.x, this.position.y, borderWidth, canvasHeight);
                    for (let index: number = 0; index < 2; index++) {
                        let holeLeftHeight: number = fluffyHeight + Math.random() * (fluffyHeight / 2);
                        let holeLeftPosition: number = borderWidth + Math.floor(Math.random() * (canvasHeight - holeLeftHeight - (borderWidth * 2)));
                        crc2.clearRect(this.position.x, holeLeftPosition, borderWidth, holeLeftHeight);
                    }
                    crc2.closePath();
                    break;
                }
            }
            crc2.restore();
        }
    }
} //namespace