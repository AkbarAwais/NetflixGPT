import React from 'react'
import Header from './Header';
import useMovieData from "../hooks/useMovieData"
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';

const Browse = () => {
    useMovieData();

    return (
        <div>
            <Header />
            <MainContainer />
            {/* <SecondaryContainer /> */}
        </div>
    )
}

export default Browse
