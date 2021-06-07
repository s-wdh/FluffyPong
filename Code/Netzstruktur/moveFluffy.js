"use strict";
var Netzstruktur;
(function (Netzstruktur) {
    Netzstruktur.swipe = false;
    let movedFluffy;
    function moveFluffyStart(_event) {
        let x = _event.changedTouches ?
            _event.changedTouches[0].pageX :
            _event.pageX;
        let y = _event.changedTouches ?
            _event.changedTouches[0].pageY :
            _event.pageY;
        Netzstruktur.oldPosition = new Netzstruktur.Vector(x, y);
        Netzstruktur.swipe = true;
        for (let element of Netzstruktur.fluffies) {
            if (element.position.x - (Netzstruktur.fluffyWidth / 2) < x && element.position.y - (Netzstruktur.fluffyHeight / 2) < y && element.position.x + (Netzstruktur.fluffyWidth / 2) > x && element.position.y + (Netzstruktur.fluffyHeight / 2) > y) {
                console.log("move Fluffy start");
                movedFluffy = element;
            }
        }
    }
    Netzstruktur.moveFluffyStart = moveFluffyStart;
    function moveFluffy(_event) {
        if (Netzstruktur.swipe) {
            let x = _event.changedTouches ?
                _event.changedTouches[0].pageX :
                _event.pageX;
            let y = _event.changedTouches ?
                _event.changedTouches[0].pageY :
                _event.pageY;
            let fluffyDirection = new Netzstruktur.Vector(x, y);
            //fluffyDirection.getDifference(oldPosition, fluffyDirection);
            console.log(fluffyDirection);
            movedFluffy.move(fluffyDirection);
            Netzstruktur.crc2.putImageData(Netzstruktur.imgData, 0, 0);
            for (let fluffy of Netzstruktur.fluffies) {
                fluffy.draw();
            }
        }
        // wenn fluffy durch mauer geht sendFlufrfy in client aufrufen, um ihn an server zu schicken       
    }
    Netzstruktur.moveFluffy = moveFluffy;
    function moveFluffyEnd(_event) {
        Netzstruktur.swipe = false;
    }
    Netzstruktur.moveFluffyEnd = moveFluffyEnd;
})(Netzstruktur || (Netzstruktur = {})); //namespace
//# sourceMappingURL=moveFluffy.js.map