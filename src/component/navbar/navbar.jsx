// import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as hooks from "../../hooks/hooks";
import "./navbar.css";
import { useGlobalState } from '../../state/context/context';


const Navbar = () => {
    const navigate = useNavigate();
    const {user, setUser} = useGlobalState();
    const desig = Number((hooks.formatDate.time).slice(0,3)) < Number(12) ? "AM" 
    : "PM"

  return (
    <main className='nav-cont'>
      <div className="nav-time-wrap">
         <strong>{hooks.formatDate.weekDay}</strong>
         <div>{hooks.formatDate.time.slice(0,6)} {desig}</div>
         <div>{hooks.formatDate.date} {hooks.formatDate.month}</div>
      </div>
     <div className='nav-btn-cont' style={{}}>
        {user && <button className='btn' onClick={()=> navigate("/allData")}>View</button>}
        {user && <button className='btn' onClick={()=> {hooks.clearLocalStorage("user") ; navigate("/auth"); setUser("")}}>Logout</button>}
        {user && <button className='btn' onClick={()=> navigate("/")}>Add</button>}
     </div>

    </main>
  )
}

export default Navbar
