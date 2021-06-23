namespace FluffyPong {
    enum COLOR {
        RED,
        BLUE,
        GREEN,
        YELLOW
    }
    export class FluffyElement {
        position: Vector;
        velocity: Vector;
        color: string;
        colorenum: COLOR;

        constructor(_position: Vector) {
            this.position = _position;
            this.velocity = new Vector(0, 0);
            this.velocity.random(1, 5);
        }

        generateColor(): void {
            let color: String[] = ["#b3ecff", "#cfffb3", "#ffffb3", "#ffb3d1"];
            let fluffyColor: string = color[Math.floor(Math.random() * color.length)].toString();
            this.color = fluffyColor;
            if (this.color == "#b3ecff") {
                this.colorenum = COLOR.BLUE;
            } else if (this.color == "#cfffb3") {
                this.colorenum = COLOR.GREEN;
            } else if (this.color == "#ffffb3") {
                this.colorenum = COLOR.YELLOW;
            } else if (this.color == "#ffb3d1") {
                this.colorenum = COLOR.RED;
            }
            /* 
            Blau: #b3ecff 
            Grün: #cfffb3
            Gelb: #ffffb3
            Rot: #ffb3d1
            */
        }

        draw(): void {
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            // draw fluffy as img -> doesn't work :(
            /* let fluffyRed: HTMLImageElement = document.createElement("img");
            fluffyRed.onload = function (): void {
                crc2.drawImage(fluffyRed, 0, 0, (fluffyScaleFactor * 80), (fluffyScaleFactor * 80));
                console.log(fluffyRed);
            };
            fluffyRed.src = "Fluffy/Pictures/FluffyRed.png"; */

            //draw Fluffy with paths
            crc2.scale(fluffyScaleFactor, (0.8 * fluffyScaleFactor));
            crc2.beginPath();
            crc2.arc(0, 0, 30, 0, 2 * Math.PI);
            crc2.fillStyle = this.color;
            crc2.fill();
            crc2.closePath();

            crc2.beginPath();
            crc2.ellipse(-9, -9, 5, 10, 0, 0, 2 * Math.PI);
            crc2.ellipse(9, -9, 5, 10, 0, 0, 2 * Math.PI);
            crc2.fillStyle = "#000000";
            crc2.fill();
            crc2.closePath();
            crc2.beginPath();
            crc2.arc(-8, -12.5, 2.5, 0, 2 * Math.PI);
            crc2.arc(10, -12.5, 2.5, 0, 2 * Math.PI);
            crc2.fillStyle = "#ffffff";
            crc2.fill();
            crc2.closePath();
            for (let i: number = 0; i < 32; i++) {
                crc2.beginPath();
                crc2.rotate(0.55);
                crc2.moveTo(0, 30);
                crc2.lineTo(3, 40);
                crc2.lineTo(5, 29.5);
                crc2.lineTo(7.5, 35);
                crc2.lineTo(8.5, 28.5);
                crc2.lineTo(13, 37.5);
                crc2.lineTo(12, 27.5);
                crc2.fillStyle = this.color;
                crc2.strokeStyle = "#000000";
                crc2.lineWidth = 0.5;
                crc2.fill();
                crc2.stroke();
                crc2.closePath();
            }
            crc2.restore();
        }

        move(_vector: Vector): Vector {
            this.position = _vector;
            let swipe: Vector = new Vector(_vector.x, _vector.y);
            swipe.scale(0.2);
            this.position.add(swipe);
            return (this.position);
        }

        animation(): void {
            let offset: Vector = new Vector(this.velocity.x, this.velocity.y);
            this.position.add(offset);

            if (this.position.x < (borderWidth + (fluffyWidth / 2)))
                this.velocity.scale(-1);
            if (this.position.y < (borderWidth + (fluffyHeight / 2)))
                this.velocity.scale(-1);
            if (this.position.x > crc2.canvas.width - borderWidth - (fluffyWidth / 2))
                this.velocity.scale(-1);
            if (this.position.y > crc2.canvas.height - borderWidth - (fluffyHeight / 2))
                this.velocity.scale(-1);
        }
    }
} //namespace