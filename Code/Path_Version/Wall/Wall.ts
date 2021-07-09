namespace FluffyPong_Path {
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
                    crc2.closePath();
                    break;
                }
                case 1: {
                    //Border Right
                    crc2.beginPath();
                    crc2.fillStyle = wallRightColor;
                    crc2.fillRect(this.position.x, this.position.y, borderWidth, canvasHeight);
                    crc2.closePath();
                    break;
                }
                case 2: {
                    //Border Bottom
                    crc2.beginPath();
                    crc2.fillStyle = wallBottomColor;
                    crc2.fillRect(this.position.x, this.position.y, canvasWidth, borderWidth);
                    crc2.closePath();
                    break;
                }
                case 3: {
                    //Border Left
                    crc2.beginPath();
                    crc2.fillStyle = wallLeftColor;
                    crc2.fillRect(this.position.x, this.position.y, borderWidth, canvasHeight);
                    crc2.closePath();
                    break;
                }
            }
            crc2.restore();
        }
    }
} //namespace