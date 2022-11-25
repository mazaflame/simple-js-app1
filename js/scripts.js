let pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=60';
  let modalContainer = document.querySelector('#modal-container');

  let pokemonList1 = $('.pokemon-list');


  

  function add(pokemon) {

    pokemonList.push(pokemon);
  }
  //   if (
  //     typeof pokemon === "object" &&
  //     "name" in pokemon
  //   ) {
  //     pokemonList.push(pokemon);
  //   } else {
  //     console.log("pokemon aint correct");
  //   }
  // }
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
   // let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = $('<li class="list-group-item"></li>');
    //let listpokemon = document.createElement("li");
   // cancel to addd bootstrap   let button = document.createElement("button");
    //button.innerText = pokemon.name;
   // button.classList.add("bstylez");
   let button = $('<button class="pokemon-button btn btn-warning" data-target="#pokemon-modal" data-toggle="modal">' + pokemon.name + '</button>');

   listPokemon.append(button);
   pokemonList1.append(listPokemon);

   // now to listen to the click
   button.on('click', function(event) {
    showDetails(pokemon)
})
}; 




   // old event listeners
   // listpokemon.appendChild(button);
   // pokemonList.appendChild(listPokemon);
   // button.addEventListener("click", function (event) {
    //  showDetails(pokemon);




  //  });
 // }


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
    }).catch(function(e) {
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

//old way
  //  // let modalContainer = document.querySelector('.modal-container');
  //  // modalContainer.innerHTML = '';

  //  // let modal = document.createElement('div');
  //  // modal.classList.add('modal');

  //   let title = document.createElement('h1');
  //   title.innerText = pokemon.name;

  //   let pokemonImage = document.createElement('img');
  //   pokemonImage.src = pokemon.imageUrl;

  //   let pokemonHeight = document.createElement('p');
  //   pokemonHeight.innerText = "Height: " + pokemon.height;

  //   let pokemonTypes = document.createElement('p');
  //   pokemonTypes.innerText = "Type: " + pokemon.types;

   
  //   let closeButtonElement = document.createElement('button');
  //   closeButtonElement.classList.add('modal-close');
  //   closeButtonElement.innerText = 'Close';
  //   closeButtonElement.addEventListener('click', hiddenModal);

  //   modal.appendChild(title);
  //   modal.appendChild(pokemonImage);
  //   modal.appendChild(pokemonHeight);
  //   modal.appendChild(pokemonTypes);
  //   modal.appendChild(closeButtonElement);
  //   modalContainer.appendChild(modal);

  //   modalContainer.addEventListener('click', (e) => {
  //     let target = e.target;
  //     if (target === modalContainer) {
  //       hiddenModal();
  //     }
  //   })
  //   modalContainer.classList.add('is-visible');
  // }



  // function hiddenModal() {
  //   let modalContainer = document.querySelector('.modal-container');
  //   modalContainer.classList.remove('is-visible');
  // }
  // //use ESC to close the modal
  // window.addEventListener('keydown', (e) => {
  //   let modalContainer = document.querySelector('.modal-container');
  //   if (e.key === 'Escape' &&
  //     modalContainer.classList.contains('is-visible')) {
  //     hiddenModal();
  //   }

  // });




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

