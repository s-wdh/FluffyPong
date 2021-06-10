namespace FluffyPong {
    //window.addEventListener("load", handleLoad);

    export let crc2: CanvasRenderingContext2D;
    export let fluffyWidth: number = 80;
    export let fluffyHeight: number = 68;

    let wallTopColor: string;
    let wallRightColor: string;
    let wallBottomColor: string;
    let wallLeftColor: string;
    export let border: number;

    export let imgData: ImageData;

    export function prepareCanvas(): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        WallColors();
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
        createBackground(canvas);
        Walls(canvas);
    }


    function createBackground(_canvas: HTMLCanvasElement): void {
        crc2.restore();
        crc2.fillStyle = "#cccccc";
        crc2.fillRect(0, 0, _canvas.width, _canvas.height);
        crc2.fill();
    }

    function WallColors(): void {
        let color: String[] = ["#b3ecff", "#cfffb3", "#ffffb3", "#ffb3d1"];
        wallTopColor = color[Math.floor(Math.random() * color.length)].toString();
        let wallTopIndex: number = color.indexOf(wallTopColor);
        color.splice(wallTopIndex, 1);
        wallRightColor = color[Math.floor(Math.random() * color.length)].toString();
        let wallRightIndex: number = color.indexOf(wallRightColor);
        color.splice(wallRightIndex, 1);
        wallBottomColor = color[Math.floor(Math.random() * color.length)].toString();
        let wallBottomIndex: number = color.indexOf(wallBottomColor);
        color.splice(wallBottomIndex, 1);
        wallLeftColor = color[Math.floor(Math.random() * color.length)].toString();
        let wallLeftIndex: number = color.indexOf(wallLeftColor);
        color.splice(wallLeftIndex, 1);
        console.log(wallTopColor, wallRightColor, wallBottomColor, wallLeftColor);

        canvasSize();
    }

    function Walls(_canvas: HTMLCanvasElement): void {
        border = _canvas.height / 100 * 5;
        console.log("borderwidth:", border);
        //Border Top
        crc2.beginPath();
        crc2.fillStyle = wallTopColor;
        crc2.fillRect(0, 0, _canvas.width, (_canvas.height / 100 * 5));
        let holeTopWidth: number = fluffyWidth + Math.random() * (fluffyWidth / 2);
        let holeTopPosition: number = (_canvas.height / 100 * 5) + Math.floor(Math.random() * (_canvas.width - holeTopWidth - (_canvas.height / 100 * 10)));
        crc2.clearRect(holeTopPosition, 0, holeTopWidth, (_canvas.height / 100 * 5));
        crc2.closePath();

        //Border Right
        crc2.beginPath();
        crc2.fillStyle = wallRightColor;
        crc2.fillRect((_canvas.width - (_canvas.height / 100 * 5)), 0, (_canvas.height / 100 * 5), _canvas.height);
        for (let index: number = 0; index < 2; index++) {
            let holeRightHeight: number = fluffyHeight + Math.random() * (fluffyHeight / 2);
            let holeRightPosition: number = (_canvas.height / 100 * 5) + Math.floor(Math.random() * (_canvas.height - holeRightHeight - (_canvas.height / 100 * 10)));
            crc2.clearRect((_canvas.width - (_canvas.height / 100 * 5)), holeRightPosition, (_canvas.height / 100 * 5), holeRightHeight);
        }
        crc2.closePath();

        //Border Bottom
        crc2.beginPath();
        crc2.fillStyle = wallBottomColor;
        crc2.fillRect(0, (_canvas.height - (_canvas.height / 100 * 5)), _canvas.width, (_canvas.height / 100 * 5));
        let holeBottomWidth: number = fluffyWidth + Math.random() * (fluffyWidth / 2);
        let holeBottomPosition: number = (_canvas.height / 100 * 5) + Math.floor(Math.random() * (_canvas.width - holeBottomWidth - (_canvas.height / 100 * 10)));
        crc2.clearRect(holeBottomPosition, (_canvas.height - (_canvas.height / 100 * 5)), holeBottomWidth, (_canvas.height / 100 * 5));
        crc2.closePath();

        //Border Left
        crc2.beginPath();
        crc2.fillStyle = wallLeftColor;
        crc2.fillRect(0, 0, (_canvas.height / 100 * 5), _canvas.height);
        for (let index: number = 0; index < 2; index++) {
            let holeLeftHeight: number = fluffyHeight + Math.random() * (fluffyHeight / 2);
            let holeLeftPosition: number = (_canvas.height / 100 * 5) + Math.floor(Math.random() * (_canvas.height - holeLeftHeight - (_canvas.height / 100 * 10)));
            crc2.clearRect(0, holeLeftPosition, (_canvas.height / 100 * 5), holeLeftHeight);
        }
        crc2.closePath();

        imgData = crc2.getImageData(0, 0, _canvas.width, _canvas.height);
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
        //console.log("animation");
        crc2.putImageData(imgData, 0, 0);

        for (let fluffy of fluffies) {
            fluffy.animation();
            fluffy.draw();
        }
    }
} //namespace