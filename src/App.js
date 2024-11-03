import './App.css';
import HouseTracker from './component/houseTracker/houseTracker';
import { Route, Routes } from 'react-router-dom';
import Request from './component/request/request';
import * as hooks from "./hooks/hooks"
import AllData from "./component/allData/allData";

function App() {


  return (
    <div className="Appx" 
     style={{display:"grid", placeContent:"center", width:"auto", minHeight:"100vh", placeItems:"initial", backgroundColor:"rgba(50, 50, 200, 0.5)"}}
      >
      <h1>JAY</h1>
      <h1>{hooks.formatDate.weekDay}</h1>
     {/* <div>{hooks.formatDate.time}</div> */}
     <div>{hooks.formatDate.fullDate()}</div>

    
     <Routes>
       <Route path="/" element={ <Request/>}/>
       <Route path="/budget"  element={ <HouseTracker/>}/>
       <Route path="/allData"  element={ <AllData/>}/>
     </Routes>
     

    </div>
  );
}

export default App;
