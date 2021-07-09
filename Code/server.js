"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
var FluffyPong;
(function (FluffyPong) {
    // create WebSocket server with given port
    const port = Number(process.env.PORT) || 8000;
    const server = new WebSocket.Server({ port: port });
    //arrays to calculate the ranking after a game round is finished
    const ranking = [];
    const fluffyAmounts = [];
    const rankingHelp = [];
    // set a Timer for the End of the game round
    let timer = 60;
    // array of connected sockets
    const clientSockets = new Array();
    // Map for the names of the player connected to the socket
    const playerInfos = new Map();
    server.on("connection", (socket) => {
        clientSockets.push(socket);
        const player = { name: "" };
        playerInfos.set(socket, player);
        //start the timer when first player connects to the server
        setInterval(function gameTimer() {
            if (timer > 0) {
                timer--;
            }
        }, 1000);
        //send the rest amount of the timer to every player after connection
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
                    //save the name in playerInfos Map
                    const playerInfo = JSON.parse(data);
                    playerInfos.set(socket, playerInfo);
                    //console log it to check if it arrived on the server
                    console.log(`#playername: ${playerInfo.name}`);
                    console.log("clientsockets.length:" + clientSockets.length);
                    break;
                } // case player
                //ping-pong between server and client, so the server can't close while playing
                case "ping": {
                    const textCarrier = {
                        selector: "pong"
                    };
                    socket.send(JSON.stringify(textCarrier));
                    //console.log("ping");
                    break;
                } // case ping-pong
                //fluffy arrived at the server an has to be sent to the correct new player (thus the direction attribute)
                case "fluffy": {
                    const fluffy = JSON.parse(data);
                    let socketPosition = clientSockets.indexOf(socket);
                    console.log(socketPosition);
                    console.log("fluffy direction:" + fluffy.direction);
                    let indexNewPlayer;
                    let newPlayer;
                    switch (fluffy.direction) {
                        case "top": {
                            //calculate and find the player who should get the fluffy
                            indexNewPlayer = socketPosition + 1;
                            newPlayer = clientSockets[indexNewPlayer];
                            //if the old player is the last one in the socket array, choose the first one as new socket
                            if (!newPlayer) {
                                newPlayer = clientSockets[0];
                            }
                            //prepare the carrier and send it to the socket of the player who gets the fluffy
                            const textCarrier = {
                                selector: "fluffy",
                                data: JSON.stringify(fluffy)
                            };
                            newPlayer.send(JSON.stringify(textCarrier));
                            //console.log(textCarrier);
                            break;
                        }
                        case "right": {
                            //calculate and find the player who should get the fluffy
                            indexNewPlayer = socketPosition - 1;
                            newPlayer = clientSockets[indexNewPlayer];
                            //if the old player is the first one in the socket array, choose the last one as new socket
                            if (!newPlayer) {
                                newPlayer = clientSockets[(clientSockets.length - 1)];
                            }
                            //prepare the carrier and send it to the socket of the player who gets the fluffy
                            const textCarrier = {
                                selector: "fluffy",
                                data: JSON.stringify(fluffy)
                            };
                            newPlayer.send(JSON.stringify(textCarrier));
                            //console.log(textCarrier);
                            break;
                        }
                        case "bottom": {
                            //calculate and find the player who should get the fluffy
                            indexNewPlayer = socketPosition - 1;
                            newPlayer = clientSockets[indexNewPlayer];
                            //if the old player is the first one in the socket array, choose the last one as new socket
                            if (!newPlayer) {
                                newPlayer = clientSockets[(clientSockets.length - 1)];
                            }
                            //prepare the carrier and send it to the socket of the player who gets the fluffy
                            const textCarrier = {
                                selector: "fluffy",
                                data: JSON.stringify(fluffy)
                            };
                            newPlayer.send(JSON.stringify(textCarrier));
                            //console.log(textCarrier);
                            break;
                        }
                        case "left": {
                            //calculate and find the player who should get the fluffy
                            indexNewPlayer = socketPosition + 1;
                            newPlayer = clientSockets[indexNewPlayer];
                            //if the old player is the last one in the socket array, choose the first one as new socket
                            if (!newPlayer) {
                                newPlayer = clientSockets[0];
                            }
                            //prepare the carrier and send it to the socket of the player who gets the fluffy
                            const textCarrier = {
                                selector: "fluffy",
                                data: JSON.stringify(fluffy)
                            };
                            newPlayer.send(JSON.stringify(textCarrier));
                            //console.log(textCarrier);
                            break;
                        }
                    } //switch (fluffy.direction)
                    break;
                } //case fluffy
                //get the fluffy amount of all players and generate the ranking out of it
                case "ranking": {
                    const playerData = JSON.parse(data);
                    //save the incoming ranking data of every player in rankingHelp array
                    rankingHelp.push(playerData);
                    if (rankingHelp.length == clientSockets.length && timer == 0) {
                        //when server finally has the ranking of every player
                        for (let element of rankingHelp) {
                            fluffyAmounts.push(element.fluffyAmount);
                        }
                        //sort the fluffyAmounts array, so the player with the least fluffies is at position 0
                        fluffyAmounts.sort(function (a, b) { return a - b; });
                        //sort the players with the position, name and fluffy Amount into the ranking array
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
                        //send the complete ranking to every player so they can see it
                        for (socket of clientSockets) {
                            const textCarrier = {
                                selector: "ranking",
                                data: JSON.stringify(ranking)
                            };
                            socket.send(JSON.stringify(textCarrier));
                        }
                        //reset all arrays
                        fluffyAmounts.splice(0, fluffyAmounts.length);
                        rankingHelp.splice(0, rankingHelp.length);
                        ranking.splice(0, ranking.length);
                        newRound();
                    }
                    else {
                        //wait for all rankings to arrive on the server
                        console.log("noch nicht alle Rankings da");
                    }
                    break;
                } // case ranking
            } //switch (selector)
        }); //socket on ("message")
        //delete player after they closed the tab and left the game
        socket.on("close", () => {
            let socketPosition = clientSockets.indexOf(socket);
            console.log("socket deletet:" + playerInfos.get(socket));
            clientSockets.splice(socketPosition);
            playerInfos.delete(socket);
        });
    }); //server.on
    //reset the timer and delete all sockets and player names, so a next round can be played after the client has reloaded the page
    function newRound() {
        timer = 60;
        for (let socketElement of clientSockets) {
            clientSockets.splice(clientSockets.indexOf(socketElement));
            playerInfos.delete(socketElement);
            console.log(clientSockets.length, playerInfos.entries.length);
        }
    }
})(FluffyPong = exports.FluffyPong || (exports.FluffyPong = {})); //namespace
//# sourceMappingURL=server.js.map