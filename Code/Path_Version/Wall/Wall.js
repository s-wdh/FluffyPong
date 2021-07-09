"use strict";
var FluffyPong_Path;
(function (FluffyPong_Path) {
    class Wall {
        constructor(_position) {
            this.position = _position;
        }
        draw(_index) {
            FluffyPong_Path.crc2.save();
            switch (_index) {
                case 0: {
                    //Border Top
                    FluffyPong_Path.crc2.beginPath();
                    FluffyPong_Path.crc2.fillStyle = FluffyPong_Path.wallTopColor;
                    FluffyPong_Path.crc2.fillRect(this.position.x, this.position.y, FluffyPong_Path.canvasWidth, FluffyPong_Path.borderWidth);
                    FluffyPong_Path.crc2.closePath();
                    break;
                }
                case 1: {
                    //Border Right
                    FluffyPong_Path.crc2.beginPath();
                    FluffyPong_Path.crc2.fillStyle = FluffyPong_Path.wallRightColor;
                    FluffyPong_Path.crc2.fillRect(this.position.x, this.position.y, FluffyPong_Path.borderWidth, FluffyPong_Path.canvasHeight);
                    FluffyPong_Path.crc2.closePath();
                    break;
                }
                case 2: {
                    //Border Bottom
                    FluffyPong_Path.crc2.beginPath();
                    FluffyPong_Path.crc2.fillStyle = FluffyPong_Path.wallBottomColor;
                    FluffyPong_Path.crc2.fillRect(this.position.x, this.position.y, FluffyPong_Path.canvasWidth, FluffyPong_Path.borderWidth);
                    FluffyPong_Path.crc2.closePath();
                    break;
                }
                case 3: {
                    //Border Left
                    FluffyPong_Path.crc2.beginPath();
                    FluffyPong_Path.crc2.fillStyle = FluffyPong_Path.wallLeftColor;
                    FluffyPong_Path.crc2.fillRect(this.position.x, this.position.y, FluffyPong_Path.borderWidth, FluffyPong_Path.canvasHeight);
                    FluffyPong_Path.crc2.closePath();
                    break;
                }
            }
            FluffyPong_Path.crc2.restore();
        }
    }
    FluffyPong_Path.Wall = Wall;
})(FluffyPong_Path || (FluffyPong_Path = {})); //namespace
//# sourceMappingURL=Wall.js.map