"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
var FluffyPong;
(function (FluffyPong) {
    // create WebSocket server with given port
    const port = Number(process.env.PORT) || 8000;
    const server = new WebSocket.Server({ port: port });
    //const playerNameList: Player[] = [];
    const ranking = [];
    const fluffyAmounts = [];
    const rankingHelp = [];
    // set a Timer for the End of the game round
    let timer = 60;
    // array of connected sockets
    const clientSockets = new Array();
    const playerInfos = new Map();
    server.on("connection", (socket) => {
        clientSockets.push(socket);
        const player = { name: "" };
        playerInfos.set(socket, player);
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
                    playerInfos.set(socket, playerInfo);
                    console.log(`#playername: ${playerInfo.name}`);
                    console.log("clientsockets.length:" + clientSockets.length);
                    // send new player to all connected clients
                    for (let socket of clientSockets) {
                        const textCarrier = {
                            selector: "player",
                            data: JSON.stringify(playerInfo)
                        };
                        socket.send(JSON.stringify(textCarrier));
                    }
                    break;
                } // case player
                case "ping": {
                    const textCarrier = {
                        selector: "pong"
                    };
                    socket.send(JSON.stringify(textCarrier));
                    //console.log("ping");
                    break;
                } // case ping-pong
                case "fluffy": {
                    const fluffy = JSON.parse(data);
                    let socketPosition = clientSockets.indexOf(socket);
                    console.log(socketPosition);
                    console.log("fluffy direction:" + fluffy.direction);
                    let indexNewPlayer;
                    let newPlayer;
                    switch (fluffy.direction) {
                        case "top": {
                            indexNewPlayer = socketPosition + 1;
                            //console.log(socketPosition, indexNewPlayer);
                            newPlayer = clientSockets[indexNewPlayer];
                            if (!newPlayer) {
                                newPlayer = clientSockets[0];
                            }
                            //console.log(`${clientSockets.indexOf(newPlayer)}` + `${playerInfos.get(newPlayer)}`);
                            const textCarrier = {
                                selector: "fluffy",
                                data: JSON.stringify(fluffy)
                            };
                            newPlayer.send(JSON.stringify(textCarrier));
                            console.log(textCarrier);
                            break;
                        }
                        case "right": {
                            indexNewPlayer = socketPosition - 1;
                            newPlayer = clientSockets[indexNewPlayer];
                            if (!newPlayer) {
                                newPlayer = clientSockets[(clientSockets.length - 1)];
                            }
                            //console.log(`${clientSockets.indexOf(newPlayer)}` + `${playerInfos.get(newPlayer)}`);
                            const textCarrier = {
                                selector: "fluffy",
                                data: JSON.stringify(fluffy)
                            };
                            newPlayer.send(JSON.stringify(textCarrier));
                            console.log(textCarrier);
                            break;
                        }
                        case "bottom": {
                            indexNewPlayer = socketPosition - 1;
                            newPlayer = clientSockets[indexNewPlayer];
                            if (!newPlayer) {
                                newPlayer = clientSockets[(clientSockets.length - 1)];
                            }
                            //console.log(`${clientSockets.indexOf(newPlayer)}` + `${playerInfos.get(newPlayer)}`);
                            const textCarrier = {
                                selector: "fluffy",
                                data: JSON.stringify(fluffy)
                            };
                            newPlayer.send(JSON.stringify(textCarrier));
                            console.log(textCarrier);
                            break;
                        }
                        case "left": {
                            indexNewPlayer = socketPosition + 1;
                            newPlayer = clientSockets[indexNewPlayer];
                            if (!newPlayer) {
                                newPlayer = clientSockets[0];
                            }
                            //console.log(`${clientSockets.indexOf(newPlayer)}` + `${playerInfos.get(newPlayer)}`);
                            const textCarrier = {
                                selector: "fluffy",
                                data: JSON.stringify(fluffy)
                            };
                            newPlayer.send(JSON.stringify(textCarrier));
                            console.log(textCarrier);
                            break;
                        }
                    } //switch (fluffy.direction)
                    break;
                } //case fluffy
                case "ranking": {
                    const playerData = JSON.parse(data);
                    rankingHelp.push(playerData);
                    for (let element of rankingHelp) {
                        fluffyAmounts.push(element.fluffyAmount);
                    }
                    if (rankingHelp.length == clientSockets.length) {
                        fluffyAmounts.sort(function (a, b) { return a - b; });
                        for (let index = 0; index < fluffyAmounts.length; index++) {
                            for (let element of rankingHelp) {
                                if (element.fluffyAmount == fluffyAmounts[index]) {
                                    element.position = index;
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
                        fluffyAmounts.splice(0, fluffyAmounts.length);
                        rankingHelp.splice(0, rankingHelp.length);
                        ranking.splice(0, ranking.length);
                    }
                    else {
                        console.log("nöö");
                    }
                    break;
                } // case ranking
            } //switch (selector)
        }); //socket on ("message")
        socket.on("close", () => {
            let socketPosition = clientSockets.indexOf(socket);
            clientSockets.splice(socketPosition);
            console.log(playerInfos.get(socket));
            playerInfos.delete(socket);
            console.log(`socket deletet: ${playerInfos.get(socket)}`);
        });
    }); //server.on
})(FluffyPong = exports.FluffyPong || (exports.FluffyPong = {})); //namespace
//# sourceMappingURL=server.js.map