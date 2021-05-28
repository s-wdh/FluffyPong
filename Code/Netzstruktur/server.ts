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
                        const textCarrier: CarrierMessage = {
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
            let socketPosition: number = clientSockets.indexOf(socket);
            clientSockets.splice(socketPosition);
            for (let playerElement of playerNameList) {
                if (playerElement.position == socketPosition) {
                    console.log(playerElement);
                    playerNameList.splice(playerNameList.indexOf(playerElement));
                    console.log(playerNameList);
                    for (let socket of clientSockets) {
                        const textCarrier: CarrierMessage = {
                            selector: "player",
                            data: JSON.stringify(playerElement)
                        };
                        socket.send(JSON.stringify(textCarrier));
                    }
                }
            }
        });
    }); //server.on

} //namespace