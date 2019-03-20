const axios = require("axios");
const filterItems = require("./filterItems");
const dataObj = require("./data");

module.exports = async function getPokemon(url){
    if (url.length === 0) return dataObj;
    try {
        const response = {};
        const pokemon = await axios(url);
        Object.keys(dataObj).forEach(i => {
            response[i] = filterItems(pokemon.data[i], i);
        });
        return response;
    } catch (error) {
        console.log('caught in getPokemon');
        return dataObj;
    }
}