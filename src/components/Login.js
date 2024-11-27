import React from 'react'
import { NETFLIX_BG } from "../utils/constants"
import Header from './Header'
import Form from './Form'
import { useSelector } from 'react-redux'

const Login = () => {
    const user = useSelector((store) => store.user);
    return (
        <div className='block'>
            {
                !user && <>
                    <div className='bg-[rgb(0,0,0)] -z-[1] overflow-hidden bg-cover h-screen block absolute w-[-webkit-fill-available]'>
                        <img className='opacity-[0.5] min-h-[100%] max-w-[unset]' src={NETFLIX_BG} alt='Netflix Img'></img>
                    </div>
                    <Header />
                    <Form /></>
            }
        </div>
    )
}

export default Login
