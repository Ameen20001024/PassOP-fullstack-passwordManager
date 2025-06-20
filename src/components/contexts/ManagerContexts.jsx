import { useContext, createContext, Children, useState } from "react";

export const ManagerContext = createContext()


export const useManager = () => {
    return useContext(ManagerContext)
}

export const ManagerProvider = ({children}) => {

    const [form, setForm] = useState({site_url: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    return (
        <ManagerContext.Provider value={{form, setForm, passwordArray, setPasswordArray}}>
            {children}
        </ManagerContext.Provider>
    )

}