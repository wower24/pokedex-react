import { getFullPokedexNumber } from "../utils"
import { first151Pokemon } from "../utils"
import { useState } from 'react'

export default function SideNav(props) {
    const {selectedPokemon, setSelectedPokemon} = props

    const [searchPhrase, setSearchPhrase] = useState('')

    const filteredPokemon = first151Pokemon.filter((element, elementIndex) => {
        if(toString(getFullPokedexNumber(elementIndex)).includes(searchPhrase)) {
                return true
        }

        if(element.toLowerCase().includes(searchPhrase.toLowerCase())) {
            return true
        }

        else
            return false
    })

    return (
        <nav>
            <div className={'header'}>
                <h1 className='text-gradient'>Pokédex</h1>
            </div>
            <input 
                value={searchPhrase}
                onChange={ (e) =>
                    setSearchPhrase(e.target.value)
                }
            />
            {
                filteredPokemon.map((pokemon, pokemonIndex) => {
                    return(
                        <button 
                        key={pokemonIndex}
                        className={
                            'nav-card' + (pokemonIndex === selectedPokemon ? 'nav-card-selected' : '')
                        }
                        onClick={()=>{
                            setSelectedPokemon(first151Pokemon.indexOf(pokemon))
                        }}>
                            <p>{getFullPokedexNumber(first151Pokemon.indexOf(pokemon))}</p>
                            <p>{pokemon}</p>
                        </button>
                    )
                })
            }
        </nav>
    )
}