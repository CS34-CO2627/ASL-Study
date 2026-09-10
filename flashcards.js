let cardList = [];
let backstart = false;
const flipe = document.getElementById("flipe");
let currentCard = 0;
const cardi = document.getElementById("cardi");
const front = document.getElementById("front");
const back = document.getElementById("back");
const front_number = document.getElementById("front-number");
const back_number = document.getElementById("back-number");

function flip(element){
    element.classList.toggle("flipped");
}

async function fetchCards(){
    const response = await fetch("./cards.json");
    const data = await response.json();
    const units = (new URLSearchParams(window.location.search).get("units") ?? "100").split(",").map(Number);
    const side = (new URLSearchParams(window.location.search).get("side") ?? "0");
    if (side === "0") {
        cardi.style.transition = "none";
        cardi.classList.add("flipped");
        requestAnimationFrame(() => {
            cardi.style.transition = "transform 0.8s";
        });
        flipe.textContent = "Start on Term";
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
        flipe.textContent = "Start on Term";
        cardi.classList.add("flipped");
    }
    else {
        flipe.textContent = "Start on Answer";
        cardi.classList.remove("flipped");
    }
}

function showCard() {
    front.lastChild.textContent = cardList[currentCard].front;
    back.lastChild.textContent = cardList[currentCard].back;
    front_number.textContent = (currentCard + 1) + " / " + cardList.length;
    back_number.textContent = (currentCard + 1) + " / " + cardList.length;
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
    }
    else {
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
    }
    else {
    cardi.classList.add("flipped");
    }
    requestAnimationFrame(() => {
    cardi.style.transition = "transform 0.8s";
    });
    showCard();
}

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