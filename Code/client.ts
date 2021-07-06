namespace FluffyPong {
    //change the server type
    //const socket: WebSocket = new WebSocket("ws://localhost:8000/");
    const socket: WebSocket = new WebSocket("wss://fluffypong.herokuapp.com/");

    //variables for the name input
    let namefield: HTMLInputElement;
    let name: string;
    let namesent: boolean = false;

    window.addEventListener("load", handleLoad);

    function handleLoad(): void {
        console.log("load");
        let helpbtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("help");
        helpbtn.addEventListener("click", showExplanation);
        namefield = <HTMLInputElement>document.getElementById("playername");
        //send name to server after click on start button
        let startbtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("start");
        startbtn.addEventListener("click", sendName);
        //ping-pong between server and client, so the server can't close while playing
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
        position: number;
        direction: string;
    }

    //interface for the ranking of players
    interface Ranking {
        position?: number;
        name: string;
        fluffyAmount: number;
    }

    //arrays for fluffies, walls and holes of the player
    export let fluffies: FluffyElement[] = [];
    export let walls: Wall[] = [];
    export let wallHoles: Wall[] = [];

    let timer: number;
    let gmTimer: NodeJS.Timer;


    // listen to message from server
    socket.addEventListener("message", (event) => {
        const carrier: CarrierMessage = <CarrierMessage>JSON.parse(event.data);
        const selector: string = carrier.selector;
        const data: string | undefined = carrier.data;

        switch (selector) {
            //ping-pong between server and client, so the server can't close while playing
            case "pong": {
                console.log(selector);
                break;
            }

            //fluffy arrives at player and has to be drawn at the correct position onto the canvas
            case "fluffy": {
                const fluffy: Fluffy = <Fluffy>JSON.parse(<string>data);
                let x: number = (canvasWidth / 2);
                let y: number = (canvasHeight / 2);
                //console.log("fluffy");
                switch (fluffy.direction) {
                    case "top":
                        x = fluffy.position;
                        y = fluffyHeight;
                        break;
                    case "right":
                        x = (canvasWidth - fluffyWidth);
                        y = fluffy.position;
                        break;
                    case "bottom":
                        x = fluffy.position;
                        y = (canvasHeight - fluffyHeight);
                        break;
                    case "left":
                        x = fluffyWidth;
                        y = fluffy.position;
                        break;
                }
                let position: Vector = new Vector(x, y);
                let newFluffy: FluffyElement = new FluffyElement(position);
                newFluffy.generateColor();
                newFluffy.draw();
                fluffies.unshift(newFluffy);
                break;
            }

            //ranking generated from the server arrives
            case "ranking": {
                const ranking: Ranking[] = <Ranking[]>JSON.parse(<string>data);
                createRankingTable(ranking);
                break;
            }

            //timer arrives and 
            case "timer": {
                timer = JSON.parse(<string>data);
                window.setTimeout(getRanking, (timer * 1000));
                gmTimer = setInterval(gameTimer, 1000);
                break;
            }
        }
    });

    //ping-pong between server and client, so the server can't close while playing
    function sendPing(): void {
        const textCarrier: CarrierMessage = {
            selector: "ping"
        };
        socket.send(JSON.stringify(textCarrier));
    }

    function showExplanation(): void {
        let close: HTMLSpanElement = <HTMLSpanElement>document.getElementById("closebtn");
        let div: HTMLDivElement = <HTMLDivElement>document.getElementById("alert");
        div.style.opacity = "1";

        close.addEventListener("click", function closeAlert(): void {    
            div.style.opacity = "0";
        });

    }

    //send name of the player to the server and prepare the start of the game
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

        //delete the start div
        let startdiv: HTMLDivElement = <HTMLDivElement>document.getElementById("startdiv");
        let startParent: Node = <Node>startdiv.parentNode;
        startParent.removeChild(startdiv);
        let alertdiv: HTMLDivElement = <HTMLDivElement>document.getElementById("alert");
        let alertParent: Node = <Node>alertdiv.parentNode;
        alertParent.removeChild(alertdiv);

        prepareCanvas();
        namesent = true;
    }

    //send a fluffy to the server after it passed a succesfull through an hole
    export function sendFluffy(_fluffyPosition: number, _direction: string): void {
        //console.log(fluffies.length);
        if (_direction == "top") {
            const fluffyMessage: Fluffy = {
                position: _fluffyPosition,
                direction: "top"
            };
            const textCarrier: CarrierMessage = {
                selector: "fluffy",
                data: JSON.stringify(fluffyMessage)
            };
            socket.send(JSON.stringify(textCarrier));
        } else if (_direction == "right") {
            const fluffyMessage: Fluffy = {
                position: _fluffyPosition,
                direction: "right"
            };
            const textCarrier: CarrierMessage = {
                selector: "fluffy",
                data: JSON.stringify(fluffyMessage)
            };
            socket.send(JSON.stringify(textCarrier));
        } else if (_direction == "bottom") {
            const fluffyMessage: Fluffy = {
                position: _fluffyPosition,
                direction: "bottom"
            };
            const textCarrier: CarrierMessage = {
                selector: "fluffy",
                data: JSON.stringify(fluffyMessage)
            };
            socket.send(JSON.stringify(textCarrier));
        } else if (_direction == "left") {
            const fluffyMessage: Fluffy = {
                position: _fluffyPosition,
                direction: "left"
            };
            const textCarrier: CarrierMessage = {
                selector: "fluffy",
                data: JSON.stringify(fluffyMessage)
            };
            socket.send(JSON.stringify(textCarrier));
        }
    }

    //send the ranking to the server, when the timer is at 0
    export function getRanking(): void {
        //console.log("ranking");
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

    //create the timer, which reduces by 1 every second
    function gameTimer(): void {
        if (timer > 0) {
            timer--;
            //only show the timer for the player, if he isn't on the start page anymore
            if (namesent == true) {
                let timerElement: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("timer");
                timerElement.innerHTML = timer + "s";
            }
        } else {
            clearInterval(gmTimer);
        }
    }

    //create a table with the ranking so it's clearly vissible for the player
    function createRankingTable(_ranking: Ranking[]): void {
        let div: HTMLDivElement = document.createElement("div");
        document.body.appendChild(div);
        div.id = "rankingDiv";
        let width: number = canvasWidth - (2 * borderWidth) - 6;
        div.style.width = width.toString() + "px";
        div.style.margin = borderWidth.toString() + "px";

        let title: HTMLHeadingElement = document.createElement("h4");
        title.innerHTML = "Ergebnisse dieser Spielrunde:";
        div.appendChild(title);

        let table: HTMLTableElement = document.createElement("table");
        div.appendChild(table);
        table.classList.add("table");
        //make table responsive
        table.style.margin = "2px";
        let tableWidth: number = width - 4;
        table.style.width = tableWidth.toString() + "px";
        //generate the head line of the table
        let header: HTMLTableRowElement = document.createElement("tr");
        let thposition: HTMLTableHeaderCellElement = document.createElement("th");
        thposition.innerHTML = "Position";
        let thname: HTMLTableHeaderCellElement = document.createElement("th");
        thname.innerHTML = "Name";
        let thfluffyAmount: HTMLTableHeaderCellElement = document.createElement("th");
        thfluffyAmount.innerHTML = "Fluffy Menge";
        header.appendChild(thposition);
        header.appendChild(thname);
        header.appendChild(thfluffyAmount);
        table.appendChild(header);

        //write each player in the table for the ranking
        for (let index: number = 0; index < _ranking.length; index++) {
            let row: HTMLTableRowElement = document.createElement("tr");
            let tdposition: HTMLTableDataCellElement = document.createElement("td");
            let tdname: HTMLTableDataCellElement = document.createElement("td");
            let tdfluffyAmount: HTMLTableDataCellElement = document.createElement("td");
            tdposition.innerHTML = "" + _ranking[index].position;
            tdname.innerHTML = _ranking[index].name;
            tdfluffyAmount.innerHTML = "" + _ranking[index].fluffyAmount;
            //highlight the player
            if (_ranking[index].name == name) {
                row.style.backgroundColor = "#ffb3d1";
            }
            row.appendChild(tdposition);
            row.appendChild(tdname);
            row.appendChild(tdfluffyAmount);
            table.appendChild(row);
        }
        //console.table(table);

        //write a short note, how the player can start the next game round
        let newRound: HTMLParagraphElement = document.createElement("p");
        newRound.classList.add("newRound");
        newRound.innerHTML = "Lade die Seite neu, falls du nochmals eine Runde spielen möchtest!";
        div.appendChild(newRound);
    }

} //namespace