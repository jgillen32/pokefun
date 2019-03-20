const axios = require("axios");

module.exports = async function getSpecies(url){
    if (url.length === 0) return {habitat: "", evolution: {url:''}}
    try {
        const response = await axios(url);
        const {habitat, evolution_chain} = response.data;
        return {habitat: habitat.name, evolution: {url: evolution_chain.url}};

    } catch (error) {
        console.log('caught in getSpecies');
        return {habitat: "", evolution: {url:''}};
    }
}