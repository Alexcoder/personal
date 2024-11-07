import "./styles.css"

function Button({title, onClick , disabled, bc, color}){

    return(
        <div className="button_container" style={{width:""}}>
       <button 
       className="button_field"
       style={{border:"none", backgroundColor: bc, color: color}}
       disabled={disabled}
       onClick={onClick}
       >
        {title}
        </button>
       </div> 
    )
}
export default Button