function loaded() {
    console.log("Page loaded.");
}

function checkAPI() {
    fetch('http://chalkapp.net/nerdchatApi')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert(data);
        });
}