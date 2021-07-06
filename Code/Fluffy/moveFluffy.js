"use strict";
var FluffyPong;
(function (FluffyPong) {
    FluffyPong.swipe = false;
    FluffyPong.movedFluffy = []; //array for fluffy that is swiped currently
    //start of the swipe of a fluffy
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
                    //console.log("move Fluffy start");
                    FluffyPong.movedFluffy.unshift(element);
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
    //move the fluffy to the position of the finger/mouse
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
            if (!FluffyPong.movedFluffy[0]) {
                return;
            }
            FluffyPong.movedFluffy[0].move(FluffyPong.fluffyDirection);
            FluffyPong.movedFluffy[0].draw();
            fluffyTroughWall();
        }
    }
    FluffyPong.moveFluffy = moveFluffy;
    //function for the end of the swipe
    function moveFluffyEnd(_event) {
        FluffyPong.swipe = false;
    }
    FluffyPong.moveFluffyEnd = moveFluffyEnd;
    //check if the fluffy was swiped through a hole in one of the walls or just somewhere else on the canvas
    //send the Fluffy to the server if it went through the hole with the sendFluffy function
    function fluffyTroughWall() {
        if (!FluffyPong.movedFluffy[0]) {
            return;
        }
        for (let element of FluffyPong.wallHoles) {
            if (element instanceof FluffyPong.WallLeftHole) {
                //check if the fluffy is next to the hole, so it is sent to the server. 
                //It's not possible to swipe the fluffy in a hole, because then you could also swipe it in a wall, which shouldn't happen
                if (element.position.x + FluffyPong.borderWidth > (FluffyPong.movedFluffy[0].position.x - (FluffyPong.fluffyWidth / 2) - 1) && FluffyPong.movedFluffy[0].color == FluffyPong.wallLeftColor) {
                    console.log("passed the left wall");
                    FluffyPong.sendFluffy(FluffyPong.movedFluffy[0].position.y, "right");
                    FluffyPong.anim = setInterval(function anim() {
                        FluffyPong.movedFluffy[0].holeAnimation("left", 0);
                    }, 30);
                }
            }
            else if (element instanceof FluffyPong.WallTopHole) {
                if (element.position.y + FluffyPong.borderWidth > (FluffyPong.movedFluffy[0].position.y - (FluffyPong.fluffyHeight / 2) - 1) && FluffyPong.movedFluffy[0].color == FluffyPong.wallTopColor) {
                    console.log("passed the top wall");
                    FluffyPong.sendFluffy(FluffyPong.movedFluffy[0].position.x, "bottom");
                    FluffyPong.anim = setInterval(function anim() {
                        FluffyPong.movedFluffy[0].holeAnimation("top", 0);
                    }, 30);
                }
            }
            else if (element instanceof FluffyPong.WallRightHole) {
                if (element.position.x < (FluffyPong.movedFluffy[0].position.x + (FluffyPong.fluffyWidth / 2) + 1) && FluffyPong.movedFluffy[0].color == FluffyPong.wallRightColor) {
                    console.log("passed the right wall");
                    FluffyPong.sendFluffy(FluffyPong.movedFluffy[0].position.y, "left");
                    FluffyPong.anim = setInterval(function anim() {
                        FluffyPong.movedFluffy[0].holeAnimation("right", FluffyPong.canvasWidth);
                    }, 30);
                }
            }
            else if (element instanceof FluffyPong.WallBottomHole) {
                if (element.position.y < (FluffyPong.movedFluffy[0].position.y + (FluffyPong.fluffyHeight / 2) + 1) && FluffyPong.movedFluffy[0].color == FluffyPong.wallBottomColor) {
                    console.log("passed the bottom wall");
                    FluffyPong.sendFluffy(FluffyPong.movedFluffy[0].position.x, "top");
                    FluffyPong.anim = setInterval(function anim() {
                        FluffyPong.movedFluffy[0].holeAnimation("bottom", FluffyPong.canvasHeight);
                    }, 30);
                }
            }
            else { //if something went wrong with the holes
                console.log("delete");
                FluffyPong.movedFluffy.splice(0, FluffyPong.movedFluffy.length);
            }
        }
    }
    FluffyPong.fluffyTroughWall = fluffyTroughWall;
})(FluffyPong || (FluffyPong = {})); //namespace
//# sourceMappingURL=moveFluffy.js.map