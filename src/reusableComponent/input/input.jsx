import "./styles.css"

function Input({title, name,type, value,placeholder, onChange}){

    return(
        <div className="input_container" style={{width:""}}>
              <span style={{float:"left"}}>{title}</span> <br/>
                <input 
                 className="field"
                 style={{backgroundColor:"lightgray", border:"none", outline:"none"}}
                 name={name}
                 type={type}
                 value={value}
                 placeholder={placeholder}
                 onChange={onChange}
                />
       </div> 

    )
}
export default Input