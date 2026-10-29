const isIndex = document.body.id === "homeBody";

function RNG(iFunction, chance) {
	if (Math.random() < 1/chance) {
		iFunction();
	}
}

// You can input either one date or multiple dates in an array
// Make a date like this: new Date("2026-10-28").
// Year does not matter, it only compares dates.
function DateFunction(iFunction, iDates) {
	const dates = Array.isArray(dates) ? dates : [dates];
	const today = new Date();

	for (const date of dates){
		if (date.getMonth() === today.getMonth() && date.getDay() === today.getDay()) {
			iFunction();
		}
	}
}
