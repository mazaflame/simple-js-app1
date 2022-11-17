let pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=60';
  let modalContainer = document.querySelector('#modal-container');

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon aint correct");
    }
  }
  function getAll() {
    return pokemonList;
  }






  // document.querySelector('#show-modal').addEventListener('click', () => {
  // showModal('title is here', 'content is here');
  // });

  /* function showDialog(title, text) {
     showModal(title, text);
   
     // defined modalContainer here
     let modalContainer = document.querySelector('#modal-container');
   
     // add a confirm and cancel button to the modal
     let modal = modalContainer.querySelector('.modal');
   
     let confirmButton = document.createElement('button');
     confirmButton.classList.add('modal-confirm');
     confirmButton.innerText = 'Confirm';
   
     let cancelButton = document.createElement('button');
     cancelButton.classList.add('modal-cancel');
     cancelButton.innerText = 'Cancel';
   
     modal.appendChild(confirmButton);
     modal.appendChild(cancelButton);
   
     //  the confirmButton 
     confirmButton.focus();
     return new Promise((resolve, reject) => {
       cancelButton.addEventListener('click', hiddenModal);
       confirmButton.addEventListener('click', () => {
         dialogPromiseReject = null; // Reset this
         hiddenModal();
         resolve();
       });
     
       //  reject from other functions
       dialogPromiseReject = reject;
     });
   } 
   
   document.querySelector('#show-dialog').addEventListener('click', () => {
     showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
       alert('confirmed!');
     }, () => {
       alert('not confirmed');
     });
   }); */

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("bstylez");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", function (event) {
      showDetails(pokemon);




    });
  }


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
    pokemonRepository.loadDetails(item).then(function () {
      showModal(item)
    });
  }

  function showModal(pokemon) {
    let modalContainer = document.querySelector('.modal-container');
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let title = document.createElement('h1');
    title.innerText = pokemon.name;

    let pokemonImage = document.createElement('img');
    pokemonImage.src = pokemon.imageUrl;

    let pokemonHeight = document.createElement('p');
    pokemonHeight.innerText = "Height: " + pokemon.height;

    let pokemonTypes = document.createElement('p');
    pokemonTypes.innerText = "Type: " + pokemon.types;

   
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hiddenModal);

    modal.appendChild(title);
    modal.appendChild(pokemonImage);
    modal.appendChild(pokemonHeight);
    modal.appendChild(pokemonTypes);
    modal.appendChild(closeButtonElement);
    modalContainer.appendChild(modal);

    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hiddenModal();
      }
    })
    modalContainer.classList.add('is-visible');
  }



  function hiddenModal() {
    let modalContainer = document.querySelector('.modal-container');
    modalContainer.classList.remove('is-visible');
  }
  //use ESC to close the modal
  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('.modal-container');
    if (e.key === 'Escape' &&
      modalContainer.classList.contains('is-visible')) {
      hiddenModal();
    }

  });




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

