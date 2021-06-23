"use strict";
var FluffyPong;
(function (FluffyPong) {
    FluffyPong.swipe = false;
    function moveFluffyStart(_event) {
        _event.preventDefault();
        if (FluffyPong.swipe == false) {
            let canvas = document.querySelector("canvas");
            if (!canvas)
                return;
            canvas.removeEventListener("touchstart", moveFluffyStart, false);
            canvas.removeEventListener("mousedown", moveFluffyStart, false);
            let x = _event.changedTouches ?
                _event.changedTouches[0].pageX :
                _event.pageX;
            let y = _event.changedTouches ?
                _event.changedTouches[0].pageY :
                _event.pageY;
            FluffyPong.oldPosition = new FluffyPong.Vector(x, y);
            FluffyPong.swipe = true;
            for (let element of FluffyPong.fluffies) {
                if (element.position.x - (FluffyPong.fluffyWidth / 2) < x && element.position.y - (FluffyPong.fluffyHeight / 2) < y && element.position.x + (FluffyPong.fluffyWidth / 2) > x && element.position.y + (FluffyPong.fluffyHeight / 2) > y) {
                    console.log("move Fluffy start");
                    FluffyPong.movedFluffy = element;
                    break;
                }
            }
        }
        else {
            return;
        }
    }
    FluffyPong.moveFluffyStart = moveFluffyStart;
    function moveFluffy(_event) {
        _event.preventDefault();
        if (FluffyPong.swipe == true) {
            let canvas = document.querySelector("canvas");
            if (!canvas)
                return;
            canvas.removeEventListener("touchmove", moveFluffy, false);
            canvas.removeEventListener("mousemove", moveFluffy, false);
            let x = _event.changedTouches ?
                _event.changedTouches[0].pageX :
                _event.pageX;
            let y = _event.changedTouches ?
                _event.changedTouches[0].pageY :
                _event.pageY;
            FluffyPong.fluffyDirection = new FluffyPong.Vector(x, y);
            FluffyPong.fluffyDirection.getDifference(FluffyPong.oldPosition, FluffyPong.fluffyDirection);
            let position = new FluffyPong.Vector(FluffyPong.movedFluffy.position.x, FluffyPong.movedFluffy.position.y);
            for (let element of FluffyPong.walls) {
                if (element.position.x + FluffyPong.borderWidth > position.x - (FluffyPong.fluffyWidth / 2) && FluffyPong.movedFluffy.colorenum == element.colorenum) {
                    FluffyPong.movedFluffy.move(FluffyPong.fluffyDirection);
                    FluffyPong.movedFluffy.draw();
                    console.log("passed the left wall");
                    FluffyPong.sendFluffy(FluffyPong.movedFluffy, "right");
                    FluffyPong.fluffies.splice(FluffyPong.fluffies.indexOf(FluffyPong.movedFluffy), 1);
                }
                else if (element.position.y + FluffyPong.borderWidth > position.y - (FluffyPong.fluffyHeight / 2) && FluffyPong.movedFluffy.colorenum == element.colorenum) {
                    FluffyPong.movedFluffy.move(FluffyPong.fluffyDirection);
                    FluffyPong.movedFluffy.draw();
                    console.log("passed the top wall");
                    FluffyPong.sendFluffy(FluffyPong.movedFluffy, "bottom");
                    FluffyPong.fluffies.splice(FluffyPong.fluffies.indexOf(FluffyPong.movedFluffy), 1);
                }
                else if (position.x < position.x + (FluffyPong.fluffyWidth / 2) && FluffyPong.movedFluffy.colorenum == element.colorenum) {
                    FluffyPong.movedFluffy.move(FluffyPong.fluffyDirection);
                    FluffyPong.movedFluffy.draw();
                    console.log("passed the right wall");
                    FluffyPong.sendFluffy(FluffyPong.movedFluffy, "left");
                    FluffyPong.fluffies.splice(FluffyPong.fluffies.indexOf(FluffyPong.movedFluffy), 1);
                }
                else if (position.y < position.y + (FluffyPong.fluffyHeight / 2) && FluffyPong.movedFluffy.colorenum == element.colorenum) {
                    FluffyPong.movedFluffy.move(FluffyPong.fluffyDirection);
                    FluffyPong.movedFluffy.draw();
                    console.log("passed the bottom wall");
                    FluffyPong.sendFluffy(FluffyPong.movedFluffy, "top");
                    FluffyPong.fluffies.splice(FluffyPong.fluffies.indexOf(FluffyPong.movedFluffy), 1);
                }
                else {
                    FluffyPong.movedFluffy.move(FluffyPong.oldPosition);
                    FluffyPong.movedFluffy.draw();
                }
            }
            //fluffyTroughWall();
        }
        // wenn fluffy durch mauer geht sendFlufrfy in client aufrufen, um ihn an server zu schicken       
    }
    FluffyPong.moveFluffy = moveFluffy;
    function moveFluffyEnd(_event) {
        FluffyPong.swipe = false;
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        canvas.addEventListener("touchstart", moveFluffyStart, false);
        canvas.addEventListener("touchmove", moveFluffy, false);
        canvas.addEventListener("mousedown", moveFluffyStart, false);
        canvas.addEventListener("mousemove", moveFluffy, false);
    }
    FluffyPong.moveFluffyEnd = moveFluffyEnd;
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
})(FluffyPong || (FluffyPong = {})); //namespace
//# sourceMappingURL=moveFluffy.js.map