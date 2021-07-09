namespace FluffyPong_Img {
    export let holeRightHeight1: number;
    export let holeRightPosition1: number;
    export let holeRightHeight2: number;
    export let holeRightPosition2: number;
    
    export class WallRightHole extends Wall {
        constructor(_position: Vector) {
            super(_position);
        }

        draw(): void {
            crc2.save();
            //Border Right Hole
            crc2.beginPath();
            crc2.fillStyle = "#999999";
            holeRightHeight1 = (fluffyHeight * 1.5) + Math.random() * (fluffyHeight / 2);
            //first hole should be in the upper half of the canvas
            holeRightPosition1 = borderWidth + Math.floor(Math.random() * ((canvasHeight / 2) - holeRightHeight1 - (borderWidth * 2)));
            crc2.fillRect(this.position.x, holeRightPosition1, borderWidth, holeRightHeight1);
            holeRightHeight2 = (fluffyHeight * 1.5) + Math.random() * (fluffyHeight / 2);
            //second hole should be below hole 1
            holeRightPosition2 = (canvasHeight / 2) + Math.floor(Math.random() * ((canvasHeight / 2) - holeRightHeight2 - borderWidth));
            crc2.fillRect(this.position.x, holeRightPosition2, borderWidth, holeRightHeight2);
            crc2.closePath();
            crc2.restore();
        }
    }
} //namespace