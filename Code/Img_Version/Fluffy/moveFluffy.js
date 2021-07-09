"use strict";
var FluffyPong_Img;
(function (FluffyPong_Img) {
    FluffyPong_Img.swipe = false;
    FluffyPong_Img.movedFluffy = []; //array for fluffy that is swiped currently
    //start of the swipe of a fluffy
    function moveFluffyStart(_event) {
        _event.preventDefault();
        if (FluffyPong_Img.swipe == false) {
            let x = _event.changedTouches ?
                _event.changedTouches[0].pageX :
                _event.pageX;
            let y = _event.changedTouches ?
                _event.changedTouches[0].pageY :
                _event.pageY;
            FluffyPong_Img.oldPosition = new FluffyPong_Img.Vector(x, y);
            FluffyPong_Img.swipe = true;
            for (let element of FluffyPong_Img.fluffies) {
                //check if the x position of the event is on a fluffy
                if (FluffyPong_Img.oldPosition.x > element.position.x && FluffyPong_Img.oldPosition.x < (element.position.x + FluffyPong_Img.fluffyWidth)) {
                    // and then for the y position as well
                    if (FluffyPong_Img.oldPosition.y > element.position.y && FluffyPong_Img.oldPosition.y < (element.position.y + FluffyPong_Img.fluffyHeight)) {
                        FluffyPong_Img.movedFluffy.unshift(element);
                        _event.stopPropagation();
                        break;
                    }
                }
            }
        }
        else {
            return;
        }
    }
    FluffyPong_Img.moveFluffyStart = moveFluffyStart;
    //move the fluffy to the position of the finger/mouse
    function moveFluffy(_event) {
        _event.preventDefault();
        if (FluffyPong_Img.swipe == true) {
            let x = _event.changedTouches ?
                _event.changedTouches[0].pageX :
                _event.pageX;
            let y = _event.changedTouches ?
                _event.changedTouches[0].pageY :
                _event.pageY;
            FluffyPong_Img.fluffyDirection = new FluffyPong_Img.Vector((x - (FluffyPong_Img.fluffyWidth / 2)), (y - (FluffyPong_Img.fluffyHeight / 2)));
            if (FluffyPong_Img.movedFluffy.length < 1) {
                return;
            }
            FluffyPong_Img.movedFluffy[0].move(FluffyPong_Img.fluffyDirection);
            FluffyPong_Img.movedFluffy[0].draw();
            fluffyTroughWall();
        }
    }
    FluffyPong_Img.moveFluffy = moveFluffy;
    //function for the end of the swipe
    function moveFluffyEnd(_event) {
        FluffyPong_Img.swipe = false;
        FluffyPong_Img.movedFluffy.splice(0, FluffyPong_Img.movedFluffy.length);
    }
    FluffyPong_Img.moveFluffyEnd = moveFluffyEnd;
    //check if the fluffy was swiped through a hole in one of the walls or just somewhere else on the canvas
    //send the Fluffy to the server if it went through the hole with the sendFluffy function
    function fluffyTroughWall() {
        if (FluffyPong_Img.movedFluffy.length < 1) {
            return;
        }
        else {
            for (let element of FluffyPong_Img.wallHoles) {
                if (element instanceof FluffyPong_Img.WallLeftHole) {
                    /* if (!movedFluffy[0]) {
                        return;
                    } */
                    //check if the fluffy was swiped inside of a hole
                    if (element.position.x + (FluffyPong_Img.borderWidth / 4) > (FluffyPong_Img.movedFluffy[0].position.x)) {
                        //if yes, then check if the fluffy has the same color than the wall
                        if (FluffyPong_Img.movedFluffy[0].color == FluffyPong_Img.wallLeftColor) {
                            FluffyPong_Img.swipe = false;
                            //if yes, send the fluffy to the server and delete it in this players fluffies array
                            console.log("passed the left wall");
                            FluffyPong_Img.sendFluffy(FluffyPong_Img.movedFluffy[0].position.y, "right");
                            FluffyPong_Img.fluffies.splice(FluffyPong_Img.fluffies.indexOf(FluffyPong_Img.movedFluffy[0]), 1);
                            FluffyPong_Img.movedFluffy.splice(0, FluffyPong_Img.movedFluffy.length);
                        }
                        else { //if no, make the fluffy jump back inside the wall
                            FluffyPong_Img.movedFluffy[0].position.x = FluffyPong_Img.borderWidth + 1;
                        }
                    }
                    //and now the same for the other three walls
                }
                else if (element instanceof FluffyPong_Img.WallTopHole) {
                    /* if (!movedFluffy[0]) {  //muss hier erneut erfolgen, da ansonsten Fehlermeldungen der Position kommen
                        return;
                    } */
                    if (element.position.y + (FluffyPong_Img.borderWidth / 4) > (FluffyPong_Img.movedFluffy[0].position.y)) {
                        if (FluffyPong_Img.movedFluffy[0].color == FluffyPong_Img.wallTopColor) {
                            FluffyPong_Img.swipe = false;
                            console.log("passed the top wall");
                            FluffyPong_Img.sendFluffy(FluffyPong_Img.movedFluffy[0].position.x, "bottom");
                            FluffyPong_Img.fluffies.splice(FluffyPong_Img.fluffies.indexOf(FluffyPong_Img.movedFluffy[0]), 1);
                            FluffyPong_Img.movedFluffy.splice(0, FluffyPong_Img.movedFluffy.length);
                        }
                        else {
                            FluffyPong_Img.movedFluffy[0].position.y = FluffyPong_Img.borderWidth + 1;
                        }
                    }
                }
                else if (element instanceof FluffyPong_Img.WallRightHole) {
                    /* if (!movedFluffy[0]) {
                        return;
                    } */
                    if (element.position.x + (FluffyPong_Img.borderWidth / 4) < (FluffyPong_Img.movedFluffy[0].position.x + FluffyPong_Img.fluffyWidth)) {
                        if (FluffyPong_Img.movedFluffy[0].color == FluffyPong_Img.wallRightColor) {
                            FluffyPong_Img.swipe = false;
                            console.log("passed the right wall");
                            FluffyPong_Img.sendFluffy(FluffyPong_Img.movedFluffy[0].position.y, "left");
                            FluffyPong_Img.fluffies.splice(FluffyPong_Img.fluffies.indexOf(FluffyPong_Img.movedFluffy[0]), 1);
                            FluffyPong_Img.movedFluffy.splice(0, FluffyPong_Img.movedFluffy.length);
                        }
                        else {
                            FluffyPong_Img.movedFluffy[0].position.x = FluffyPong_Img.canvasWidth - FluffyPong_Img.borderWidth - FluffyPong_Img.fluffyWidth;
                        }
                    }
                }
                else if (element instanceof FluffyPong_Img.WallBottomHole) {
                    /* if (!movedFluffy[0]) {
                        return;
                    } */
                    if (element.position.y + (FluffyPong_Img.borderWidth / 4) < (FluffyPong_Img.movedFluffy[0].position.y + FluffyPong_Img.fluffyHeight)) {
                        if (FluffyPong_Img.movedFluffy[0].color == FluffyPong_Img.wallBottomColor) {
                            FluffyPong_Img.swipe = false;
                            console.log("passed the bottom wall");
                            FluffyPong_Img.sendFluffy(FluffyPong_Img.movedFluffy[0].position.x, "top");
                            FluffyPong_Img.fluffies.splice(FluffyPong_Img.fluffies.indexOf(FluffyPong_Img.movedFluffy[0]), 1);
                            FluffyPong_Img.movedFluffy.splice(0, FluffyPong_Img.movedFluffy.length);
                        }
                        else {
                            FluffyPong_Img.movedFluffy[0].position.y = FluffyPong_Img.canvasHeight - FluffyPong_Img.borderWidth - FluffyPong_Img.fluffyHeight;
                        }
                    }
                }
                else { //if something went wrong with the holes
                    console.log("delete");
                    FluffyPong_Img.movedFluffy.splice(0, FluffyPong_Img.movedFluffy.length);
                }
            }
        }
    }
    FluffyPong_Img.fluffyTroughWall = fluffyTroughWall;
})(FluffyPong_Img || (FluffyPong_Img = {})); //namespace
//# sourceMappingURL=moveFluffy.js.map