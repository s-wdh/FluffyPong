namespace FluffyPong {
    //const socket: WebSocket = new WebSocket("ws://localhost:8000/");
    const socket: WebSocket = new WebSocket("wss://fluffypong.herokuapp.com/");
    let namefield: HTMLInputElement;
    let name: string;

    window.addEventListener("load", handleLoad);

    function handleLoad(): void {
        console.log("load");
        namefield = <HTMLInputElement>document.getElementById("playername");
        //send name to server
        let startbtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("start");
        startbtn.addEventListener("click", function (): void {
            sendName();
        });
    }

    // carrier message interface
    interface CarrierMessage {
        selector: string;
        data?: string;
    }

    // player name interface
    interface Player {
        name: string;
        position?: number;
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

    export let fluffies: FluffyElement[] = [];
    let playerNameList: Player[] = [];
    //let playerPosition: number[] = [0];


    // listen to message from server
    socket.addEventListener("message", (event) => {
        const carrier: CarrierMessage = <CarrierMessage>JSON.parse(event.data);
        const selector: string = carrier.selector;
        const data: string | undefined = carrier.data;

        switch (selector) {
            case "player": {
                const playerInfo: Player = <Player>JSON.parse(<string>data);
                playerNameList.push(playerInfo); // add message to message list
                console.log(playerNameList);
                break;
            }
            case "deletePlayer": {
                const deleteInfo: Player = <Player>JSON.parse(<string>data);
                for (let playerElement of playerNameList) {
                    if (playerElement.name == deleteInfo.name && playerElement.position == deleteInfo.position) {
                        playerNameList.splice(playerNameList.indexOf(playerElement)); // delete player from array
                    }
                }
                console.log(playerNameList);
                break;
            }
            case "fluffy": {
                const fluffy: Fluffy = <Fluffy>JSON.parse(<string>data);
                let x: number = 250;
                let y: number = 300;
                console.log("fluffy");
                switch (fluffy.direction) {
                    case "top":
                        x = 250;
                        y = 0;
                        break;
                    case "right":
                        x = 500;
                        y = 300;
                        break;
                    case "bottom":
                        x = 250;
                        y = 600;
                        break;
                    case "left":
                        x = 0;
                        y = 300;
                        break;
                }
                let position: Vector = new Vector(x, y);
                let newFluffy: FluffyElement = new FluffyElement(position);
                newFluffy.generateColor();
                newFluffy.draw();
                fluffies.push(newFluffy);
                break;
            }
            case "ranking": {
                const ranking: Ranking[] = <Ranking[]>JSON.parse(<string>data);
                let table: HTMLTableElement = document.createElement("table");
                let row: HTMLTableRowElement = document.createElement("tr");
                let tdposition: HTMLTableDataCellElement = document.createElement("td");
                let tdname: HTMLTableDataCellElement = document.createElement("td");
                let tdfluffyAmount: HTMLTableDataCellElement = document.createElement("td");
                for (let index: number = 0; index < ranking.length; index++) {
                    tdposition.innerHTML = "" + ranking[index].position;
                    tdname.innerHTML = ranking[index].name;
                    tdfluffyAmount.innerHTML = "" + ranking[index].fluffyAmount;
                    row.appendChild(tdposition);
                    row.appendChild(tdname);
                    row.appendChild(tdfluffyAmount);
                    table.appendChild(row);
                }
                break;
            }
        }
    });

    function sendName(): void {
        name = namefield.value;
        if (name !== "") {
            const playername: Player = {
                name: name
            };

            const textCarrier: CarrierMessage = {
                selector: "player",
                data: JSON.stringify(playername)
            };

            socket.send(JSON.stringify(textCarrier));
        }
        console.log("Name gesendet");

        let startdiv: HTMLDivElement = <HTMLDivElement>document.getElementById("startdiv");
        let parent: Node = <Node>startdiv.parentNode;
        parent.removeChild(startdiv);

        prepareCanvas();
    }

    export function sendFluffy(_fluffy: FluffyElement, _direction: string): void {
        console.log(_direction);
        if (_direction == "top") {
            const fluffyMessage: Fluffy = {
                direction: "top"
            };
            const textCarrier: CarrierMessage = {
                selector: "fluffy",
                data: JSON.stringify(fluffyMessage)
            };
            socket.send(JSON.stringify(textCarrier));
        } else if (_direction == "right") {
            const fluffyMessage: Fluffy = {
                direction: "right"
            };
            const textCarrier: CarrierMessage = {
                selector: "fluffy",
                data: JSON.stringify(fluffyMessage)
            };
            socket.send(JSON.stringify(textCarrier));
        } else if (_direction == "bottom") {
            const fluffyMessage: Fluffy = {
                direction: "bottom"
            };
            const textCarrier: CarrierMessage = {
                selector: "fluffy",
                data: JSON.stringify(fluffyMessage)
            };
            socket.send(JSON.stringify(textCarrier));
        } else if (_direction == "left") {
            const fluffyMessage: Fluffy = {
                direction: "left"
            };
            const textCarrier: CarrierMessage = {
                selector: "fluffy",
                data: JSON.stringify(fluffyMessage)
            };
            socket.send(JSON.stringify(textCarrier));
        }

        fluffies.splice(fluffies.indexOf(_fluffy), 1);

        crc2.putImageData(imgData, 0, 0);
        for (let fluffy of fluffies) {
            fluffy.draw();
        }
    }

    export function getRanking(): void {
        console.log("ranking");
        const gameEndMessage: Ranking = {
            name: name,
            fluffyAmount: fluffies.length
        };
        const textCarrier: CarrierMessage = {
            selector: "ranking",
            data: JSON.stringify(gameEndMessage)
        };
        socket.send(JSON.stringify(textCarrier));
    }

} //namespace