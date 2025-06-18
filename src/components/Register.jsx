import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {

    const {
    register,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting}
    } = useForm()

    // const delay = (d) => {
    //     return new Promise((res, rej) => {
    //         setTimeout(() => {
    //             res()
    //         }, d*1000);
    //     })
    // }

    const navigate = useNavigate()

    const onSubmit = async (data)=> {
        // await delay(1);
        await axios.post("http://localhost:8000/api/v1/user/register",
            data,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            })
        .then((response)=>{
            console.log(response.data)
            navigate("/")
        })
        .catch((error)=>{
            console.log(error)
        })
        // console.log(data)
        // console.log(r.data)
    }

    return (
            <div className="container p-10">

                <ToastContainer />
                <h1 className='text-8xl pb-8 text-center text font-bold'>
                    <span className='text-green-500'> &lt;</span>
                    <span>Pass</span><span className='text-green-500'>OP/&gt;</span>
                </h1>

                <form action="" className='flex flex-col gap-6 justify-center items-center' onSubmit={handleSubmit(onSubmit)}>

                    <div className='flex gap-10 pb-2 text-lg justify-center items-center '>

                        {/* <label htmlFor="fullname">Full Name :</label> */}
                        <input  type="text" id='fullname' placeholder='Enter Full Name' className='rounded-full border-2 border-green-500 w-full py-1.5 px-13 justify-center text-center' {...register("fullname", {required: {value:true, message: "This field is required"}, minLength: {value:3, message: "minimum 3 charecters required"}})} />
                        {errors.fullname && <div className='text-red-500'>{errors.fullname.message}</div> }

                    </div>

                    <div className='flex gap-10 pb-2 text-lg justify-center items-center'>
                        {/* <label htmlFor="email"> Email :</label> */}
                        <input  type="email" id='email' placeholder='Enter your Email address' className='rounded-full border-2 border-green-500 w-full py-1.5 px-13 justify-center text-center' {...register("email", {required: {value:true, message: "This field is required"}, minLength: {value:14, message: "minimum 14 charecters required"}})} />
                        {errors.email && <div className='text-red-500'>{errors.email.message}</div> }
                    </div>

                    <div className="flex gap-10 pb-2 text-lg justify-center items-center b-2">
                    
                        {/* <label htmlFor="username">Username : </label> */}
                        <input  placeholder='Enter Username' id='username' type="text" className='rounded-full border-2 border-green-500 w-full py-1.5 px-13 justify-center text-center' {...register("username", {required: {value:true, message: "This field is required"}, minLength: {value:3, message: "minimum 3 charecters required"}, maxLength:{value:10, message:"maximum number of charecters is 10"}})} />
                        {errors.username && <div className=' text-red-500'> {errors.username.message} </div>}
                    </div>


                    <div className="flex gap-10 pb-2 text-lg justify-center items-center">

                        {/* <label htmlFor="password"> Password : </label> */}
                        <input  placeholder='Enter Password' id='password' type="password" className='rounded-full border-2 border-green-500 w-full py-1.5 px-13 justify-center text-center' {...register("password", {required: {value:true, message: "This field is required"}, minLength: {value:7, message: "minimum 7 charecters required"}, maxLength:{value:12, message:"maximum number of charecters is 12"}})} />
                        {errors.password && <div className='text-red-500'> {errors.password.message} </div>}

                    </div>

                    <div className="flex gap-10 pb-5.25 text-lg justify-center items-center">
                        {isSubmitting? <div>Please Wait</div> : <input disabled= {isSubmitting} type="submit" value="SUBMIT" className='rounded-full font-bold border border-green-500 w-full py-1.5 px-31 text-white bg-green-700' />}
                        {/* <submit disabled= {isSubmitting}>Submit</submit> */}
                    </div>


                </form>

            </div>
    )
}

export default Register




