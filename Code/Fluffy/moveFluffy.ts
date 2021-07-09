namespace FluffyPong {
    export let swipe: Boolean = false;
    export let oldPosition: Vector;                         //to save the old Position of the swiped fluffy
    export let movedFluffy: FluffyElement[] = [];          //array for fluffy that is swiped currently
    export let fluffyDirection: Vector;                     //direction in which fluffy is swiped

    //start of the swipe of a fluffy
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
                    //console.log("move Fluffy start");
                    movedFluffy.unshift(element);
                    _event.stopPropagation();
                    break;
                }
            }
        } else {
            return;
        }
    }

    //move the fluffy to the position of the finger/mouse
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
    }

    //function for the end of the swipe
    export function moveFluffyEnd(_event: TouchEvent | MouseEvent): void {
        swipe = false;
    }

    //check if the fluffy was swiped through a hole in one of the walls or just somewhere else on the canvas
    //send the Fluffy to the server if it went through the hole with the sendFluffy function
    export function fluffyTroughWall(): void {
        if (movedFluffy.length < 0) {
            return;
        } else {
            //check if the fluffy was swiped inside of a hole
            for (let element of wallHoles) {
                //if yes, then check if the fluffy has the same color than the wall
                if (element instanceof WallLeftHole) {
                    //if yes, send the fluffy to the server and delete it in this players fluffies array
                    if (element.position.x + borderWidth > (movedFluffy[0].position.x)) {
                        if (movedFluffy[0].color == wallLeftColor) {
                            console.log("passed the left wall");
                            sendFluffy(movedFluffy[0].position.y, "right");
                            swipe = false;

                            fluffies.splice(fluffies.indexOf(movedFluffy[0]), 1);
                            movedFluffy.splice(0, movedFluffy.length);
                        } else { //if no, make the fluffy jump back inside the wall
                            movedFluffy[0].position.x = borderWidth + (fluffyWidth / 2);
                        }
                    }
                //and now the same for the other three walls
                } else if (element instanceof WallTopHole) {
                    if (element.position.y + borderWidth > (movedFluffy[0].position.y)) {
                        if (movedFluffy[0].color == wallTopColor) {
                            console.log("passed the top wall");
                            sendFluffy(movedFluffy[0].position.x, "bottom");
                            swipe = false;

                            fluffies.splice(fluffies.indexOf(movedFluffy[0]), 1);
                            movedFluffy.splice(0, movedFluffy.length);
                        } else {
                            movedFluffy[0].position.y = borderWidth + (fluffyHeight / 2);
                        }
                    }
                } else if (element instanceof WallRightHole) {
                    if (element.position.x < (movedFluffy[0].position.x)) {
                        if (movedFluffy[0].color == wallRightColor) {
                            console.log("passed the right wall");
                            sendFluffy(movedFluffy[0].position.y, "left");
                            swipe = false;

                            fluffies.splice(fluffies.indexOf(movedFluffy[0]), 1);
                            movedFluffy.splice(0, movedFluffy.length);
                        } else {
                            movedFluffy[0].position.x = canvasWidth - borderWidth - (fluffyWidth / 2);
                        }
                    }
                } else if (element instanceof WallBottomHole) {
                    if (element.position.y < (movedFluffy[0].position.y)) {
                        if (movedFluffy[0].color == wallBottomColor) {
                            console.log("passed the bottom wall");
                            sendFluffy(movedFluffy[0].position.x, "top");
                            swipe = false;

                            fluffies.splice(fluffies.indexOf(movedFluffy[0]), 1);
                            movedFluffy.splice(0, movedFluffy.length);
                        } else {
                            movedFluffy[0].position.y = canvasHeight - borderWidth - (fluffyHeight / 2);
                        }
                    }
                } else {  //if something went wrong with the holes
                    console.log("delete");
                    movedFluffy.splice(0, movedFluffy.length);
                }
            }
        }

    }
} //namespace