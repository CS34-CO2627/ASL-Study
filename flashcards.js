let cardList = [];
let engstart = false;
const flipStartTerm = document.getElementById("flipStartTerm");
let currentCard = 0;
const cardit = document.getElementById("cardi");
const card = document.getElementById("card");
const number = document.getElementById("number");
const whichFront = document.getElementById("whichFront");
const whichFrontImg = whichFront.querySelector("img");
const worder = document.getElementById("worder");

function flip(element){ 
    element.classList.toggle("flipped");
    setTimeout(() => {
        worder.classList.add("swap-hidden");
        number.classList.add("swap-hidden");
    }, 350);
    setTimeout(() => {
        if (engstart) {
            if (element.classList.contains("flipped")) {
                showCardASL();
            } else {
                showCardENG();
            }
        } else {
            if (element.classList.contains("flipped")) {
                showCardENG();
            } else {
                showCardASL();
            }
        }
        worder.classList.remove("swap-hidden");
        number.classList.remove("swap-hidden");
    }, 450);
}

async function fetchCards(){
    const response = await fetch("./cards.json");
    const data = await response.json();
    const units = (new URLSearchParams(window.location.search).get("units") ?? "100").split(",").map(Number);
    const side = (new URLSearchParams(window.location.search).get("front") ?? "asl");
    if (side === "eng") {
        engstart = true;
        whichFront.dataset.aslorenglish = "eng";
        whichFrontImg.src = "media/ENG.svg";
    } else if (side === "asl") {
        engstart = false;
    } else {
        console.log("ERROR WITH CARD FETCH")
    }

    for (let i = 1;i <= 30;i++){
        if (units.includes(i)){
            cardList.push(...Object.values(data[`Unit${i}`]))
        }
    }
    shuffle();
    if (engstart) {
        showCardENG();
    } else {
        showCardASL();
    }
}

function backflip(){
    engstart = !engstart;
    if (engstart) {
        showCardENG();
        whichFront.dataset.aslorenglish = "eng";
        whichFrontImg.src = "media/ENG.svg";
    } else {
        // Start on ASL
        showCardASL();
        whichFront.dataset.aslorenglish = "asl";
        whichFrontImg.src = "media/ASL.svg";
    }
}

function showCardASL() {
    worder.textContent = cardList[currentCard].aslside;
    number.textContent = (currentCard + 1) + " / " + cardList.length;
}

function showCardENG() {
    worder.textContent = cardList[currentCard].engside;
    number.textContent = (currentCard + 1) + " / " + cardList.length;
}

async function nextCard(){
    // increments and protects against overflow
    // needs to use special modulo formula because js is wack
    currentCard = trueMod(currentCard+1, cardList.length);

    if (engstart) {
        showCardENG();
    } else {
        showCardASL();
    }
}

async function previousCard(){
	// decrements and protects against overflow
	// needs to use special modulo formula because js is wack
	currentCard = trueMod(currentCard-1, cardList.length);

    if (engstart) {
        showCardENG();
    } else {
        showCardASL();
    }
}

// key listener for space with some extra kaleb stuff?
window.addEventListener("keydown", (e) => {
    if (e.key === " " && ['BUTTON', 'INPUT', 'A', 'SELECT'].includes(document.activeElement.tagName)) {
        e.preventDefault();
    }
});

// key listener that deals with up/down for flipping, left/right for traversing cards
// document.addEventListener("keydown", async function(event) {
//     switch (event.key){
//         case " ":
//         case "w":
//         case "s":
//         case "ArrowUp":
//         case "ArrowDown":
//             cardit.classList.toggle("flipped");
//             break;
//         case "ArrowLeft":
//         case "a":
//             await previousCard();
//             break;
//         case "ArrowRight":
//         case "d":
//             await nextCard();
//             break;
//     }
// });

function goBack(){
    window.location.href = "index.html";
}

async function shuffle(){
    for (let i = cardList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardList[i], cardList[j]] = [cardList[j], cardList[i]];
    }
    currentCard = 0;
    if (engstart) {
        showCardENG();
    } else {
        showCardASL();
    }
}

// I'm so glad JS uses a mathematically inaccurate modulo %
// smh
function trueMod(a,b){
	return ((a % b) + b) % b;
}

fetchCards();
