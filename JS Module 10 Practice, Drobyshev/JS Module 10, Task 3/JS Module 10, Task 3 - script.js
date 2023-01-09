window.onload = function () {

    const wsURL = 'wss://echo-ws-service.herokuapp.com'

    const btnSend = document.querySelector('#submit_button');
    const btnGeo = document.querySelector('#geolocation_button');
    const msgBox = document.querySelector('.message-box');
    const userMsgBox = document.querySelector('.message-input');

    function displayMsg(message) {
        msgBox.insertAdjacentHTML('beforeend', `${message}`);
    }

    let websocket;

    (function () {
        websocket = new WebSocket(wsURL);
        websocket.onmessage = function(event) {
            if (!event.data.includes ('[object GeolocationPosition]')) {
            displayMsg(
                `<p class="message server-message">${event.data}</p>`
            )}
        };
        websocket.onerror = function(event) {
            displayMsg(
                `<p class="message server-message">Error: ${event.data}</p>`
            )
        };
    })();

    btnSend.addEventListener('click', () => {
        const msgInput = document.querySelector('.message-input').value;
        if(msgInput != 'undefined' && msgInput != 'null') {
            displayMsg (
                `<p class="message user-message">${msgInput}</p>`
            );
            websocket.send(msgInput);
            document.querySelector('.message-input').value = '';
        }
    })

    userMsgBox.addEventListener('keyup', (event) => {
        event.preventDefault();
        if (event.keyCode === 13) {
            btnSend.click();
        }
    })

    btnGeo.addEventListener('click', () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser')
        } else {
            let success = (position) => {
                let latitude = position.coords.latitue;
                let longitude = position.coords.longitude;
                displayMsg (
                    `<a class="message user-message" href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}">I'm here</a>`
                );
                websocket.send(position);
            }
            let error = () => {
                alert('Cannot obtain your coords');
            }
            navigator.geolocation.getCurrentPosition(success, error);
        }
    })
}