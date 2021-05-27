"use strict";
var Netzstruktur;
(function (Netzstruktur) {
    window.addEventListener("load", handleLoad);
    let X = [0, 7];
    let Y = [0, 7];
    let form;
    let url = "https://fluffypong.herokuapp.com/";
    async function handleLoad(_event) {
        console.log("start");
        form = document.getElementById("form");
        console.log(form);
        let startbtn = document.getElementById("start");
        console.log(startbtn);
        startbtn.addEventListener("click", sendOrder);
        prepareGame();
    }
    async function sendOrder(_event) {
        console.log("Send order");
        let formData = new FormData(form);
        let query = new URLSearchParams(formData);
        let response = await fetch(url + "?" + query.toString());
        let responseText = await response.text();
        alert(responseText);
    }
    function prepareGame() {
        console.log("click");
        /* let target: Node = <Node>_event.target;
        let parent: Node = <Node>target.parentNode?.parentNode?.parentNode;
        if (!parent.lastChild)
            return;
        while (parent.firstChild) {
            parent.removeChild(parent.lastChild);
        } */
        let position = X.length - 1;
        let lastPlayer = X[position].valueOf();
        console.log(lastPlayer);
        let createPlayerNumber = lastPlayer + 1;
        console.log(createPlayerNumber);
        X.push(createPlayerNumber);
        Y.push(createPlayerNumber);
        console.log(X, Y);
        getIndex(createPlayerNumber);
    }
    function getIndex(_PlayerNumber) {
        let index = X.indexOf(_PlayerNumber);
        console.log(index);
    }
})(Netzstruktur || (Netzstruktur = {})); //namespace
//# sourceMappingURL=Netzstruktur.js.map