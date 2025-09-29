import { useEffect, useState } from 'react'
import { getPokedexNumber } from '../utils'
import { getFullPokedexNumber } from '../utils'
import TypeCard from './TypeCard'

export default function PokeCard(props) {
    const {selectedPokemon} = props
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    const { name, height, abilities, stats, types, moves, sprites } = data || []

    const spritesToDisplay = Object.keys(sprites || {}).filter(val => {
        if(!sprites[val]) { return false }

        if(['versions', 'other'].includes(val)) { return false }

        return true
    })

    useEffect(
        ()=>{
            // if loading, exit logic - NO REFETCH
            if (loading || !localStorage) { return }
            // check is selected pokemon is in the cache
            // 1. define the cache
            let cache = {}
            if(localStorage.getItem('pokedex')) {
                cache = JSON.parse(localStorage.getItem('pokedex'))
            }
            // 2. check if the selected pokemon is in the cache, else API fetch
            if (selectedPokemon in cache) {
                setData(cache[selectedPokemon])
                return
            }

            async function fetchPokemonData() {
                setLoading(true)
                try {
                    const finalUrl = "https://pokeapi.co/api/v2/pokemon/" + getPokedexNumber(selectedPokemon)
                    const response = await fetch(finalUrl)
                    const pokemonData = await response.json()
                    setData(pokemonData)
                    console.log(pokemonData)
                    cache[selectedPokemon] = pokemonData
                    localStorage.setItem('pokedex', JSON.stringify(cache))
                } catch (err) {
                    console.log(err.message)
                } finally {
                    setLoading(false)
                }
            }
            
            fetchPokemonData()

        }, 
        [selectedPokemon])

        if(loading || !data) {
            return(
                <h4>Loading...</h4>
            )
        }
    return (
    <div>
        <div>
            <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
            <h2>{name}</h2>
        </div>
        <div className='type-container'>
            {
                types.map((typeObject, typeIndex) => {
                    return (
                        <TypeCard key={typeIndex} type={typeObject?.type?.name}/>
                    )
                })
            }
        </div>

        <img 
        className='default-img'
        src={'/pokemon/' + getFullPokedexNumber(selectedPokemon) + '.png'}
        alt={`${name}-large-img`}/>

        <div className='image-container'>
            {
                spritesToDisplay.map((spriteUrl, spriteIndex) => {
                    return (
                    <img
                    key={spriteIndex}
                    src={sprites[spriteUrl]}
                    alt={`${name}-image-${spriteUrl}`}/>
                    )
                })
            }
        </div>

    </div>
    )
}