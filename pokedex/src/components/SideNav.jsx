import { getFullPokedexNumber } from "../utils"
import { first151Pokemon } from "../utils"

export function SideNav() {
    return (
        <nav>
            <div className={'header'}>
                <h1 className='text-gradient'>Pokédex</h1>
            </div>
            <input />
            {
                first151Pokemon.map((pokemon, pokemonIndex) => {
                    return(
                        <button className={'nav-card'}>
                            <p>{getFullPokedexNumber(pokemonIndex)}</p>
                            <p>{pokemon}</p>
                        </button>
                    )
                })
            }
        </nav>
    )
}