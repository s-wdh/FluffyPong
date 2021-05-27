"use strict";
var Netzstruktur;
(function (Netzstruktur) {
    window.addEventListener("load", handleLoad);
    let X = [0, 7];
    let Y = [0, 7];
    let form;
    let url = "http://localhost:5001";
    async function handleLoad(_event) {
        console.log("start");
        form = document.querySelector("form");
        let startbtn = document.getElementById("start");
        console.log(startbtn);
        startbtn.addEventListener("click", prepareGame);
    }
    async function prepareGame(_event) {
        console.log("click");
        let formData = new FormData(form);
        let query = new URLSearchParams(formData);
        let response = await fetch(url + "?" + query.toString());
        let responseText = await response.text();
        alert(responseText);
        let target = _event.target;
        let parent = target.parentNode?.parentNode?.parentNode;
        if (!parent.lastChild)
            return;
        while (parent.firstChild) {
            parent.removeChild(parent.lastChild);
        }
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