namespace FluffyPong {
    //const socket: WebSocket = new WebSocket("ws://localhost:8000/");
    const socket: WebSocket = new WebSocket("wss://fluffypong.herokuapp.com/");
    let namefield: HTMLInputElement;
    let name: string;
    let namesent: boolean = false;

    window.addEventListener("load", handleLoad);

    function handleLoad(): void {
        console.log("load");
        namefield = <HTMLInputElement>document.getElementById("playername");
        //send name to server
        let startbtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("start");
        startbtn.addEventListener("click", function (): void {
            sendName();
        });
        window.setInterval(sendPing, 5000);
    }

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

    export let fluffies: FluffyElement[] = [];
    export let walls: Wall[] = [];
    let playerNameList: Player[] = [];

    let timer: number;


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
            case "pong": {
                console.log(selector);
                break;
            }
            case "fluffy": {
                const fluffy: Fluffy = <Fluffy>JSON.parse(<string>data);
                let x: number = (canvasWidth / 2);
                let y: number = (canvasHeight / 2);
                //console.log("fluffy");
                switch (fluffy.direction) {
                    case "top":
                        x = (canvasWidth / 2);
                        y = fluffyHeight;
                        break;
                    case "right":
                        x = (canvasWidth - fluffyWidth);
                        y = (canvasHeight / 2);
                        break;
                    case "bottom":
                        x = (canvasWidth / 2);
                        y = (canvasHeight - fluffyHeight);
                        break;
                    case "left":
                        x = fluffyWidth;
                        y = (canvasHeight / 2);
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
                createRankingTable(ranking);
                break;
            }
            case "timer": {
                timer = JSON.parse(<string>data);
                window.setTimeout(getRanking, (timer * 1000));
                window.setInterval(gameTimer, 1000);
                break;
            }
        }
    });

    function sendPing(): void {
        const textCarrier: CarrierMessage = {
            selector: "ping"
        };
        socket.send(JSON.stringify(textCarrier));
    }

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
        namesent = true;
    }

    export function sendFluffy(_fluffy: FluffyElement, _direction: string): void {
        console.log(fluffies.length);
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
        console.log(fluffies.length);
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

    function gameTimer(): void {
        if (timer > 0) {
            timer--;
            if (namesent == true) {
                let timerElement: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("timer");
                timerElement.innerHTML = timer + "s";
            }
        } else {
            clearInterval();
        }
    }

    function createRankingTable(_ranking: Ranking[]): void {

        console.log("help");
        let div: HTMLDivElement = document.createElement("div");
        document.body.appendChild(div);
        div.id = "rankingDiv";
        console.log(div);

        let table: HTMLTableElement = document.createElement("table");
        div.appendChild(table);
        table.classList.add("table");
        table.style.margin = borderWidth.toString() + "px";        
        let width: number = canvasWidth - (2 * borderWidth) - 6;
        table.style.width = width.toString() + "px";
        let heading: HTMLTableRowElement = document.createElement("tr");
        let thposition: HTMLTableHeaderCellElement = document.createElement("th");
        thposition.innerHTML = "Position";
        let thname: HTMLTableHeaderCellElement = document.createElement("th");
        thname.innerHTML = "Name";
        let thfluffyAmount: HTMLTableHeaderCellElement = document.createElement("th");
        thfluffyAmount.innerHTML = "Fluffy Menge";
        heading.appendChild(thposition);
        heading.appendChild(thname);
        heading.appendChild(thfluffyAmount);
        table.appendChild(heading);

        for (let index: number = 0; index < _ranking.length; index++) {
            let row: HTMLTableRowElement = document.createElement("tr");
            let tdposition: HTMLTableDataCellElement = document.createElement("td");
            let tdname: HTMLTableDataCellElement = document.createElement("td");
            let tdfluffyAmount: HTMLTableDataCellElement = document.createElement("td");
            tdposition.innerHTML = "" + _ranking[index].position;
            tdname.innerHTML = _ranking[index].name;
            tdfluffyAmount.innerHTML = "" + _ranking[index].fluffyAmount;
            row.appendChild(tdposition);
            row.appendChild(tdname);
            row.appendChild(tdfluffyAmount);
            table.appendChild(row);
        }
        //console.table(table);
    }

} //namespace