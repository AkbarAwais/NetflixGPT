import React from 'react'
import { NETFLIX_BG } from "../utils/constants"
import Header from './Header'
import Form from './Form'
import { useSelector } from 'react-redux'

const Login = () => {
    const user = useSelector((store) => store.user);
    return (
        <div className=''>
            {
                !user && <>
                    <div className='bg-[rgb(0,0,0)] -z-[1] overflow-hidden block absolute'>
                        <img className='opacity-[0.5] h-screen md:h-screen w-screen object-cover' src={NETFLIX_BG} alt='Netflix Img'></img>
                    </div>
                    <Header />
                    <Form /></>
            }
        </div>
    )
}

export default Login
