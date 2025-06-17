import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {

    const {register, setError, handleSubmit, formState: {errors, isSubmitting}} = useForm()

    const navigate = useNavigate()
    
    const delay = (d) => {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res()
            }, d*1000);
        })
    }
    
    const onSubmit = async (data)=> {
        // await delay(1);
        let k = await axios.post("http://localhost:8000/api/v1/user/login",
            data,
            {
                headers: {
                    "Content-Type": "application/json"
                },

                withCredentials: true
                
            }
        )
        console.log(data)
        console.log(k.data)
        navigate("/manager")
    } 




    return (
        <div className="container p-10">

            <ToastContainer />
                <h1 className='text-9xl pb-12.75 text-center font-bold'>
                    <span className='text-green-500'> &lt;</span>
                    <span>Pass</span><span className='text-green-500'>OP/&gt;</span>
                </h1>
            
            <form action="" className='flex flex-col gap-6 justify-center items-center' onSubmit={handleSubmit(onSubmit)}>

                <div className='flex gap-10 pb-2 text-lg justify-center items-center '>

                    <input placeholder='username' type="text" className='rounded-full border-2 border-green-500 w-full py-1.5 px-30 justify-center text-center' {...register("username", {required: {value:true, message: "This field is required"}, minLength: {value:3, message: "minimum 3 charecters required"}, maxLength:{value:10, message:"maximum number of charecters is 10"}})} />

                    {errors.username && <div> {errors.username.message} </div>}

                </div>

                <div className='flex gap-10 pb-2 text-lg justify-center items-center '>

                    <input placeholder='password' type="password" className='rounded-full border-2 border-green-500 w-full py-1.5 px-30 justify-center text-center' {...register("password", {required: {value:true, message: "This field is required"}, minLength: {value:7, message: "minimum 7 charecters required"}, maxLength:{value:12, message:"maximum number of charecters is 12"}})} />

                    {errors.password && <div> {errors.password.message} </div>}

                </div>

                <div className='flex gap-10 pt-1 pb-2 text-lg justify-center items-center '>

                    {isSubmitting? <div className='pb-4.5'>Please Wait</div> : <input disabled= {isSubmitting} type="submit" value="SUBMIT" className='rounded-full font-bold border border-green-500 w-full py-2 px-25 text-white bg-green-700' />}
                    {/* <submit disabled= {isSubmitting}>Submit</submit> */}

                </div>

            </form>

            <h1 className='text-5xl py-4 pb-10 text-center font-bold'>
                <span className='text-green-500'> &lt;</span>
                <span>Welco</span><span className='text-green-500'>Me/&gt;</span>
            </h1>
                
        </div>
    )
}

export default Login
