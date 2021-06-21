"use strict";
var FluffyPong;
(function (FluffyPong) {
    //const socket: WebSocket = new WebSocket("ws://localhost:8000/");
    const socket = new WebSocket("wss://fluffypong.herokuapp.com/");
    let namefield;
    let name;
    let namesent = false;
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        console.log("load");
        namefield = document.getElementById("playername");
        //send name to server
        let startbtn = document.getElementById("start");
        startbtn.addEventListener("click", function () {
            sendName();
        });
        window.setInterval(sendPing, 5000);
    }
    FluffyPong.fluffies = [];
    FluffyPong.walls = [];
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
            case "pong": {
                console.log(selector);
                break;
            }
            case "fluffy": {
                const fluffy = JSON.parse(data);
                let x = (FluffyPong.canvasWidth / 2);
                let y = (FluffyPong.canvasHeight / 2);
                console.log("fluffy");
                switch (fluffy.direction) {
                    case "top":
                        x = (FluffyPong.canvasWidth / 2);
                        y = 0;
                        break;
                    case "right":
                        x = FluffyPong.canvasWidth;
                        y = (FluffyPong.canvasHeight / 2);
                        break;
                    case "bottom":
                        x = (FluffyPong.canvasWidth / 2);
                        y = FluffyPong.canvasHeight;
                        break;
                    case "left":
                        x = 0;
                        y = (FluffyPong.canvasHeight / 2);
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
                createRankingTable(ranking);
                break;
            }
            case "timer": {
                timer = JSON.parse(data);
                window.setTimeout(getRanking, (timer * 1000));
                window.setInterval(gameTimer, 1000);
                break;
            }
        }
    });
    function sendPing() {
        const textCarrier = {
            selector: "ping"
        };
        socket.send(JSON.stringify(textCarrier));
    }
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
        namesent = true;
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
            if (namesent == true) {
                let timerElement = document.getElementById("timer");
                timerElement.innerHTML = timer + "s";
            }
        }
        else {
            clearInterval();
        }
    }
    function createRankingTable(_ranking) {
        console.log("help");
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        document.removeChild(canvas);
        console.log("help");
        let table = document.createElement("table");
        let row = document.createElement("tr");
        let tdposition = document.createElement("td");
        let tdname = document.createElement("td");
        let tdfluffyAmount = document.createElement("td");
        for (let index = 0; index < _ranking.length; index++) {
            tdposition.innerHTML = "" + _ranking[index].position;
            tdname.innerHTML = _ranking[index].name;
            tdfluffyAmount.innerHTML = "" + _ranking[index].fluffyAmount;
            row.appendChild(tdposition);
            row.appendChild(tdname);
            row.appendChild(tdfluffyAmount);
            table.appendChild(row);
        }
    }
})(FluffyPong || (FluffyPong = {})); //namespace
//# sourceMappingURL=client.js.map