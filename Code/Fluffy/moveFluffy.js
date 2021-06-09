"use strict";
var FluffyPong;
(function (FluffyPong) {
    FluffyPong.swipe = false;
    let movedFluffy;
    function moveFluffyStart(_event) {
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
                movedFluffy = element;
            }
        }
    }
    FluffyPong.moveFluffyStart = moveFluffyStart;
    function moveFluffy(_event) {
        if (FluffyPong.swipe) {
            let x = _event.changedTouches ?
                _event.changedTouches[0].pageX :
                _event.pageX;
            let y = _event.changedTouches ?
                _event.changedTouches[0].pageY :
                _event.pageY;
            let fluffyDirection = new FluffyPong.Vector(x, y);
            fluffyDirection.getDifference(FluffyPong.oldPosition, fluffyDirection);
            //console.log(fluffyDirection);
            movedFluffy.move(fluffyDirection);
            movedFluffy.draw();
            fluffyTroughWall(movedFluffy);
        }
        // wenn fluffy durch mauer geht sendFlufrfy in client aufrufen, um ihn an server zu schicken       
    }
    FluffyPong.moveFluffy = moveFluffy;
    function moveFluffyEnd(_event) {
        FluffyPong.swipe = false;
    }
    FluffyPong.moveFluffyEnd = moveFluffyEnd;
    function fluffyTroughWall(_movedFluffy) {
        let position = new FluffyPong.Vector(_movedFluffy.position.x, _movedFluffy.position.y);
        //check if the fluffy passed through a wall
        if (position.x < (FluffyPong.fluffyWidth / 2)) {
            console.log("passed the left wall");
            FluffyPong.sendFluffy(_movedFluffy, "right");
        }
        else if (position.y < (FluffyPong.fluffyHeight / 2)) {
            console.log("passed the top wall");
            FluffyPong.sendFluffy(_movedFluffy, "bottom");
        }
        else if (position.x > FluffyPong.crc2.canvas.width - (FluffyPong.fluffyWidth / 2)) {
            console.log("passed the right wall");
            FluffyPong.sendFluffy(_movedFluffy, "left");
        }
        else if (position.y > FluffyPong.crc2.canvas.height - (FluffyPong.fluffyHeight / 2)) {
            console.log("passed the bottom wall");
            FluffyPong.sendFluffy(_movedFluffy, "top");
        } /* else {
            console.log("no wall");
        } */
    }
})(FluffyPong || (FluffyPong = {})); //namespace
//# sourceMappingURL=moveFluffy.js.map