// import { useState, useEffect } from 'react';
import './App.css';
import HouseTracker from './component/houseTracker/houseTracker';
import { Route, Routes, } from 'react-router-dom';
import Request from './component/request/request';
import Auth from './auth/auth';
import AllData from "./component/allData/allData";
import Navbar from './component/navbar/navbar';
import { useGlobalState } from './state/context/context';

function App() {
  const { user } = useGlobalState()
  

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
        <Navbar/>
 
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
