import { useEffect, useState } from 'react'
import { getPokedexNumber } from '../utils'
import { getFullPokedexNumber } from '../utils'
import TypeCard from './TypeCard'
import Modal from './Modal'

export default function PokeCard(props) {
    const {selectedPokemon} = props

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [skill, setSkill] = useState(null)
    const [loadingSkill, setLoadingSkill] = useState(false)

    const { name, height, abilities, stats, types, moves, sprites } = data || []

    const spritesToDisplay = Object.keys(sprites || {}).filter(val => {
        if(!sprites[val]) { return false }

        if(['versions', 'other'].includes(val)) { return false }

        return true
    })

    async function fetchMoveData(move, moveUrl) {
        if(loadingSkill || !localStorage || !moveUrl) { return }

        let moveCache = {}
        if(localStorage.getItem('pokemon-moves')) {
            moveCache = JSON.parse(localStorage.getItem('pokemon-moves'))
        }

        if(move in moveCache) {
            setSkill(moveCache[move])
            console.log('Found move in cache)')
            return
        }

        try {
            setLoadingSkill(true)
            const response = await fetch(moveUrl)
            const moveData = await response.json()
            console.log(moveData)
            const description = moveData
                ?.flavor_text_entries.filter(val => {
                    return val.version_group.name = 'firered-leafgreen'
                }
            )[0]?.flavor_text 

            const skillData = {
                name: move,
                description: description
            }

            setSkill(skillData)

            moveCache[move] = skillData
            localStorage.setItem('pokemon-moves', JSON.stringify(moveCache))
        } catch (err) {
            console.log(err.message)
        } finally {
            setLoadingSkill(false)
        }
    }

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
    <div className='poke-card'>
        {skill && (
            <Modal handleCloseModal={() => { setSkill(null) }}>
                <div>
                    <h6>Name</h6>
                    <h2 className='skill-name'>
                        {skill.name.replaceAll('-', ' ')}
                    </h2>
                </div>
                <div>
                    <h6>Description</h6>
                    <p>{skill.description}</p>
                </div>
            </Modal>
        )}
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

        <h3>Stats</h3>
        <div className='stats-card'>
            {
                stats.map((statObject, statIndex) => {
                    const {stat, base_stat} = statObject
                    return(
                        <div
                        key={statIndex}
                        className='stat-item'>
                            <p>{stat?.name.replaceAll('-', ' ')}</p>
                            <h4>{base_stat}</h4>
                        </div>
                    )
                })
            }
        </div>
        <h3>Moves</h3>
        <div className='pokemon-move-grid'>
            {
                moves.map((moveObject, moveIndex) => {
                    return(
                        <button
                        onClick = {() => {
                            fetchMoveData(
                                moveObject?.move?.name,
                                moveObject?.move?.url
                            )
                        }}
                        key={moveIndex} 
                        className='button-card pokemon-move'>
                            <p>{moveObject?.move?.name.replaceAll('-', ' ')}</p>
                        </button>
                    )
                })
            }
        </div>

    </div>
    )
}