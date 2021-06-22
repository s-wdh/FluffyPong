"use strict";
var FluffyPong;
(function (FluffyPong) {
    FluffyPong.swipe = false;
    let movedFluffy;
    function moveFluffyStart(_event) {
        _event.preventDefault();
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
                break;
            }
        }
    }
    FluffyPong.moveFluffyStart = moveFluffyStart;
    function moveFluffy(_event) {
        _event.preventDefault();
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
        for (let element of FluffyPong.walls) {
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
            if (position.x < (FluffyPong.fluffyWidth / 2) && _movedFluffy.colorenum == element.colorenum) {
                console.log("passed the left wall");
                FluffyPong.sendFluffy(_movedFluffy, "right");
            }
            else if (position.y < (FluffyPong.fluffyHeight / 2) && _movedFluffy.colorenum == element.colorenum) {
                console.log("passed the top wall");
                FluffyPong.sendFluffy(_movedFluffy, "bottom");
            }
            else if (position.x > FluffyPong.crc2.canvas.width - (FluffyPong.fluffyWidth / 2) && _movedFluffy.colorenum == element.colorenum) {
                console.log("passed the right wall");
                FluffyPong.sendFluffy(_movedFluffy, "left");
            }
            else if (position.y > FluffyPong.crc2.canvas.height - (FluffyPong.fluffyHeight / 2) && _movedFluffy.colorenum == element.colorenum) {
                console.log("passed the bottom wall");
                FluffyPong.sendFluffy(_movedFluffy, "top");
            }
        }
        //check if the fluffy passed through a wall
    }
})(FluffyPong || (FluffyPong = {})); //namespace
//# sourceMappingURL=moveFluffy.js.map