
window.addEventListener("load", handleLoad);
let crc2: CanvasRenderingContext2D;

function handleLoad(): void {
    let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
    if (!canvas)
        return;
    crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
    //let fluffyRed: HTMLImageElement = <HTMLImageElement>document.getElementById("red");
    let fluffyRed: HTMLImageElement = document.createElement("img");
    fluffyRed.onload = function (): void {
        // Try to draw your image only after this function has been called.
        // eg: drawPlayer(Player1);
        crc2.drawImage(fluffyRed, 0, 0, 100, 100);
        crc2.fill();
        console.log(fluffyRed);
    };
    fluffyRed.src = "genervt.png";
}
