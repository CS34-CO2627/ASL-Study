let cardList = [];
let side = "asl";

bootCards();

async function bootCards(){
    const response = await fetch("./cards.json");
    const data = await response.json();
    const units = (new URLSearchParams(window.location.search).get("units") ?? "100").split(",").map(Number);
    side = (new URLSearchParams(window.location.search).get("front") ?? "asl");
		const listContainer = document.getElementById("listContainer");

		listContainer.style.gridTemplateColumns = "none";
		listContainer.style.justifyContent = "normal";

		document.getElementById("titleDiv").innerHTML = "<h1>ASL Study - Unit " + units +" Selected</h1>"

    for (let i = 1;i <= 30;i++){
        if (units.includes(i)){
					cardList.push([]);
          cardList[cardList.length - 1].push(...Object.values(data[`Unit${i}`]))
        }
    }

		let hr;

		for (let unit of cardList) {
			for (let card of unit) {
				listContainer.appendChild(document.createElement("div")).textContent = card["aslside"] + " " + card["engside"];
			}
			hr = document.createElement("hr");
			hr.className = "splitter";
			listContainer.appendChild(hr);
		}

		listContainer.removeChild(hr);
}


