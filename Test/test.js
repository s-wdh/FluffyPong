"use strict";
window.addEventListener("load", handleLoad);
let crc2;
function handleLoad() {
    let canvas = document.querySelector("canvas");
    if (!canvas)
        return;
    crc2 = canvas.getContext("2d");
    //let fluffyRed: HTMLImageElement = <HTMLImageElement>document.getElementById("red");
    let fluffyRed = document.createElement("img");
    fluffyRed.onload = function () {
        // Try to draw your image only after this function has been called.
        // eg: drawPlayer(Player1);
        crc2.drawImage(fluffyRed, 0, 0, 100, 100);
        crc2.fill();
        console.log(fluffyRed);
    };
    fluffyRed.src = "genervt.png";
}
//# sourceMappingURL=test.js.map