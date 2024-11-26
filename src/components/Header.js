import React from 'react'
import netflixSvg from '../assets/netflix-header.svg'

const Header = () => {
    return (
        <header>
            <header className='pl-[2rem] pr-[2rem] pt-[1.5rem] pb-[1.5rem] ml-[120px] w-[inherit]'>
                <div className='box-border bg-gradient-to-b from-zinc-950 absolute'>
                    <img className='max-w-[180px] cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.1] sticky' src={netflixSvg} alt=''></img>
                </div>
            </header>
        </header>
    )
}

export default Header
