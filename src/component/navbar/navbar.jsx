// import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as hooks from "../../hooks/hooks";
import "./navbar.css";
import { useGlobalState } from '../../state/context/context';


const Navbar = () => {
    const navigate = useNavigate();
    const {user, setUser, setErrorMessage, setSuccessMessage} = useGlobalState();
    const desig = Number((hooks.formatDate.time).slice(0,3)) < Number(12) ? "AM" 
    : "PM"

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
        setSuccessMessage(res?.data)

      }catch(err){
        setErrorMessage(err.message)
      }
    }

  return (
    <main className='nav-cont'>
      <div className="nav-time-wrap">
         <strong>{hooks.formatDate.weekDay}</strong>
         <div>{hooks.formatDate.time.slice(0,6)} {desig}</div>
         <div>{hooks.formatDate.date} {hooks.formatDate.month}</div>
      </div>
     <div className='nav-btn-cont' style={{}}>
        
        {user && <button className='btn' onClick={()=> createGroup()}>Create Group</button>}
        {user && <button className='btnn' onClick={()=> navigate("/groups")}>Groups</button>}
        {user && <button className='btn' onClick={()=> navigate("/allData")}>View</button>}
        {user && <button className='btn' onClick={()=> navigate("/")}>Add</button>}
        {user && <div className='nav-name' >{user?.firstName}</div>}
        {user && <button className='btn' onClick={()=> {hooks.clearLocalStorage("user") ; navigate("/auth"); setUser("")}}>Logout</button>}
     </div>

    </main>
  )
}

export default Navbar
