import {useState} from 'react'
import Input from '../reusableComponent/input';
import Button from '../reusableComponent/button';
import * as Hooks from "../hooks/hooks"
import "./auth.css"
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const navigate = useNavigate()
    const initialState={
        email : "",
        password:"",
        confirmPassword:"",
        firstName : "",
        lastName: "",
    };
    const [request, setRequest] = useState(initialState);
    const [newUser, setNewUser] = useState(false);
    const [errorMessage, setErrorMessage]= useState("")
    const [loading, setLoading]= useState(false)

    const formData=[
        { title: "email", name: "email", type: "email", value: request.email,},
        { title: "password", name: "password",type: newUser ? "string" : "password",value: request.password,},
        { title: "confirm password", name: "confirmPassword", type:"password" ,value: request.confirmPassword,},
        { title: "first name", name: "firstName", type:"string",value: request.firstName,},
        { title: "last name", name: "lastName", type:"string",value: request.lastName,},
    ];

    const handleChange =(e)=>{
        setRequest(prev=> ({...prev, [e.target.name] : e.target.value }))
    };

    const handleClick = async()=>{
        // e.preventDefault();
        const route = newUser?"register":"login"
        try{
          setLoading(prev=> !prev)  
          const res = await Hooks.createPost(`/auth/${route}`, request)
          setRequest(initialState)
          Hooks.setItemLocalStorage("user", res?.data)
          setRequest(initialState)
          setLoading(prev=> !prev)
          navigate("/allData")
        }catch(err){
            setErrorMessage(err.response)          
        }
    };

    const check=()=>{
        if(request.email.length<4){alert("email should be more than 4 letters") }
        if(newUser && (request.password !== request.confirmPassword)){ alert("password does not match")}
        if(newUser && (request.firstName==="")){ alert("first name is empty")}
        if(newUser && (request.lastName==="")){ alert("last name is empty")}
        else{ handleClick()}
    }

 const formLength= newUser? formData.length : 2;
 console.log("errorMessage", errorMessage)

  return (
    <div className='auth-cont'>
     {
        formData.slice(0, formLength).map((item,i)=>(
            <Input 
                key={i}
                title={<strong style={{fontSize:"13px"}}>{item.title}</strong>} 
                name={item.name} 
                value={item.value}
                type={item.type}
                placeholder={""} 
                onChange={handleChange}
            />))
        }
        <div style={{fontSize:"12px", marginRight:"10px", marginTop:"10px"}}>{newUser ? "Already have an account?" : "Dont have account?"}
            <strong onClick={()=> setNewUser(prev=> !prev)} style={{marginLeft:"8px", fontSize:"12px", cursor:"pointer", color:"purple",}}>{newUser? "Login": "Register"}</strong>
        </div>
        <div style={{fontSize:"12px", color:"darkRed", fontWeight:"600"}}>{errorMessage?.data}</div>
     {
     <Button 
        bc={loading && "lightgray"}
        color={loading && "black"}
        disabled={loading} 
        title={loading? <div style={{fontStyle:"italic"}}>processing ...</div> : newUser? "Create Account" :"Login"} 
        onClick={()=> check()}/>
     }

   
    </div>
  )
}

export default Auth
