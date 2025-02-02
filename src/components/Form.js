import React, { useRef, useState } from 'react'
import { validate } from '../utils/formValidation';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser, updateUser } from '../utils/userSlice';

const Form = () => {
    const [toggleForm, setToggleForm] = useState(true);
    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [resetSuccess, setResetSucces] = useState(false);
    const [resetBtn, setResetBtn] = useState(false);
    const dispatch = useDispatch();

    const handleButtonClick = async () => {
        const message = validate(email.current?.value, password.current?.value, !toggleForm && name.current?.value, resetBtn);
        if (message) {
            email.current.style.borderColor = "red"
            if (!resetBtn) password.current.style.borderColor = "red"
            if (name.current) name.current.style.borderColor = "red"
            setErrorMessage(message)
            return;
        }

        if (resetBtn) {
            await sendPasswordResetEmail(auth, email.current.value).catch((error) => {
                console.log(error);
            });
            setResetSucces(true);
            return;
        }

        email.current.style.borderColor = "white"
        password.current.style.borderColor = "white"
        if (name.current) name.current.style.borderColor = "white"
        setErrorMessage(null)
        if (!toggleForm) {
            createUserWithEmailAndPassword(auth, email.current?.value, password.current?.value).then(() => {
                updateProfile(auth.currentUser, {
                    displayName: name.current?.value
                }).then(() => {
                    dispatch(addUser({ uid: auth.currentUser.uid, email: auth.currentUser.email, displayName: auth.currentUser.displayName }))
                })
            }).catch((error) => {
                if (error.code && error.code.includes("email-already-in-use")) {
                    setErrorMessage("Email Already In Use")
                    email.current.style.borderColor = "red"
                    password.current.style.borderColor = "red"
                    if (name.current) name.current.style.borderColor = "red"
                }
            });
        } else {
            signInWithEmailAndPasswordFn(email.current?.value, password.current?.value);
        }
    }

    const signInWithEmailAndPasswordFn = (email, password) => {
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            dispatch(updateUser({ uid: userCredential.uid, email: userCredential.email, displayName: userCredential.displayName }))
        }, (error) => {
            if (error.code && error.code.includes("invalid-credential")) {
                setErrorMessage("Invalid Credentials")
                if (email.current) email.current.style.borderColor = "red"
                if (password.current) password.current.style.borderColor = "red"
            }
        })
    }

    const forgotPasswordHandler = () => {
        setResetBtn(true);
    }

    return (
        <div className='flex items-center justify-center absolute inset-0 w-full'>
            <div className='bg-black bg-opacity-75 p-8 md:p-10 rounded-lg shadow-lg w-[90%] sm:w-[400px]'>
                <style jsx global>{`
                    input:-webkit-autofill,
                    input:-webkit-autofill:hover,
                    input:-webkit-autofill:focus,
                    input:-webkit-autofill:active {
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: white;
                        transition: background-color 5000s ease-in-out 0s;
                        box-shadow: inset 0 0 20px 20px rgb(39 39 42 / 0.5) !important;
                    }
                `}</style>
                <div className='text-3xl font-bold text-white mb-6 text-center'>
                    {toggleForm ? resetBtn ? 'Reset Password' : 'Sign In' : 'Sign Up'}
                </div>
                <div className='flex justify-center items-center'>
                    <form className='space-y-6' onSubmit={(event) => { event.preventDefault(); }}>
                        {/* Name input (only for sign-up) */}
                        <div className='text-white font-bold cursor-pointer p-3 pt-2 rounded-lg text-center hover:bg-cyan-300 hover:text-black ease-in-out transition-all duration-75' onClick={() => signInWithEmailAndPasswordFn(process.env.REACT_APP_EMAIL, process.env.REACT_APP_PASSWORD)}>
                            Guest Login
                        </div>
                        {!toggleForm && <div className='relative space-y-4'>
                            <label htmlFor="name" className="absolute text-sm text-gray-400 left-5 top-6 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm">Full Name</label>
                            <input ref={name} id="name" className='w-full h-12 px-6 py-4 bg-zinc-800/50 rounded text-white focus:border-gray-500 focus:ring-0 focus:bg-zinc-800/50 hover:bg-zinc-800/50 placeholder:text-transparent peer' type='text' placeholder="Full Name" />
                        </div>}

                        {/* Guest login button */}

                        {/* Email input */}
                        <div className='relative space-y-4'>
                            <label htmlFor="email" className="absolute text-sm text-gray-400 left-5 top-6 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm">Email</label>
                            <input ref={email} id="email" className='w-full h-12 px-6 py-4 bg-zinc-800/50 border-zinc-600 rounded text-white focus:border-gray-500 focus:ring-0 focus:bg-zinc-800/50 hover:bg-zinc-800/50 placeholder:text-transparent peer' type='text' placeholder="Email" />
                        </div>

                        {/* Password input (not for reset) */}
                        {!resetBtn && <div className='relative space-y-4'>
                            <label htmlFor="password" className="absolute text-sm text-gray-400 left-5 top-6 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm">Password</label>
                            <input ref={password} id="password" className='w-full h-12 px-6 py-4 bg-zinc-800/50 rounded text-white focus:border-red-500 focus:ring-0 focus:bg-zinc-800/50 hover:bg-zinc-800/50 placeholder:text-transparent peer' type='password' placeholder="Password" />
                        </div>}

                        {/* Error/success messages */}
                        {errorMessage && <h3 className='text-red-600 font-bold p-2'>{errorMessage}</h3>}
                        {successMessage && <p className='text-green-500 font-semibold p-2'>{successMessage}</p>}

                        {/* Sign in / Sign up button */}
                        <button onClick={handleButtonClick} type="submit" className="w-full bg-[rgb(228,9,21)] hover:bg-red-900 text-white py-2 rounded font-medium transition-all ease-in-out duration-300">
                            {toggleForm ? resetBtn ? 'Reset' : 'Sign In' : 'Sign Up'}
                        </button>

                        {/* Forgot Password link */}
                        {toggleForm && !resetBtn && <div className='relative space-y-4 text-center'>
                            <div className="absolute text-sm text-gray-400 left-36 cursor-pointer hover:text-white hover:underline" onClick={forgotPasswordHandler}>Forgot Password?</div>
                        </div>}

                        {/* Reset success message */}
                        {resetSuccess && <div className='text-green-500 font-bold'>
                            Reset email sent. Please check your email.
                        </div>}

                        {/* Toggle between Sign Up / Sign In */}
                        <div className='text-gray-400 text-left mt-4'>
                            {resetBtn ? '' : toggleForm ? <h3>New to Trailer Verse?</h3> : <h3>Already have an account?</h3>}
                            <p className='hover:underline cursor-pointer hover:text-white' onClick={() => {
                                if (resetBtn) {
                                    setResetBtn(false);
                                    setErrorMessage(null);
                                    setResetSucces(false);
                                    return;
                                }
                                setToggleForm(!toggleForm);
                                email.current.style.borderColor = "white"
                                password.current.style.borderColor = "white"
                                setErrorMessage(null);
                            }}>
                                {resetBtn ? 'Go Back' : toggleForm ? 'Sign Up Now' : 'Sign In'}
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Form;
