namespace FluffyPong {
    export class FluffyElement {
        position: Vector;
        velocity: Vector;
        color: string;

        constructor(_position: Vector) {
            this.position = _position;
            this.velocity = new Vector(0, 0);
            this.velocity.random(1, 5);
        }

        generateColor(): void {
            let color: String[] = ["#b3ecff", "#cfffb3", "#ffffb3", "#ffb3d1"];
            let fluffyColor: string = color[Math.floor(Math.random() * color.length)].toString();
            this.color = fluffyColor;
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

            crc2.scale(0.5, 0.4);
            crc2.beginPath();
            crc2.arc(0, 0, 60, 0, 2 * Math.PI);
            crc2.fillStyle = this.color;
            crc2.fill();
            crc2.closePath();

            crc2.beginPath();
            crc2.ellipse(-18, -18, 10, 20, 0, 0, 2 * Math.PI);
            crc2.ellipse(18, -18, 10, 20, 0, 0, 2 * Math.PI);
            crc2.fillStyle = "#000000";
            crc2.fill();
            crc2.closePath();
            crc2.beginPath();
            crc2.arc(-16, -25, 5, 0, 2 * Math.PI);
            crc2.arc(20, -25, 5, 0, 2 * Math.PI);
            crc2.fillStyle = "#ffffff";
            crc2.fill();
            crc2.closePath();
            for (let i: number = 0; i < 32; i++) {
                crc2.beginPath();
                crc2.rotate(0.55);
                crc2.moveTo(0, 60);
                crc2.lineTo(6, 80);
                crc2.lineTo(10, 59);
                crc2.lineTo(15, 70);
                crc2.lineTo(17, 57);
                crc2.lineTo(26, 75);
                crc2.lineTo(24, 55);
                crc2.fillStyle = this.color;
                crc2.strokeStyle = "#000000";
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
            return(this.position);
        }

        animation(): void {
            let offset: Vector = new Vector(this.velocity.x, this.velocity.y);
            this.position.add(offset);

            if (this.position.x < (border + (fluffyWidth / 2)))
                this.velocity.scale(-1);
            if (this.position.y < (border + (fluffyHeight / 2)))
                this.velocity.scale(-1);
            if (this.position.x > crc2.canvas.width - border - (fluffyWidth / 2))
                this.velocity.scale(-1);
            if (this.position.y > crc2.canvas.height - border - (fluffyHeight / 2))
                this.velocity.scale(-1);
        }
    }
} //namespace