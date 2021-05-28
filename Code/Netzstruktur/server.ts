import * as WebSocket from "ws";

export namespace Netzstruktur {

    // carrier message interface
    interface CarrierMessage {
        selector: string;
        data?: string;
    }

    // player name interface
    interface Player {
        name: string;
        position: number;
    }

    // define count to give out different client ids
    //let clientIdCounter: number = 0;

    // create WebSocket server with given port
    const port: number = Number(process.env.PORT) || 8000;
    const server: WebSocket.Server = new WebSocket.Server({ port: port });

    const playerNameList: Player[] = [];

    // array of connected sockets
    const clientSockets: Array<WebSocket> = new Array();

    server.on("connection", (socket) => {
        clientSockets.push(socket);

        socket.on("message", (message) => {
            const carrierMessage: CarrierMessage = <CarrierMessage>JSON.parse(<string>message);
            const selector: string = carrierMessage.selector;
            const data: string | undefined = carrierMessage.data;

            switch (selector) {
                case "player": {
                    const playerInfo: Player = <Player>JSON.parse(<string>data);
                    playerInfo.position = clientSockets.indexOf(socket);

                    // add message to message list
                    playerNameList.push(playerInfo);
                    console.log(`#${playerInfo.name}: "${playerInfo.position}"`);

                    // broadcast message to all connected clients
                    for (let socket of clientSockets) {
                        socket.send(message);
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

} //namespace