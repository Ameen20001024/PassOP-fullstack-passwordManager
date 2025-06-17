import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Navbar = () => {

    const navigate = useNavigate()
    const logout = async ()=> {
        try {
            await axios.post("http://localhost:8000/api/v1/user/logout", {},
                {withCredentials : true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )

            navigate('/')

        } catch (error) {
            console.log("api error")
        }
        
    }


    return (
        <nav className='bg-slate-800 text-white'>
            <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
                <div className="logo font-bold text-white text-2xl">
                    <span className='text-green-500'> &lt;</span>
                    <span>Pass</span>
                    <span className='text-green-500'>OP/&gt;</span>
                </div>

                <button onClick={logout}  className='text-white bg-green-700 flex rounded-3xl justify-center items-center font-bold px-2 pt-1 pb-1.5'>
                    {/* <img className='invert w-10 p-1' src="/icons/github.svg" alt="githublogo" /> */}
                    {/* <span className='font-bold px-2 py-2 items-center'>Logout</span> */}
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default Navbar
