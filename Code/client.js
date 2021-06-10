"use strict";
var FluffyPong;
(function (FluffyPong) {
    //const socket: WebSocket = new WebSocket("ws://localhost:8000/");
    const socket = new WebSocket("wss://fluffypong.herokuapp.com/");
    let namefield;
    let name;
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
    FluffyPong.fluffies = [];
    let playerNameList = [];
    let timer;
    // listen to message from server
    socket.addEventListener("message", (event) => {
        const carrier = JSON.parse(event.data);
        const selector = carrier.selector;
        const data = carrier.data;
        switch (selector) {
            case "player": {
                const playerInfo = JSON.parse(data);
                playerNameList.push(playerInfo); // add message to message list
                console.log(playerNameList);
                break;
            }
            case "deletePlayer": {
                const deleteInfo = JSON.parse(data);
                for (let playerElement of playerNameList) {
                    if (playerElement.name == deleteInfo.name && playerElement.position == deleteInfo.position) {
                        playerNameList.splice(playerNameList.indexOf(playerElement)); // delete player from array
                    }
                }
                console.log(playerNameList);
                break;
            }
            case "fluffy": {
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
                let position = new FluffyPong.Vector(x, y);
                let newFluffy = new FluffyPong.FluffyElement(position);
                newFluffy.generateColor();
                newFluffy.draw();
                FluffyPong.fluffies.push(newFluffy);
                break;
            }
            case "ranking": {
                const ranking = JSON.parse(data);
                let table = document.createElement("table");
                let row = document.createElement("tr");
                let tdposition = document.createElement("td");
                let tdname = document.createElement("td");
                let tdfluffyAmount = document.createElement("td");
                for (let index = 0; index < ranking.length; index++) {
                    tdposition.innerHTML = "" + ranking[index].position;
                    tdname.innerHTML = ranking[index].name;
                    tdfluffyAmount.innerHTML = "" + ranking[index].fluffyAmount;
                    row.appendChild(tdposition);
                    row.appendChild(tdname);
                    row.appendChild(tdfluffyAmount);
                    table.appendChild(row);
                }
                break;
            }
            case "timer": {
                timer = JSON.parse(data);
                window.setTimeout(getRanking, (timer * 1000));
                gameTimer();
                break;
            }
        }
    });
    function sendName() {
        name = namefield.value;
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
        FluffyPong.prepareCanvas();
    }
    function sendFluffy(_fluffy, _direction) {
        console.log(_direction);
        if (_direction == "top") {
            const fluffyMessage = {
                direction: "top"
            };
            const textCarrier = {
                selector: "fluffy",
                data: JSON.stringify(fluffyMessage)
            };
            socket.send(JSON.stringify(textCarrier));
        }
        else if (_direction == "right") {
            const fluffyMessage = {
                direction: "right"
            };
            const textCarrier = {
                selector: "fluffy",
                data: JSON.stringify(fluffyMessage)
            };
            socket.send(JSON.stringify(textCarrier));
        }
        else if (_direction == "bottom") {
            const fluffyMessage = {
                direction: "bottom"
            };
            const textCarrier = {
                selector: "fluffy",
                data: JSON.stringify(fluffyMessage)
            };
            socket.send(JSON.stringify(textCarrier));
        }
        else if (_direction == "left") {
            const fluffyMessage = {
                direction: "left"
            };
            const textCarrier = {
                selector: "fluffy",
                data: JSON.stringify(fluffyMessage)
            };
            socket.send(JSON.stringify(textCarrier));
        }
        FluffyPong.fluffies.splice(FluffyPong.fluffies.indexOf(_fluffy), 1);
        FluffyPong.crc2.putImageData(FluffyPong.imgData, 0, 0);
        for (let fluffy of FluffyPong.fluffies) {
            fluffy.draw();
        }
    }
    FluffyPong.sendFluffy = sendFluffy;
    function getRanking() {
        console.log("ranking");
        const gameEndMessage = {
            name: name,
            fluffyAmount: FluffyPong.fluffies.length
        };
        const textCarrier = {
            selector: "ranking",
            data: JSON.stringify(gameEndMessage)
        };
        socket.send(JSON.stringify(textCarrier));
    }
    FluffyPong.getRanking = getRanking;
    function gameTimer() {
        if (timer > 0) {
            timer--;
            let timerElement = document.getElementById("timer");
            timerElement.innerHTML = timer + "s";
        }
        else {
            clearInterval();
        }
    }
})(FluffyPong || (FluffyPong = {})); //namespace
//# sourceMappingURL=client.js.map