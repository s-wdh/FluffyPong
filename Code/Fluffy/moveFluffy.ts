namespace FluffyPong {
    export let swipe: Boolean = false;
    export let oldPosition: Vector;
    //export let movedFluffy: FluffyElement;
    let movedFluffy: FluffyElement [] = [];
    export let fluffyDirection: Vector;

    export function moveFluffyStart(_event: TouchEvent | MouseEvent): void {
        _event.preventDefault();

        if (swipe == false) {
            let x: number = (_event as TouchEvent).changedTouches ?
                (_event as TouchEvent).changedTouches[0].pageX :
                (_event as MouseEvent).pageX;
            let y: number = (_event as TouchEvent).changedTouches ?
                (_event as TouchEvent).changedTouches[0].pageY :
                (_event as MouseEvent).pageY;
            oldPosition = new Vector(x, y);

            swipe = true;

            for (let element of fluffies) {
                let distance: number = Math.hypot((oldPosition.x - element.position.x), (oldPosition.y - element.position.y));
                if (distance < (fluffyWidth / 2)) {
                    console.log("move Fluffy start");
                    movedFluffy.unshift(element);
                    _event.stopPropagation();
                    break;
                }
            }
        } else {
            return;
        }
    }

    export function moveFluffy(_event: TouchEvent | MouseEvent): void {
        _event.preventDefault();
        if (swipe == true) {
            let x: number = (_event as TouchEvent).changedTouches ?
                (_event as TouchEvent).changedTouches[0].pageX :
                (_event as MouseEvent).pageX;
            let y: number = (_event as TouchEvent).changedTouches ?
                (_event as TouchEvent).changedTouches[0].pageY :
                (_event as MouseEvent).pageY;

            fluffyDirection = new Vector(x, y);
            //fluffyDirection.getDifference(oldPosition, fluffyDirection);

            //let position: Vector = new Vector(movedFluffy.position.x, movedFluffy.position.y);
            if (!movedFluffy[0]) {
                return;
            }
            movedFluffy[0].move(fluffyDirection);
            movedFluffy[0].draw();
            fluffyTroughWall();
        }

        // wenn fluffy durch mauer geht sendFlufrfy in client aufrufen, um ihn an server zu schicken       
    }

    export function moveFluffyEnd(_event: TouchEvent | MouseEvent): void {
        swipe = false;
    }

    export function fluffyTroughWall(): void {
        if (!movedFluffy[0]) {
            return;
        }
        for (let element of wallHoles) {
            if (element instanceof WallLeftHole) {
                if (element.position.x + borderWidth > (movedFluffy[0].position.x - (fluffyWidth / 2) - 1) && movedFluffy[0].color == wallLeftColor) {
                    console.log("passed the left wall");
                    sendFluffy(movedFluffy[0].position.y, "right");

                    fluffies.splice(fluffies.indexOf(movedFluffy[0]), 1);
                    movedFluffy.splice(0, movedFluffy.length);
                }
            } else if (element instanceof WallTopHole) {
                if (element.position.y + borderWidth > (movedFluffy[0].position.y - (fluffyHeight / 2) - 1) && movedFluffy[0].color == wallTopColor) {
                    console.log("passed the top wall");
                    sendFluffy(movedFluffy[0].position.x, "bottom");

                    fluffies.splice(fluffies.indexOf(movedFluffy[0]), 1);
                    movedFluffy.splice(0, movedFluffy.length);
                }
            } else if (element instanceof WallRightHole) {
                if (element.position.x < (movedFluffy[0].position.x + (fluffyWidth / 2) + 1) && movedFluffy[0].color == wallRightColor) {
                    console.log("passed the right wall");
                    sendFluffy(movedFluffy[0].position.y, "left");

                    fluffies.splice(fluffies.indexOf(movedFluffy[0]), 1);
                    movedFluffy.splice(0, movedFluffy.length);
                }
            }
            else if (element instanceof WallBottomHole) {
                if (element.position.y < (movedFluffy[0].position.y + (fluffyHeight / 2) + 1) && movedFluffy[0].color == wallBottomColor) {
                    console.log("passed the bottom wall");
                    sendFluffy(movedFluffy[0].position.x, "top");

                    fluffies.splice(fluffies.indexOf(movedFluffy[0]), 1);
                    movedFluffy.splice(0, movedFluffy.length);
                }
            } else {
                movedFluffy.splice(0, movedFluffy.length);
            }
        }
    }
} //namespace