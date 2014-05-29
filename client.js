function log(msg, color) {
    color = color || 'white';
    var out = document.createElement('div');
    out.innerText = msg;
    out.style.backgroundColor = color;
    out.style.padding = '10px';
    document.getElementById('output').appendChild(out);
}

window.onload = function () {
    var sock = new WebSocket("ws://localhost:8080");
    sock.onopen = function () {
        log('Connection opened', 'lightgreen');
    };
    sock.onmessage = function (e) {
        log('Received message:', 'lightblue');
        log(e.data, 'grey');
    };
    sock.onclose = function () {
        log('Connection closed', 'lightpink');
    };
    sock.onerror = function (e) {
        log('Received error:', 'khaki');
        log(e.data, 'grey');
    };
    function send(message) {
        sock.send(message);
        log('Sent message:', 'lightsteelblue');
        log(message, 'grey');
    }
    document.getElementById('form').onsubmit = function (e) {
        send(document.getElementById('input').value);
        e.preventDefault();
    }
}
