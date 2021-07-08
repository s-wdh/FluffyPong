"use strict";
var FluffyPong;
(function (FluffyPong) {
    class WallTopHole extends FluffyPong.Wall {
        constructor(_position) {
            super(_position);
        }
        draw() {
            FluffyPong.crc2.save();
            //Border Top Hole
            FluffyPong.crc2.beginPath();
            FluffyPong.crc2.fillStyle = "#999999";
            FluffyPong.holeTopWidth = FluffyPong.fluffyWidth + Math.random() * (FluffyPong.fluffyWidth / 2);
            FluffyPong.holeTopPosition = FluffyPong.borderWidth + Math.floor(Math.random() * (FluffyPong.canvasWidth - FluffyPong.holeTopWidth - (FluffyPong.borderWidth * 2)));
            FluffyPong.crc2.fillRect(FluffyPong.holeTopPosition, this.position.y, FluffyPong.holeTopWidth, FluffyPong.borderWidth);
            FluffyPong.crc2.closePath();
            FluffyPong.crc2.restore();
        }
    }
    FluffyPong.WallTopHole = WallTopHole;
})(FluffyPong || (FluffyPong = {})); //namespace
//# sourceMappingURL=WallTopHole.js.map