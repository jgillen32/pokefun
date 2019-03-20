import React, {useState, useEffect} from 'react';

const Detail = (props) => {
    const [hasFetched, setHasFetched] = useState(false);
    const [data, setData] = useState({});
    const getPokemon = (id) => {
        return fetch(`/api/pokemon/v1/${id}/`)
            .then(data => data.json())
    }
    useEffect(() =>{
        if (!hasFetched) {
            setHasFetched(true);
            getPokemon(props.id)
                .then(pokeData => setData(pokeData));
        }  
    }); 
    return ( 
        <div className="detail">
            <img alt={data.name} src={"/images/" + data.id + ".png"} />
            <p>Name: {data.name}</p>
            <p>Evolution: 
            {
                data.evolution ? data.evolution.map((i, ind) => {
                    return (<span> {i.name}{(ind < data.evolution.length -1) ? ',': null} </span>);
                }):
                null
            }
            </p>
            <p>Types: {data.types ?
                data.types.map((i,ind) => {
                    return (<span key={i.name}>{i.name}{(ind < data.types.length -1) ? ',': null} </span>)
                }):
                null
            }
            </p>
            <p>Habitat: {data.habitat} </p>
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
                        let styles = {width: i.value+"px"};
                        return (
                            <div key={i.name}>{i.name} ({i.value})
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
                        return <li key={i.name} className="move">{i.name}</li>
                    }):
                    null
                }
            </ul>
            
        </div>
    );
}

export default Detail;