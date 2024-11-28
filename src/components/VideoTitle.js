import React from 'react'

const VideoTitle = ({ title, overview }) => {

    return (
        <div className='w-screen aspect-video pt-72 px-20 absolute bg-gradient-to-r from-black cursor-default'>
            <h1 className='text-5xl font-extrabold text-white inline hover:text-gray-300 transition-all ease-in-out duration-300 ml-4'>{title}</h1>
            <div className='text-2xl w-1/3 p-4 text-justify text-white flex-wrap'>{overview}</div>
            <button className='ml-6 mt-2 text-2xl bg-white border-white bg-opacity-100 text-black rounded-lg px-8 py-2 mr-5 hover:bg-gray-400
            hover:text-black transition-all duration-300 ease-in-out'>

                Play</button>
            <button className='text-2xl border-white bg-gray-500 bg-opacity-20 text-white rounded-lg px-6 py-2 hover:bg-white
            transition-all hover:text-black duration-300 ease-in-out'>More info</button>
        </div>
    )
}

export default VideoTitle
