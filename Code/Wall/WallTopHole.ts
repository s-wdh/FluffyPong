namespace FluffyPong {
    export class WallTopHole extends Wall {
        constructor(_position: Vector) {
            super(_position);
        }

        draw(): void {
            crc2.save();
            //Border Top
            crc2.beginPath();
            crc2.fillStyle = "#999999";
            let holeTopWidth: number = fluffyWidth + Math.random() * (fluffyWidth / 2);
            let holeTopPosition: number = borderWidth + Math.floor(Math.random() * (canvasWidth - holeTopWidth - (borderWidth * 2)));
            crc2.fillRect(holeTopPosition, this.position.y, holeTopWidth, borderWidth);
            crc2.closePath();
            crc2.restore();
        }
    }
} //namespace