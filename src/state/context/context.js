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
    const[notification, setNotification] = useState(false)
    const[addRequest, setAddRequest] = useState(false)

    //
    // useEffect(()=>{
    //     const fetchUser=async()=>{
    //       try{
    //        const res =  await hooks.getPost("/auth")
    //        hooks.setItemLocalStorage(`user`, res?.data)
    //        console.log("res.data", res?.data)
    //       }catch(err){
    //         throw(err)
    //       }
    //     }
    //     fetchUser()
    // },[reqId]);

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
        notification, 
        setNotification,
        addRequest, 
        setAddRequest
    }}>
        {children}     
    </StateContext.Provider>
  )
}

export const  useGlobalState =()=> useContext(StateContext)
