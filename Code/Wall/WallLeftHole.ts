namespace FluffyPong {
    export class WallLeftHole extends Wall {
        constructor(_position: Vector) {
            super(_position);
        }

        draw(): void {
            crc2.save();
            //Border Left Hole
            crc2.beginPath();
            crc2.fillStyle = "#999999";
            for (let index: number = 0; index < 2; index++) {
                let holeLeftHeight: number = fluffyHeight + Math.random() * (fluffyHeight / 2);
                let holeLeftPosition: number = borderWidth + Math.floor(Math.random() * (canvasHeight - holeLeftHeight - (borderWidth * 2)));
                crc2.fillRect(this.position.x, holeLeftPosition, borderWidth, holeLeftHeight);
            }
            crc2.closePath();
            crc2.restore();
        }
    }
} //namespace