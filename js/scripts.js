let pokemonList = [

  {
    name: 'Charmander',
    type: ["Monster", "Dragon"],
    height: 0.6,
  },

  {
    name: 'Blastoise',
    type: ["Monster", "Water 1"],
    height: 1.6,
  },

  {
    name: 'Pikachu',
    type: ["Field", "Fairy"],
    height: 0.4,
  },

  {
    name: 'Snorlax',
    type: ["Monster"],
    height: 2.1,
  },

  {
    name: 'Psyduck',
    type: ["Water 1", "Field"],
    height: 0.8,
  },

]

// added a loop to display the pokemon's names, heights and special message for each condition,
//i=0 goest through the whole list, which contains 5 objetcs, therefore the ''-1'', because counting starts at 0, so the count 5 would stop at 4
// loop using, 'for', 'let pokemon = pokemonlist - to shorten the code below'
// var text also to shorten the code
// at the end, using just one document.write connecting it to the var text

for (let i = 0; i <= pokemonList.length - 1; i++) {
  let pokemon = pokemonList[i]
  var text = ""


  if (pokemon.height >= 1.7) {
    text = pokemon.name  + " - height: " + pokemon.height + " - WOW! this is a big Pokemon"


  } else if (pokemon.height <= 1.6 && pokemon.height >= 1.0) {

    text = pokemon.name  + " - height: " + pokemon.height + "  - medium size"

  } else {

    text = pokemon.name  + " - height: " + pokemon.height + "  - small size"


  }
  document.write(text + "<br>")
}
