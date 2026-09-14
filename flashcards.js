let cardList = [];
let backstart = false;
const flipe = document.getElementById("flipe");
let currentCard = 0;
const cardi = document.getElementById("cardi");
const favicon = document.getElementById('favicon');
const aslside = document.getElementById("aslside");
const engside = document.getElementById("engside");
const aslside_number = document.getElementById("aslside-number");
const engside_number = document.getElementById("engside-number");

function flip(element){
    element.classList.toggle("flipped");
    if (element.classList.contains("flipped")){
        favicon.href = "media/ENG.svg";
    } else {
        favicon.href = "media/ASL.svg";
    }
}

async function fetchCards(){
    const response = await fetch("./cards.json");
    const data = await response.json();
    const units = (new URLSearchParams(window.location.search).get("units") ?? "100").split(",").map(Number);
    const side = (new URLSearchParams(window.location.search).get("side") ?? "0");
    if (side === "0") {
        cardi.style.transition = "none";
        requestAnimationFrame(() => {
            cardi.style.transition = "transform 0.8s";
        });
        flipe.textContent = "Start on ASL";
        favicon.href = "media/ENG.svg";
    } else {
        cardi.classList.add("flipped");
        cardi.style.transition = "none";
        requestAnimationFrame(() => {
            cardi.style.transition = "transform 0.8s";
        });
        backstart = true;
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
        flipe.textContent = "Start on English";
        cardi.classList.add("flipped");
        favicon.href = "media/ENG.svg";
    } else {
        flipe.textContent = "Start on ASL";
        cardi.classList.remove("flipped");
        favicon.href = "media/ASL.svg";
    }
}

function showCard() {
    aslside.lastChild.textContent = cardList[currentCard].aslside;
    engside.lastChild.textContent = cardList[currentCard].engside;
    aslside_number.textContent = (currentCard + 1) + " / " + cardList.length;
    engside_number.textContent = (currentCard + 1) + " / " + cardList.length;
}

function nextCard(){
    if (currentCard < cardList.length - 1) {
        currentCard++;
    } else {
        currentCard = 0;
    }

    cardi.style.transition = "none";
    
    if (!backstart){
        cardi.classList.remove("flipped");
    } else {
        cardi.classList.add("flipped");
    }

    requestAnimationFrame(() => {
        cardi.style.transition = "transform 0.8s";
    });
    showCard();
}

async function previousCard(){
    if (currentCard > 0) {
        currentCard--;
    } else {
        currentCard = cardList.length - 1;
    }
    
    cardi.style.transition = "none";
    
    if (!backstart){
        cardi.classList.remove("flipped");
    } else {
        cardi.classList.add("flipped");
    }
    
    requestAnimationFrame(() => {
        cardi.style.transition = "transform 0.8s";
    });
    showCard();
}

window.addEventListener("keydown", (e) => {
    if (e.key === " " && ['BUTTON', 'INPUT', 'A', 'SELECT'].includes(document.activeElement.tagName)) {
        e.preventDefault();
    }
});

document.addEventListener("keydown", function(event) {
    switch (event.key){
        case " ":
        case "w":
        case "s":
        case "ArrowUp":
        case "ArrowDown":
            cardi.classList.toggle("flipped");
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

function shuffle(){
    for (let i = cardList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardList[i], cardList[j]] = [cardList[j], cardList[i]];
    }
    currentCard = 0;
    cardi.style.transition = "none";
    if (backstart){
        cardi.classList.add("flipped");
    } else {
        cardi.classList.remove("flipped");
    }
    requestAnimationFrame(() => {
    cardi.style.transition = "transform 0.8s";
    });
    showCard();
}

fetchCards();
