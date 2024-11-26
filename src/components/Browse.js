import React, { useEffect, useState } from 'react'
import Header from './Header';
import { onAuthStateChanged } from 'firebase/auth';
import { addUser, removeUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';

const Browse = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoggedUser, setIsLoggedUser] = useState(true)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(addUser({ uid: user.uid, email: user.email, displayName: user.displayName }))
                setIsLoggedUser(true);
            } else {
                dispatch(removeUser(user))
                setIsLoggedUser(false);
                navigate('/')
            }
        })
    }, [])

    return (
        <div>
            <Header data={isLoggedUser} />
        </div>
    )
}

export default Browse
