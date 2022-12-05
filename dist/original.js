let pokemonRepository = (function () {

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=60';
    let modalContainer = document.querySelector('#modal-container');
  
    let pokemonList1 = $('.pokemon-list');
  
  
  
    function add(pokemon) {
  
      pokemonList.push(pokemon);
    }
  
    function getAll() {
      return pokemonList;
    }
  
  
    function addListItem(pokemon) {
  
      let listPokemon = $('<li class="list-group-item"></li>');
  
      let button = $('<button class="pokemon-button btn btn-warning" data-target="#pokemon-modal" data-toggle="modal">' + pokemon.name + '</button>');
  
      listPokemon.append(button);
      pokemonList1.append(listPokemon);
  
      // now to listen to the click
      button.on('click', function (event) {
        showDetails(pokemon)
      })
    };
  
  
  
  
    function loadList() {
      return fetch(apiUrl).then(function (response) {
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
        item.types = details.types.map((type) => type.type.name).join(',');
      }).catch(function (e) {
        console.error(e);
      });
    }
  
    function showDetails(item) {
      loadDetails(item).then(function () {
        showModal(item)
      });
    }
  
    function showModal(pokemon) {
      let modalCorpo = $('.modal-corpo');
      let modalTitle = $('.modal-title');
  
      modalCorpo.empty();
  
  
      modalTitle.text(pokemon.name);
  
      let image = $('<img class="pokemon-img" src="' + pokemon.imageUrl + '" />');
      let height = $('<p>' + 'Height: ' + pokemon.height + '</p>');
      let types = $('<p>' + 'Types: ' + pokemon.types + '</p>');
  
  
      modalCorpo.append(image);
      modalCorpo.append(height);
      modalCorpo.append(types);
  
    }
  
  
  
  
  
  
    return {
      getAll: getAll,
      add: add,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
  
    };
  })();
  
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
  
  