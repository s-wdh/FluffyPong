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
                break;
        }
    });
    function sendName() {
        const name = namefield.value;
        /* let position: number = playerPosition.length - 1;
        let lastPlayer: number = playerPosition[position].valueOf();
        let createPlayerNumber: number = lastPlayer + 1;
        playerPosition.push(createPlayerNumber);
        let index: number = playerPosition.indexOf(createPlayerNumber);
 */
        if (name !== "") {
            const playername = {
                name: name
                //position: index
            };
            const textCarrier = {
                selector: "player",
                data: JSON.stringify(playername)
            };
            socket.send(JSON.stringify(textCarrier));
        }
        console.log("Name gesendet");
        // delete name field and buttons
    }
})(Netzstruktur || (Netzstruktur = {})); //namespace
//# sourceMappingURL=client.js.map