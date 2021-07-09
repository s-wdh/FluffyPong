"use strict";
var FluffyPong_Path;
(function (FluffyPong_Path) {
    class WallBottomHole extends FluffyPong_Path.Wall {
        constructor(_position) {
            super(_position);
        }
        draw() {
            FluffyPong_Path.crc2.save();
            //Border Bottom Hole
            FluffyPong_Path.crc2.beginPath();
            FluffyPong_Path.crc2.fillStyle = "#999999";
            FluffyPong_Path.holeBottomWidth = FluffyPong_Path.fluffyWidth + Math.random() * (FluffyPong_Path.fluffyWidth / 2) + 2;
            FluffyPong_Path.holeBottomPosition = FluffyPong_Path.borderWidth + Math.floor(Math.random() * (FluffyPong_Path.canvasWidth - FluffyPong_Path.holeBottomWidth - (FluffyPong_Path.borderWidth * 2)));
            FluffyPong_Path.crc2.fillRect(FluffyPong_Path.holeBottomPosition, this.position.y, FluffyPong_Path.holeBottomWidth, FluffyPong_Path.borderWidth);
            FluffyPong_Path.crc2.closePath();
            FluffyPong_Path.crc2.restore();
        }
    }
    FluffyPong_Path.WallBottomHole = WallBottomHole;
})(FluffyPong_Path || (FluffyPong_Path = {})); //namespace
//# sourceMappingURL=WallBottomHole.js.map