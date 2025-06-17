import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Manager = () => {

    const [form, setForm] = useState({site_url: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    const ref = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()

    const handleChange = (e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }

    const fetchdata = async () => {
       try {
          const credentialsarray = await axios.get("http://localhost:8000/api/v1/user/manager", {withCredentials: true})
          console.log("API response:", credentialsarray.data.data)
          setPasswordArray(credentialsarray.data.data)
       } catch (error) {
          console.error("Error fetching credentials:", error)
       }
    }

    useEffect( ()=>{

        fetchdata()

    },[])

    const savepassword = async ()=>{

        if(form.site_url.length>3 && form.username.length>3 && form.password.length> 7){

            await axios.post("http://localhost:8000/api/v1/user/manager",
              form,
            {
                headers: {
                  "Content-Type": "application/json"
                },
                withCredentials: true
            })
            
            .then((response)=>{
                console.log(response)
                setForm({site_url: "", username: "", password: "" })
                toast('Password saved!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                })
            })

            .catch((error)=>{
              console.log(error)
              console.log("error occured")
            })
          
          fetchdata()
        
        }

        else{
            toast('Error: Password not saved!');
        }
    }

    const handleDelete = async (id)=> {
        let c = confirm("Are you sure you want to delete this password?")
        if (c){
            
            try {
              let newcredential = await axios.delete(`http://localhost:8000/api/v1/user/manager/delete/${id}`,
                {
                  withCredentials: true
                }
              )
              
              toast('Password deleted!', {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark"
              })
  
              fetchdata()
            } catch (error) {
                toast.error("failed to delete")
            }
        }
    }

    const handleEdit = (id) => {

        // setForm(passwordArray.filter(i=>i.id===id)[0])

        navigate(`/manager/edit/${id}`)
        // setForm(passwordArray.filter(item => id === item.id)[0])
        // setPasswordArray(passwordArray.filter(item=> id !== item.id))
    }

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

          <input type="text" name="site_url" id="site_url" value={form.site_url} onChange={handleChange} placeholder='Enter your website_url URL' className='rounded-full border border-green-500 w-full py-1 p-4'/>

          <div className='flex w-full gap-8 justify-between flex-col md:flex-row'>

            <input type="text" name="username" id="username" value={form.username} onChange={handleChange} placeholder='Enter username' className='rounded-full border border-green-500 w-full py-1 p-4'/>

            <div className="relative">

              <input ref = {passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full py-1 p-4'  type="password" name="password" id="password" />
              
              <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showpassword}>

                <img ref={ref} className='p-1' width={26} src="/icons/eye.png" alt="eye" />

              </span>

            </div>

          </div>

          <button onClick={savepassword} className='justify-center bg-green-600 hover:bg-green-500 rounded-full items-center border border-green-900 px-8 py-1 text-[20px]'>Save</button>

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
                <th className='py-2'>Action</th>
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

                  <td className='py-2 border border-white text-center'>
                    <div className='items-center justify-center flex gap-5'>
                      <button onClick={()=>{handleEdit(item._id)}}><img width={18} height={18} src="icons/edit.png" alt="k" /></button>
                      <button onClick={()=>{handleDelete(item._id)}}><img width={18} height={18} src="icons/delete.png" alt="l" /></button>
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

export default Manager
