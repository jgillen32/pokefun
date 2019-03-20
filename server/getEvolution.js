const axios = require('axios');

module.exports = async function getEvolution(url){
    if (url.length === 0) return {evolution:[]};
    try {
        const response = await axios(url);
        return { evolution: evolveSteps(response.data.chain) };
    } catch (error) {
        console.log('caught in getEvolution');
        return {evolution:[]};
    }
}

function evolveSteps(obj, chain = []) {
    if(!obj.species || !obj.species.name) return chain;
    chain.push({name: obj.species.name, id: obj.species.url});
    if (obj.evolves_to.length === 0) return chain;
    return evolveSteps(obj.evolves_to[0], chain);
}