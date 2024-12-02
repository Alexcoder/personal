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
    const[allUsers, setAllUsers] = useState([])
    const[selectedId, setSelectedId] = useState(``)
    const[message, setMessage] = useState(``)

    
    useEffect(()=>{
        const fetchUserS=async()=>{
          try{
           const res =  await hooks.getPost("/auth")
           setAllUsers(res?.data)
          }catch(err){
            throw(err)
          }
        }
        fetchUserS()
    },[reqId]);

    useEffect(()=>{
      setUser(hooks.getItemLocalStorage('user'))
    },[location, reqId]);

    
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
        setAddRequest,
        allUsers, 
        setAllUsers,
        selectedId, 
        setSelectedId,
        message, 
        setMessage,
    }}>
        {children}     
    </StateContext.Provider>
  )
}

export const  useGlobalState =()=> useContext(StateContext)
