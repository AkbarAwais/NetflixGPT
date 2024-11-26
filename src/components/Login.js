import React from 'react'
import { NETFLIX_BG } from "../utils/constants"
import Header from './Header'
import Form from './Form'

const Login = () => {
    return (
        <div className='block'>
            <div className='bg-[rgb(0,0,0)] -z-[1] overflow-hidden bg-cover h-[100vh] block absolute'>
                <img className='opacity-[0.5] min-h-[100%] min-w-[100%]' src={NETFLIX_BG} alt=''></img>
            </div>
            <Header />
            <Form />
        </div>
    )
}

export default Login
