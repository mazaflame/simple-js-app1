  let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
      if (
        typeof pokemon === "object" &&
        "name" in pokemon
      ) {
        pokemonList.push(pokemon);
      } else {
        console.log("pokemon is not correct");
      }
    }
    function getAll() {
      return pokemonList;
    }



  function addListItem(pokemon)  {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("stylez");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", function(event) {
      showDetails(pokemon); 




  });
  }

    
  function loadList() {
    return fetch(apiUrl) .then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })



  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // details of the item now
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
    }




    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails
    };
  })();

  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
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



  *//////
