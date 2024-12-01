import React from 'react'
import Header from './Header';
import useMovieData from "../hooks/useMovieData"
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import { useSelector } from 'react-redux';
import GptSearch from "./GptSearch"

const Browse = () => {
    useMovieData();
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
    return (
        <div className='bg-black'>
            <Header />
            {
                showGptSearch ? <GptSearch /> :
                    <>
                        <MainContainer />
                        <SecondaryContainer />
                    </>
            }

        </div>
    )
}

export default Browse
