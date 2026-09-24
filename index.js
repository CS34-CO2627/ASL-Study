let unitsSelected = [];
const copypopup = document.getElementById("copy");
copypopup.querySelector(".close-btn").addEventListener("click", () => {
    copypopup.close();
});
const notEnoughUnitsPopup = document.getElementById("notEnoughUnits");
notEnoughUnitsPopup.querySelector(".close-btn").addEventListener("click", () => {
    notEnoughUnitsPopup.close();
});


setUpUnits();

function setUpUnits(){

    for (let i = 1; i <= 30; i++){
        const currentButton = document.createElement("button");
        currentButton.className = "unitButton buttons";
        currentButton.id = `unit${i}`;
        currentButton.dataset.uniton = "true";
        currentButton.onclick = function() {decideColorOfButton(`unit${i}`);};
        if (i <= 10){
            document.getElementById("upToTen Units").appendChild(currentButton);
        } else if (i <= 20){
            document.getElementById("upToTwenty Units").appendChild(currentButton);
        } else {
            document.getElementById("upToThirty Units").appendChild(currentButton);
        }

        const myInsides = document.createElement("p");
        myInsides.className = "unitText";
        myInsides.textContent = `${i}`;
        currentButton.appendChild(myInsides);
    }
}

function decideColorOfButton(buttonId){
    const myButt = document.getElementById(buttonId);
    if (myButt.dataset.uniton === "true"){
        myButt.style.backgroundColor = "gray";
        myButt.style.color = "white";
        myButt.dataset.uniton = "false";
        if (buttonId != "aslorenglish"){
            unitsSelected.push(myButt);
        }
    }
    else {
        myButt.style.backgroundColor = "white";
        myButt.style.color = "black";
        myButt.dataset.uniton = "true";
        if (buttonId != "aslorenglish"){
            unitsSelected.splice(unitsSelected.indexOf(myButt),1);
        }
    }
}

function decideImageOfButton(buttonId){
    const myButt = document.getElementById(buttonId);
    const myButtIcon = myButt.querySelector('img')
    if (myButt.dataset.aslorenglish === "asl"){
        myButtIcon.src = "media/ENG.svg"
        myButt.dataset.aslorenglish = "eng";
    }
    else {
        myButt.dataset.aslorenglish = "asl";
        myButtIcon.src = "media/ASL.svg"
    }
}

function openSelected(){
    if (unitsSelected.length != 0){
        window.location.href = setUpLink();
    } else {
        notEnoughUnitsPopup.showModal();
    }
}

function copySelected(){
    if (unitsSelected.length != 0){
        copypopup.querySelector("p").textContent = `Copied link to your clipboard`;
        navigator.clipboard.writeText(setUpLink());
    }
    else {
        copypopup.querySelector("p").textContent = "Not enough units to copy";
    }
    copypopup.showModal();
}

function setUpLink(){
    let link = "flashcards.html?front=";
		// add if the front is ASL or English to the link
		link += document.getElementById("whichFront").dataset.aslorenglish;
		link += "&units=";

    for (let i = 0; i < unitsSelected.length;i++){
        link += unitsSelected[i].id.slice(4) + ((i === unitsSelected.length - 1) ? "" : ",");
    }

    return link;
}

function clearUnits(){
    unitsSelected.slice().forEach(button => {
        decideColorOfButton(button.id);
    });
}
