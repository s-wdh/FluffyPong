namespace FluffyPong {
    //window.addEventListener("load", handleLoad);

    export let crc2: CanvasRenderingContext2D;

    export let borderWidth: number;
    export let canvasWidth: number;
    export let canvasHeight: number;
    export let fluffyScaleFactor: number;

    export let fluffyWidth: number = 80;
    export let fluffyHeight: number = 68;

    // save wall colors, so they stay the same when window is resized
    let wallTopColor: string;
    let wallRightColor: string;
    let wallBottomColor: string;
    let wallLeftColor: string;

    export let imgData: ImageData;

    export function prepareCanvas(): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        wallColors();
        canvasSize();
        window.addEventListener("resize", canvasSize);
        createFluffyPosition(canvas);
        //canvas.addEventListener("mousedown", sendFluffy);
        canvas.addEventListener("touchstart", moveFluffyStart, false);
        canvas.addEventListener("touchmove", moveFluffy, false);
        canvas.addEventListener("touchend", moveFluffyEnd, false);
        canvas.addEventListener("touchcancel", moveFluffyEnd, false);
        canvas.addEventListener("mousedown", moveFluffyStart, false);
        canvas.addEventListener("mousemove", moveFluffy, false);
        canvas.addEventListener("mouseup", moveFluffyEnd, false);
        canvas.addEventListener("mouseout", moveFluffyEnd, false);
        window.setInterval(animation, 30);
        //window.requestAnimationFrame(animation);
    }

    function canvasSize(): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;

        let screenWidth: number = window.innerWidth;
        let screenHeight: number = window.innerHeight;
        if ((screenHeight / screenWidth) == 1.5) {
            canvas.height = screenHeight;
            canvas.width = screenWidth;
        } else if ((screenHeight / screenWidth) < 1.5) {
            canvas.height = screenHeight;
            canvas.width = (2 / 3) * screenHeight;
        } else if ((screenHeight / screenWidth) > 1.5) {
            canvas.width = screenWidth;
            canvas.height = 1.5 * screenWidth;
        }
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
        fluffyScaleFactor = canvas.width / 400;
        fluffyWidth = fluffyScaleFactor * 80;
        fluffyHeight = fluffyScaleFactor * 68;
        createBackground();
        createWalls();
    }


    function createBackground(): void {
        crc2.restore();
        crc2.fillStyle = "#cccccc";
        crc2.fillRect(0, 0, canvasWidth, canvasHeight);
        crc2.fill();
    }

    function wallColors(): void {
        let color: string[] = ["#b3ecff", "#cfffb3", "#ffffb3", "#ffb3d1"];
        for (let index: number = 0; index < 4; index++) {
            let wallColor: string = color[Math.floor(Math.random() * color.length)].toString();
            switch (index) {
                case 0:
                    wallTopColor = wallColor;
                    break;
                case 1:
                    wallRightColor = wallColor;
                    break;
                case 2:
                    wallBottomColor = wallColor;
                    break;
                case 3:
                    wallLeftColor = wallColor;
                    break;
            }
            color.splice(color.indexOf(wallColor), 1);
        }
    }

    function createWalls(): void {
        borderWidth = canvasHeight / 100 * 5;
        console.log("borderwidth:", borderWidth);
        for (let index: number = 0; index < 4; index++) {
            switch (index) {
                case 0: {
                    //Border Top
                    let x: number = 0;
                    let y: number = 0;
                    let position: Vector = new Vector(x, y);
                    let wall: Wall = new Wall(position);
                    wall.generateColor(wallTopColor);
                    wall.draw(index);
                    walls.push(wall);
                    break;
                }
                case 1: {
                    //Border Right
                    let x: number = (canvasWidth - borderWidth);
                    let y: number = 0;
                    let position: Vector = new Vector(x, y);
                    let wall: Wall = new Wall(position);
                    wall.generateColor(wallRightColor);
                    wall.draw(index);
                    walls.push(wall);
                    break;
                }
                case 2: {
                    //Border Bottom
                    let x: number = 0;
                    let y: number = (canvasHeight - borderWidth);
                    let position: Vector = new Vector(x, y);
                    let wall: Wall = new Wall(position);
                    wall.generateColor(wallBottomColor);
                    wall.draw(index);
                    walls.push(wall);
                    break;
                }
                case 3: {
                    //Border Left
                    let x: number = 0;
                    let y: number = 0;
                    let position: Vector = new Vector(x, y);
                    let wall: Wall = new Wall(position);
                    wall.generateColor(wallLeftColor);
                    wall.draw(index);
                    walls.push(wall);
                    break;
                }
            }
        }
        imgData = crc2.getImageData(0, 0, canvasWidth, canvasHeight);
    }

    export function createFluffyPosition(_canvas: HTMLCanvasElement): void {
        let amount: number = 7 + Math.floor(Math.random() * 5);
        console.log(amount);
        for (let index: number = 0; index < amount; index++) {
            let x: number = 80 + (Math.random() * (_canvas.width - 160));
            let y: number = 68 + (Math.random() * (_canvas.height - 136));
            let position: Vector = new Vector(x, y);
            let fluffy: FluffyElement = new FluffyElement(position);
            fluffy.generateColor();
            fluffy.draw();
            fluffies.push(fluffy);
        }
    }

    function animation(): void {
        crc2.putImageData(imgData, 0, 0);

        //window.requestAnimationFrame(animation);

        for (let fluffy of fluffies) {
            fluffy.animation();
            fluffy.draw();
        }
    }
} //namespace