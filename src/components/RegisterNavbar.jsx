import React from 'react'
import { useNavigate } from 'react-router-dom'


const RegisterNavbar = () => {

    const navigate = useNavigate()
    
    const gotoLoginpage = () => {
        navigate("/")
    }

    return (
        <nav className='bg-slate-800 text-white'>

            <div className="mycontainer flex justify-between items-center px-4 py-10 h-14">

                <div className="logo font-bold text-white text-2xl">

                    <span className='text-green-500'> &lt;</span>
                    <span>Pass</span>
                    <span className='text-green-500'>OP/&gt;</span>

                </div>

                <div className="flex flex-col items-center gap-1 md:flex-row md:gap-4 md:items-end">
    
                    <p>Already Signed Up?</p>
                                       
                    <button onClick={gotoLoginpage} className='text-white bg-green-700 flex rounded-3xl justify-center items-center font-bold px-2 pt-1 pb-1.5'>
                        Login
                    </button>

                </div>

            </div>

        </nav>
    )
}

export default RegisterNavbar
