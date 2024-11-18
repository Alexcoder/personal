import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as hooks from "../../hooks/hooks"

const StateContext = createContext();


export const MyContext = ({children}) => {
    const location = useLocation()
    const [user, setUser]=useState();
    const [reqId , setReqId]=useState("")
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
    }}>
        {children}     
    </StateContext.Provider>
  )
}

export const  useGlobalState =()=> useContext(StateContext)
