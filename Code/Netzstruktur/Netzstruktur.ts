namespace Netzstruktur {
    window.addEventListener("load", handleLoad);

    let X: Number[] = [0, 7];
    let Y: Number[] = [0, 7];
    let form: HTMLFormElement;
    let url: string = "http://localhost:5001";

    async function handleLoad(_event: Event): Promise<void> {
        console.log("start");
        form = <HTMLFormElement>document.querySelector("form");
        let startbtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("start");
        console.log(startbtn);
        startbtn.addEventListener("click", prepareGame);
    }

    async function prepareGame(_event: Event): Promise<void> {

        console.log("click");
        let formData: FormData = new FormData(form);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        let response: Response = await fetch(url + "?" + query.toString());
        let responseText: string = await response.text();
        alert(responseText);

        let target: Node = <Node>_event.target;
        let parent: Node = <Node>target.parentNode?.parentNode?.parentNode;
        if (!parent.lastChild)
            return;
        while (parent.firstChild) {
            parent.removeChild(parent.lastChild);
        }
        let position: number = X.length - 1;
        let lastPlayer: number = X[position].valueOf();
        console.log(lastPlayer);
        let createPlayerNumber: number = lastPlayer + 1;
        console.log(createPlayerNumber);
        X.push(createPlayerNumber);
        Y.push(createPlayerNumber);
        console.log(X, Y);
        getIndex(createPlayerNumber);
    }

    function getIndex(_PlayerNumber: number): void {
        let index: number = X.indexOf(_PlayerNumber);
        console.log(index);
    }

} //namespace