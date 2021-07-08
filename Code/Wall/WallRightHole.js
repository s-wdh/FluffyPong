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
            FluffyPong.holeRightHeight1 = FluffyPong.fluffyHeight + Math.random() * (FluffyPong.fluffyHeight / 2);
            //first hole should be in the upper half of the canvas
            FluffyPong.holeRightPosition1 = FluffyPong.borderWidth + Math.floor(Math.random() * ((FluffyPong.canvasHeight / 2) - FluffyPong.holeRightHeight1 - (FluffyPong.borderWidth * 2)));
            FluffyPong.crc2.fillRect(this.position.x, FluffyPong.holeRightPosition1, FluffyPong.borderWidth, FluffyPong.holeRightHeight1);
            FluffyPong.holeRightHeight2 = FluffyPong.fluffyHeight + Math.random() * (FluffyPong.fluffyHeight / 2);
            //second hole should be below hole 1
            FluffyPong.holeRightPosition2 = (FluffyPong.canvasHeight / 2) + Math.floor(Math.random() * ((FluffyPong.canvasHeight / 2) - FluffyPong.holeRightHeight2 - FluffyPong.borderWidth));
            FluffyPong.crc2.fillRect(this.position.x, FluffyPong.holeRightPosition2, FluffyPong.borderWidth, FluffyPong.holeRightHeight2);
            FluffyPong.crc2.closePath();
            FluffyPong.crc2.restore();
        }
    }
    FluffyPong.WallRightHole = WallRightHole;
})(FluffyPong || (FluffyPong = {})); //namespace
//# sourceMappingURL=WallRightHole.js.map