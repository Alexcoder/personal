// import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as hooks from "../../hooks/hooks";
import "./footer.css";
import { useGlobalState } from '../../state/context/context';


const Footer = () => {
    const navigate = useNavigate();
    const {user, setErrorMessage, setSuccessMessage,addRequest, setAddRequest} = useGlobalState();

    const createGroup= async()=>{
      const dataToCreate = {
        day         :  hooks.formatDate.date,
        month       :  hooks.formatDate.month,
        year        :  hooks.formatDate.year,
        creator     : user?._id, 
        groupName   : "New Group", 
        date        : hooks.formatDate.fullDate(),
        user,
       }
      try{
        const res = await hooks.createPost(`/houseTracker/v1/${"1234"}`, dataToCreate)
        // const {data} = await hooks.getPost(`/auth/${"1234"}`)
        // hooks.setItemLocalStorage(`user`, data)
        // console.log("auth", data)
        setSuccessMessage(res?.data)

      }catch(err){
        setErrorMessage(err.message)
      }
    }


  return (
    <main className='footer-cont'>
     <div className='footer-btn-cont' style={{}}>
        
        {user && <button className='footer-btn' onClick={()=> createGroup()}>Create Group</button>}
        {user && <button className='footer-btn' onClick={()=> navigate("/groups")}>Groups</button>}
        {user && <button className='footer-btnnn' style={{position:"fixed", top:"50px", right:"10px", borderRadius:"50%", padding:"0px 10px", fontSize:"40px", background:"brown", border:"none", color:"white"}} onClick={()=> setAddRequest(prev=> !prev)}>
          {addRequest  ? "x" : "+"}</button>}
     </div>

    </main>
  )
}

export default Footer
