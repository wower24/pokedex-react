export default function Header(props) {
    const { onMenuClick } = props

    return (
        <header>
            <button 
            className='open-nav-button'
            onClick={ onMenuClick }>
                <i className="fa-solid fa-bars"></i>
            </button>
            <h1 className='text-gradient'>Pokédex</h1>
        </header>
    )
}