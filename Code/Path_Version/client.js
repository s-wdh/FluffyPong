"use strict";
var FluffyPong_Path;
(function (FluffyPong_Path) {
    //change the server
    //const socket: WebSocket = new WebSocket("ws://localhost:8000/");
    const socket = new WebSocket("wss://fluffypong.herokuapp.com/");
    //variables for the name input
    let namefield;
    let name;
    let namesent = false;
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        console.log("load");
        let helpbtn = document.getElementById("help");
        helpbtn.addEventListener("click", showExplanation);
        namefield = document.getElementById("playername");
        //send name to server after click on start button
        let startbtn = document.getElementById("start");
        startbtn.addEventListener("click", sendName);
        //ping-pong between server and client, so the server can't close while playing
        window.setInterval(sendPing, 5000);
    }
    //arrays for fluffies, walls and holes of the player
    FluffyPong_Path.fluffies = [];
    FluffyPong_Path.walls = [];
    FluffyPong_Path.wallHoles = [];
    let timer;
    let gmTimer;
    // listen to message from server
    socket.addEventListener("message", (event) => {
        const carrier = JSON.parse(event.data);
        const selector = carrier.selector;
        const data = carrier.data;
        switch (selector) {
            //ping-pong between server and client, so the server can't close while playing
            case "pong": {
                console.log(selector);
                break;
            }
            //fluffy arrives at player and has to be drawn at the correct position onto the canvas
            case "fluffy": {
                if (namesent == true) {
                    const fluffy = JSON.parse(data);
                    //define standart values, if something went wrong with the direction
                    let x = (FluffyPong_Path.canvasWidth / 2);
                    let y = (FluffyPong_Path.canvasHeight / 2);
                    //overwrite them with the correct values ...
                    switch (fluffy.direction) {
                        case "top":
                            x = fluffy.position;
                            y = FluffyPong_Path.fluffyHeight;
                            break;
                        case "right":
                            x = (FluffyPong_Path.canvasWidth - FluffyPong_Path.fluffyWidth);
                            y = fluffy.position;
                            break;
                        case "bottom":
                            x = fluffy.position;
                            y = (FluffyPong_Path.canvasHeight - FluffyPong_Path.fluffyHeight);
                            break;
                        case "left":
                            x = FluffyPong_Path.fluffyWidth;
                            y = fluffy.position;
                            break;
                    }
                    //... and generate and draw the new fluffy at the position
                    if (x > FluffyPong_Path.canvasWidth - FluffyPong_Path.fluffyWidth) {
                        x = (FluffyPong_Path.canvasWidth / 2);
                    }
                    if (y > FluffyPong_Path.canvasHeight - FluffyPong_Path.fluffyHeight) {
                        y = (FluffyPong_Path.canvasHeight / 2);
                    }
                    //... and generate and draw the new fluffy at the position
                    let position = new FluffyPong_Path.Vector(x, y);
                    let newFluffy = new FluffyPong_Path.FluffyElement(position);
                    newFluffy.generateColor();
                    newFluffy.draw();
                    FluffyPong_Path.fluffies.unshift(newFluffy);
                }
                break;
            }
            //ranking generated from the server arrives
            case "ranking": {
                if (namesent == true) {
                    const ranking = JSON.parse(data);
                    createRankingTable(ranking);
                }
                break;
            }
            //timer arrives, timer function is started and end of round is set to send the ranking to the sever then
            case "timer": {
                timer = JSON.parse(data);
                window.setTimeout(getRanking, (timer * 1000));
                gmTimer = setInterval(gameTimer, 1000);
                break;
            }
        }
    });
    //ping-pong between server and client, so the server can't close while playing
    function sendPing() {
        const textCarrier = {
            selector: "ping"
        };
        socket.send(JSON.stringify(textCarrier));
    }
    function showExplanation() {
        let close = document.getElementById("closebtn");
        let div = document.getElementById("alert");
        div.style.opacity = "1";
        close.addEventListener("click", function closeAlert() {
            div.style.opacity = "0";
        });
    }
    //send name of the player to the server and prepare the start of the game
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
        //delete the start div
        let startdiv = document.getElementById("startdiv");
        let startParent = startdiv.parentNode;
        startParent.removeChild(startdiv);
        let alertdiv = document.getElementById("alert");
        let alertParent = alertdiv.parentNode;
        alertParent.removeChild(alertdiv);
        FluffyPong_Path.prepareCanvas();
        namesent = true;
    }
    //send a fluffy to the server after it passed a succesfull through an hole
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
    FluffyPong_Path.sendFluffy = sendFluffy;
    //send the ranking to the server, when the timer is at 0
    function getRanking() {
        //console.log("ranking");
        const gameEndMessage = {
            name: name,
            fluffyAmount: FluffyPong_Path.fluffies.length
        };
        const textCarrier = {
            selector: "ranking",
            data: JSON.stringify(gameEndMessage)
        };
        socket.send(JSON.stringify(textCarrier));
    }
    FluffyPong_Path.getRanking = getRanking;
    //create the timer, which reduces by 1 every second
    function gameTimer() {
        if (timer > 0) {
            timer--;
            //only show the timer for the player, if he isn't on the start page anymore
            if (namesent == true) {
                let timerElement = document.getElementById("timer");
                timerElement.innerHTML = timer + "s";
            }
        }
        else {
            clearInterval(gmTimer);
        }
    }
    //create a table with the ranking so it's clearly vissible for the player
    function createRankingTable(_ranking) {
        let div = document.createElement("div");
        document.body.appendChild(div);
        div.id = "rankingDiv";
        let width = FluffyPong_Path.canvasWidth - (2 * FluffyPong_Path.borderWidth) - 6;
        div.style.width = width.toString() + "px";
        div.style.margin = FluffyPong_Path.borderWidth.toString() + "px";
        let title = document.createElement("h4");
        title.innerHTML = "Ergebnisse dieser Spielrunde:";
        div.appendChild(title);
        let table = document.createElement("table");
        div.appendChild(table);
        table.classList.add("table");
        //make table responsive
        table.style.margin = "2px";
        let tableWidth = width - 4;
        table.style.width = tableWidth.toString() + "px";
        //generate the head line of the table
        let header = document.createElement("tr");
        let thposition = document.createElement("th");
        thposition.innerHTML = "Position";
        let thname = document.createElement("th");
        thname.innerHTML = "Name";
        let thfluffyAmount = document.createElement("th");
        thfluffyAmount.innerHTML = "Fluffy Menge";
        header.appendChild(thposition);
        header.appendChild(thname);
        header.appendChild(thfluffyAmount);
        table.appendChild(header);
        //write each player in the table for the ranking
        for (let index = 0; index < _ranking.length; index++) {
            let row = document.createElement("tr");
            let tdposition = document.createElement("td");
            let tdname = document.createElement("td");
            let tdfluffyAmount = document.createElement("td");
            tdposition.innerHTML = "" + _ranking[index].position;
            tdname.innerHTML = _ranking[index].name;
            tdfluffyAmount.innerHTML = "" + _ranking[index].fluffyAmount;
            //highlight the player
            if (_ranking[index].name == name) {
                row.style.backgroundColor = "#ffb3d1";
            }
            row.appendChild(tdposition);
            row.appendChild(tdname);
            row.appendChild(tdfluffyAmount);
            table.appendChild(row);
        }
        //console.table(table);
        //write a short note, how the player can start the next game round
        let newRound = document.createElement("p");
        newRound.classList.add("newRound");
        newRound.innerHTML = "Lade die Seite neu, falls du nochmals eine Runde spielen möchtest!";
        div.appendChild(newRound);
    }
})(FluffyPong_Path || (FluffyPong_Path = {})); //namespace
//# sourceMappingURL=client.js.map