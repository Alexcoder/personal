import { useEffect, useState } from 'react';
import './App.css';
import HouseTracker from './component/houseTracker/houseTracker';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Request from './component/request/request';
import Auth from './auth/auth';
import * as hooks from "./hooks/hooks"
import AllData from "./component/allData/allData";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  const getStorage = hooks.getItemLocalStorage("user") || ""
  useEffect(()=>{
    setUser(getStorage)
  },[getStorage])

  const ReRouteAuth=(Component)=>{
    return(
      <div>
        {user? <Component/> : <Auth/>}
      </div>
    )
  };


  return (
    <div className="Appx" 
     style={{display:"grid", placeContent:"center", width:"auto", minHeight:"100vh", placeItems:"initial", backgroundColor:"rgba(50, 50, 200, 0.5)"}}
      >
      <h1>{hooks.formatDate.weekDay}</h1>
     <div>{hooks.formatDate.time}</div>
     <div>{hooks.formatDate.fullDate()}</div>
     <div className='btn-cont'>
      {user && <button className='btn' onClick={()=> navigate("/allData")}>View</button>}
      {user && <button className='btn' onClick={()=> {hooks.clearLocalStorage("user") ; navigate("/auth")}}>Logout</button>}
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
