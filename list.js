let cardList = [];
let side = "asl";

bootCards();

async function bootCards(){
    const response = await fetch("./cards.json");
    const data = await response.json();
    const units = (new URLSearchParams(window.location.search).get("units") ?? "100").split(",").map(Number);
    side = (new URLSearchParams(window.location.search).get("front") ?? "asl");
		const listContainer = document.getElementById("listContainer");

    for (let i = 1;i <= 30;i++){
        if (units.includes(i)){
					cardList.push([]);
          cardList[cardList.length - 1].push(...Object.values(data[`Unit${i}`]))
        }
    }

		for (let unit of cardList) {
			for (let card of unit) {
				console.log(card,card["aslside"]);
				listContainer.appendChild(document.createElement("div")).textContent = card["aslside"] + " " + card["engside"];
			}
			listContainer.appendChild(document.createElement("hr"));//grid-column: 1 / -1;
		}
}


