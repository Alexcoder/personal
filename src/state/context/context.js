import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as hooks from "../../hooks/hooks"

const StateContext = createContext();


export const MyContext = ({children}) => {
    const location = useLocation()
    const [user, setUser] = useState(hooks.getItemLocalStorage("user"));
    const [reqId , setReqId]=useState("");
    const [loading, setLoading] = useState(false);
    const[groupId, setGroupId] = useState("")
    const[errorMessage, setErrorMessage] = useState("")
    const[successMessage, setSuccessMessage] = useState("")

    //
    useEffect(()=>{
       setUser(hooks.getItemLocalStorage('user'))
    },[location]);

    
//
  return (
    <StateContext.Provider
    value={{
        user,
        setUser,
        reqId,
        setReqId,
        loading,
        setLoading,
        groupId,
        setGroupId,
        errorMessage,
        setErrorMessage,
        successMessage, 
        setSuccessMessage,
    }}>
        {children}     
    </StateContext.Provider>
  )
}

export const  useGlobalState =()=> useContext(StateContext)
