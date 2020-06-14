const { time } = require("console");

function loaded() {
    console.log("Page loaded.");
}

function checkAPI() {
    var loadingGif = document.getElementById("ldGif");
    var indicator = document.getElementById("indicator");
    loadingGif.hidden = false;
    indicator.style.backgroundColor = "grey";
    

    fetch('http://localhost/nerdchatApi/messages')
        .then(response => {
            if (response.status == 200) 
                indicator.style.backgroundColor = "greenyellow";
            else
                indicator.style.backgroundColor = "crimson";

            loadingGif.hidden = true;
            document.getElementById("responseDisplay").hidden = false;
            return response.json();
        })
        .then(data => {
            console.log(data);
            document.getElementById("responseDisplay").innerHTML = JSON.stringify(data);
        });
}


function sendMessage(event) {
    var message = document.getElementById("messageBox").value;
    document.getElementById("messageBox").value = "";
    var messageJson = {content : message, sender : "BlueDragon", created : new Date()};
    var res;

    var xhr = new XMLHttpRequest();

    xhr.open("POST", 'http://localhost/nerdchatApi/sendMessage', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(messageJson));

    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            res = JSON.parse(xhr.responseText);

            console.log(res);
            renderMessage(res);
        }
    };
}

function renderMessage(message) {
    var messageObject = document.createElement('div');
    var timestamp = new Date(message.created);
    messageObject.innerHTML = `<span class="${message.sender}">${message.sender}</span><span class="timestamp">&nbsp;&nbsp;&nbsp;${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()}</span></br><p class="message-content">${message.content}</p>`;
    messageObject.className = "messageObject";

    document.getElementById("messageDisplay").appendChild(messageObject);
}