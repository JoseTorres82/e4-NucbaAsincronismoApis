const searchButton = document.getElementById('btn-buscar');
const pokemonContainer = document.getElementById('pokemonContainer');

searchButton.addEventListener('click', () => {
    const cardnNumberInput = document.getElementById('inputNum');
    const cardNumber = cardnNumberInput.value;
    if (cardNumber === '') {
        const errorCardHTML = `
        <img src="/assets/img/notFound.png" alt="error-image">
        <p> Por favor, ingresa un número de Pokémon válido.</p>
        `;
        pokemonContainer.innerHTML = errorCardHTML;
        return;
    }
    fetchPokemonData(cardNumber);

    cardnNumberInput.value ="";
});

function fetchPokemonData(cardNumber) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${cardNumber}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
            
                throw new Error('Pokémon no encontrado');
                
            }
            return response.json();
        })
        .then(data => {
            displayPokemonData(data);
        })
        .catch(error => {
            showError(error.message);
            const empyCardHTML = `
        <img src="/assets/img/emptyError.png" alt="error-image">
        <p> Pokémon no encontrado.</p>
        `;
        pokemonContainer.innerHTML = empyCardHTML;
        });
}

function displayPokemonData(pokemonData) {
    const pokemonName = pokemonData.name;
    const pokemonTypes = pokemonData.types.map(type => type.type.name).join(', ');
    const pokemonHeight = pokemonData.height / 10;
    const pokemonWeight = pokemonData.weight / 10;
    const pokemonImageUrl = pokemonData.sprites.front_default;

    const pokemonCardHTML = `
  <img src="${pokemonImageUrl}" alt="${pokemonName}">
    <h2>${pokemonName}</h2>
    <p><strong>Tipo:</strong> ${pokemonTypes}</p>
    <p><strong>Altura:</strong> ${pokemonHeight} m</p>
    <p><strong>Peso:</strong> ${pokemonWeight} kg</p>
    
  `;

    pokemonContainer.innerHTML = pokemonCardHTML;

}
function showError(errorMessage) {
    const errorHTML = `<p class="error-message">${errorMessage}</p>`;
    pokemonContainer.innerHTML = errorHTML;

}