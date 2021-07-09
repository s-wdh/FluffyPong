namespace FluffyPong_Img {
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
                //check if the x position of the event is on a fluffy
                if (oldPosition.x > element.position.x && oldPosition.x < (element.position.x + fluffyWidth)) {
                    // and then for the y position as well
                    if (oldPosition.y > element.position.y && oldPosition.y < (element.position.y + fluffyHeight)) {
                        movedFluffy.unshift(element);
                        _event.stopPropagation();
                        break;
                    }
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

            fluffyDirection = new Vector((x - (fluffyWidth / 2)), (y - (fluffyHeight / 2)));
            if (movedFluffy.length < 1) {
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
        movedFluffy.splice(0, movedFluffy.length);
    }

    //check if the fluffy was swiped through a hole in one of the walls or just somewhere else on the canvas
    //send the Fluffy to the server if it went through the hole with the sendFluffy function
    export function fluffyTroughWall(): void {
        if (movedFluffy.length < 1) {
            return;
        } else {
            for (let element of wallHoles) {
                if (element instanceof WallLeftHole) {
                    if (!movedFluffy[0]) {
                        return;
                    }
                    //check if the fluffy was swiped inside of a hole
                    if (element.position.x + (borderWidth / 4) > (movedFluffy[0].position.x)) {
                        //if yes, then check if the fluffy has the same color than the wall
                        if (movedFluffy[0].color == wallLeftColor) {
                            swipe = false;
                            //if yes, send the fluffy to the server and delete it in this players fluffies array
                            console.log("passed the left wall");
                            sendFluffy(movedFluffy[0].position.y, "right");

                            fluffies.splice(fluffies.indexOf(movedFluffy[0]), 1);
                            movedFluffy.splice(0, movedFluffy.length);
                        } else { //if no, make the fluffy jump back inside the wall
                            movedFluffy[0].position.x = borderWidth + 1;
                        }
                    }
                    //and now the same for the other three walls
                } else if (element instanceof WallTopHole) {
                    if (!movedFluffy[0]) {  //muss hier erneut erfolgen, da ansonsten Fehlermeldungen der Position kommen
                        return;
                    }
                    if (element.position.y + (borderWidth / 4) > (movedFluffy[0].position.y)) {
                        if (movedFluffy[0].color == wallTopColor) {
                            swipe = false;
                            console.log("passed the top wall");
                            sendFluffy(movedFluffy[0].position.x, "bottom");

                            fluffies.splice(fluffies.indexOf(movedFluffy[0]), 1);
                            movedFluffy.splice(0, movedFluffy.length);
                        } else {
                            movedFluffy[0].position.y = borderWidth + 1;
                        }
                    }
                } else if (element instanceof WallRightHole) {
                    if (!movedFluffy[0]) {
                        return;
                    }
                    if (element.position.x + (borderWidth / 4) < (movedFluffy[0].position.x + fluffyWidth)) {
                        if (movedFluffy[0].color == wallRightColor) {
                            swipe = false;
                            console.log("passed the right wall");
                            sendFluffy(movedFluffy[0].position.y, "left");

                            fluffies.splice(fluffies.indexOf(movedFluffy[0]), 1);
                            movedFluffy.splice(0, movedFluffy.length);
                        } else {
                            movedFluffy[0].position.x = canvasWidth - borderWidth - fluffyWidth;
                        }
                    }
                } else if (element instanceof WallBottomHole) {
                    if (!movedFluffy[0]) {
                        return;
                    }
                    if (element.position.y + (borderWidth / 4) < (movedFluffy[0].position.y + fluffyHeight)) {
                        if (movedFluffy[0].color == wallBottomColor) {
                            swipe = false;
                            console.log("passed the bottom wall");
                            sendFluffy(movedFluffy[0].position.x, "top");

                            fluffies.splice(fluffies.indexOf(movedFluffy[0]), 1);
                            movedFluffy.splice(0, movedFluffy.length);
                        } else {
                            movedFluffy[0].position.y = canvasHeight - borderWidth - fluffyHeight;
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