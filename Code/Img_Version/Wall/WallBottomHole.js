"use strict";
var FluffyPong_Img;
(function (FluffyPong_Img) {
    class WallBottomHole extends FluffyPong_Img.Wall {
        constructor(_position) {
            super(_position);
        }
        draw() {
            FluffyPong_Img.crc2.save();
            //Border Bottom Hole
            FluffyPong_Img.crc2.beginPath();
            FluffyPong_Img.crc2.fillStyle = "#999999";
            FluffyPong_Img.holeBottomWidth = (FluffyPong_Img.fluffyWidth * 1.5) + Math.random() * (FluffyPong_Img.fluffyWidth / 2);
            FluffyPong_Img.holeBottomPosition = FluffyPong_Img.borderWidth + Math.floor(Math.random() * (FluffyPong_Img.canvasWidth - FluffyPong_Img.holeBottomWidth - (FluffyPong_Img.borderWidth * 2)));
            FluffyPong_Img.crc2.fillRect(FluffyPong_Img.holeBottomPosition, this.position.y, FluffyPong_Img.holeBottomWidth, FluffyPong_Img.borderWidth);
            FluffyPong_Img.crc2.closePath();
            FluffyPong_Img.crc2.restore();
        }
    }
    FluffyPong_Img.WallBottomHole = WallBottomHole;
})(FluffyPong_Img || (FluffyPong_Img = {})); //namespace
//# sourceMappingURL=WallBottomHole.js.map