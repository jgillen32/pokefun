import React, {useState, useEffect} from 'react';

const Detail = (props) => {
    const [hasFetched, setHasFetched] = useState(false);
    const [data, setData] = useState({});
    const getPokemon = (id) => {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then(data => data.json())
    }
    const getSpecies = (id) => {
        return fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
            .then(data => data.json())
    }
    useEffect(() =>{
        if (!hasFetched) {
            setHasFetched(true);
            getPokemon(props.id)
                .then(pokeData => setData(pokeData));
            
            getSpecies(props.id)
                .then(console.log)
        }  
    }); 
    return ( 
        <div className="detail">
            <img alt={data.name} src={"/images/" + data.id + ".png"} />
            <p>Name: {data.name}</p>
            <p>Height: {data.height}</p>
            <p>Types: {data.types ?
                data.types.map((i,ind) => {
                    return (<span key={i.type.name}>{i.type.name}{(ind < data.types.length -1) ? ',': null} </span>)
                }):
                null
            }
            </p>
            <p>Form:&nbsp;
                {data.forms ? 
                    data.forms.map((i,ind) => {
                        return ( <span key={i.name}>{i.name}{(ind < data.forms.length -1) ? ',': null} </span>);
                    }):
                    null
                }
            </p>
                {data.stats ?
                    data.stats.map(i => {
                        let styles = {width: i.base_stat+"px"};
                        return (
                            <div key={i.stat.name}>{i.stat.name} ({i.base_stat})
                                <div className="bar">
                                    <div className="percent" style={styles}></div>
                                </div>
                            </div>
                            );
                    }):
                    null
                }
            <p>Moves:</p>
            <ul className="moves">
                {data.moves ? 
                    data.moves.map(i=>{
                        return <li key={i.move.name} className="move">{i.move.name}</li>
                    }):
                    null
                }
            </ul>
            
        </div>
    );
}

export default Detail;