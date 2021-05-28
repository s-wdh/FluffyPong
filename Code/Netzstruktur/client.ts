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
        position: number;
    }

    let playerNameList: Player[] = [];
    let playerPosition: number[] = [0];


    // listen to message from server
    socket.addEventListener("message", (event) => {
        const carrier: CarrierMessage = <CarrierMessage>JSON.parse(event.data);
        const selector: string = carrier.selector;
        const data: string | undefined = carrier.data;

        switch (selector) {
            case "player":
                const playerInfo: Player = <Player>JSON.parse(<string>data);
                playerNameList.push(playerInfo); // add message to message list
                break;
            case "fluffy":
                break;
        }
    });

    function sendName(): void {
        const name: string = namefield.value;
        let position: number = playerPosition.length - 1;
        let lastPlayer: number = playerPosition[position].valueOf();
        let createPlayerNumber: number = lastPlayer + 1;
        playerPosition.push(createPlayerNumber);
        let index: number = playerPosition.indexOf(createPlayerNumber);

        if (name !== "") {
            const playername: Player = {
                name: name,
                position: index
            };

            const textCarrier: CarrierMessage = {
                selector: "player",
                data: JSON.stringify(playername)
            };

            socket.send(JSON.stringify(textCarrier));
        }

        // delete name field and buttons
    }

} //namespace