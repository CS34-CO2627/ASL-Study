// use with if statement to do stuff only to the index.html
const isIndex = document.body.id === "homeBody";

function myDudeBackground(){
	let body = document.body;
	body.style.backgroundImage = "url(media/dudeTile.png)";
	body.style.backgroundRepeat = "repeat";
	body.style.backgroundSize = "200px";
	body.style.animation = "moveBackground 10s linear infinite";
	bosy.stle.backgroundColor = window.getComputedStyle(root).getPropertyValue("--color-background1").trim()
}

rngFunction(myDudeBackground, 1);

// Runs a function with a 1-in-chance probability.
// Example: rngFunction(myEasterEgg, 10) gives a 1-in-10 chance.
function rngFunction(iFunction, chance) {
	if (Math.random() < 1/chance) {
		iFunction();
	}
}

// You can input either one date or multiple dates in an array
// Make a date like this: new Date("2026-10-28")
// You can also pass a list of dates like this: [new Date("2026-10-28"), new Date("2026-12-25")]
// Year does not matter, it only compares dates.
function dateFunction(iFunction, iDates) {
	const dates = Array.isArray(iDates) ? iDates : [iDates];
	const today = new Date();

	for (const date of dates){
		if (date.getMonth() === today.getMonth() && date.getDay() === today.getDay()) {
			iFunction();
		}
	}
}
