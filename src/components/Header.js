import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { addUser, removeUser } from '../utils/userSlice';
import { toggleSearch } from '../utils/gptSlice';
import logo from '../assets/trailer-verse-logo-v2.svg';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const user = useSelector((store) => store?.user);
    const search = useSelector((store) => store?.gpt.showGptSearch);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSignOut = () => {
        signOut(auth).then(() => { });
    };

    const handleGptSearchClick = () => {
        dispatch(toggleSearch());
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(addUser({ uid: user.uid, email: user.email, displayName: user.displayName }));
                search && dispatch(toggleSearch());
                navigate('/browse');
            } else {
                dispatch(removeUser(user));
                navigate('/');
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="fixed top-0 left-0 w-full z-50" // ✅ Fixed Position & Highest Z-Index
        >
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                className="w-full bg-gradient-to-b from-black to-transparent shadow-xl backdrop-blur-lg border-b-2 border-gray-800"
            >
                <div className="relative flex justify-between items-center px-4 md:px-6 py-3">
                    {/* Logo */}
                    <motion.img
                        onClick={() => search && handleGptSearchClick()}
                        className="w-40 sm:w-48 cursor-pointer transition-all hover:scale-110 drop-shadow-lg ease-in-out"
                        src={logo}
                        alt="Logo"
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                    />

                    {/* Mobile Menu Button */}
                    {user && (
                        <button className="md:hidden text-white z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    )}

                    {/* Desktop Menu */}
                    <div className="hidden md:flex text-yellow-300 font-bold text-xl items-center gap-6">
                        {user && (
                            <motion.button
                                className="px-4 py-1 text-white bg-transparent border-2 border-white rounded-lg font-mono hover:bg-white hover:text-black shadow-md backdrop-blur-md"
                                onClick={handleGptSearchClick}
                                whileHover={{ scale: 1.1, boxShadow: '0px 0px 15px rgba(255,255,255,0.8)' }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                {!search ? 'Search' : 'Home'}
                            </motion.button>
                        )}
                        {user && (
                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
                                {user.displayName}
                            </motion.span>
                        )}
                        {user && (
                            <motion.button
                                className="px-4 py-1 text-white bg-transparent border-2 border-red-600 rounded-lg shadow-lg hover:bg-red-600 cursor-pointer backdrop-blur-md"
                                onClick={handleSignOut}
                                whileHover={{ scale: 1.1, boxShadow: '0px 0px 15px rgba(255, 0, 0, 0.8)' }}
                                transition={{ type: 'spring', stiffness: 250 }}
                            >
                                Sign out
                            </motion.button>
                        )}
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {isMenuOpen && user && (
                    <motion.div
                        className="md:hidden absolute top-16 right-4 bg-black bg-opacity-90 p-4 rounded-lg shadow-lg w-44 flex flex-col items-center space-y-3 z-50"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.button
                            className="w-full px-4 py-1 text-white bg-transparent border-2 border-white rounded-lg font-mono hover:bg-white hover:text-black shadow-md backdrop-blur-md"
                            onClick={handleGptSearchClick}
                            whileHover={{ scale: 1.05 }}
                        >
                            {!search ? 'Search' : 'Home'}
                        </motion.button>
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                            {user.displayName}
                        </motion.span>
                        <motion.button
                            className="w-full px-4 py-1 text-white bg-transparent border-2 border-red-600 rounded-lg shadow-lg hover:bg-red-600 cursor-pointer backdrop-blur-md"
                            onClick={handleSignOut}
                            whileHover={{ scale: 1.05 }}
                        >
                            Sign out
                        </motion.button>
                    </motion.div>
                )}
            </motion.header>
        </motion.div>
    );
};

export default Header;
