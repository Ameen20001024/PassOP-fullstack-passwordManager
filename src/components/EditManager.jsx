import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';


const EditManager = () => {

    const [formEdit, formsetEdit] = useState({site: "", username: "", password: "" })
    const [editpasswordArray, setEditPasswordArray] = useState([])
    const ref = useRef()
    const passwordRef = useRef()
    const password_id = useParams().id
    const navigate = useNavigate()

    const handleChange = (e)=>{
        formsetEdit({...formEdit,[e.target.name]:e.target.value})
    }

    const fetchdata = async () => {
        try {
            let res = await axios.get("http://localhost:8000/api/v1/user/manager");
            const allPasswords = res.data;

            const selectedPassword = allPasswords.find(item => item.id === password_id);
            const otherPasswords = allPasswords.filter(item => item.id !== password_id);

            formsetEdit(selectedPassword || { site: "", username: "", password: "" });
            setEditPasswordArray(otherPasswords);
        } catch (err) {
            console.error("Failed to fetch password data", err);
            toast("Error fetching data");
        }
      };

    useEffect( ()=>{
        
        fetchdata()
        // formsetEdit(editpasswordArray.filter(item => password_id === item.id)[0])
        // setEditPasswordArray(editpasswordArray.filter(item=> password_id !== item.id))

    },[password_id])

    const showpassword = () => {
        // passwordRef.current.type = "text"
        console.log(ref.current.src)
        if (ref.current.src.includes("icons/eyecross.png")){
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        }
        else{
            passwordRef.current.type = "text"
            ref.current.src = "icons/eyecross.png"
        }
    }

    const updatepassword = async (password_id) => {

        if(formEdit.site.length>3 && formEdit.username.length>3 && formEdit.password.length> 7){

            await axios.patch(`http://localhost:8000/api/v1/user/manager/edit/${password_id}`,
                formEdit,
                {
                    headers: {
                      "Content-Type": "application/json"
                    }
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

          <input type="text" name="site" id="site" value={formEdit.site} onChange={handleChange} placeholder='Enter your website URL' className='rounded-full border border-green-500 w-full py-1 p-4'/>

          <div className='flex w-full gap-8 justify-between flex-col md:flex-row'>

            <input type="text" name="username" id="username" value={formEdit.username} onChange={handleChange} placeholder='Enter username' className='rounded-full border border-green-500 w-full py-1 p-4'/>

            <div className="relative">

              <input ref = {passwordRef} value={formEdit.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full py-1 p-4'  type="password" name="password" id="password" />
              
              <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showpassword}>

                <img ref={ref} className='p-1' width={26} src="./icons/eye.png" alt="eye" />

              </span>

            </div>

          </div>

          <button onClick={() => updatepassword(password_id)} className='justify-center bg-green-600 hover:bg-green-500 rounded-full items-center border border-green-900 px-8 py-1 text-[20px]'>Save Edit</button>

        </div>

        <div className="passwords">

          <h2 className='font-bold text-2xl py-4'>Saved Passwords</h2>

          {editpasswordArray.length===0 && <p>No passwords saved to display</p>}
          {editpasswordArray.length !==0 &&<table className="table-auto w-full rounded-md overflow-hidden mb-10">
            <thead className='bg-green-800 text-white'>
              <tr>
                <th className='py-2'>Site</th>
                <th className='py-2'>Username</th>
                <th className='py-2'>Password</th>
              </tr>
            </thead>

            <tbody className='bg-green-100'>
              {editpasswordArray.map((item, index) =>{
                return <tr key={index}>

                  <td className='py-2 border border-white text-center'>
                    <div className='items-center justify-center '>
                      <a href={item.site}>{item.site}</a>
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
