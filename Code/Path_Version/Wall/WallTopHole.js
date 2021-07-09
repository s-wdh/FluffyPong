"use strict";
var FluffyPong_Path;
(function (FluffyPong_Path) {
    class WallTopHole extends FluffyPong_Path.Wall {
        constructor(_position) {
            super(_position);
        }
        draw() {
            FluffyPong_Path.crc2.save();
            //Border Top Hole
            FluffyPong_Path.crc2.beginPath();
            FluffyPong_Path.crc2.fillStyle = "#999999";
            FluffyPong_Path.holeTopWidth = FluffyPong_Path.fluffyWidth + Math.random() * (FluffyPong_Path.fluffyWidth / 2) + 2;
            FluffyPong_Path.holeTopPosition = FluffyPong_Path.borderWidth + Math.floor(Math.random() * (FluffyPong_Path.canvasWidth - FluffyPong_Path.holeTopWidth - (FluffyPong_Path.borderWidth * 2)));
            FluffyPong_Path.crc2.fillRect(FluffyPong_Path.holeTopPosition, this.position.y, FluffyPong_Path.holeTopWidth, FluffyPong_Path.borderWidth);
            FluffyPong_Path.crc2.closePath();
            FluffyPong_Path.crc2.restore();
        }
    }
    FluffyPong_Path.WallTopHole = WallTopHole;
})(FluffyPong_Path || (FluffyPong_Path = {})); //namespace
//# sourceMappingURL=WallTopHole.js.map