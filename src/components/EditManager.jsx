import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useManager } from './contexts/ManagerContexts.jsx';


const EditManager = () => {

    // const [form, setForm] = useState({})
    // const [passwordArray, setPasswordArray] = useState([])
    const ref = useRef()
    const passwordRef = useRef()
    const password_id = useParams().id
    const navigate = useNavigate()
    const {form, setForm, passwordArray, setPasswordArray} = useManager()

    const handleChange = (e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }

    // const fetchdata = async () => {
    //     try {
    //           let res = await axios.get("http://localhost:8000/api/v1/user/manager", {withCredentials: true});
    //           const allPasswords = res.data.data;

    //           const selectedPassword = allPasswords.find(item => item._id === password_id);
    //           const otherPasswords = allPasswords.filter(item => item._id !== password_id);

    //           if (!selectedPassword) {
    //               toast.error("couldn't store data to update in selectedPassword")
    //           }
              
    //           setForm({site_url: selectedPassword.site_url, username: selectedPassword.username, password: selectedPassword.password})

    //           setPasswordArray(otherPasswords);
    //     } catch (err) {
    //           console.error("Failed to fetch password data", err);
    //           toast("Error fetching data");
    //     }
    //   };

    // useEffect( ()=>{
        
    //     fetchdata()
    //     // setForm(passwordArray.filter(item => password_id === item.id)[0])
    //     // setPasswordArray(passwordArray.filter(item=> password_id !== item.id))

    // },[password_id])

    const showpassword = () => {
        // passwordRef.current.type = "text"
        console.log(ref.current.src)
        if (ref.current.src.includes("/icons/eyecross.png")){
            ref.current.src = "/icons/eye.png"
            passwordRef.current.type = "password"
        }
        else{
            passwordRef.current.type = "text"
            ref.current.src = "/icons/eyecross.png"
        }
    }

    const updatepassword = async (password_id) => {

        if(form.site_url.length>3 && form.username.length>3 && form.password.length> 7){

            await axios.patch(`http://localhost:8000/api/v1/user/manager/edit/${password_id}`,
                form,
                {
                    headers: {
                      "Content-Type": "application/json"
                    },
                    withCredentials: true
                })
            
            toast('Password Edit saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            })
          
          navigate("/manager")
        
        }

        else{
            toast('Error: Password not saved!');
        }

    }

    return (

      <>
      <ToastContainer />

      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

      <div className='p-3 md:mycontainer min-h-[83.373vh]'>

        <h1 className='text-4xl  text-center text font-bold'>
          <span className='text-green-500'> &lt;</span>
          <span>Pass</span><span className='text-green-500'>OP/&gt;</span>
        </h1>

        <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>



        <div className='flex flex-col items-center text-black p-4 gap-8'>

          <input type="text" name="site_url" id="site_url" value={form.site_url || ""} onChange={handleChange} placeholder='Enter your website_url URL' className='rounded-full border border-green-500 w-full py-1 p-4'/>

          <div className='flex w-full gap-8 justify-between flex-col md:flex-row'>

            <input type="text" name="username" id="username" value={form.username || ""} onChange={handleChange} placeholder='Enter username' className='rounded-full border border-green-500 w-full py-1 p-4'/>

            <div className="relative">

              <input ref = {passwordRef ||""} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full py-1 p-4'  type="password" name="password" id="password" />
              
              <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showpassword}>

                <img ref={ref} className='p-1' width={26} src="/icons/eye.png" alt="eye" />

              </span>

            </div>

          </div>

          <button onClick={() => updatepassword(password_id)} className='justify-center bg-green-600 hover:bg-green-500 rounded-full items-center border border-green-900 px-8 py-1 text-[20px]'>Save Edit</button>

        </div>

        <div className="passwords">

          <h2 className='font-bold text-2xl py-4'>Saved Passwords</h2>

          {passwordArray.length===0 && <p>No passwords saved to display</p>}
          {passwordArray.length !==0 &&<table className="table-auto w-full rounded-md overflow-hidden mb-10">
            <thead className='bg-green-800 text-white'>
              <tr>
                <th className='py-2'>site_url</th>
                <th className='py-2'>Username</th>
                <th className='py-2'>Password</th>
              </tr>
            </thead>

            <tbody className='bg-green-100'>
              {passwordArray.map((item, index) =>{
                return <tr key={index}>

                  <td className='py-2 border border-white text-center'>
                    <div className='items-center justify-center '>
                      <a href={item.site_url}>{item.site_url}</a>
                    </div>
                  </td>

                  <td className='py-2 border border-white text-center'>
                    <div className='items-center justify-center'>
                      <span>{item.username}</span>
                    </div>
                  </td>

                  <td className='py-2 border border-white text-center'>
                    <div className='items-center justify-center'>
                      <span>{item.password}</span>
                    </div>
                  </td>

                </tr>
              })
          
              }
            </tbody>
          </table>}

        </div>
      </div>
    </>

    )
}



export default EditManager
