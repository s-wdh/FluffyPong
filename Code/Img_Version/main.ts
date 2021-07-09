namespace FluffyPong_Img {
    export let crc2: CanvasRenderingContext2D;

    //save the sizes corresponding to the window size
    export let borderWidth: number;
    export let canvasWidth: number;
    export let canvasHeight: number;
    export let fluffyScaleFactor: number;
    export let fluffyWidth: number;
    export let fluffyHeight: number;

    // save wall colors, so they stay the same when window is resized
    export let wallTopColor: string;
    export let wallRightColor: string;
    export let wallBottomColor: string;
    export let wallLeftColor: string;

    //array of the fluffy images
    export let images: HTMLImageElement[] = [];

    export let imgData: ImageData;

    //prepare Canvas for the game and add all needed EventListener for the swipe move
    export function prepareCanvas(): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        let fluffyImg: NodeListOf<HTMLImageElement> = document.querySelectorAll(".fluffyImg");
        for (let i: number = 0; i < fluffyImg.length; i++) {
            images.push(fluffyImg[i]);
        }

        wallColors();
        canvasSize();
        window.addEventListener("resize", canvasSize);
        createFluffyPosition(canvas);
        //touch listener
        canvas.addEventListener("touchstart", moveFluffyStart, false);
        canvas.addEventListener("touchmove", moveFluffy, false);
        canvas.addEventListener("touchend", moveFluffyEnd, false);
        canvas.addEventListener("touchcancel", moveFluffyEnd, false);
        //mouse listener, so it's also playable on the computer
        canvas.addEventListener("mousedown", moveFluffyStart, false);
        canvas.addEventListener("mousemove", moveFluffy, false);
        canvas.addEventListener("mouseup", moveFluffyEnd, false);
        canvas.addEventListener("mouseout", moveFluffyEnd, false);
        window.setInterval(animation, 30);
        //window.requestAnimationFrame(animation);
    }

    //calculate the canvas size adapted to the screen size in a 2:3 ratio 
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
        //and save those sizes, 'cause we need them several times to calculate stuff
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
        fluffyScaleFactor = canvas.width / 400;
        fluffyWidth = fluffyScaleFactor * 80;
        fluffyHeight = fluffyScaleFactor * 56.6;
        createBackground();
        createWalls();
    }


    //color the canvas in some middle-grey
    function createBackground(): void {
        crc2.restore();
        crc2.fillStyle = "#cccccc";
        crc2.fillRect(0, 0, canvasWidth, canvasHeight);
        crc2.fill();
    }

    //define the wall Colors random, so every player and game round they are different
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

    //draw the walls and the holes in the walls onto the canvas
    function createWalls(): void {
        borderWidth = canvasHeight / 100 * 5;   //calculate the width of the border as 5% of the heigth of the canvas
        //console.log("borderwidth:", borderWidth);
        for (let index: number = 0; index < 4; index++) {
            switch (index) {
                case 0: {
                    //Border Top
                    let x: number = 0;
                    let y: number = 0;
                    let position: Vector = new Vector(x, y);
                    let wall: Wall = new Wall(position);
                    wall.draw(index);
                    walls.push(wall);
                    let hole: WallTopHole = new WallTopHole(position);
                    hole.draw();
                    wallHoles.push(hole);
                    break;
                }
                case 1: {
                    //Border Right
                    let x: number = (canvasWidth - borderWidth);
                    let y: number = 0;
                    let position: Vector = new Vector(x, y);
                    let wall: Wall = new Wall(position);
                    wall.draw(index);
                    walls.push(wall);
                    let hole: WallRightHole = new WallRightHole(position);
                    hole.draw();
                    wallHoles.push(hole);
                    break;
                }
                case 2: {
                    //Border Bottom
                    let x: number = 0;
                    let y: number = (canvasHeight - borderWidth);
                    let position: Vector = new Vector(x, y);
                    let wall: Wall = new Wall(position);
                    wall.draw(index);
                    walls.push(wall);
                    let hole: WallBottomHole = new WallBottomHole(position);
                    hole.draw();
                    wallHoles.push(hole);
                    break;
                }
                case 3: {
                    //Border Left
                    let x: number = 0;
                    let y: number = 0;
                    let position: Vector = new Vector(x, y);
                    let wall: Wall = new Wall(position);
                    wall.draw(index);
                    walls.push(wall);
                    let hole: WallLeftHole = new WallLeftHole(position);
                    hole.draw();
                    wallHoles.push(hole);
                    break;
                }
            }
        }
        imgData = crc2.getImageData(0, 0, canvasWidth, canvasHeight);
    }

    //draw a random amount between 7 and 12 of fluffies on some random positions within the walls onto the canvas
    //every fluffy gets a random color of the four defined colors
    export function createFluffyPosition(_canvas: HTMLCanvasElement): void {
        let amount: number = 7 + Math.floor(Math.random() * 5);
        console.log("fluffy Menge: " + amount);
        for (let index: number = 0; index < amount; index++) {
            //calculation, that fluffies are drawn on random positions within the walls onto the canvas
            let x: number = borderWidth + 1 + (Math.random() * (_canvas.width - (borderWidth * 2) - fluffyWidth - 2));
            let y: number = borderWidth + 1 + (Math.random() * (_canvas.height - (borderWidth * 2) - fluffyHeight - 2));
            let position: Vector = new Vector(x, y);
            let fluffy: FluffyElement = new FluffyElement(position);
            fluffy.generateColor();
            fluffy.draw();
            //sort in unshift, so the fluffy on top is also the first one which is grabbed while swiping
            fluffies.unshift(fluffy);
        }
    }

    //animate the fluffies so they scurry around on the canvas
    function animation(): void {
        crc2.putImageData(imgData, 0, 0);
        //window.requestAnimationFrame(animation);

        for (let fluffy of fluffies) {
            fluffy.animation();
            fluffy.draw();
        }
    }
} //namespace