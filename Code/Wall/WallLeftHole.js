"use strict";
var FluffyPong;
(function (FluffyPong) {
    class WallLeftHole extends FluffyPong.Wall {
        constructor(_position) {
            super(_position);
        }
        draw() {
            FluffyPong.crc2.save();
            //Border Left
            FluffyPong.crc2.beginPath();
            FluffyPong.crc2.fillStyle = "#999999";
            for (let index = 0; index < 2; index++) {
                let holeLeftHeight = FluffyPong.fluffyHeight + Math.random() * (FluffyPong.fluffyHeight / 2);
                let holeLeftPosition = FluffyPong.borderWidth + Math.floor(Math.random() * (FluffyPong.canvasHeight - holeLeftHeight - (FluffyPong.borderWidth * 2)));
                FluffyPong.crc2.fillRect(this.position.x, holeLeftPosition, FluffyPong.borderWidth, holeLeftHeight);
            }
            FluffyPong.crc2.closePath();
            FluffyPong.crc2.restore();
        }
    }
    FluffyPong.WallLeftHole = WallLeftHole;
})(FluffyPong || (FluffyPong = {})); //namespace
//# sourceMappingURL=WallLeftHole.js.map