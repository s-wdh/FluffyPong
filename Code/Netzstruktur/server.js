"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
var Netzstruktur;
(function (Netzstruktur) {
    // define count to give out different client ids
    //let clientIdCounter: number = 0;
    // create WebSocket server with given port
    const port = Number(process.env.PORT) || 8000;
    const server = new WebSocket.Server({ port: port });
    const playerNameList = [];
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
                    break;
                }
            }
        });
        socket.on("close", () => {
            clientSockets.splice(clientSockets.indexOf(socket));
            /* playerNameList.splice();
            playerPosition.splice(); */
        });
    }); //server.on
})(Netzstruktur = exports.Netzstruktur || (exports.Netzstruktur = {})); //namespace
//# sourceMappingURL=server.js.map