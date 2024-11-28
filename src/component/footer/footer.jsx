// import React from 'react';
import { useNavigate } from 'react-router-dom';
// import * as hooks from "../../hooks/hooks";
import useReactHooks  from "../../hooks/reactHooks";
import "./footer.css";
import { useGlobalState } from '../../state/context/context';


const Footer = () => {
    const navigate = useNavigate();
    const reactHooks = useReactHooks()
    const {user, addRequest, setAddRequest} = useGlobalState();
    // setErrorMessage, setSuccessMessage,


  return (
    <main className='footer-cont'>
     <div className='footer-btn-cont' style={{}}>
        
        {/* {user && <button className='footer-btn' onClick={()=> createGroup()}>Create Group</button>} */}
        {user && <button className='footer-btn' onClick={()=> navigate("/groups")}>Groups</button>}
        {(user && reactHooks.pathname==="/"  )? <button className='footer-btn' style={{position:"fixed", top:"70px", right:"10px", borderRadius:"50%", padding:"0px 10px", fontSize:"40px", background:"brown", border:"none", color:"white"}} onClick={()=> setAddRequest(prev=> !prev)}>
          {addRequest  ? "x" : "+"}</button> : ""}
     </div>

    </main>
  )
}

export default Footer
