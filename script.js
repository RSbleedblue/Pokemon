function getPokemonDetail(name){
    const res = fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
}

function getPokemonbyType(type){
    const res = fetch(`https://pokeapi.co/api/v2/type/${type}`);
}

function flipCapsule() {
    const capsule = document.getElementById('pokemonCapsule');
    capsule.classList.toggle('flipped');
}
