// import { useState,  } from "react";
// useEffect
import './App.css';
import HouseTracker from './component/houseTracker';
import { Route, Routes } from 'react-router-dom';
import Request from './component/request/request';
import * as hooks from "./hooks"

function App() {
  // const [datafromDB, setDatafromDB] = useState([])

    //   useEffect(()=>{
    //     const fetchData=async()=>{
    //         try{
    //             const res = await hooks.getPost("/houseTracker/")
    //             setDatafromDB([res?.data ])
    //         }catch(err){ throw(err)}
    //     }
    //     fetchData()
    // },[datafromDB]);
    // console.log("dataFromDB App.js", datafromDB)


  return (
    <div className="Appx" 
     style={{display:"grid", placeContent:"center", width:"auto", minHeight:"100vh", placeItems:"initial", backgroundColor:"rgba(50, 50, 200, 0.5)"}}
      >
      {/* <h2>Appjs getRequest {datafromDB.length}</h2> */}
      <h1>JAY</h1>
      <h1>{hooks.formatDate.weekDay}</h1>
     {/* <div>{hooks.formatDate.time}</div> */}
     <div>{hooks.formatDate.fullDate()}</div>

    
     <Routes>
       <Route path="/" element={ <Request/>}/>
       <Route path="/budget"  element={ <HouseTracker/>}/>
     </Routes>
     

    </div>
  );
}

export default App;
