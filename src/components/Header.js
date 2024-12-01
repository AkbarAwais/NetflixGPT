import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { addUser, removeUser } from '../utils/userSlice';
import { toggleSearch } from '../utils/gptSlice';

const Header = () => {
    const user = useSelector((store) => store?.user);
    const search = useSelector((store) => store?.gpt.showGptSearch);
    const navigate = useNavigate();
    const handleSignOut = () => {
        signOut(auth).then(() => { })
    }
    const dispatch = useDispatch();
    const handleGptSearchClick = () => {
        dispatch(toggleSearch());
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(addUser({ uid: user.uid, email: user.email, displayName: user.displayName }))
                search && dispatch(toggleSearch())
                navigate('/browse')
            } else {
                dispatch(removeUser(user));
                navigate('/')
            }
        })
        return () => unsubscribe();
    }, [])
    return (
        <div className="inset-0 z-10">
            <header className='w-[100%] absolute z-10'>
                <div className='box-border bg-gradient-to-b from-black justify-between items-center sticky inset-0 flex flex-col md:flex-row pl-4'>
                    <img onClick={() => search && handleGptSearchClick()} className='max-w-[180px] cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.1]' src='https://images.ctfassets.net/y2ske730sjqp/6bhPChRFLRxc17sR8jgKbe/6fa1c6e6f37acdc97ff635cf16ba6fb3/Logos-Readability-Netflix-logo.png' alt=''></img>
                    <div className='text-yellow-300 font-bold mr-2 text-2xl text-left cursor-default '>
                        {user && <button className='mr-20 px-2 py-1 text-white transition-all duration-300 ease-in-out hover:scale-[0.95] bg-blue-600 border-2 rounded-lg font-mono' onClick={handleGptSearchClick}>{!search ? 'GPT Search' : 'Homepage'}</button>}
                        {user && user.displayName}
                        {user &&
                            <div className='inline-block mr-8 px-12 text-xl text-white transition-all duration-200 ease-in-out hover:scale-[1.1] font-bold cursor-pointer text-right relative left-52 md:left-0 md:px-6 md:py-6' onClick={handleSignOut}>
                                Sign out
                            </div>}
                    </div>

                </div>
            </header>
        </div>

    )
}

export default Header
