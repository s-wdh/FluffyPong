namespace FluffyPong {
    export let swipe: Boolean = false;
    export let oldPosition: Vector;
    let movedFluffy: FluffyElement;

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

            let fluffyDirection: Vector = new Vector(x, y);
            fluffyDirection.getDifference(oldPosition, fluffyDirection);
            //console.log(fluffyDirection);
            movedFluffy.move(fluffyDirection);
            movedFluffy.draw();
            fluffyTroughWall(movedFluffy);
        }

        // wenn fluffy durch mauer geht sendFlufrfy in client aufrufen, um ihn an server zu schicken       
    }

    export function moveFluffyEnd(_event: TouchEvent | MouseEvent): void {
        swipe = false;
    }

    function fluffyTroughWall(_movedFluffy: FluffyElement): void {
        let position: Vector = new Vector(_movedFluffy.position.x, _movedFluffy.position.y);

        for (let element of walls) {
            /* if (element.position.x + borderWidth > position.x - (fluffyWidth / 2) && _movedFluffy.colorenum == element.colorenum) {
                console.log("passed the left wall");
                sendFluffy(_movedFluffy, "right");
            } else if (element.position.y + borderWidth > position.y - (fluffyHeight / 2) && _movedFluffy.colorenum == element.colorenum) {
                console.log("passed the top wall");
                sendFluffy(_movedFluffy, "bottom");
            } else if (position.x < position.x + (fluffyWidth / 2) && _movedFluffy.colorenum == element.colorenum) {
                console.log("passed the right wall");
                sendFluffy(_movedFluffy, "left");
            } else if (position.y < position.y + (fluffyHeight / 2) && _movedFluffy.colorenum == element.colorenum) {
                console.log("passed the bottom wall");
                sendFluffy(_movedFluffy, "top");
            } */

            if (position.x < (fluffyWidth / 2) && _movedFluffy.colorenum == element.colorenum) {
                console.log("passed the left wall");
                sendFluffy(_movedFluffy, "right");
            } else if (position.y < (fluffyHeight / 2) && _movedFluffy.colorenum == element.colorenum) {
                console.log("passed the top wall");          
                sendFluffy(_movedFluffy, "bottom");
            } else if (position.x > crc2.canvas.width - (fluffyWidth / 2) && _movedFluffy.colorenum == element.colorenum) {
                console.log("passed the right wall");
                sendFluffy(_movedFluffy, "left");
            } else if (position.y > crc2.canvas.height - (fluffyHeight / 2) && _movedFluffy.colorenum == element.colorenum) {
                console.log("passed the bottom wall");
                sendFluffy(_movedFluffy, "top");
            }
        }
        //check if the fluffy passed through a wall


    }
} //namespace