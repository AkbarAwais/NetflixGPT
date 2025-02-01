import React, { useEffect } from 'react'
import Header from './Header';
import useMovieData from "../hooks/useMovieData"
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import { useSelector } from 'react-redux';
import GptSearch from "./GptSearch"
import Shimmer from './Shimmer';

const Browse = () => {
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
    const isShimmer = useSelector((store) => store.movies.isShimmer);
    useMovieData();
    if (isShimmer) {
        return (
            <div className='bg-black w-screen h-screen relative pt-10 pl-10 flex'>
                <Shimmer />
                <Shimmer />
                <Shimmer />
                <Shimmer />
                <Shimmer />
                <Shimmer />
                <Shimmer />
            </div>)
    }
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
