namespace FluffyPong {
    export class WallRightHole extends Wall {
        constructor(_position: Vector) {
            super(_position);
        }

        draw(): void {
            crc2.save();
            //Border Right
            crc2.beginPath();
            crc2.fillStyle = "#999999";
            for (let index: number = 0; index < 2; index++) {
                let holeRightHeight: number = fluffyHeight + Math.random() * (fluffyHeight / 2);
                let holeRightPosition: number = borderWidth + Math.floor(Math.random() * (canvasHeight - holeRightHeight - (borderWidth * 2)));
                crc2.fillRect(this.position.x, holeRightPosition, borderWidth, holeRightHeight);
            }
            crc2.closePath();
            crc2.restore();
        }
    }
} //namespace