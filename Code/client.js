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
    FluffyPong.wallHoles = [];
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
                //console.log(playerNameList);
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
                //console.log("fluffy");
                switch (fluffy.direction) {
                    case "top":
                        x = fluffy.position;
                        y = FluffyPong.fluffyHeight;
                        break;
                    case "right":
                        x = (FluffyPong.canvasWidth - FluffyPong.fluffyWidth);
                        y = fluffy.position;
                        break;
                    case "bottom":
                        x = fluffy.position;
                        y = (FluffyPong.canvasHeight - FluffyPong.fluffyHeight);
                        break;
                    case "left":
                        x = FluffyPong.fluffyWidth;
                        y = fluffy.position;
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
    function sendFluffy(_fluffyPosition, _direction) {
        //console.log(fluffies.length);
        if (_direction == "top") {
            const fluffyMessage = {
                position: _fluffyPosition,
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
                position: _fluffyPosition,
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
                position: _fluffyPosition,
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
                position: _fluffyPosition,
                direction: "left"
            };
            const textCarrier = {
                selector: "fluffy",
                data: JSON.stringify(fluffyMessage)
            };
            socket.send(JSON.stringify(textCarrier));
        }
    }
    FluffyPong.sendFluffy = sendFluffy;
    function getRanking() {
        //console.log("ranking");
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
        //console.log("help");
        let div = document.createElement("div");
        document.body.appendChild(div);
        div.id = "rankingDiv";
        //console.log(div);
        let table = document.createElement("table");
        div.appendChild(table);
        table.classList.add("table");
        table.style.margin = FluffyPong.borderWidth.toString() + "px";
        let width = FluffyPong.canvasWidth - (2 * FluffyPong.borderWidth) - 6;
        table.style.width = width.toString() + "px";
        let heading = document.createElement("tr");
        let thposition = document.createElement("th");
        thposition.innerHTML = "Position";
        let thname = document.createElement("th");
        thname.innerHTML = "Name";
        let thfluffyAmount = document.createElement("th");
        thfluffyAmount.innerHTML = "Fluffy Menge";
        heading.appendChild(thposition);
        heading.appendChild(thname);
        heading.appendChild(thfluffyAmount);
        table.appendChild(heading);
        for (let index = 0; index < _ranking.length; index++) {
            let row = document.createElement("tr");
            let tdposition = document.createElement("td");
            let tdname = document.createElement("td");
            let tdfluffyAmount = document.createElement("td");
            tdposition.innerHTML = "" + _ranking[index].position;
            tdname.innerHTML = _ranking[index].name;
            tdfluffyAmount.innerHTML = "" + _ranking[index].fluffyAmount;
            row.appendChild(tdposition);
            row.appendChild(tdname);
            row.appendChild(tdfluffyAmount);
            table.appendChild(row);
        }
        //console.table(table);
    }
})(FluffyPong || (FluffyPong = {})); //namespace
//# sourceMappingURL=client.js.map