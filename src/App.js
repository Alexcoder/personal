import './App.css';
import HouseTracker from './component/houseTracker/houseTracker';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Request from './component/request/request';
import Auth from './auth/auth';
import * as hooks from "./hooks/hooks"
import AllData from "./component/allData/allData";

function App() {
  const navigate = useNavigate();


  return (
    <div className="Appx" 
     style={{display:"grid", placeContent:"center", width:"auto", minHeight:"100vh", placeItems:"initial", backgroundColor:"rgba(50, 50, 200, 0.5)"}}
      >
      <h1>{hooks.formatDate.weekDay}</h1>
     <div>{hooks.formatDate.time}</div>
     <div>{hooks.formatDate.fullDate()}</div>
     <div className='btn-cont'>
      <button className='btn' onClick={()=> navigate("/allData")}>View</button>
      <button className='btn' onClick={()=> navigate("/auth")}>Login</button>
      <button className='btn' onClick={()=> navigate("/")}>Add</button>
     </div>

    
     <Routes>
       <Route path="/" element={ <Request/>}/>
       <Route path="/auth" element={ <Auth/>}/>
       <Route path="/budget"  element={ <HouseTracker/>}/>
       <Route path="/allData"  element={ <AllData/>}/>
     </Routes>
     

    </div>
  );
}

export default App;
