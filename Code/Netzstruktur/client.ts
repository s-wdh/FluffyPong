namespace Netzstruktur {
    //const socket: WebSocket = new WebSocket("ws://localhost:8000/");
    const socket: WebSocket = new WebSocket("wss://fluffypong.herokuapp.com/");
    let namefield: HTMLInputElement;

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

    export let fluffies: FluffyElement[] = [];
    let playerNameList: Player[] = [];
    //let playerPosition: number[] = [0];


    // listen to message from server
    socket.addEventListener("message", (event) => {
        const carrier: CarrierMessage = <CarrierMessage>JSON.parse(event.data);
        const selector: string = carrier.selector;
        const data: string | undefined = carrier.data;

        switch (selector) {
            case "player":
                const playerInfo: Player = <Player>JSON.parse(<string>data);
                playerNameList.push(playerInfo); // add message to message list
                console.log(playerNameList);
                break;
            case "deletePlayer":
                const deleteInfo: Player = <Player>JSON.parse(<string>data);
                for (let playerElement of playerNameList) {
                    if (playerElement.name == deleteInfo.name && playerElement.position == deleteInfo.position) {
                        playerNameList.splice(playerNameList.indexOf(playerElement)); // delete player from array
                    }
                }
                console.log(playerNameList);
                break;
            case "fluffy":
                const fluffy: Fluffy = <Fluffy>JSON.parse(<string>data);
                let x: number = 250;
                let y: number = 300;
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
    });

    function sendName(): void {
        const name: string = namefield.value;
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
        // delete name field and buttons
    }

    export function sendFluffy(_event: MouseEvent): void {
        console.log(_event);
        let x: number = _event.clientX;
        let y: number = _event.clientY;
        for (let element of fluffies) {
            console.log(element.position);
            if (element.position.x - (fluffyWidth / 2) < x && element.position.y - (fluffyHeight / 2) < y && element.position.x + (fluffyWidth / 2) > x && element.position.y + (fluffyHeight / 2) > y) {
                console.log("send Fluffy");
                const fluffyMessage: Fluffy = {
                    direction: "top"
                };
                const textCarrier: CarrierMessage = {
                    selector: "fluffy",
                    data: JSON.stringify(fluffyMessage)
                };
                socket.send(JSON.stringify(textCarrier));
                fluffies.splice(fluffies.indexOf(element), 1);
            }
        }
        crc2.putImageData(imgData, 0 , 0);
        for (let fluffy of fluffies) {
            fluffy.draw();
        }
    }

} //namespace