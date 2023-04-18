// https://javascript.info/websocket

let socket = undefined;

function connect() {
    socket = new WebSocket("ws://81.187.86.85:10203/active")

    socket.onopen = (event) => {
        document.getElementById("status").textContent = "Connected!";
    };

    socket.onmessage = (event) => {
        console.log(event.data)
    }
}

function send() {
    socket.send(document.getElementById("data").textContent)
    console.log("Sent data: " + document.getElementById("data").textContent)
}
