namespace FluffyPong {
    export let holeLeftHeight1: number;
    export let holeLeftPosition1: number;
    export let holeLeftHeight2: number;
    export let holeLeftPosition2: number;

    export class WallLeftHole extends Wall {
        constructor(_position: Vector) {
            super(_position);
        }

        draw(): void {
            crc2.save();
            //Border Left Hole
            crc2.beginPath();
            crc2.fillStyle = "#999999";
            holeLeftHeight1 = fluffyHeight + Math.random() * (fluffyHeight / 2) + 2;
            //first hole should be in the upper half of the canvas
            holeLeftPosition1 = borderWidth + Math.floor(Math.random() * ((canvasHeight / 2) - holeLeftHeight1 - (borderWidth * 2)));
            crc2.fillRect(this.position.x, holeLeftPosition1, borderWidth, holeLeftHeight1);
            holeLeftHeight2 = fluffyHeight + Math.random() * (fluffyHeight / 2) + 2;
            //second hole should be below hole 1
            holeLeftPosition2 = (canvasHeight / 2) + Math.floor(Math.random() * ((canvasHeight / 2) - holeLeftHeight2 - borderWidth));
            crc2.fillRect(this.position.x, holeLeftPosition2, borderWidth, holeLeftHeight2);
            crc2.closePath();
            crc2.restore();
        }
    }
} //namespace