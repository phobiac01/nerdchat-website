function loaded() {
    console.log("Page loaded.");
}

function checkAPI() {
    var loadingGif = document.getElementById("ldGif");
    var indicator = document.getElementById("indicator");
    loadingGif.hidden = false;
    indicator.style.backgroundColor = "grey";
    

    fetch('http://localhost/nerdchatApi')
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