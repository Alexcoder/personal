// import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as hooks from "../../hooks/hooks";
import "./navbar.css";
import { useGlobalState } from '../../state/context/context';


const Navbar = () => {
    const navigate = useNavigate();
    const {user, setUser} = useGlobalState();
    const [group, setGroup]= useState({})
    // const desig = Number((hooks.formatDate.time).slice(0,3)) < Number(12) ? "AM" 
    useEffect(()=>{
      setGroup(hooks.getItemLocalStorage('groupItem'))
    },[group])
    // : "PM"

 const groupName = group?.groupName

  return (
    <main className='nav-cont'>
      {/* <div className="nav-time-wrap"> */}
         {/* <strong>{hooks.formatDate.weekDay}</strong> */}
         {/* <div>{hooks.formatDate.time.slice(0,6)} {desig}</div> */}
         {/* <div>{hooks.formatDate.date} {hooks.formatDate.month}</div> */}
      {/* </div> */}
     <div className='nav-btn-cont' style={{}}>
        
        {user && <div className='btnnn' style={{ fontWeight:"500", cursor: "pointer",marginTop:"5px"}} onClick={()=> navigate("/")}>Home</div>}
        {user && <div className='btnnn' style={{ fontWeight:"500", cursor: "pointer", textTransform:"uppercase", marginTop:"5px"}} onClick={()=> navigate("/")}>{groupName ? groupName : ""}</div>}
        {user && <div className='nav-name' >{user?.firstName} </div>}

        {user && <button className='btn' onClick={()=> {hooks.clearLocalStorage("user") ; navigate("/"); setUser("")}}>Logout</button>}
     </div>

    </main>
  )
}

export default Navbar
