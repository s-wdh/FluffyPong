"use strict";
var FluffyPong;
(function (FluffyPong) {
    FluffyPong.swipe = false;
    //export let movedFluffy: FluffyElement;
    let movedFluffy = [];
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
                    movedFluffy.unshift(element);
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
            if (!movedFluffy[0]) {
                return;
            }
            movedFluffy[0].move(FluffyPong.fluffyDirection);
            movedFluffy[0].draw();
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
        if (!movedFluffy[0]) {
            return;
        }
        for (let element of FluffyPong.wallHoles) {
            if (element instanceof FluffyPong.WallLeftHole) {
                if (element.position.x + FluffyPong.borderWidth > (movedFluffy[0].position.x - (FluffyPong.fluffyWidth / 2) - 1) && movedFluffy[0].color == FluffyPong.wallLeftColor) {
                    console.log("passed the left wall");
                    FluffyPong.sendFluffy(movedFluffy[0].position.y, "right");
                    FluffyPong.fluffies.splice(FluffyPong.fluffies.indexOf(movedFluffy[0]), 1);
                    movedFluffy.splice(0, movedFluffy.length);
                }
            }
            else if (element instanceof FluffyPong.WallTopHole) {
                if (element.position.y + FluffyPong.borderWidth > (movedFluffy[0].position.y - (FluffyPong.fluffyHeight / 2) - 1) && movedFluffy[0].color == FluffyPong.wallTopColor) {
                    console.log("passed the top wall");
                    FluffyPong.sendFluffy(movedFluffy[0].position.x, "bottom");
                    FluffyPong.fluffies.splice(FluffyPong.fluffies.indexOf(movedFluffy[0]), 1);
                    movedFluffy.splice(0, movedFluffy.length);
                }
            }
            else if (element instanceof FluffyPong.WallRightHole) {
                if (element.position.x < (movedFluffy[0].position.x + (FluffyPong.fluffyWidth / 2) + 1) && movedFluffy[0].color == FluffyPong.wallRightColor) {
                    console.log("passed the right wall");
                    FluffyPong.sendFluffy(movedFluffy[0].position.y, "left");
                    FluffyPong.fluffies.splice(FluffyPong.fluffies.indexOf(movedFluffy[0]), 1);
                    movedFluffy.splice(0, movedFluffy.length);
                }
            }
            else if (element instanceof FluffyPong.WallBottomHole) {
                if (element.position.y < (movedFluffy[0].position.y + (FluffyPong.fluffyHeight / 2) + 1) && movedFluffy[0].color == FluffyPong.wallBottomColor) {
                    console.log("passed the bottom wall");
                    FluffyPong.sendFluffy(movedFluffy[0].position.x, "top");
                    FluffyPong.fluffies.splice(FluffyPong.fluffies.indexOf(movedFluffy[0]), 1);
                    movedFluffy.splice(0, movedFluffy.length);
                }
            }
            else {
                movedFluffy.splice(0, movedFluffy.length);
            }
        }
    }
    FluffyPong.fluffyTroughWall = fluffyTroughWall;
})(FluffyPong || (FluffyPong = {})); //namespace
//# sourceMappingURL=moveFluffy.js.map