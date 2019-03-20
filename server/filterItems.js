module.exports = function filterItems(items, type) {
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
            return ({
                name: i.stat.name, 
                value: i.base_stat, 
                effort: i.effort
            });
        })
    }
    if (type === 'forms') {
        return items.map(i=>{
            return {name: i.name};
        })
    }
    if (type === 'species') {
        return {url: items.url };
    }
}