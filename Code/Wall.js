"use strict";
var FluffyPong;
(function (FluffyPong) {
    class Wall {
        constructor(_position) {
            this.position = _position;
        }
        generateColor(_color) {
            this.color = _color;
            if (this.color == "#b3ecff") {
                this.colorenum = FluffyPong.COLOR.BLUE;
            }
            else if (this.color == "#cfffb3") {
                this.colorenum = FluffyPong.COLOR.GREEN;
            }
            else if (this.color == "#ffffb3") {
                this.colorenum = FluffyPong.COLOR.YELLOW;
            }
            else if (this.color == "#ffb3d1") {
                this.colorenum = FluffyPong.COLOR.RED;
            }
            /*
            Blau: #b3ecff
            Grün: #cfffb3
            Gelb: #ffffb3
            Rot: #ffb3d1
            */
        }
        draw(_index) {
            FluffyPong.crc2.save();
            switch (_index) {
                case 0: {
                    //Border Top
                    FluffyPong.crc2.beginPath();
                    FluffyPong.crc2.fillStyle = this.color;
                    FluffyPong.crc2.fillRect(this.position.x, this.position.y, FluffyPong.canvasWidth, FluffyPong.borderWidth);
                    let holeTopWidth = FluffyPong.fluffyWidth + Math.random() * (FluffyPong.fluffyWidth / 2);
                    let holeTopPosition = FluffyPong.borderWidth + Math.floor(Math.random() * (FluffyPong.canvasWidth - holeTopWidth - (FluffyPong.borderWidth * 2)));
                    FluffyPong.crc2.clearRect(holeTopPosition, this.position.y, holeTopWidth, FluffyPong.borderWidth);
                    FluffyPong.crc2.closePath();
                    break;
                }
                case 1: {
                    //Border Right
                    FluffyPong.crc2.beginPath();
                    FluffyPong.crc2.fillStyle = this.color;
                    FluffyPong.crc2.fillRect(this.position.x, this.position.y, FluffyPong.borderWidth, FluffyPong.canvasHeight);
                    for (let index = 0; index < 2; index++) {
                        let holeRightHeight = FluffyPong.fluffyHeight + Math.random() * (FluffyPong.fluffyHeight / 2);
                        let holeRightPosition = FluffyPong.borderWidth + Math.floor(Math.random() * (FluffyPong.canvasHeight - holeRightHeight - (FluffyPong.borderWidth * 2)));
                        FluffyPong.crc2.clearRect(this.position.x, holeRightPosition, FluffyPong.borderWidth, holeRightHeight);
                    }
                    FluffyPong.crc2.closePath();
                    break;
                }
                case 2: {
                    //Border Bottom
                    FluffyPong.crc2.beginPath();
                    FluffyPong.crc2.fillStyle = this.color;
                    FluffyPong.crc2.fillRect(this.position.x, this.position.y, FluffyPong.canvasWidth, FluffyPong.borderWidth);
                    let holeBottomWidth = FluffyPong.fluffyWidth + Math.random() * (FluffyPong.fluffyWidth / 2);
                    let holeBottomPosition = FluffyPong.borderWidth + Math.floor(Math.random() * (FluffyPong.canvasWidth - holeBottomWidth - (FluffyPong.borderWidth * 2)));
                    FluffyPong.crc2.clearRect(holeBottomPosition, this.position.y, holeBottomWidth, FluffyPong.borderWidth);
                    FluffyPong.crc2.closePath();
                    break;
                }
                case 3: {
                    //Border Left
                    FluffyPong.crc2.beginPath();
                    FluffyPong.crc2.fillStyle = this.color;
                    FluffyPong.crc2.fillRect(this.position.x, this.position.y, FluffyPong.borderWidth, FluffyPong.canvasHeight);
                    for (let index = 0; index < 2; index++) {
                        let holeLeftHeight = FluffyPong.fluffyHeight + Math.random() * (FluffyPong.fluffyHeight / 2);
                        let holeLeftPosition = FluffyPong.borderWidth + Math.floor(Math.random() * (FluffyPong.canvasHeight - holeLeftHeight - (FluffyPong.borderWidth * 2)));
                        FluffyPong.crc2.clearRect(this.position.x, holeLeftPosition, FluffyPong.borderWidth, holeLeftHeight);
                    }
                    FluffyPong.crc2.closePath();
                    break;
                }
            }
            FluffyPong.crc2.restore();
        }
    }
    FluffyPong.Wall = Wall;
})(FluffyPong || (FluffyPong = {})); //namespace
//# sourceMappingURL=Wall.js.map