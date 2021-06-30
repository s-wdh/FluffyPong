"use strict";
var FluffyPong;
(function (FluffyPong) {
    FluffyPong.swipe = false;
    function moveFluffyStart(_event) {
        _event.preventDefault();
        if (FluffyPong.swipe == false) {
            let x = _event.changedTouches ?
                _event.changedTouches[0].pageX :
                _event.pageX;
            let y = _event.changedTouches ?
                _event.changedTouches[0].pageY :
                _event.pageY;
            FluffyPong.oldPosition = new FluffyPong.Vector(x, y);
            FluffyPong.swipe = true;
            for (let element of FluffyPong.fluffies) {
                let distance = Math.hypot((FluffyPong.oldPosition.x - element.position.x), (FluffyPong.oldPosition.y - element.position.y));
                if (distance < (FluffyPong.fluffyWidth / 2)) {
                    console.log("move Fluffy start");
                    FluffyPong.movedFluffy = element;
                    _event.stopPropagation();
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
            let x = _event.changedTouches ?
                _event.changedTouches[0].pageX :
                _event.pageX;
            let y = _event.changedTouches ?
                _event.changedTouches[0].pageY :
                _event.pageY;
            FluffyPong.fluffyDirection = new FluffyPong.Vector(x, y);
            //fluffyDirection.getDifference(oldPosition, fluffyDirection);
            //let position: Vector = new Vector(movedFluffy.position.x, movedFluffy.position.y);
            FluffyPong.movedFluffy.move(FluffyPong.fluffyDirection);
            FluffyPong.movedFluffy.draw();
            /* for (let element of walls) {
                if (element.position.x + borderWidth > position.x - (fluffyWidth / 2) && movedFluffy.colorenum == element.colorenum) {
                    movedFluffy.move(fluffyDirection);
                    movedFluffy.draw();
                    console.log("passed the left wall");
                    sendFluffy(movedFluffy, "right");

                    fluffies.splice(fluffies.indexOf(movedFluffy), 1);
                } else if (element.position.y + borderWidth > position.y - (fluffyHeight / 2) && movedFluffy.colorenum == element.colorenum) {
                    movedFluffy.move(fluffyDirection);
                    movedFluffy.draw();
                    console.log("passed the top wall");
                    sendFluffy(movedFluffy, "bottom");

                    fluffies.splice(fluffies.indexOf(movedFluffy), 1);
                } else if (position.x < position.x + (fluffyWidth / 2) && movedFluffy.colorenum == element.colorenum) {
                    movedFluffy.move(fluffyDirection);
                    movedFluffy.draw();
                    console.log("passed the right wall");
                    sendFluffy(movedFluffy, "left");

                    fluffies.splice(fluffies.indexOf(movedFluffy), 1);
                } else if (position.y < position.y + (fluffyHeight / 2) && movedFluffy.colorenum == element.colorenum) {
                    movedFluffy.move(fluffyDirection);
                    movedFluffy.draw();
                    console.log("passed the bottom wall");
                    sendFluffy(movedFluffy, "top");

                    fluffies.splice(fluffies.indexOf(movedFluffy), 1);
                } else {
                    movedFluffy.move(oldPosition);
                    movedFluffy.draw();
                }
            } */
            fluffyTroughWall();
        }
        // wenn fluffy durch mauer geht sendFlufrfy in client aufrufen, um ihn an server zu schicken       
    }
    FluffyPong.moveFluffy = moveFluffy;
    function moveFluffyEnd(_event) {
        FluffyPong.swipe = false;
    }
    FluffyPong.moveFluffyEnd = moveFluffyEnd;
    function fluffyTroughWall() {
        let position = new FluffyPong.Vector(FluffyPong.movedFluffy.position.x, FluffyPong.movedFluffy.position.y);
        for (let element of FluffyPong.walls) {
            if (element.position.x + FluffyPong.borderWidth > (position.x - (FluffyPong.fluffyWidth / 2) - 1) && FluffyPong.movedFluffy.colorenum == element.colorenum) {
                console.log("passed the left wall");
                FluffyPong.sendFluffy(FluffyPong.movedFluffy, "right");
                FluffyPong.fluffies.splice(FluffyPong.fluffies.indexOf(FluffyPong.movedFluffy), 1);
                /* crc2.putImageData(imgData, 0, 0);
                for (let fluffy of fluffies) {
                    fluffy.draw();
                } */
            }
            else if (element.position.y + FluffyPong.borderWidth > (position.y - (FluffyPong.fluffyHeight / 2) - 1) && FluffyPong.movedFluffy.colorenum == element.colorenum) {
                console.log("passed the top wall");
                FluffyPong.sendFluffy(FluffyPong.movedFluffy, "bottom");
                FluffyPong.fluffies.splice(FluffyPong.fluffies.indexOf(FluffyPong.movedFluffy), 1);
                /* crc2.putImageData(imgData, 0, 0);
                for (let fluffy of fluffies) {
                    fluffy.draw();
                } */
            }
            else if (element.position.x < (position.x + (FluffyPong.fluffyWidth / 2) + 1) && FluffyPong.movedFluffy.colorenum == element.colorenum) {
                console.log("passed the right wall");
                FluffyPong.sendFluffy(FluffyPong.movedFluffy, "left");
                FluffyPong.fluffies.splice(FluffyPong.fluffies.indexOf(FluffyPong.movedFluffy), 1);
                /* crc2.putImageData(imgData, 0, 0);
                for (let fluffy of fluffies) {
                    fluffy.draw();
                } */
            }
            else if (element.position.y < (position.y + (FluffyPong.fluffyHeight / 2) + 1) && FluffyPong.movedFluffy.colorenum == element.colorenum) {
                console.log("passed the bottom wall");
                FluffyPong.sendFluffy(FluffyPong.movedFluffy, "top");
                FluffyPong.fluffies.splice(FluffyPong.fluffies.indexOf(FluffyPong.movedFluffy), 1);
                /* crc2.putImageData(imgData, 0, 0);
                for (let fluffy of fluffies) {
                    fluffy.draw();
                } */
            }
            else {
                break;
            }
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
        }
    }
    FluffyPong.fluffyTroughWall = fluffyTroughWall;
})(FluffyPong || (FluffyPong = {})); //namespace
//# sourceMappingURL=moveFluffy.js.map