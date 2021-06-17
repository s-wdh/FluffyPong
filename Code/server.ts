import * as WebSocket from "ws";

export namespace FluffyPong {

    // carrier message interface
    interface CarrierMessage {
        selector: string;
        data?: string;
    }

    // player name interface
    interface Player {
        name: string;
    }

    //fluffy interface
    interface Fluffy {
        object?: HTMLCanvasElement;
        direction: string;
    }

    //interface for the ranking of players
    interface Ranking {
        position?: number;
        name: string;
        fluffyAmount: number;
    }

    // create WebSocket server with given port
    const port: number = Number(process.env.PORT) || 8000;
    const server: WebSocket.Server = new WebSocket.Server({ port: port });

    //const playerNameList: Player[] = [];
    const ranking: Ranking[] = [];
    let fluffyAmounts: number[] = [];

    // set a Timer for the End of the game round
    let timer: number = 20;

    // array of connected sockets
    const clientSockets: Array<WebSocket> = new Array();
    const playerInfos: Map<WebSocket, Player> = new Map();

    server.on("connection", (socket) => {
        clientSockets.push(socket);
        const player: Player = { name: "" };
        playerInfos.set(socket, player);

        setInterval(function gameTimer(): void {
            if (timer > 0) {
                timer--;
            }
        },          1000);
        const textCarrier: CarrierMessage = {
            selector: "timer",
            data: JSON.stringify(timer)
        };
        socket.send(JSON.stringify(textCarrier));

        socket.on("message", (message) => {
            const carrierMessage: CarrierMessage = <CarrierMessage>JSON.parse(<string>message);
            const selector: string = carrierMessage.selector;
            const data: string | undefined = carrierMessage.data;

            switch (selector) {
                case "player": {
                    const playerInfo: Player = <Player>JSON.parse(<string>data);
                    playerInfos.set(socket, playerInfo);

                    console.log(`#playername: ${playerInfo.name}`);
                    console.log("clientsockets.length:" + clientSockets.length);

                    // send new player to all connected clients
                    for (let socket of clientSockets) {
                        const textCarrier: CarrierMessage = {
                            selector: "player",
                            data: JSON.stringify(playerInfo)
                        };
                        socket.send(JSON.stringify(textCarrier));
                    }
                    break;
                } // case player

                case "ping": {
                    const textCarrier: CarrierMessage = {
                        selector: "pong"
                    };
                    socket.send(JSON.stringify(textCarrier));
                    console.log("ping");
                } // case ping-pong

                case "fluffy": {
                    const fluffy: Fluffy = <Fluffy>JSON.parse(<string>data);
                    let socketPosition: number = clientSockets.indexOf(socket);
                    console.log(socketPosition);
                    console.log("fluffy direction:" + fluffy.direction);

                    let indexNewPlayer: number;
                    let newPlayer: WebSocket;
                    switch (fluffy.direction) {
                        case "top": {
                            indexNewPlayer = socketPosition + 1;
                            console.log(socketPosition, indexNewPlayer);
                            newPlayer = clientSockets[indexNewPlayer];
                            if (!newPlayer) {
                                newPlayer = clientSockets[0];
                            }
                            console.log(`${clientSockets.indexOf(newPlayer)}` + `${playerInfos.get(newPlayer)}`);
                            const textCarrier: CarrierMessage = {
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
                            console.log(`${clientSockets.indexOf(newPlayer)}` + `${playerInfos.get(newPlayer)}`);
                            const textCarrier: CarrierMessage = {
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
                            console.log(`${clientSockets.indexOf(newPlayer)}` + `${playerInfos.get(newPlayer)}`);
                            const textCarrier: CarrierMessage = {
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
                            console.log(`${clientSockets.indexOf(newPlayer)}` + `${playerInfos.get(newPlayer)}`);
                            const textCarrier: CarrierMessage = {
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
                    const playerData: Ranking = <Ranking>JSON.parse(<string>data);
                    let rankingHelp: Ranking[] = [];
                    rankingHelp.push(playerData);
                    for (let element of rankingHelp) {
                        fluffyAmounts.push(element.fluffyAmount);
                    }
                    fluffyAmounts.sort(function (a: number, b: number): number { return a - b; });
                    for (let index: number = 0; index < fluffyAmounts.length; index++) {
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
                        const textCarrier: CarrierMessage = {
                            selector: "ranking",
                            data: JSON.stringify(ranking)
                        };
                        socket.send(JSON.stringify(textCarrier));
                    }
                    break;
                } // case ranking
            } //switch (selector)
        }); //socket on ("message")

        socket.on("close", () => {
            let socketPosition: number = clientSockets.indexOf(socket);
            clientSockets.splice(socketPosition);
            console.log(playerInfos.get(socket));
            playerInfos.delete(socket);
            console.log(`socket deletet: ${playerInfos.get(socket)}`);
        });
    }); //server.on

} //namespace