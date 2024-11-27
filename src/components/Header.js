import { signOut } from 'firebase/auth';
import React from 'react'
import { useSelector } from 'react-redux'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const user = useSelector((store) => store?.user);
    const navigate = useNavigate();
    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate('/');
        })
    }
    return (
        <header className='w-screen absolute'>
            <div className='box-border bg-gradient-to-br from-slate-950 flex justify-between items-center'>
                <img className='max-w-[180px] cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.1] sticky' src='https://images.ctfassets.net/y2ske730sjqp/6bhPChRFLRxc17sR8jgKbe/6fa1c6e6f37acdc97ff635cf16ba6fb3/Logos-Readability-Netflix-logo.png' alt=''></img>
                <div className='text-indigo-800 font-bold mr-10 text-2xl text-left'>
                    {user && user.displayName}
                    {user &&
                        <div className='mr-8 text-xl text-red-800 transition-all duration-200 ease-in-out hover:scale-[1.1] font-bold cursor-pointer text-right' onClick={handleSignOut}>
                            Sign out
                        </div>}
                </div>

            </div>
        </header>
    )
}

export default Header
