import { useEffect, useState, } from 'react'
import AddExpense from './sub/addExpense'
import ShowTracker from './sub/showTracker';
// import { useDispatch } from 'react-redux'
import * as Hooks from "../../hooks/hooks"
import { useLocation, useNavigate } from 'react-router-dom';


function Request (){
    // const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [user, setUser]= useState(Hooks.getItemLocalStorage("user"))

    
    useEffect(()=>{
      setUser(Hooks.getItemLocalStorage("user"))
    },[location])
    
    // console.log("user", user)

    const initialState={
        creator: user?._id,
        firstName: user?.firstName,
        lastName : user?.lastName,
        email    : user?.email,
        username : user?.username,
        purpose: "Select",
        detail:"",
        amountRequired: "",
        month: Hooks.formatDate.month ,
        year: Hooks.formatDate.year ,
        date: Hooks.formatDate.fullDate()
    }

    const [request, setRequest]=useState(initialState)
    const [datafromDB, setDatafromDB] = useState([]);

    const formData=[
      { title: "NGN", name: "amountRequired", value: request.amountRequired,},
      { title: "Detail", name: "detail", value: request.detail,},
    ];

    const handleChange =(e)=>{
        setRequest(prev=> ({...prev, [e.target.name] : e.target.value }))
    };

    const handleClick = async()=>{
        try{
          if(request.purpose==="Select"){
            alert("Select Purpose to continue")
            return
          }else if(request.detail===""){
            alert("Input detail to continue")
            return
          }else if(request.amountRequired===""){
            alert("Input amount to continue")
            return
          }else{
            const res = await Hooks.createPost("/houseTracker/createRequest", {...request, type: "todo"})
            setRequest(initialState)
            setDatafromDB([...datafromDB, res?.data])
            setUser(Hooks.getItemLocalStorage("user"))
            navigate("/allData")
          }

        }catch(err){
            throw(err)          
        }
    };

  return (
    <div className="request-cont">
        { true ?
        < AddExpense 
          request={request}
          setRequest={setRequest}
          formData={formData}
          handleChange={handleChange}
          handleClick={handleClick}/>  
        :
        <ShowTracker 
        datafromDB={datafromDB} />        
    }

    </div>
  )
}

export default Request
