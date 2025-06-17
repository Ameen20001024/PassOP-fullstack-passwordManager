import React from 'react'
import { useNavigate } from 'react-router-dom'

const LoginNavbar = () => {

    const navigate = useNavigate()

    const gotoRegisterpage = () => {
        navigate("/register")
    }

  return (
    // <nav className='bg-slate-800 text-white'>
    //     <div className="mycontainer flex justify-between items-center px-4 py-10 h-14">
    //         <div className="logo font-bold text-white text-2xl">
    //             <span className='text-green-500'> &lt;</span>
    //             <span>Pass</span>
    //             <span className='text-green-500'>OP/&gt;</span>
    //         </div>

    //         <div className="flex flex-col items-center gap-1 md:flex-row md:gap-4 md:items-end">
                
    //             <p>Haven't signed up yet?</p>

    //             <button onClick={gotoRegisterpage} className='text-white bg-green-700 flex rounded-3xl justify-center items-center font-bold px-2 pt-1 pb-1.5'>
    //                 Sign Up
    //             </button>

    //         </div>

            
    //     </div>
    // </nav>

    <nav className='bg-slate-800 text-white'>

            <div className="mycontainer flex justify-between items-center px-4 py-8 h-14">

                <div className="logo font-bold pb-1.25 text-white text-2xl">

                    <span className='text-green-500'> &lt;</span>
                    <span>Pass</span>
                    <span className='text-green-500'>OP/&gt;</span>

                </div>

                <div className="flex flex-col pb-0.5 items-center justify-center gap-1 md:flex-row md:gap-4 md:items-end">
    
                    <p className=' pb-0.75 text-lg'>Haven't Signed Up?</p>
                                       
                    <button onClick={gotoRegisterpage} className='text-white bg-green-700 flex rounded-4xl justify-center items-center font-bold px-3 pt-1 pb-1.75'>
                        SignUp
                    </button>

                </div>

            </div>

        </nav>

  )
}

export default LoginNavbar
