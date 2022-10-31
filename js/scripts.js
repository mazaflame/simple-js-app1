let pokemonRepository = (function () {
  let pokemonList = [];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();  //IIFE to safely lock everything into place

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


pokemonList.forEach(function(pokemon) {
  console.log(pokemon);


  var text = ""


  if (pokemon.height >= 1.7) {
    text = pokemon.name + " - height: " + pokemon.height + " - WOW! this is a big Pokemon"


  } else if (pokemon.height <= 1.6 && pokemon.height >= 1.0) {

    text = pokemon.name + " - height: " + pokemon.height + "  - medium size"

  } else {

    text = pokemon.name + " - height: " + pokemon.height + "  - small size"


  }
  document.write(text + "<br>")

});
