"use strict";
var FluffyPong;
(function (FluffyPong) {
    class WallRightHole extends FluffyPong.Wall {
        constructor(_position) {
            super(_position);
        }
        draw() {
            FluffyPong.crc2.save();
            //Border Right Hole
            FluffyPong.crc2.beginPath();
            FluffyPong.crc2.fillStyle = "#999999";
            for (let index = 0; index < 2; index++) {
                let holeRightHeight = FluffyPong.fluffyHeight + Math.random() * (FluffyPong.fluffyHeight / 2);
                let holeRightPosition = FluffyPong.borderWidth + Math.floor(Math.random() * (FluffyPong.canvasHeight - holeRightHeight - (FluffyPong.borderWidth * 2)));
                FluffyPong.crc2.fillRect(this.position.x, holeRightPosition, FluffyPong.borderWidth, holeRightHeight);
            }
            FluffyPong.crc2.closePath();
            FluffyPong.crc2.restore();
        }
    }
    FluffyPong.WallRightHole = WallRightHole;
})(FluffyPong || (FluffyPong = {})); //namespace
//# sourceMappingURL=WallRightHole.js.map