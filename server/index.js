const server = require("express")();
const port = 3001;
const getPokemon = require('./getPokemon');
const getSpecies = require('./getSpecies');
const getEvolution = require('./getEvolution');

server.get('/api/pokemon/v1/:id/', async (req, resp) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${req.params.id}/`;
    const pokemon = await getPokemon(url);
    const species = await getSpecies(pokemon.species.url);
    const evolution = await getEvolution(species.evolution.url);

    const response = {
        ...pokemon, 
        habitat: species.habitat,
        ...evolution
    };

    resp.send(response);
});

server.listen(port, ()=>{
    console.log('listening', port);
})