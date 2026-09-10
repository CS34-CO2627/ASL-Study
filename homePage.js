const mainDiv = document.querySelector(".divButtons");
let unitsSelected = [];

setUpUnits();

function setUpUnits(){
    
    for (let i = 1; i <= 30; i++){
        const currentButton = document.createElement("button");
        currentButton.className = "unitButton buttons";
        currentButton.id = `unit${i}`;
        currentButton.textContent = `${i}`;
        currentButton.dataset.uniton = "true";
        currentButton.onclick = function() {decideColorOfButton(`unit${i}`);};
        mainDiv.appendChild(currentButton);
    }
}

function decideColorOfButton(buttonId){
    const myButt = document.getElementById(buttonId);
    if (myButt.dataset.uniton === "true"){
        myButt.style.backgroundColor = "gray";
        myButt.style.color = "white";
        myButt.dataset.uniton = "false";
        if (buttonId != "side"){
            unitsSelected.push(myButt);
        }
    }
    else {
        myButt.style.backgroundColor = "white";
        myButt.style.color = "black";
        myButt.dataset.uniton = "true";
        if (buttonId != "side"){
            unitsSelected.splice(unitsSelected.indexOf(myButt),1);
        }
    }
}

function decideImageOfButton(buttonId){
    const myButt = document.getElementById(buttonId);
    const myButtIcon = myButt.querySelector('img')
    if (myButt.dataset.uniton === "true"){
        myButtIcon.src = "media/ENG.svg"
        myButt.dataset.uniton = "false";
    }
    else {
        myButt.dataset.uniton = "true";
        myButtIcon.src = "media/ASL.svg"
    }
}

function openSelected(){
    if (unitsSelected.length != 0){
        window.location.href = setUpLink();
    } else {
        alert("Not enough units to open");
    }
}

function copySelected(){
    if (unitsSelected.length != 0){
        navigator.clipboard.writeText(setUpLink());
        alert(`Copied "${setUpLink()}" to your clipboard`);
    } else {
        alert("Not enough units to copy");
    }
}

function setUpLink(){
    let link = "flashcards.html?";
    if (document.getElementById("side").dataset.uniton === "false"){
        link += "side=1&units=";
    } else {
        link += "side=0&units="
    }

    for (let i = 0;i < unitsSelected.length;i++){
        link += unitsSelected[i].id.slice(4) + ((i === unitsSelected.length - 1) ? "" : ",");
    }

    return link;
}

function clearUnits(){
    unitsSelected.slice().forEach(button => {
        decideColorOfButton(button.id);
    });
}