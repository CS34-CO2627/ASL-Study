let cardList = [];
let backstart = false;
const flipStartTerm = document.getElementById("flipStartTerm");
let currentCard = 0;
const cardit = document.getElementById("cardi");
const aslside = document.getElementById("aslside");
const engside = document.getElementById("engside");
const aslside_number = document.getElementById("aslside-number");
const engside_number = document.getElementById("engside-number");
const whichFront = document.getElementById("whichFront");
const whichFrontImg = whichFront.querySelector("img")

function flip(element){
    element.classList.toggle("flipped");
}

async function fetchCards(){
    const response = await fetch("./cards.json");
    const data = await response.json();
    const units = (new URLSearchParams(window.location.search).get("units") ?? "100").split(",").map(Number);
    const side = (new URLSearchParams(window.location.search).get("front") ?? "asl");
    if (side === "asl") {
        cardit.style.transition = "none";
				cardit.classList.remove("flipped");
        requestAnimationFrame(() => {
            cardit.style.transition = "transform 0.8s";
        });
				backstart = false;
				whichFront.dataset.aslorenglish = "asl";
				whichFrontImg.src = "media/ASL.svg";
    } else if (side === "eng"){
        cardit.style.transition = "none";
        cardit.classList.add("flipped");
        requestAnimationFrame(() => {
            cardit.style.transition = "transform 0.8s";
        });
        backstart = true;
				whichFront.dataset.aslorenglish = "eng";
				whichFrontImg.src = "media/ENG.svg";
    }
		else {
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
			cardit.classList.add("flipped");
			whichFront.dataset.aslorenglish = "eng";
			whichFrontImg.src = "media/ENG.svg";
            const url = new URL(window.location.href);
            url.searchParams.set("front", "eng");
            window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    } else {
			// Start on ASL
			cardit.classList.remove("flipped");
			whichFront.dataset.aslorenglish = "asl";
			whichFrontImg.src = "media/ASL.svg";
            const url = new URL(window.location.href);
            url.searchParams.set("front", "asl");
            window.history.replaceState(null, "", url.pathname + url.search + url.hash);

    }
}

function showCard() {
    aslside.lastChild.textContent = cardList[currentCard].aslside;
    engside.lastChild.textContent = cardList[currentCard].engside;
    aslside_number.textContent = (currentCard + 1) + " / " + cardList.length;
    engside_number.textContent = (currentCard + 1) + " / " + cardList.length;
}

function nextCard(){
		// increments and protects against overflow
		// needs to use special modulo formula because js is wack
		currentCard = trueMod(currentCard+1, cardList.length);

		cardit.style.transition = "none";

		if (!backstart){
			cardit.classList.remove("flipped");
		} else {
			cardit.classList.add("flipped");
		}

		requestAnimationFrame(() => {
			cardit.style.transition = "transform 0.8s";
		});
		showCard();
}

function previousCard(){
	// decrements and protects against overflow
	// needs to use special modulo formula because js is wack
	currentCard = trueMod(currentCard-1, cardList.length);

    cardit.style.transition = "none";

    if (!backstart){
			cardit.classList.remove("flipped");
    } else {
			cardit.classList.add("flipped");
    }

    requestAnimationFrame(() => {
			cardit.style.transition = "transform 0.8s";
    });
    showCard();
}

// key listener for space with some extra kaleb stuff?
window.addEventListener("keydown", (e) => {
    if (e.key === " " && ['BUTTON', 'INPUT', 'A', 'SELECT'].includes(document.activeElement.tagName)) {
			e.preventDefault();
    }
});

// key listener that deals with up/down for flipping, left/right for traversing cards
document.addEventListener("keydown", function(event) {
    switch (event.key){
        case " ":
        case "w":
        case "s":
        case "ArrowUp":
        case "ArrowDown":
            cardit.classList.toggle("flipped");
            break;
        case "ArrowLeft":
        case "a":
            previousCard();
            break;
        case "ArrowRight":
        case "d":
            nextCard();
            break;
    }
});

function goBack(){
    window.location.href = "index.html";
}

function shuffle(){
    for (let i = cardList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardList[i], cardList[j]] = [cardList[j], cardList[i]];
    }
    currentCard = 0;
    cardit.style.transition = "none";
    if (backstart){
        cardit.classList.add("flipped");
    } else {
        cardit.classList.remove("flipped");
    }
    requestAnimationFrame(() => {
    cardit.style.transition = "transform 0.8s";
    });
    showCard();
}

// I'm so glad JS uses a mathematically inaccurate modulo %
// smh (For Kaleb, this is shaking my head)
function trueMod(a,b){
	return ((a % b) + b) % b;
}
fetchCards();
