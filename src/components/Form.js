import React, { useState } from 'react'


const Form = () => {
    const [toggleForm, setToggleForm] = useState(true);
    return (
        <div className='flex items-center justify-center'>
            <div className='min-w-[450px] max-w-md bg-black bg-opacity-75 p-10 rounded-lg shadow-lg'>
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
                <div className='flex justify-center'>
                    <form className='space-y-6' action='#'>
                        {!toggleForm && <div className='relative space-y-4'>
                            <label htmlFor="name" class="absolute text-sm text-gray-400 duration-150
                         left-5 top-6 peer-placeholder-shown:top-4
                         peer-placeholder-shown:text-base peer-focus:top-2
                         peer-focus:text-sm transform-gpu">Full Name</label>
                            <input id="name" className='w-[350px] h-[60px] px-6 py-4 bg-zinc-800/50 border-zinc-600 rounded text-white
                         focus:border-gray-500 focus:ring-0 focus:bg-zinc-800/50
                         hover:bg-zinc-800/50 placeholder:text-transparent
                         peer pt-8 [&:not(:placeholder-shown)]:bg-zinc-800/50' type='text' required placeholder="."></input>
                        </div>}
                        <div className='relative space-y-4'>
                            <label htmlFor="email" class="absolute text-sm text-gray-400 duration-150
                         left-5 top-6 peer-placeholder-shown:top-4
                         peer-placeholder-shown:text-base peer-focus:top-2
                         peer-focus:text-sm transform-gpu">Email or mobile number</label>
                            <input id="email" className='w-[350px] h-[60px] px-6 py-4 bg-zinc-800/50 border-zinc-600 rounded text-white
                         focus:border-gray-500 focus:ring-0 focus:bg-zinc-800/50
                         hover:bg-zinc-800/50 placeholder:text-transparent
                         peer pt-8 [&:not(:placeholder-shown)]:bg-zinc-800/50' type='text' required placeholder="."></input>
                        </div>

                        <div className='relative space-y-4'>
                            <label htmlFor="password" class="absolute text-sm text-gray-400 duration-150
                         left-5 top-6 peer-placeholder-shown:top-4
                         peer-placeholder-shown:text-base peer-focus:top-2
                         peer-focus:text-sm transform-gpu">Password</label>
                            <input id="password" className='w-full h-[60px] px-5 py-4 bg-zinc-800/50 border-zinc-600 rounded text-white
                         focus:border-gray-500 focus:ring-0 focus:bg-zinc-800/50
                         hover:bg-zinc-800/50 placeholder:text-transparent
                         peer pt-8 [&:not(:placeholder-shown)]:bg-zinc-800/50' type='password' required placeholder='Password'></input>
                        </div>

                        <button
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
                            <p className='mx-0 m-2 hover:underline cursor-pointer hover:text-white' onClick={() => setToggleForm(!toggleForm)} >
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
