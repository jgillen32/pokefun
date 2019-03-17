import React from 'react';
import { Link } from "@reach/router"

const Home = (props) => {
    return (
        <div className="dex">
        {
            props.data.map(i => {
                return (
                    <div className="cards">
                        <Link to={"/pokemon/" + i.entry_number}>
                            {i.pokemon_species.name}
                            <img alt={i.pokemon_species.name} src={"/images/" + i.entry_number + ".png"} />
                        </Link>
                    </div>
                )
            })
        }
        </div>
        );
}

export default Home;