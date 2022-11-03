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


function showDetails(pokemon){
  console.log(pokemon)
}






pokemonList.forEach((pokemon) => {
  let pokemonList = document.querySelector(".pokemon-list");
  let listItem = document.createElement("li");
  let button = document.createElement("button");
  button.innerText = pokemon.name;
  button.classList.add("stylez");
  button.addEventListener("click", ()=>showDetails(pokemon));
  listItem.appendChild(button);
  pokemonList.appendChild(listItem);




});




/*  ***** OLD CODE, switched to the one above
// Cache the list element + add a listener to it
const list = document.querySelector('.pokemon-list');
list.addEventListener('click', showDetails);

const pokemonList = [

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

// Check that the child element that fired
// the event is a button, and log its text content
function showDetails(e) {
  if (event.target.matches('button')) {
    console.log(event.target.textContent); //e.target
  }
}

// Create a document fragment
const frag = document.createDocumentFragment();

// Loop over the array and for each object
// add create a list item, and a button,  append the button
// to the list item, and then the list item to the fragment
pokemonList.forEach(pokemon => {
  const listItem = document.createElement('li');
  const button = document.createElement('button');
  button.textContent = pokemon.name;
  button.classList.add('stylez');
  listItem.appendChild(button);
  frag.appendChild(listItem);
});

// append the fragment of list items
// to the cached list element
list.appendChild(frag);



*/
