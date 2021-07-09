"use strict";
var FluffyPong_Path;
(function (FluffyPong_Path) {
    class WallRightHole extends FluffyPong_Path.Wall {
        constructor(_position) {
            super(_position);
        }
        draw() {
            FluffyPong_Path.crc2.save();
            //Border Right Hole
            FluffyPong_Path.crc2.beginPath();
            FluffyPong_Path.crc2.fillStyle = "#999999";
            FluffyPong_Path.holeRightHeight1 = FluffyPong_Path.fluffyHeight + Math.random() * (FluffyPong_Path.fluffyHeight / 2) + 2;
            //first hole should be in the upper half of the canvas
            FluffyPong_Path.holeRightPosition1 = FluffyPong_Path.borderWidth + Math.floor(Math.random() * ((FluffyPong_Path.canvasHeight / 2) - FluffyPong_Path.holeRightHeight1 - (FluffyPong_Path.borderWidth * 2)));
            FluffyPong_Path.crc2.fillRect(this.position.x, FluffyPong_Path.holeRightPosition1, FluffyPong_Path.borderWidth, FluffyPong_Path.holeRightHeight1);
            FluffyPong_Path.holeRightHeight2 = FluffyPong_Path.fluffyHeight + Math.random() * (FluffyPong_Path.fluffyHeight / 2) + 2;
            //second hole should be below hole 1
            FluffyPong_Path.holeRightPosition2 = (FluffyPong_Path.canvasHeight / 2) + Math.floor(Math.random() * ((FluffyPong_Path.canvasHeight / 2) - FluffyPong_Path.holeRightHeight2 - FluffyPong_Path.borderWidth));
            FluffyPong_Path.crc2.fillRect(this.position.x, FluffyPong_Path.holeRightPosition2, FluffyPong_Path.borderWidth, FluffyPong_Path.holeRightHeight2);
            FluffyPong_Path.crc2.closePath();
            FluffyPong_Path.crc2.restore();
        }
    }
    FluffyPong_Path.WallRightHole = WallRightHole;
})(FluffyPong_Path || (FluffyPong_Path = {})); //namespace
//# sourceMappingURL=WallRightHole.js.map