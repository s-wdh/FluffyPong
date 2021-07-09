"use strict";
var FluffyPong_Img;
(function (FluffyPong_Img) {
    class Wall {
        constructor(_position) {
            this.position = _position;
        }
        draw(_index) {
            FluffyPong_Img.crc2.save();
            switch (_index) {
                case 0: {
                    //Border Top
                    FluffyPong_Img.crc2.beginPath();
                    FluffyPong_Img.crc2.fillStyle = FluffyPong_Img.wallTopColor;
                    FluffyPong_Img.crc2.fillRect(this.position.x, this.position.y, FluffyPong_Img.canvasWidth, FluffyPong_Img.borderWidth);
                    FluffyPong_Img.crc2.closePath();
                    break;
                }
                case 1: {
                    //Border Right
                    FluffyPong_Img.crc2.beginPath();
                    FluffyPong_Img.crc2.fillStyle = FluffyPong_Img.wallRightColor;
                    FluffyPong_Img.crc2.fillRect(this.position.x, this.position.y, FluffyPong_Img.borderWidth, FluffyPong_Img.canvasHeight);
                    FluffyPong_Img.crc2.closePath();
                    break;
                }
                case 2: {
                    //Border Bottom
                    FluffyPong_Img.crc2.beginPath();
                    FluffyPong_Img.crc2.fillStyle = FluffyPong_Img.wallBottomColor;
                    FluffyPong_Img.crc2.fillRect(this.position.x, this.position.y, FluffyPong_Img.canvasWidth, FluffyPong_Img.borderWidth);
                    FluffyPong_Img.crc2.closePath();
                    break;
                }
                case 3: {
                    //Border Left
                    FluffyPong_Img.crc2.beginPath();
                    FluffyPong_Img.crc2.fillStyle = FluffyPong_Img.wallLeftColor;
                    FluffyPong_Img.crc2.fillRect(this.position.x, this.position.y, FluffyPong_Img.borderWidth, FluffyPong_Img.canvasHeight);
                    FluffyPong_Img.crc2.closePath();
                    break;
                }
            }
            FluffyPong_Img.crc2.restore();
        }
    }
    FluffyPong_Img.Wall = Wall;
})(FluffyPong_Img || (FluffyPong_Img = {})); //namespace
//# sourceMappingURL=Wall.js.map