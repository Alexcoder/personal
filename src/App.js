// import { useState, useEffect } from 'react';
import './App.css';
import HouseTracker from './component/houseTracker/houseTracker';
import { Route, Routes, } from 'react-router-dom';
import Auth from './auth/auth';
import AllData from "./component/allData/allData";
import Navbar from './component/navbar/navbar';
import Footer from './component/footer/footer';
import { useGlobalState } from './state/context/context';
import Groups from './component/Groups/groups';
import AllUsers from './component/allUsers/allUsers';

function App() {
  const { user, successMessage } = useGlobalState()
  

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
        {successMessage.length? "" : ""}
        <Navbar/> 
     <Routes>
       <Route path={"/"} element={ !user ? <Auth/> : ReRouteAuth(Groups) }/>
       <Route path="/budget"  element={ ReRouteAuth(HouseTracker)}/>
       <Route path="/allData"  element={ ReRouteAuth(AllData)}/>
       <Route path="/allUsers"  element={ ReRouteAuth(AllUsers)}/>
     </Routes>
     

    <Footer/> 
    </div>
  );
}

export default App;
