import "./styles.css"

function Input({title, name, value,placeholder, onChange}){

    return(
        <div className="input_container">
        <span style={{float:"left"}}>{title}</span> <br/>
       <input 
       className="field"
       style={{backgroundColor:"lightgray", border:"none"}}
       name={name}
       value={value}
       placeholder={placeholder}
       onChange={onChange}
       />
       </div> 
    )
}
export default Input