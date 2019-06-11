let socket = null;

let connect = (host) => {
    if ('WebSocket' in window) {
        socket = new WebSocket(host);
    } else if ('MozWebSocket' in window) {
        socket = new MozWebSocket(host);
    } else {
        console.log('Error: WebSocket is not supported by this browser.');
        return;
    }

    socket.onopen = () => {
        console.log('Info: WebSocket connection opened.');
    };

    socket.onclose = () => {
        console.log('Info: WebSocket closed.');
    };

    socket.onmessage = (message) => {
        console.log(message.data);
    };
}

let initialize = () => {
    if (window.location.protocol == 'http:') {
        connect('ws://' + window.location.host + '/action');
    } else {
        connect('wss://' + window.location.host + '/action');
    }
}

let sendMessage = (message) => {
    if (message != '') {
        socket.send(message);
    }
}

initialize();