// use with if statement to do stuff only to the index.html
const isIndex = document.body.id === "homeBody";

function christmas() {
	const body = document.body;

	document.documentElement.style.setProperty('--color-darkText', '#3b0404');
	document.documentElement.style.setProperty('--color-background4', '#8a1c1c');

	body.style.backgroundImage = "url(media/christmasLightsUpres.png)";
	body.style.backgroundRepeat = "repeat-x";
	body.style.backgroundSize = "calc(20% + 20rem)";
}

christmas();

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
		if (date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {
			iFunction();
		}
	}
}