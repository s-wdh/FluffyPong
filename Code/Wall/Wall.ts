namespace FluffyPong {
    export class Wall {
        position: Vector;
        color: string;

        constructor(_position: Vector) {
            this.position = _position;
        }

        draw(_index: number): void {
            crc2.save();
            switch (_index) {
                case 0: {
                    //Border Top
                    crc2.beginPath();
                    crc2.fillStyle = wallTopColor;
                    crc2.fillRect(this.position.x, this.position.y, canvasWidth, borderWidth);
                    /* let holeTopWidth: number = fluffyWidth + Math.random() * (fluffyWidth / 2);
                    let holeTopPosition: number = borderWidth + Math.floor(Math.random() * (canvasWidth - holeTopWidth - (borderWidth * 2)));
                    crc2.clearRect(holeTopPosition, this.position.y, holeTopWidth, borderWidth); */
                    crc2.closePath();
                    break;
                }
                case 1: {
                    //Border Right
                    crc2.beginPath();
                    crc2.fillStyle = wallRightColor;
                    crc2.fillRect(this.position.x, this.position.y, borderWidth, canvasHeight);
                    /* for (let index: number = 0; index < 2; index++) {
                        let holeRightHeight: number = fluffyHeight + Math.random() * (fluffyHeight / 2);
                        let holeRightPosition: number = borderWidth + Math.floor(Math.random() * (canvasHeight - holeRightHeight - (borderWidth * 2)));
                        crc2.clearRect(this.position.x, holeRightPosition, borderWidth, holeRightHeight);
                    } */
                    crc2.closePath();
                    break;
                }
                case 2: {
                    //Border Bottom
                    crc2.beginPath();
                    crc2.fillStyle = wallBottomColor;
                    crc2.fillRect(this.position.x, this.position.y, canvasWidth, borderWidth);
                    /* let holeBottomWidth: number = fluffyWidth + Math.random() * (fluffyWidth / 2);
                    let holeBottomPosition: number = borderWidth + Math.floor(Math.random() * (canvasWidth - holeBottomWidth - (borderWidth * 2)));
                    crc2.clearRect(holeBottomPosition, this.position.y, holeBottomWidth, borderWidth); */
                    crc2.closePath();
                    break;
                }
                case 3: {
                    //Border Left
                    crc2.beginPath();
                    crc2.fillStyle = wallLeftColor;
                    crc2.fillRect(this.position.x, this.position.y, borderWidth, canvasHeight);
                    /* for (let index: number = 0; index < 2; index++) {
                        let holeLeftHeight: number = fluffyHeight + Math.random() * (fluffyHeight / 2);
                        let holeLeftPosition: number = borderWidth + Math.floor(Math.random() * (canvasHeight - holeLeftHeight - (borderWidth * 2)));
                        crc2.clearRect(this.position.x, holeLeftPosition, borderWidth, holeLeftHeight);
                    } */
                    crc2.closePath();
                    break;
                }
            }
            crc2.restore();
        }
    }
} //namespace