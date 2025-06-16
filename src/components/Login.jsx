import React from 'react'

const Login = () => {

    const {register, setError, handleSubmit, formState: {errors, isSubmitting}} = useForm()
    
    const delay = (d) => {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res()
            }, d*1000);
        })
    }
    
    const onSubmit = async (data)=> {
        await delay(1);
        let k = await axios.post("http://localhost:8000/api/v1/user/login")
        console.log(data)
        console.log(k.text())
        navigate("/manager")
    }




    return (
        <div className="container">

            <form action="" onSubmit={handleSubmit(onSubmit)}>

                <input placeholder='username' type="text" {...register("username", {required: {value:true, message: "This field is required"}, minLength: {value:3, message: "minimum 3 charecters required"}, maxLength:{value:10, message:"maximum number of charecters is 10"}})} />

                {errors.username && <div> {errors.username.message} </div>}

                <input placeholder='password' type="password" {...register("password", {required: {value:true, message: "This field is required"}, minLength: {value:7, message: "minimum 7 charecters required"}, maxLength:{value:12, message:"maximum number of charecters is 12"}})} />

                {errors.password && <div> {errors.password.message} </div>}

                {isSubmitting? <div>Please Wait</div> : <input disabled= {isSubmitting} type="submit" value="Submit" />}

                {/* <submit disabled= {isSubmitting}>Submit</submit> */}

            </form>
                
        </div>
    )
}

export default Login
