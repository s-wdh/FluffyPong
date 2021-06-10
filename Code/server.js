"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
var FluffyPong;
(function (FluffyPong) {
    // create WebSocket server with given port
    const port = Number(process.env.PORT) || 8000;
    const server = new WebSocket.Server({ port: port });
    const playerNameList = [];
    const ranking = [];
    let fluffyAmounts = [];
    // set a Timer for the End of the game round
    let timer = 60;
    // array of connected sockets
    const clientSockets = new Array();
    server.on("connection", (socket) => {
        clientSockets.push(socket);
        setInterval(function gameTimer() {
            if (timer > 0) {
                timer--;
            }
        }, 1000);
        const textCarrier = {
            selector: "timer",
            data: JSON.stringify(timer)
        };
        socket.send(JSON.stringify(textCarrier));
        socket.on("message", (message) => {
            const carrierMessage = JSON.parse(message);
            const selector = carrierMessage.selector;
            const data = carrierMessage.data;
            switch (selector) {
                case "player": {
                    const playerInfo = JSON.parse(data);
                    playerInfo.position = clientSockets.indexOf(socket);
                    // add message to message list
                    playerNameList.push(playerInfo);
                    console.log(`#${playerInfo.name}: "${playerInfo.position}"`);
                    // broadcast message to all connected clients
                    for (let socket of clientSockets) {
                        const textCarrier = {
                            selector: "player",
                            data: JSON.stringify(playerInfo)
                        };
                        socket.send(JSON.stringify(textCarrier));
                    }
                    break;
                }
                case "fluffy": {
                    const fluffy = JSON.parse(data);
                    let socketPosition = clientSockets.indexOf(socket);
                    console.log(socketPosition);
                    console.log(`#${fluffy.object}: "${fluffy.direction}"`);
                    for (let playerElement of playerNameList) {
                        if (playerElement.position == socketPosition) {
                            console.log(playerElement);
                            let indexOldPlayer = playerNameList.indexOf(playerElement);
                            let indexNewPlayer;
                            let newPlayer;
                            switch (fluffy.direction) {
                                case "top":
                                    indexNewPlayer = indexOldPlayer + 1;
                                    console.log(indexOldPlayer, indexNewPlayer);
                                    for (socket of clientSockets) {
                                        newPlayer = playerNameList[indexNewPlayer];
                                        if (!newPlayer) {
                                            newPlayer = playerNameList[0];
                                        }
                                        console.log(`${newPlayer}`);
                                        if (newPlayer.position == clientSockets.indexOf(socket)) {
                                            const textCarrier = {
                                                selector: "fluffy",
                                                data: JSON.stringify(fluffy)
                                            };
                                            socket.send(JSON.stringify(textCarrier));
                                        }
                                    }
                                    break;
                                case "right":
                                    indexNewPlayer = indexOldPlayer - 1;
                                    for (socket of clientSockets) {
                                        newPlayer = playerNameList[indexNewPlayer];
                                        if (newPlayer.position == clientSockets.indexOf(socket)) {
                                            const textCarrier = {
                                                selector: "fluffy",
                                                data: JSON.stringify(fluffy)
                                            };
                                            socket.send(JSON.stringify(textCarrier));
                                        }
                                    }
                                    break;
                                case "bottom":
                                    indexNewPlayer = indexOldPlayer - 1;
                                    for (socket of clientSockets) {
                                        newPlayer = playerNameList[indexNewPlayer];
                                        if (newPlayer.position == clientSockets.indexOf(socket)) {
                                            const textCarrier = {
                                                selector: "fluffy",
                                                data: JSON.stringify(fluffy)
                                            };
                                            socket.send(JSON.stringify(textCarrier));
                                        }
                                    }
                                    break;
                                case "left":
                                    indexNewPlayer = indexOldPlayer + 1;
                                    for (socket of clientSockets) {
                                        newPlayer = playerNameList[indexNewPlayer];
                                        if (newPlayer.position == clientSockets.indexOf(socket)) {
                                            const textCarrier = {
                                                selector: "fluffy",
                                                data: JSON.stringify(fluffy)
                                            };
                                            socket.send(JSON.stringify(textCarrier));
                                        }
                                    }
                                    break;
                            }
                        }
                    }
                    break;
                }
                case "ranking": {
                    const playerData = JSON.parse(data);
                    let rankingHelp = [];
                    rankingHelp.push(playerData);
                    for (let element of rankingHelp) {
                        fluffyAmounts.push(element.fluffyAmount);
                    }
                    fluffyAmounts.sort(function (a, b) { return a - b; });
                    for (let index = 0; index < fluffyAmounts.length; index++) {
                        for (let element of rankingHelp) {
                            if (element.fluffyAmount == fluffyAmounts[index]) {
                                element.position = index + 1;
                                ranking.push(element);
                                rankingHelp.splice(rankingHelp.indexOf(element), 1);
                            }
                        }
                    }
                    console.log(ranking);
                    for (socket of clientSockets) {
                        const textCarrier = {
                            selector: "ranking",
                            data: JSON.stringify(ranking)
                        };
                        socket.send(JSON.stringify(textCarrier));
                    }
                    break;
                }
            }
        });
        socket.on("close", () => {
            let socketPosition = clientSockets.indexOf(socket);
            clientSockets.splice(socketPosition);
            for (let playerElement of playerNameList) {
                if (playerElement.position == socketPosition) {
                    console.log(playerElement);
                    playerNameList.splice(playerNameList.indexOf(playerElement), 1);
                    console.log(playerNameList);
                    for (let socket of clientSockets) {
                        const textCarrier = {
                            selector: "deletePlayer",
                            data: JSON.stringify(playerElement)
                        };
                        socket.send(JSON.stringify(textCarrier));
                    }
                }
            }
        });
    }); //server.on
})(FluffyPong = exports.FluffyPong || (exports.FluffyPong = {})); //namespace
//# sourceMappingURL=server.js.map