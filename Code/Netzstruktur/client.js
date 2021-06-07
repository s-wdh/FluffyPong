"use strict";
var Netzstruktur;
(function (Netzstruktur) {
    //const socket: WebSocket = new WebSocket("ws://localhost:8000/");
    const socket = new WebSocket("wss://fluffypong.herokuapp.com/");
    let namefield;
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        console.log("load");
        namefield = document.getElementById("playername");
        //send name to server
        let startbtn = document.getElementById("start");
        startbtn.addEventListener("click", function () {
            sendName();
        });
    }
    Netzstruktur.fluffies = [];
    let playerNameList = [];
    //let playerPosition: number[] = [0];
    // listen to message from server
    socket.addEventListener("message", (event) => {
        const carrier = JSON.parse(event.data);
        const selector = carrier.selector;
        const data = carrier.data;
        switch (selector) {
            case "player":
                const playerInfo = JSON.parse(data);
                playerNameList.push(playerInfo); // add message to message list
                console.log(playerNameList);
                break;
            case "deletePlayer":
                const deleteInfo = JSON.parse(data);
                for (let playerElement of playerNameList) {
                    if (playerElement.name == deleteInfo.name && playerElement.position == deleteInfo.position) {
                        playerNameList.splice(playerNameList.indexOf(playerElement)); // delete player from array
                    }
                }
                console.log(playerNameList);
                break;
            case "fluffy":
                const fluffy = JSON.parse(data);
                let x = 250;
                let y = 300;
                console.log("fluffy");
                switch (fluffy.direction) {
                    case "top":
                        x = 250;
                        y = 0;
                        break;
                    case "right":
                        x = 500;
                        y = 300;
                        break;
                    case "bottom":
                        x = 250;
                        y = 600;
                        break;
                    case "left":
                        x = 0;
                        y = 300;
                        break;
                }
                let position = new Netzstruktur.Vector(x, y);
                let newFluffy = new Netzstruktur.FluffyElement(position);
                newFluffy.generateColor();
                newFluffy.draw();
                Netzstruktur.fluffies.push(newFluffy);
                break;
        }
    });
    function sendName() {
        const name = namefield.value;
        if (name !== "") {
            const playername = {
                name: name
            };
            const textCarrier = {
                selector: "player",
                data: JSON.stringify(playername)
            };
            socket.send(JSON.stringify(textCarrier));
        }
        console.log("Name gesendet");
        let startdiv = document.getElementById("startdiv");
        let parent = startdiv.parentNode;
        parent.removeChild(startdiv);
        Netzstruktur.prepareCanvas();
    }
    function sendFluffy(_event) {
        console.log(_event);
        let x = _event.clientX;
        let y = _event.clientY;
        for (let element of Netzstruktur.fluffies) {
            console.log(element.position);
            if (element.position.x - (Netzstruktur.fluffyWidth / 2) < x && element.position.y - (Netzstruktur.fluffyHeight / 2) < y && element.position.x + (Netzstruktur.fluffyWidth / 2) > x && element.position.y + (Netzstruktur.fluffyHeight / 2) > y) {
                console.log("send Fluffy");
                const fluffyMessage = {
                    direction: "top"
                };
                const textCarrier = {
                    selector: "fluffy",
                    data: JSON.stringify(fluffyMessage)
                };
                socket.send(JSON.stringify(textCarrier));
                Netzstruktur.fluffies.splice(Netzstruktur.fluffies.indexOf(element), 1);
            }
        }
        Netzstruktur.crc2.putImageData(Netzstruktur.imgData, 0, 0);
        for (let fluffy of Netzstruktur.fluffies) {
            fluffy.draw();
        }
    }
    Netzstruktur.sendFluffy = sendFluffy;
})(Netzstruktur || (Netzstruktur = {})); //namespace
//# sourceMappingURL=client.js.map