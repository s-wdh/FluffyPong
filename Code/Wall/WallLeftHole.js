"use strict";
var FluffyPong;
(function (FluffyPong) {
    class WallLeftHole extends FluffyPong.Wall {
        constructor(_position) {
            super(_position);
        }
        draw() {
            FluffyPong.crc2.save();
            //Border Left Hole
            FluffyPong.crc2.beginPath();
            FluffyPong.crc2.fillStyle = "#999999";
            FluffyPong.holeLeftHeight1 = FluffyPong.fluffyHeight + Math.random() * (FluffyPong.fluffyHeight / 2) + 2;
            //first hole should be in the upper half of the canvas
            FluffyPong.holeLeftPosition1 = FluffyPong.borderWidth + Math.floor(Math.random() * ((FluffyPong.canvasHeight / 2) - FluffyPong.holeLeftHeight1 - (FluffyPong.borderWidth * 2)));
            FluffyPong.crc2.fillRect(this.position.x, FluffyPong.holeLeftPosition1, FluffyPong.borderWidth, FluffyPong.holeLeftHeight1);
            FluffyPong.holeLeftHeight2 = FluffyPong.fluffyHeight + Math.random() * (FluffyPong.fluffyHeight / 2) + 2;
            //second hole should be below hole 1
            FluffyPong.holeLeftPosition2 = (FluffyPong.canvasHeight / 2) + Math.floor(Math.random() * ((FluffyPong.canvasHeight / 2) - FluffyPong.holeLeftHeight2 - FluffyPong.borderWidth));
            FluffyPong.crc2.fillRect(this.position.x, FluffyPong.holeLeftPosition2, FluffyPong.borderWidth, FluffyPong.holeLeftHeight2);
            FluffyPong.crc2.closePath();
            FluffyPong.crc2.restore();
        }
    }
    FluffyPong.WallLeftHole = WallLeftHole;
})(FluffyPong || (FluffyPong = {})); //namespace
//# sourceMappingURL=WallLeftHole.js.map