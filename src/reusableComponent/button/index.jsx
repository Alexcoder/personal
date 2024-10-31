import "./styles.css"

function Button({title, onClick }){

    return(
        <div className="button_container" style={{width:""}}>
       <button 
       className="button_field"
       style={{border:"none"}}
       onClick={onClick}
       >
        {title}
        </button>
       </div> 
    )
}
export default Button