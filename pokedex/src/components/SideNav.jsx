import { getFullPokedexNumber } from "../utils"
import { first151Pokemon } from "../utils"
import { useState } from 'react'

export default function SideNav(props) {
    const {selectedPokemon, setSelectedPokemon, handleCloseMenu, showSideMenu} = props

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
        <nav className={'' + (showSideMenu ? 'open' : '')}>
            <div className={'header ' + (showSideMenu ? 'open' : '')}>
                <button 
                className='open-nav-button'
                onClick = { handleCloseMenu }>
                    <i class="fa-solid fa-arrow-left-long"></i>
                </button>
                <h1 className='text-gradient'>Pokédex</h1>
            </div>
            <input
                placeholder='Search...' 
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
                            handleCloseMenu()
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