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
        position: number;
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

    const playerNameList: Player[] = [];
    const ranking: Ranking[] = [];
    let fluffyAmounts: number[] = [];

    // set a Timer for the End of the game round
    let timer: number = 60;

    // array of connected sockets
    const clientSockets: Array<WebSocket> = new Array();

    server.on("connection", (socket) => {
        clientSockets.push(socket);

        setInterval(function gameTimer(): void {
            if (timer > 0) {
                timer--;
        }},         1000);
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
                    const fluffy: Fluffy = <Fluffy>JSON.parse(<string>data);
                    let socketPosition: number = clientSockets.indexOf(socket);
                    console.log(socketPosition);
                    console.log(`#${fluffy.object}: "${fluffy.direction}"`);
                    for (let playerElement of playerNameList) {
                        if (playerElement.position == socketPosition) {
                            console.log(playerElement);
                            let indexOldPlayer: number = playerNameList.indexOf(playerElement);
                            let indexNewPlayer: number;
                            let newPlayer: Player;
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
                                            const textCarrier: CarrierMessage = {
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
                                        if (!newPlayer) {
                                            newPlayer = playerNameList[(playerNameList.length - 1)];
                                        }
                                        console.log(`${newPlayer}`);
                                        if (newPlayer.position == clientSockets.indexOf(socket)) {
                                            const textCarrier: CarrierMessage = {
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
                                        if (!newPlayer) {
                                            newPlayer = playerNameList[(playerNameList.length - 1)];
                                        }
                                        console.log(`${newPlayer}`);
                                        if (newPlayer.position == clientSockets.indexOf(socket)) {
                                            const textCarrier: CarrierMessage = {
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
                                        if (!newPlayer) {
                                            newPlayer = playerNameList[0];
                                        }
                                        console.log(`${newPlayer}`);
                                        if (newPlayer.position == clientSockets.indexOf(socket)) {
                                            const textCarrier: CarrierMessage = {
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
                }
            }
        });
        socket.on("close", () => {
            let socketPosition: number = clientSockets.indexOf(socket);
            clientSockets.splice(socketPosition);
            for (let playerElement of playerNameList) {
                if (playerElement.position == socketPosition) {
                    console.log(playerElement);
                    playerNameList.splice(playerNameList.indexOf(playerElement), 1);
                    console.log(playerNameList);
                    for (let socket of clientSockets) {
                        const textCarrier: CarrierMessage = {
                            selector: "deletePlayer",
                            data: JSON.stringify(playerElement)
                        };
                        socket.send(JSON.stringify(textCarrier));
                    }
                }
            }
        });
    }); //server.on

} //namespace