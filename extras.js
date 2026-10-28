const isIndex = document.body.id === "indexBody";

function RNG(iFunction, chance) {
  if (Math.random() < 1/chance) {
    iFunction();
  }
}

function DateFunction(iFunction, dates) {
  
}
