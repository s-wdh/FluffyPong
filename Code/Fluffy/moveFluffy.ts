namespace FluffyPong {
    export let swipe: Boolean = false;
    export let oldPosition: Vector;
    export let movedFluffy: FluffyElement;
    export let fluffyDirection: Vector;

    export function moveFluffyStart(_event: TouchEvent | MouseEvent): void {
        _event.preventDefault();
        let x: number = (_event as TouchEvent).changedTouches ?
            (_event as TouchEvent).changedTouches[0].pageX :
            (_event as MouseEvent).pageX;
        let y: number = (_event as TouchEvent).changedTouches ?
            (_event as TouchEvent).changedTouches[0].pageY :
            (_event as MouseEvent).pageY;
        oldPosition = new Vector(x, y);

        swipe = true;

        for (let element of fluffies) {
            if (element.position.x - (fluffyWidth / 2) < x && element.position.y - (fluffyHeight / 2) < y && element.position.x + (fluffyWidth / 2) > x && element.position.y + (fluffyHeight / 2) > y) {
                console.log("move Fluffy start");
                movedFluffy = element;
                break;
            }
        }
    }

    export function moveFluffy(_event: TouchEvent | MouseEvent): void {
        _event.preventDefault();
        if (swipe) {
            let x: number = (_event as TouchEvent).changedTouches ?
                (_event as TouchEvent).changedTouches[0].pageX :
                (_event as MouseEvent).pageX;
            let y: number = (_event as TouchEvent).changedTouches ?
                (_event as TouchEvent).changedTouches[0].pageY :
                (_event as MouseEvent).pageY;

            fluffyDirection = new Vector(x, y);
            fluffyDirection.getDifference(oldPosition, fluffyDirection);

            let position: Vector = new Vector(movedFluffy.position.x, movedFluffy.position.y);
            for (let element of walls) {
                if (element.position.x + borderWidth > position.x - (fluffyWidth / 2) && movedFluffy.colorenum == element.colorenum) {
                    movedFluffy.move(fluffyDirection);
                    movedFluffy.draw();
                    console.log("passed the left wall");
                    sendFluffy(movedFluffy, "right");

                    fluffies.splice(fluffies.indexOf(movedFluffy), 1);
                    /* crc2.putImageData(imgData, 0, 0);
                    for (let fluffy of fluffies) {
                        fluffy.draw();
                    } */
                } else if (element.position.y + borderWidth > position.y - (fluffyHeight / 2) && movedFluffy.colorenum == element.colorenum) {
                    movedFluffy.move(fluffyDirection);
                    movedFluffy.draw();
                    console.log("passed the top wall");
                    sendFluffy(movedFluffy, "bottom");

                    fluffies.splice(fluffies.indexOf(movedFluffy), 1);
                    /* crc2.putImageData(imgData, 0, 0);
                    for (let fluffy of fluffies) {
                        fluffy.draw();
                    } */
                } else if (position.x < position.x + (fluffyWidth / 2) && movedFluffy.colorenum == element.colorenum) {
                    movedFluffy.move(fluffyDirection);
                    movedFluffy.draw();
                    console.log("passed the right wall");
                    sendFluffy(movedFluffy, "left");

                    fluffies.splice(fluffies.indexOf(movedFluffy), 1);
                    /* crc2.putImageData(imgData, 0, 0);
                    for (let fluffy of fluffies) {
                        fluffy.draw();
                    } */
                } else if (position.y < position.y + (fluffyHeight / 2) && movedFluffy.colorenum == element.colorenum) {
                    movedFluffy.move(fluffyDirection);
                    movedFluffy.draw();
                    console.log("passed the bottom wall");
                    sendFluffy(movedFluffy, "top");

                    fluffies.splice(fluffies.indexOf(movedFluffy), 1);
                    /* crc2.putImageData(imgData, 0, 0);
                    for (let fluffy of fluffies) {
                        fluffy.draw();
                    } */
                } else {
                    movedFluffy.move(oldPosition);
                    movedFluffy.draw();
                    /* crc2.putImageData(imgData, 0, 0);
                    for (let fluffy of fluffies) {
                        fluffy.draw();
                    } */
                }
            }
            //fluffyTroughWall();
        }

        // wenn fluffy durch mauer geht sendFlufrfy in client aufrufen, um ihn an server zu schicken       
    }

    export function moveFluffyEnd(_event: TouchEvent | MouseEvent): void {
        swipe = false;
    }

    /* export function fluffyTroughWall(): void {
        let position: Vector = new Vector(movedFluffy.position.x, movedFluffy.position.y);

        for (let element of walls) {
            if (element.position.x + borderWidth > position.x - (fluffyWidth / 2) && movedFluffy.colorenum == element.colorenum) {
                console.log("passed the left wall");
                sendFluffy(movedFluffy, "right");

                fluffies.splice(fluffies.indexOf(movedFluffy), 1);
                crc2.putImageData(imgData, 0, 0);
                for (let fluffy of fluffies) {
                    fluffy.draw();
                }
            } else if (element.position.y + borderWidth > position.y - (fluffyHeight / 2) && movedFluffy.colorenum == element.colorenum) {
                console.log("passed the top wall");
                sendFluffy(movedFluffy, "bottom");

                fluffies.splice(fluffies.indexOf(movedFluffy), 1);
                crc2.putImageData(imgData, 0, 0);
                for (let fluffy of fluffies) {
                    fluffy.draw();
                }
            } else if (position.x < position.x + (fluffyWidth / 2) && movedFluffy.colorenum == element.colorenum) {
                console.log("passed the right wall");
                sendFluffy(movedFluffy, "left");

                fluffies.splice(fluffies.indexOf(movedFluffy), 1);
                crc2.putImageData(imgData, 0, 0);
                for (let fluffy of fluffies) {
                    fluffy.draw();
                }
            } else if (position.y < position.y + (fluffyHeight / 2) && movedFluffy.colorenum == element.colorenum) {
                console.log("passed the bottom wall");
                sendFluffy(movedFluffy, "top");

                fluffies.splice(fluffies.indexOf(movedFluffy), 1);
                crc2.putImageData(imgData, 0, 0);
                for (let fluffy of fluffies) {
                    fluffy.draw();
                }
            } else {
                break;
            } */

    /* if (position.x < (fluffyWidth / 2) && movedFluffy.colorenum == element.colorenum) {
        console.log("passed the left wall");
        sendFluffy(movedFluffy, "right");
    } else if (position.y < (fluffyHeight / 2) && movedFluffy.colorenum == element.colorenum) {
        console.log("passed the top wall");
        sendFluffy(movedFluffy, "bottom");
    } else if (position.x > crc2.canvas.width - (fluffyWidth / 2) && movedFluffy.colorenum == element.colorenum) {
        console.log("passed the right wall");
        sendFluffy(movedFluffy, "left");
    } else if (position.y > crc2.canvas.height - (fluffyHeight / 2) && _movedFluffy.colorenum == element.colorenum) {
        console.log("passed the bottom wall");
        sendFluffy(movedFluffy, "top");
    } else {
        break;
    } */
    //}
    //check if the fluffy passed through a wall


    //}
} //namespace