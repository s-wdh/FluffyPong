namespace Netzstruktur {
    export let swipe: Boolean = false;
    export let oldPosition: Vector;
    let movedFluffy: FluffyElement;

    export function moveFluffyStart(_event: TouchEvent | MouseEvent): void {
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
        if (swipe) {

            let x: number = (_event as TouchEvent).changedTouches ?
                (_event as TouchEvent).changedTouches[0].pageX :
                (_event as MouseEvent).pageX;
            let y: number = (_event as TouchEvent).changedTouches ?
                (_event as TouchEvent).changedTouches[0].pageY :
                (_event as MouseEvent).pageY;

            let fluffyDirection: Vector = new Vector(x, y);
            //fluffyDirection.getDifference(oldPosition, fluffyDirection);
            console.log(fluffyDirection);

            movedFluffy.move(fluffyDirection);
            crc2.putImageData(imgData, 0, 0);
            for (let fluffy of fluffies) {
                fluffy.draw();
            }
        }

        // wenn fluffy durch mauer geht sendFlufrfy in client aufrufen, um ihn an server zu schicken       
    }

    export function moveFluffyEnd(_event: TouchEvent | MouseEvent): void {
        swipe = false;
    }
} //namespace