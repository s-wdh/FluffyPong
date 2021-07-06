namespace FluffyPong {
    export class WallBottomHole extends Wall {
        constructor(_position: Vector) {
            super(_position);
        }

        draw(): void {
            crc2.save();
            //Border Bottom Hole
            crc2.beginPath();
            crc2.fillStyle = "#999999";
            let holeBottomWidth: number = fluffyWidth + Math.random() * (fluffyWidth / 2);
            let holeBottomPosition: number = borderWidth + Math.floor(Math.random() * (canvasWidth - holeBottomWidth - (borderWidth * 2)));
            crc2.fillRect(holeBottomPosition, this.position.y, holeBottomWidth, borderWidth);
            crc2.closePath();
            crc2.restore();
        }
    }
} //namespace