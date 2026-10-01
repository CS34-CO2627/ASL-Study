let cardList = [];
let backstart = false;
const flipStartTerm = document.getElementById("flipStartTerm");
let currentCard = 0;
const perspectiveCardDiv = document.getElementById("perspectiveCardDiv");
const cardInfoButton = document.getElementById("cardInfoButton");
const cardInfoP = document.getElementById("cardInfoP");
const whichFront = document.getElementById("whichFront");
const whichFrontImg = whichFront.querySelector("img");

function flip(element){
    element.classList.toggle("flipped");
}

async function fetchCards(){
    const response = await fetch("./cards.json");
    const data = await response.json();
    const units = (new URLSearchParams(window.location.search).get("units") ?? "100").split(",").map(Number);
    const side = (new URLSearchParams(window.location.search).get("front") ?? "asl");
    if (side === "asl") {
        backstart = false;
        whichFront.dataset.aslorenglish = "asl";

        whichFrontImg.src = "media/ASL.svg";
    } else if (side === "eng"){
        cardInfoButtonit.style.transition = "none";
        cardInfoButtonit.classList.add("flipped");
        await new Promise(resolve => setTimeout(resolve, 8));
        cardInfoButtonit.style.transition = "transform 0.8s";
        backstart = true;
        whichFront.dataset.aslorenglish = "eng";
        whichFrontImg.src = "media/ENG.svg";
    } else {
        console.log("ERROR WITH CARD FETCH")
    }

    for (let i = 1;i <= 30;i++){
        if (units.includes(i)){
            cardList.push(...Object.values(data[`Unit${i}`]))
        }
    }
    shuffle();
    showCard();
}

function backflip(){
    backstart = !backstart;
    if (backstart) {
        // Start on English
        perspectiveCardDiv.classList.add("flipped");
        whichFront.dataset.aslorenglish = "eng";
        whichFrontImg.src = "media/ENG.svg";
    } else {
        // Start on ASL
        perspectiveCardDiv.classList.remove("flipped");
        whichFront.dataset.aslorenglish = "asl";
        whichFrontImg.src = "media/ASL.svg";
    }
}

function showCard() {
    cardInfoButton.textContent = cardList[currentCard].aslside;
    cardInfoP.textContent = (currentCard + 1) + " / " + cardList.length;
}

async function nextCard(){
    // increments and protects against overflow
    // needs to use special modulo formula because js is wack
    currentCard = trueMod(currentCard+1, cardList.length);

    perspectiveCardDiv.style.transition = "none";

    if (backstart){
        perspectiveCardDiv.classList.toggle("flipped");
    }

    await new Promise(resolve => setTimeout(resolve, 8));
    perspectiveCardDiv.style.transition = "transform 0.8s";
    showCard();
}

async function previousCard(){
	// decrements and protects against overflow
	// needs to use special modulo formula because js is wack
	currentCard = trueMod(currentCard-1, cardList.length);

    perspectiveCardDiv.style.transition = "none";

    if (backstart){
        perspectiveCardDiv.classList.toggle("flipped");
    }

    await new Promise(resolve => setTimeout(resolve, 8));
    perspectiveCardDiv.style.transition = "transform 0.8s";
    showCard();
}

// key listener for space with some extra kaleb stuff?
window.addEventListener("keydown", (e) => {
    if (e.key === " " && ['BUTTON', 'INPUT', 'A', 'SELECT'].includes(document.activeElement.tagName)) {
        e.preventDefault();
    }
});

// key listener that deals with up/down for flipping, left/right for traversing cards
document.addEventListener("keydown", async function(event) {
    switch (event.key){
        case " ":
        case "w":
        case "s":
        case "ArrowUp":
        case "ArrowDown":
            perspectiveCardDiv.classList.toggle("flipped");
            break;
        case "ArrowLeft":
        case "a":
            await previousCard();
            break;
        case "ArrowRight":
        case "d":
            await nextCard();
            break;
    }
});

function goBack(){
    window.location.href = "index.html";
}

async function shuffle(){
    for (let i = cardList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardList[i], cardList[j]] = [cardList[j], cardList[i]];
    }
    currentCard = 0;
    perspectiveCardDiv.style.transition = "none";
    if (backstart){
        perspectiveCardDiv.classList.add("flipped");
    } else {
        perspectiveCardDiv.classList.remove("flipped");
    }
    showCard();
    await new Promise(resolve => setTimeout(resolve, 8));
    perspectiveCardDiv.style.transition = "transform 0.8s";
}

// I'm so glad JS uses a mathematically inaccurate modulo %
// smh
function trueMod(a,b){
	return ((a % b) + b) % b;
}

fetchCards();
