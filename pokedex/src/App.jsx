import Header from "./components/Header"
import PokeCard from "./components/PokeCard"
import SideNav from "./components/SideNav"
import { useState } from 'react'

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(0)
  const [showSideMenu, setShowSideMenu] = useState(false)

  function handleOpenMenu() {
    setShowSideMenu(true)
  }

  function handleCloseMenu() {
    setShowSideMenu(false)
  }

  return (
    <>
      <Header onMenuClick={handleOpenMenu}/>
      <SideNav 
      selectedPokemon={selectedPokemon}
      setSelectedPokemon={setSelectedPokemon}
      handleCloseMenu={handleCloseMenu}
      showSideMenu={showSideMenu}/>
      <PokeCard selectedPokemon={selectedPokemon}/>
    </>
  )
}

export default App
