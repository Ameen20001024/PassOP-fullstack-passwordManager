import React from 'react'

const LoginNavbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
        <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
            <div className="logo font-bold text-white text-2xl">
                <span className='text-green-500'> &lt;</span>
                <span>Pass</span>
                <span className='text-green-500'>OP/&gt;</span>
            </div>

            <div>

                <div>
                    <p>Haven't signed up yet?</p>
                </div>

                <button className='text-white bg-green-700 flex rounded-3xl justify-center items-center font-bold px-2 pt-1 pb-1.5'>
                    Sign Up
                </button>

            </div>

            
        </div>
    </nav>
  )
}

export default LoginNavbar
