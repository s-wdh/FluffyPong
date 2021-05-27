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
    Netzstruktur.playerPosition = [0];
    // listen to message from server
    socket.addEventListener("message", (event) => {
        const carrier = JSON.parse(event.data);
        const selector = carrier.selector;
        const data = carrier.data;
        switch (selector) {
            case "player":
                const playerInfo = JSON.parse(data);
                Netzstruktur.playerNameList.push(playerInfo); // add message to message list
                break;
            case "fluffy":
                break;
        }
    });
    function sendName() {
        const name = namefield.value;
        let position = Netzstruktur.playerPosition.length - 1;
        let lastPlayer = Netzstruktur.playerPosition[position].valueOf();
        let createPlayerNumber = lastPlayer + 1;
        Netzstruktur.playerPosition.push(createPlayerNumber);
        let index = Netzstruktur.playerPosition.indexOf(createPlayerNumber);
        if (name !== "") {
            const playername = {
                name: name,
                position: index
            };
            const textCarrier = {
                selector: "player",
                data: JSON.stringify(playername)
            };
            socket.send(JSON.stringify(textCarrier));
        }
        // delete name field and buttons
    }
})(Netzstruktur || (Netzstruktur = {})); //namespace
//# sourceMappingURL=client.js.map