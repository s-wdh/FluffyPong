namespace FluffyPong {
    export let swipe: Boolean = false;
    export let oldPosition: Vector;                         //to save the old Position of the swiped fluffy
    export let movedFluffy: FluffyElement [] = [];          //array for fluffy that is swiped currently
    export let fluffyDirection: Vector;                     //direction in which fluffy is swiped
    export let anim: NodeJS.Timer;                          //timer variable, so the holeAnimation can be deleted when it's finished

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
        if (!movedFluffy[0]) {
            return;
        }
        
        for (let element of wallHoles) {
            if (element instanceof WallLeftHole) {
                //check if the fluffy is next to the hole, so it is sent to the server. 
                //It's not possible to swipe the fluffy in a hole, because then you could also swipe it in a wall, which shouldn't happen
                if (element.position.x + borderWidth > (movedFluffy[0].position.x - (fluffyWidth / 2) - 1) && movedFluffy[0].color == wallLeftColor) {
                    console.log("passed the left wall");
                    sendFluffy(movedFluffy[0].position.y, "right");

                    anim = setInterval(function anim(): void {
                        movedFluffy[0].holeAnimation("left", 0);
                    },                 30);
                }
            } else if (element instanceof WallTopHole) {
                if (element.position.y + borderWidth > (movedFluffy[0].position.y - (fluffyHeight / 2) - 1) && movedFluffy[0].color == wallTopColor) {
                    console.log("passed the top wall");
                    sendFluffy(movedFluffy[0].position.x, "bottom");

                    anim = setInterval(function anim(): void {
                        movedFluffy[0].holeAnimation("top", 0);
                    },                 30);
                }
            } else if (element instanceof WallRightHole) {
                if (element.position.x < (movedFluffy[0].position.x + (fluffyWidth / 2) + 1) && movedFluffy[0].color == wallRightColor) {
                    console.log("passed the right wall");
                    sendFluffy(movedFluffy[0].position.y, "left");

                    anim = setInterval(function anim(): void {
                        movedFluffy[0].holeAnimation("right", canvasWidth);
                    },                 30);
                }
            }
            else if (element instanceof WallBottomHole) {
                if (element.position.y < (movedFluffy[0].position.y + (fluffyHeight / 2) + 1) && movedFluffy[0].color == wallBottomColor) {
                    console.log("passed the bottom wall");
                    sendFluffy(movedFluffy[0].position.x, "top");

                    anim = setInterval(function anim(): void {
                        movedFluffy[0].holeAnimation("bottom", canvasHeight);
                    },                 30);
                }
            } else {  //if something went wrong with the holes
                console.log("delete");
                movedFluffy.splice(0, movedFluffy.length);
            }
        }
    }
} //namespace