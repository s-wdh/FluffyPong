"use strict";
var FluffyPong_Path;
(function (FluffyPong_Path) {
    FluffyPong_Path.swipe = false;
    FluffyPong_Path.movedFluffy = []; //array for fluffy that is swiped currently
    //start of the swipe of a fluffy
    function moveFluffyStart(_event) {
        _event.preventDefault();
        if (FluffyPong_Path.swipe == false) {
            let x = _event.changedTouches ?
                _event.changedTouches[0].pageX :
                _event.pageX;
            let y = _event.changedTouches ?
                _event.changedTouches[0].pageY :
                _event.pageY;
            FluffyPong_Path.oldPosition = new FluffyPong_Path.Vector(x, y);
            FluffyPong_Path.swipe = true;
            for (let element of FluffyPong_Path.fluffies) {
                let distance = Math.hypot((FluffyPong_Path.oldPosition.x - element.position.x), (FluffyPong_Path.oldPosition.y - element.position.y));
                if (distance < (FluffyPong_Path.fluffyWidth / 2)) {
                    //console.log("move Fluffy start");
                    FluffyPong_Path.movedFluffy.unshift(element);
                    _event.stopPropagation();
                    break;
                }
            }
        }
        else {
            return;
        }
    }
    FluffyPong_Path.moveFluffyStart = moveFluffyStart;
    //move the fluffy to the position of the finger/mouse
    function moveFluffy(_event) {
        _event.preventDefault();
        if (FluffyPong_Path.swipe == true) {
            let x = _event.changedTouches ?
                _event.changedTouches[0].pageX :
                _event.pageX;
            let y = _event.changedTouches ?
                _event.changedTouches[0].pageY :
                _event.pageY;
            FluffyPong_Path.fluffyDirection = new FluffyPong_Path.Vector(x, y);
            //fluffyDirection.getDifference(oldPosition, fluffyDirection);
            //let position: Vector = new Vector(movedFluffy.position.x, movedFluffy.position.y);
            if (FluffyPong_Path.movedFluffy.length < 1) {
                return;
            }
            FluffyPong_Path.movedFluffy[0].move(FluffyPong_Path.fluffyDirection);
            FluffyPong_Path.movedFluffy[0].draw();
            fluffyTroughWall();
        }
    }
    FluffyPong_Path.moveFluffy = moveFluffy;
    //function for the end of the swipe
    function moveFluffyEnd(_event) {
        FluffyPong_Path.swipe = false;
        FluffyPong_Path.movedFluffy.splice(0, FluffyPong_Path.movedFluffy.length);
    }
    FluffyPong_Path.moveFluffyEnd = moveFluffyEnd;
    //check if the fluffy was swiped through a hole in one of the walls or just somewhere else on the canvas
    //send the Fluffy to the server if it went through the hole with the sendFluffy function
    function fluffyTroughWall() {
        if (FluffyPong_Path.movedFluffy.length < 1) {
            return;
        }
        else {
            for (let element of FluffyPong_Path.wallHoles) {
                if (element instanceof FluffyPong_Path.WallLeftHole) {
                    if (!FluffyPong_Path.movedFluffy[0]) {
                        return;
                    }
                    //check if the fluffy was swiped inside of a hole
                    if (element.position.x + FluffyPong_Path.borderWidth > (FluffyPong_Path.movedFluffy[0].position.x)) {
                        //if yes, then check if the fluffy has the same color than the wall
                        if (FluffyPong_Path.movedFluffy[0].color == FluffyPong_Path.wallLeftColor) {
                            FluffyPong_Path.swipe = false;
                            //if yes, send the fluffy to the server and delete it in this players fluffies array
                            console.log("passed the left wall");
                            FluffyPong_Path.sendFluffy(FluffyPong_Path.movedFluffy[0].position.y, "right");
                            FluffyPong_Path.fluffies.splice(FluffyPong_Path.fluffies.indexOf(FluffyPong_Path.movedFluffy[0]), 1);
                            FluffyPong_Path.movedFluffy.splice(0, FluffyPong_Path.movedFluffy.length);
                        }
                        else { //if no, make the fluffy jump back inside the wall
                            FluffyPong_Path.movedFluffy[0].position.x = FluffyPong_Path.borderWidth + (FluffyPong_Path.fluffyWidth / 2);
                        }
                    }
                    //and now the same for the other three walls
                }
                else if (element instanceof FluffyPong_Path.WallTopHole) {
                    if (!FluffyPong_Path.movedFluffy[0]) { //muss hier erneut erfolgen, da ansonsten Fehlermeldungen der Position kommen
                        return;
                    }
                    if (element.position.y + FluffyPong_Path.borderWidth > (FluffyPong_Path.movedFluffy[0].position.y)) {
                        if (FluffyPong_Path.movedFluffy[0].color == FluffyPong_Path.wallTopColor) {
                            FluffyPong_Path.swipe = false;
                            console.log("passed the top wall");
                            FluffyPong_Path.sendFluffy(FluffyPong_Path.movedFluffy[0].position.x, "bottom");
                            FluffyPong_Path.fluffies.splice(FluffyPong_Path.fluffies.indexOf(FluffyPong_Path.movedFluffy[0]), 1);
                            FluffyPong_Path.movedFluffy.splice(0, FluffyPong_Path.movedFluffy.length);
                        }
                        else {
                            FluffyPong_Path.movedFluffy[0].position.y = FluffyPong_Path.borderWidth + (FluffyPong_Path.fluffyHeight / 2);
                        }
                    }
                }
                else if (element instanceof FluffyPong_Path.WallRightHole) {
                    if (!FluffyPong_Path.movedFluffy[0]) {
                        return;
                    }
                    if (element.position.x < (FluffyPong_Path.movedFluffy[0].position.x)) {
                        if (FluffyPong_Path.movedFluffy[0].color == FluffyPong_Path.wallRightColor) {
                            FluffyPong_Path.swipe = false;
                            console.log("passed the right wall");
                            FluffyPong_Path.sendFluffy(FluffyPong_Path.movedFluffy[0].position.y, "left");
                            FluffyPong_Path.fluffies.splice(FluffyPong_Path.fluffies.indexOf(FluffyPong_Path.movedFluffy[0]), 1);
                            FluffyPong_Path.movedFluffy.splice(0, FluffyPong_Path.movedFluffy.length);
                        }
                        else {
                            FluffyPong_Path.movedFluffy[0].position.x = FluffyPong_Path.canvasWidth - FluffyPong_Path.borderWidth - (FluffyPong_Path.fluffyWidth / 2);
                        }
                    }
                }
                else if (element instanceof FluffyPong_Path.WallBottomHole) {
                    if (!FluffyPong_Path.movedFluffy[0]) {
                        return;
                    }
                    if (element.position.y < (FluffyPong_Path.movedFluffy[0].position.y)) {
                        if (FluffyPong_Path.movedFluffy[0].color == FluffyPong_Path.wallBottomColor) {
                            FluffyPong_Path.swipe = false;
                            console.log("passed the bottom wall");
                            FluffyPong_Path.sendFluffy(FluffyPong_Path.movedFluffy[0].position.x, "top");
                            FluffyPong_Path.fluffies.splice(FluffyPong_Path.fluffies.indexOf(FluffyPong_Path.movedFluffy[0]), 1);
                            FluffyPong_Path.movedFluffy.splice(0, FluffyPong_Path.movedFluffy.length);
                        }
                        else {
                            FluffyPong_Path.movedFluffy[0].position.y = FluffyPong_Path.canvasHeight - FluffyPong_Path.borderWidth - (FluffyPong_Path.fluffyHeight / 2);
                        }
                    }
                }
                else { //if something went wrong with the holes
                    console.log("delete");
                    FluffyPong_Path.movedFluffy.splice(0, FluffyPong_Path.movedFluffy.length);
                }
            }
        }
    }
    FluffyPong_Path.fluffyTroughWall = fluffyTroughWall;
})(FluffyPong_Path || (FluffyPong_Path = {})); //namespace
//# sourceMappingURL=moveFluffy.js.map