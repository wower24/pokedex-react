import { first151Pokemon } from "../utils"

export function SideNav() {
    return (
        <nav>
            {
                first151Pokemon.map((pokemon, pokemonIndex) => {
                    return(
                        <button>

                        </button>
                    )
                })
            }
        </nav>
    )
}