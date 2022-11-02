let pokemonRepository = (function() {
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
})(); //IIFE to safely lock everything into place

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

let addPokemonEventListener = function(element, pokemon) {
  element.addEventListener("click", () => showDetails(pokemon));
};

// unable to create the functions properly below
let showDetails = function (pokemon) {
  loadDetails('listItem')
};

  let loadDetails = function (pokemon) {
  return fetch('listItem')};

//unable


pokemonList.forEach(function(pokemon) {
  let pokemonList = document.querySelector(".pokemon-list");
  let listItem = document.createElement("li");
  let button = document.createElement("button");
  button.innerText = pokemon.name;
  button.classList.add("stylez");
  listItem.appendChild(button);
  pokemonList.appendChild(listItem);




});
