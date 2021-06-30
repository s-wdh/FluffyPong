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
                    FluffyPong.crc2.closePath();
                    break;
                }
                case 1: {
                    //Border Right
                    FluffyPong.crc2.beginPath();
                    FluffyPong.crc2.fillStyle = FluffyPong.wallRightColor;
                    FluffyPong.crc2.fillRect(this.position.x, this.position.y, FluffyPong.borderWidth, FluffyPong.canvasHeight);
                    FluffyPong.crc2.closePath();
                    break;
                }
                case 2: {
                    //Border Bottom
                    FluffyPong.crc2.beginPath();
                    FluffyPong.crc2.fillStyle = FluffyPong.wallBottomColor;
                    FluffyPong.crc2.fillRect(this.position.x, this.position.y, FluffyPong.canvasWidth, FluffyPong.borderWidth);
                    FluffyPong.crc2.closePath();
                    break;
                }
                case 3: {
                    //Border Left
                    FluffyPong.crc2.beginPath();
                    FluffyPong.crc2.fillStyle = FluffyPong.wallLeftColor;
                    FluffyPong.crc2.fillRect(this.position.x, this.position.y, FluffyPong.borderWidth, FluffyPong.canvasHeight);
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