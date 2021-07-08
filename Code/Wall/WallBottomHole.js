"use strict";
var FluffyPong;
(function (FluffyPong) {
    class WallBottomHole extends FluffyPong.Wall {
        constructor(_position) {
            super(_position);
        }
        draw() {
            FluffyPong.crc2.save();
            //Border Bottom Hole
            FluffyPong.crc2.beginPath();
            FluffyPong.crc2.fillStyle = "#999999";
            FluffyPong.holeBottomWidth = FluffyPong.fluffyWidth + Math.random() * (FluffyPong.fluffyWidth / 2);
            FluffyPong.holeBottomPosition = FluffyPong.borderWidth + Math.floor(Math.random() * (FluffyPong.canvasWidth - FluffyPong.holeBottomWidth - (FluffyPong.borderWidth * 2)));
            FluffyPong.crc2.fillRect(FluffyPong.holeBottomPosition, this.position.y, FluffyPong.holeBottomWidth, FluffyPong.borderWidth);
            FluffyPong.crc2.closePath();
            FluffyPong.crc2.restore();
        }
    }
    FluffyPong.WallBottomHole = WallBottomHole;
})(FluffyPong || (FluffyPong = {})); //namespace
//# sourceMappingURL=WallBottomHole.js.map