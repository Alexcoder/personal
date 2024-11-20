import { useState, } from 'react'
import AddExpense from './sub/addExpense'
import ShowTracker from './sub/showTracker';
// import { useDispatch } from 'react-redux'
import * as hooks from "../../hooks/hooks"
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../../state/context/context';


function Request (){
    // const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, setUser } = useGlobalState()

    
    

    const initialState={
        creator: user?._id,
        firstName: user?.firstName,
        lastName : user?.lastName,
        email    : user?.email,
        username : user?.username,
        purpose: "Select",
        detail:"",
        amountRequired: "",
        month: hooks.formatDate.month ,
        year: hooks.formatDate.year ,
        date: hooks.formatDate.fullDate()
    }

    const [request, setRequest]=useState(initialState)
    const [isClicked, setIsClicked]=useState(false)
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
            const res = await hooks.createPost("/houseTracker/createRequest", {...request, type: "todo"})
            setRequest(initialState)
            setDatafromDB([...datafromDB, res?.data])
            setUser(hooks.getItemLocalStorage("user"))
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
          isClicked={isClicked}
          setIsClicked={setIsClicked}
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
