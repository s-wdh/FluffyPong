"use strict";
var FluffyPong_Img;
(function (FluffyPong_Img) {
    class WallTopHole extends FluffyPong_Img.Wall {
        constructor(_position) {
            super(_position);
        }
        draw() {
            FluffyPong_Img.crc2.save();
            //Border Top Hole
            FluffyPong_Img.crc2.beginPath();
            FluffyPong_Img.crc2.fillStyle = "#999999";
            FluffyPong_Img.holeTopWidth = FluffyPong_Img.fluffyWidth + Math.random() * (FluffyPong_Img.fluffyWidth / 2) + 2;
            FluffyPong_Img.holeTopPosition = FluffyPong_Img.borderWidth + Math.floor(Math.random() * (FluffyPong_Img.canvasWidth - FluffyPong_Img.holeTopWidth - (FluffyPong_Img.borderWidth * 2)));
            FluffyPong_Img.crc2.fillRect(FluffyPong_Img.holeTopPosition, this.position.y, FluffyPong_Img.holeTopWidth, FluffyPong_Img.borderWidth);
            FluffyPong_Img.crc2.closePath();
            FluffyPong_Img.crc2.restore();
        }
    }
    FluffyPong_Img.WallTopHole = WallTopHole;
})(FluffyPong_Img || (FluffyPong_Img = {})); //namespace
//# sourceMappingURL=WallTopHole.js.map