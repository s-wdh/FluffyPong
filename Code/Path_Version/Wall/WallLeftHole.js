"use strict";
var FluffyPong_Path;
(function (FluffyPong_Path) {
    class WallLeftHole extends FluffyPong_Path.Wall {
        constructor(_position) {
            super(_position);
        }
        draw() {
            FluffyPong_Path.crc2.save();
            //Border Left Hole
            FluffyPong_Path.crc2.beginPath();
            FluffyPong_Path.crc2.fillStyle = "#999999";
            FluffyPong_Path.holeLeftHeight1 = FluffyPong_Path.fluffyHeight + Math.random() * (FluffyPong_Path.fluffyHeight / 2) + 2;
            //first hole should be in the upper half of the canvas
            FluffyPong_Path.holeLeftPosition1 = FluffyPong_Path.borderWidth + Math.floor(Math.random() * ((FluffyPong_Path.canvasHeight / 2) - FluffyPong_Path.holeLeftHeight1 - (FluffyPong_Path.borderWidth * 2)));
            FluffyPong_Path.crc2.fillRect(this.position.x, FluffyPong_Path.holeLeftPosition1, FluffyPong_Path.borderWidth, FluffyPong_Path.holeLeftHeight1);
            FluffyPong_Path.holeLeftHeight2 = FluffyPong_Path.fluffyHeight + Math.random() * (FluffyPong_Path.fluffyHeight / 2) + 2;
            //second hole should be below hole 1
            FluffyPong_Path.holeLeftPosition2 = (FluffyPong_Path.canvasHeight / 2) + Math.floor(Math.random() * ((FluffyPong_Path.canvasHeight / 2) - FluffyPong_Path.holeLeftHeight2 - FluffyPong_Path.borderWidth));
            FluffyPong_Path.crc2.fillRect(this.position.x, FluffyPong_Path.holeLeftPosition2, FluffyPong_Path.borderWidth, FluffyPong_Path.holeLeftHeight2);
            FluffyPong_Path.crc2.closePath();
            FluffyPong_Path.crc2.restore();
        }
    }
    FluffyPong_Path.WallLeftHole = WallLeftHole;
})(FluffyPong_Path || (FluffyPong_Path = {})); //namespace
//# sourceMappingURL=WallLeftHole.js.map