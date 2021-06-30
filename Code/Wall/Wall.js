"use strict";
var FluffyPong;
(function (FluffyPong) {
    class Wall {
        constructor(_position) {
            this.position = _position;
        }
        draw(_index) {
            FluffyPong.crc2.save();
            switch (_index) {
                case 0: {
                    //Border Top
                    FluffyPong.crc2.beginPath();
                    FluffyPong.crc2.fillStyle = FluffyPong.wallTopColor;
                    FluffyPong.crc2.fillRect(this.position.x, this.position.y, FluffyPong.canvasWidth, FluffyPong.borderWidth);
                    /* let holeTopWidth: number = fluffyWidth + Math.random() * (fluffyWidth / 2);
                    let holeTopPosition: number = borderWidth + Math.floor(Math.random() * (canvasWidth - holeTopWidth - (borderWidth * 2)));
                    crc2.clearRect(holeTopPosition, this.position.y, holeTopWidth, borderWidth); */
                    FluffyPong.crc2.closePath();
                    break;
                }
                case 1: {
                    //Border Right
                    FluffyPong.crc2.beginPath();
                    FluffyPong.crc2.fillStyle = FluffyPong.wallRightColor;
                    FluffyPong.crc2.fillRect(this.position.x, this.position.y, FluffyPong.borderWidth, FluffyPong.canvasHeight);
                    /* for (let index: number = 0; index < 2; index++) {
                        let holeRightHeight: number = fluffyHeight + Math.random() * (fluffyHeight / 2);
                        let holeRightPosition: number = borderWidth + Math.floor(Math.random() * (canvasHeight - holeRightHeight - (borderWidth * 2)));
                        crc2.clearRect(this.position.x, holeRightPosition, borderWidth, holeRightHeight);
                    } */
                    FluffyPong.crc2.closePath();
                    break;
                }
                case 2: {
                    //Border Bottom
                    FluffyPong.crc2.beginPath();
                    FluffyPong.crc2.fillStyle = FluffyPong.wallBottomColor;
                    FluffyPong.crc2.fillRect(this.position.x, this.position.y, FluffyPong.canvasWidth, FluffyPong.borderWidth);
                    /* let holeBottomWidth: number = fluffyWidth + Math.random() * (fluffyWidth / 2);
                    let holeBottomPosition: number = borderWidth + Math.floor(Math.random() * (canvasWidth - holeBottomWidth - (borderWidth * 2)));
                    crc2.clearRect(holeBottomPosition, this.position.y, holeBottomWidth, borderWidth); */
                    FluffyPong.crc2.closePath();
                    break;
                }
                case 3: {
                    //Border Left
                    FluffyPong.crc2.beginPath();
                    FluffyPong.crc2.fillStyle = FluffyPong.wallLeftColor;
                    FluffyPong.crc2.fillRect(this.position.x, this.position.y, FluffyPong.borderWidth, FluffyPong.canvasHeight);
                    /* for (let index: number = 0; index < 2; index++) {
                        let holeLeftHeight: number = fluffyHeight + Math.random() * (fluffyHeight / 2);
                        let holeLeftPosition: number = borderWidth + Math.floor(Math.random() * (canvasHeight - holeLeftHeight - (borderWidth * 2)));
                        crc2.clearRect(this.position.x, holeLeftPosition, borderWidth, holeLeftHeight);
                    } */
                    FluffyPong.crc2.closePath();
                    break;
                }
            }
            FluffyPong.crc2.restore();
        }
    }
    FluffyPong.Wall = Wall;
})(FluffyPong || (FluffyPong = {})); //namespace
//# sourceMappingURL=Wall.js.map