const axios = require('axios');
const server = require("express")();
const dataObj = require('./data');

server.get('/poke/v1/pokemon/:id/', async (req, resp) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${req.params.id}/`;
    const pokemon = await getPokemon(url);
    const species = await getSpecies(pokemon.species);
    console.log(species);
    const evolution = await getEvolution(species.evolution);

    const response = {
        pokemon, 
        habitat: species.habitat,
        evolution};

    resp.send(response);
});

server.listen('8081', ()=>{
    console.log('listening', 8081);
})

async function getPokemon(url){
    let response = {};
    try {
        const pokemon = await axios(url);
        Object.keys(dataObj).forEach(i => {
            response[i] = filterItems(pokemon.data[i], i);
        })
    } catch (error) {
        response = {};
    }
    return response;
}
async function getSpecies(url){
    let response
    try {
        response = await axios(url);
    } catch (error) {
        response = {data:{}};
    }
    const {habitat, evolution_chain} = response.data;
    return {habitat: habitat.name, evolution: evolution_chain.url};
}
async function getEvolution(url){
    let response;
    try {
        response = await axios(url);
    } catch (error) {
        response = {data:{chain:{}}};
    }
    const ret = evolveSteps(response.data.chain);
    return ret;
}

function filterItems(items, type) {
    if (type && typeof items !== 'object') {
        return items;
    }
    if (type === "moves") {
        return items.map(i => {
            return {name: i.move.name};
        })
    }
    if (type === 'types') {
        return items.map(i=>{
            return {name: i.type.name};
        })
    }
    if (type === 'stats') {
        return items.map(i=>{
            return {name: i.stat.name};
        })
    }
    if (type === 'forms') {
        return items.map(i=>{
            return {name: i.name};
        })
    }
    if (type === 'species') {
        return items.url
    }
}

function evolveSteps(obj, chain = []) {
    if(!obj.species || !obj.species.name) return chain;
    chain.push({name: obj.species.name, id: obj.species.url});
    if (obj.evolves_to.length === 0) return chain;
    return evolveSteps(obj.evolves_to[0], chain);
}