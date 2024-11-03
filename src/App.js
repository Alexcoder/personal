import './App.css';
import HouseTracker from './component/houseTracker/houseTracker';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Request from './component/request/request';
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
     <button onClick={()=> navigate("/allData")}>View Log</button>
     <button style={{marginBottom:"5px"}} onClick={()=> navigate("/")}>Request</button>

    
     <Routes>
       <Route path="/" element={ <Request/>}/>
       <Route path="/budget"  element={ <HouseTracker/>}/>
       <Route path="/allData"  element={ <AllData/>}/>
     </Routes>
     

    </div>
  );
}

export default App;
