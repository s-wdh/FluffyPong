"use strict";
var FluffyPong_Img;
(function (FluffyPong_Img) {
    class WallLeftHole extends FluffyPong_Img.Wall {
        constructor(_position) {
            super(_position);
        }
        draw() {
            FluffyPong_Img.crc2.save();
            //Border Left Hole
            FluffyPong_Img.crc2.beginPath();
            FluffyPong_Img.crc2.fillStyle = "#999999";
            FluffyPong_Img.holeLeftHeight1 = FluffyPong_Img.fluffyHeight + Math.random() * (FluffyPong_Img.fluffyHeight / 2) + 2;
            //first hole should be in the upper half of the canvas
            FluffyPong_Img.holeLeftPosition1 = FluffyPong_Img.borderWidth + Math.floor(Math.random() * ((FluffyPong_Img.canvasHeight / 2) - FluffyPong_Img.holeLeftHeight1 - (FluffyPong_Img.borderWidth * 2)));
            FluffyPong_Img.crc2.fillRect(this.position.x, FluffyPong_Img.holeLeftPosition1, FluffyPong_Img.borderWidth, FluffyPong_Img.holeLeftHeight1);
            FluffyPong_Img.holeLeftHeight2 = FluffyPong_Img.fluffyHeight + Math.random() * (FluffyPong_Img.fluffyHeight / 2) + 2;
            //second hole should be below hole 1
            FluffyPong_Img.holeLeftPosition2 = (FluffyPong_Img.canvasHeight / 2) + Math.floor(Math.random() * ((FluffyPong_Img.canvasHeight / 2) - FluffyPong_Img.holeLeftHeight2 - FluffyPong_Img.borderWidth));
            FluffyPong_Img.crc2.fillRect(this.position.x, FluffyPong_Img.holeLeftPosition2, FluffyPong_Img.borderWidth, FluffyPong_Img.holeLeftHeight2);
            FluffyPong_Img.crc2.closePath();
            FluffyPong_Img.crc2.restore();
        }
    }
    FluffyPong_Img.WallLeftHole = WallLeftHole;
})(FluffyPong_Img || (FluffyPong_Img = {})); //namespace
//# sourceMappingURL=WallLeftHole.js.map