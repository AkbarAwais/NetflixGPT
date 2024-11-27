import React, { useEffect, useState } from 'react'
import { NETFLIX_BG } from "../utils/constants"
import Header from './Header'
import Form from './Form'
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoggedUser, setIsLoggedUser] = useState(true);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(addUser({ uid: user.uid, email: user.email, displayName: user.displayName }))
                navigate('/browse')
                setIsLoggedUser(true);
            } else {
                dispatch(removeUser(user))
                setIsLoggedUser(false);
            }
        })
    }, [])

    return (
        <div className='block'>
            {
                !isLoggedUser && <>
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
