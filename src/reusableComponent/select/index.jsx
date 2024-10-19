import "./styles.css";
import { useState } from "react";

function Select({title, name, value,placeholder,onChange, onClick, data}){
    const [display, setDisplay]  = useState(false)
    const [activeInput, setActiveInput]  = useState(true)

    console.log(display)
    return(
        <div className="select_container">
        <span style={{float:"left"}}>{title}</span> <br/>
        <div className="input_container" 
        onClick={()=> setActiveInput(prev=> !prev) }style={{backgroundColor:"lightgray"}}>
           <input
           style={{width:"148px",backgroundColor:"lightgray" }}
           className="select_input"
           name={name}
           value={value}
           placeholder={placeholder}
           onChange={onChange}
           disabled={activeInput}
           />
        <div style={{cursor:"pointer"}}
             className="select_btn" 
             onClick={()=> setDisplay(prev=> !prev)}>?</div>  
        </div>
        {
        <div style={{padding:"2px 0px",maxHeight:"80px", overflow:"auto"}}>
            {
             data.map((item, i)=>(
                 <div 
                 key={i}
                 style={{cursor:"pointer", backgroundColor: i%2 ? "white" : "rgba(200,50,50, 0.2)", }}
                  onClick={()=>{onClick(item); setDisplay(prev=> !prev)}}
            >{display && item}</div>
        ))
    }
        </div>

        }
       </div> 
    )
}
export default Select