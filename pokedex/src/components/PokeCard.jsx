import { useEffect, useState } from 'react'
import { getPokedexNumber } from '../utils'

export function PokeCard(props) {
    const {selectedPokemon} = props
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

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

    return (
        <div>
            
        </div>
    )
}