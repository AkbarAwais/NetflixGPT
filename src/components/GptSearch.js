import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'

const GptSearch = () => {
    return (
        <div className='w-screen h-screen bg-gray-900'>
            <GptSearchBar />
            <GptMovieSuggestions />
        </div>

    )
}

export default GptSearch
