import { useState, useEffect } from 'react';
import './App.css';
import HouseTracker from './component/houseTracker/houseTracker';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Request from './component/request/request';
import Auth from './auth/auth';
import * as hooks from "./hooks/hooks"
import AllData from "./component/allData/allData";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(hooks.getItemLocalStorage("user"));

  const location = useLocation()
  useEffect(()=>{
    setUser(hooks.getItemLocalStorage("user"))
  },[location])
  

  const ReRouteAuth=(Component)=>{
    return(
      <div>
        {user? <Component/> : <Auth/>}
      </div>
    )
  };

  const desig = (hooks.formatDate.time).slice(0,2) < Number(12) ? "AM" 
                : "PM"


  return (
    <div className="Appx" 
     style={{display:"grid", placeContent:"center", width:"auto", minHeight:"100vh", placeItems:"initial", backgroundColor:"rgba(50, 50, 200, 0.5)"}}
      >
        <div style={{display:"flex", justifyContent:"space-around", paddingBottom:"10px"}}>
         <strong>{hooks.formatDate.weekDay}</strong>
         <div>{hooks.formatDate.time} {desig}</div>
         <div>{hooks.formatDate.date} {hooks.formatDate.month}</div>
        </div>
     <div className='btn-cont' style={{position:"fixed", top:"0", left:"0", right:"0", backgroundColor:"white", padding:"6px"}}>
      {user && <button className='btn' onClick={()=> navigate("/allData")}>View</button>}
      {user && <button className='btn' onClick={()=> {hooks.clearLocalStorage("user") ; navigate("/auth"); setUser("")}}>Logout</button>}
      {user && <button className='btn' onClick={()=> navigate("/")}>Add</button>}
     </div>

    
     <Routes>
       <Route path="/" element={ ReRouteAuth(Request)}/>
       <Route path="/auth" element={ !user && <Auth/>}/>
       <Route path="/budget"  element={ ReRouteAuth(HouseTracker)}/>
       <Route path="/allData"  element={ ReRouteAuth(AllData)}/>
     </Routes>
     

    </div>
  );
}

export default App;
