namespace FluffyPong_Img {
    export let holeTopWidth: number;
    export let holeTopPosition: number;

    export class WallTopHole extends Wall {
        constructor(_position: Vector) {
            super(_position);
        }

        draw(): void {
            crc2.save();
            //Border Top Hole
            crc2.beginPath();
            crc2.fillStyle = "#999999";
            holeTopWidth = fluffyWidth + Math.random() * (fluffyWidth / 2) + 2;
            holeTopPosition = borderWidth + Math.floor(Math.random() * (canvasWidth - holeTopWidth - (borderWidth * 2)));
            crc2.fillRect(holeTopPosition, this.position.y, holeTopWidth, borderWidth);
            crc2.closePath();
            crc2.restore();
        }
    }
} //namespace