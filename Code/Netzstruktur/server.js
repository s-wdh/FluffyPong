"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
var Netzstruktur;
(function (Netzstruktur) {
    // create WebSocket server with given port
    const port = Number(process.env.PORT) || 8000;
    const server = new WebSocket.Server({ port: port });
    const playerNameList = [];
    //const fluffies: Fluffy[] = [];
    // array of connected sockets
    const clientSockets = new Array();
    server.on("connection", (socket) => {
        clientSockets.push(socket);
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
            }
        });
        socket.on("close", () => {
            let socketPosition = clientSockets.indexOf(socket);
            clientSockets.splice(socketPosition);
            for (let playerElement of playerNameList) {
                if (playerElement.position == socketPosition) {
                    console.log(playerElement);
                    playerNameList.splice(playerNameList.indexOf(playerElement));
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
})(Netzstruktur = exports.Netzstruktur || (exports.Netzstruktur = {})); //namespace
//# sourceMappingURL=server.js.map