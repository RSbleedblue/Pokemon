var isSelected = false;
const menu = document.getElementById("dropdownBox");
const dropBTN = document.getElementById("multiLevelDropdownButton");
var typeSelected = "";
var allAbility = [];

function getMenu(){
    console.log("hi");
    if(isSelected){
        menu.classList.add("hidden");
        menu.classList.remove("absolute");
        isSelected = false;
    }
    else{
        menu.classList.add("absolute");
        menu.classList.remove("hidden");
        isSelected = true;
    }
}
function selectType(style){
    if(isSelected){
        console.log(isSelected+" "+style);
        menu.classList.add("hidden");
        menu.classList.remove("absolute");
        isSelected = false;
        dropBTN.textContent = style;
        typeSelected = style;
        console.log(typeSelected);
    }
}
async function getResultOnType(){
    const res =await fetch(`https://pokeapi.co/api/v2/type/${typeSelected.toLowerCase()}`);
    const data = await res.json();
    const pokemonData = data.pokemon;
    showPokemon(pokemonData);
}
var refinedData = [];
async function showPokemon(pokemonData){
    refinedData.splice(0,refinedData.length);
    for(let i = 1; i < 50; i++){
        const pokemonName = pokemonData[i].pokemon.name;
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const data =  await res.json();
        const dataPokemon = {
            "ability" : getAbility(data.abilities),
            "name" : data.name,
            "img" : data.sprites.front_default,
            "type" : data.types[0].type.name,
        }
        refinedData.push(dataPokemon);
    }
    displayResults(refinedData);
}
async function getPokemonDetail(){
    let val = document.getElementById("searchPokemon").value;
    console.log(val);
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${val.toLowerCase()}`);
    const data = await res.json();
    refinedData.splice(0,refinedData.length);
    const dataPokemon = {
        "ability" : getAbility(data.abilities),
        "name" : data.name,
        "img" : data.sprites.front_default,
        "type" : data.types[0].type.name,
    }
    refinedData.push(dataPokemon);
    displayResults(refinedData);
}

function displayResults(data){
    const MainContainer = document.getElementById("pokemonCapsule");
    MainContainer.innerHTML = '';
    let html = '';

    data.forEach(element => {
        html += `
            <div class="flip-card w-[20%] hover:cursor-pointer h-[300px] rounded-full border border-solid border-teal-100 " style="background-color: rgba(0, 255, 174, 0.1);">
                <div class="flip-card-inner">
                    <div class="flip-card-front flex flex-col items-center">
                        <div class="rounded-full">
                            <img src="${element.img}" class="w-28">
                        </div>
                        <p class="text-2xl text-teal-200 mb-4">${element.name}</p>
                        <p class="text-sm text-teal-900 bg-teal-100 rounded-full p-4">${element.type}</p>
                    </div>
                    <div class="flip-card-back flex flex-col items-center">
                        <div class="rounded-full">
                            <img src="${element.img}" class="w-28">
                        </div>
                        <p class="text-2xl text-teal-200 mb-4">Abilities</p>
                        <p class="text-sm text-teal-900 bg-teal-100 rounded-full p-4">Dashed, Thunder Tail, Iron Rock</p>
                    </div>
                </div>
            </div>
        `;
    });

    MainContainer.innerHTML = html;
}


function getAbility(abilities){
    allAbility.slice(0,allAbility.length);
    for(let i = 0; i< abilities.length; i++){
        allAbility.push(abilities[i].ability.name);
    }
    return allAbility;
}
async function defaultLoad(){
    refinedData.splice(0, refinedData.length);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
    const dataP = await response.json();
    const pokemonData = dataP.results;
    for(let i = 0; i < pokemonData.length; i++){
        const pokemonName = pokemonData[i].name;
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const data =  await res.json();
        const dataPokemon = {
            "ability" : getAbility(data.abilities),
            "name" : data.name,
            "img" : data.sprites.front_default,
            "type" : data.types[0].type.name,
        }
        refinedData.push(dataPokemon);
    }
    console.log(refinedData);
    displayResults(refinedData);
}

async function reset(){
    defaultLoad();

}
defaultLoad();
