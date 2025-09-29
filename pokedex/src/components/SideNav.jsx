import { getFullPokedexNumber } from "../utils"
import { first151Pokemon } from "../utils"

export default function SideNav(props) {
    const {selectedPokemon, setSelectedPokemon} = props

    return (
        <nav>
            <div className={'header'}>
                <h1 className='text-gradient'>Pokédex</h1>
            </div>
            <input />
            {
                first151Pokemon.map((pokemon, pokemonIndex) => {
                    return(
                        <button 
                        key={pokemonIndex}
                        className={'nav-card'}
                        onClick={()=>{
                            setSelectedPokemon(pokemonIndex)
                        }}>
                            <p>{getFullPokedexNumber(pokemonIndex)}</p>
                            <p>{pokemon}</p>
                        </button>
                    )
                })
            }
        </nav>
    )
}