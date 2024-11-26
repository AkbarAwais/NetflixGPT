import React, { useRef, useState } from 'react'
import { validate } from '../utils/formValidation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';


const Form = () => {
    const [toggleForm, setToggleForm] = useState(true);
    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();



    const handleButtonClick = () => {
        const message = validate(email.current?.value, password.current?.value, !toggleForm && name.current?.value);
        if (message) {
            email.current.style.borderColor = "red"
            password.current.style.borderColor = "red"
            if (name.current) name.current.style.borderColor = "red"
            setErrorMessage(message)
            return;
        }

        email.current.style.borderColor = "white"
        password.current.style.borderColor = "white"
        if (name.current) name.current.style.borderColor = "white"
        setErrorMessage(null)
        if (!toggleForm) {
            createUserWithEmailAndPassword(auth, email.current?.value, password.current?.value).then((userCredential) => {
                userCredential.user && setSuccessMessage("Sign up Successfull");
                email.current.style.borderColor = "green"
                password.current.style.borderColor = "green"
                if (name.current) name.current.style.borderColor = "green"

            }).catch((error) => {
                if (error.code && error.code.includes("email-already-in-use")) {
                    setErrorMessage("Email Already In Use")
                    email.current.style.borderColor = "red"
                    password.current.style.borderColor = "red"
                    if (name.current) name.current.style.borderColor = "red"
                }

            });
        } else {
            signInWithEmailAndPassword(auth, email.current?.value, password.current?.value).then((userCredential) => {
                navigate("/browse")
            }, (error) => {
                if (error.code && error.code.includes("invalid-credential")) {
                    setErrorMessage("Invalid Crendentials")
                    email.current.style.borderColor = "red"
                    password.current.style.borderColor = "red"
                }
            })
        }

    }

    return (
        <div className='flex items-center justify-center'>
            <div className='min-w-[450px] max-w-md bg-black bg-opacity-75 p-10 m-20 rounded-lg shadow-lg'>
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
                <div className='text-3xl font-bold text-white mb-10 text-center'>{toggleForm ? <>Sign In</> : <>Sign Up</>}</div>
                <div className='flex justify-center items-center'>
                    <form className='space-y-6' onSubmit={(event) => { event.preventDefault(); }}>
                        {!toggleForm && <div className='relative space-y-4'>
                            <label htmlFor="name" class="absolute text-sm text-gray-400 duration-150
                         left-5 top-6 peer-placeholder-shown:top-4
                         peer-placeholder-shown:text-base peer-focus:top-2
                         peer-focus:text-sm transform-gpu">Full Name</label>
                            <input ref={name} id="name" className='w-[350px] h-[60px] px-6 py-4 bg-zinc-800/50 rounded text-white
                         focus:border-gray-500 focus:ring-0 focus:bg-zinc-800/50
                         hover:bg-zinc-800/50 placeholder:text-transparent border-2
                         peer pt-8 [&:not(:placeholder-shown)]:bg-zinc-800/50' type='text' placeholder="."></input>
                        </div>}
                        <div className='relative space-y-4'>
                            <label htmlFor="email" class="absolute text-sm text-gray-400 duration-150
                         left-5 top-6 peer-placeholder-shown:top-4
                         peer-placeholder-shown:text-base peer-focus:top-2
                         peer-focus:text-sm transform-gpu">Email or mobile number</label>
                            <input ref={email} id="email" className='w-[350px] h-[60px] px-6 py-4 bg-zinc-800/50 border-zinc-600 rounded text-white
                         focus:border-gray-500 focus:ring-0 focus:bg-zinc-800/50
                         hover:bg-zinc-800/50 placeholder:text-transparent border-2
                         peer pt-8 [&:not(:placeholder-shown)]:bg-zinc-800/50' type='text' placeholder="."></input>
                        </div>

                        <div className='relative space-y-4'>
                            <label htmlFor="password" class="absolute text-sm text-gray-400 duration-150
                         left-5 top-6 peer-placeholder-shown:top-4
                         peer-placeholder-shown:text-base peer-focus:top-2
                         peer-focus:text-sm transform-gpu">Password</label>
                            <input ref={password} id="password" className='w-full h-[60px] px-5 py-4 bg-zinc-800/50 rounded text-white
                         focus:border-red-500 focus:ring-0 focus:bg-zinc-800/50
                         hover:bg-zinc-800/50 placeholder:text-transparent
                         border-2
                         peer pt-8 [&:not(:placeholder-shown)]:bg-zinc-800/50' type='password' placeholder='Password'></input>
                        </div>
                        {errorMessage && <h3 className='text-red-600 font-bold p-2'>{errorMessage}</h3>}
                        {successMessage && <p className='text-green-500 font-semibold p-2 inline-block'>{successMessage}.</p>}
                        {successMessage && <p className='text-green-500 font-semibold inline cursor-pointer hover:text-white hover:underline' onClick={() => {
                            setToggleForm(!toggleForm)
                            setSuccessMessage(null);
                            email.current.style.borderColor = "white"
                            password.current.style.borderColor = "white"

                        }}>Click here to sign in</p>}
                        <button
                            onClick={handleButtonClick}
                            type="submit"
                            className="w-full bg-[rgb(228,9,21)] hover:bg-red-900 text-white py-2 rounded font-medium transition-all ease-in-out duration-300"
                        >
                            {toggleForm ? <>Sign In</> : <>Sign Up</>}
                        </button>
                        <div>
                            <div className='relative space-y-4 text-center'>
                                <div class="absolute text-sm text-gray-400 duration-150
                         left-32 peer-placeholder-shown:top-4
                         peer-placeholder-shown:text-base peer-focus:top-1
                         peer-focus:text-sm transform-gpu cursor-pointer hover:decoration-2 hover:text-white hover:underline" >Forgot Password?</div>
                            </div>
                        </div>
                        <div className='relative text-left top-6 text-gray-400 flex text-pretty'>

                            {toggleForm ? <h3 className='m-2'>New to Netflix?</h3> : <h3 className='m-2'>Already have an account?</h3>}
                            <p className='mx-0 m-2 hover:underline cursor-pointer hover:text-white' onClick={() => {
                                setToggleForm(!toggleForm);
                                email.current.style.borderColor = "white"
                                password.current.style.borderColor = "white"
                                setErrorMessage(null);

                            }} >
                                {toggleForm ? <>Sign Up Now.</> : <>Sign in.</>}
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Form
