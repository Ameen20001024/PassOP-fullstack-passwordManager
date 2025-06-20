import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Manager from './components/manager'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './components/Register.jsx'
import EditManager from './components/EditManager.jsx'
import RegisterNavbar from './components/RegisterNavbar.jsx'
import LoginNavbar from './components/LoginNavbar.jsx'
import Login from './components/login.jsx'
import { ManagerProvider } from './components/contexts/ManagerContexts.jsx'




function App() {

    // const [form, setForm] = useState({site_url: "", username: "", password: "" })
    // const [passwordArray, setPasswordArray] = useState([])

    const Router = createBrowserRouter([

        {
            path: "/register",
            element: <>
                          <RegisterNavbar/>
                          <div className="bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">

                              <Register />

                          </div>
                          <Footer/>
                     </>
        },

        {
            path: "/",
            element: <>
                          <LoginNavbar/>
                          <div className="bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">

                              <Login />

                          </div>
                          <Footer/>
                     </>
        },

        {
            path: "/manager",
            element: <>
                          <Navbar />

                          <div className="bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">

                              <Manager />

                          </div>

                          <Footer />
                     </>
        },

        {
            path: "/manager/edit/:id",
            element: <>
                          <Navbar />

                          <div className="bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                              <EditManager />
                          </div>
                          
                          <Footer />
                     </>
        }

    ])


    return (
      <ManagerProvider>
        <RouterProvider router = {Router} />
      </ManagerProvider>
    )
}

export default App
