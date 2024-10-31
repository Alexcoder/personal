import { useState, } from 'react'
import AddExpense from './sub/addExpense'
import ShowTracker from './sub/showTracker';
// import { useDispatch } from 'react-redux'
import * as Hooks from "../../hooks"

function Request (){
    // const dispatch = useDispatch()
    

    const initialState={
        purpose: "Select Purpose",
        detail:"",
        amountRequired: "",
        month: Hooks.formatDate.month ,
        date: Hooks.formatDate.fullDate()
    }

    const [request, setRequest]=useState(initialState)
    const [datafromDB, setDatafromDB] = useState([]);

    const formData=[
        { title: "Detail", name: "detail", value: request.detail,},
        { title: "Amount", name: "amountRequired", value: request.amountRequired,},
    ];

    const handleChange =(e)=>{
        setRequest(prev=> ({...prev, [e.target.name] : e.target.value }))
    };

    const handleClick = async()=>{
        try{
          const res = await Hooks.createPost("/houseTracker/createRequest", request)
          setRequest(initialState)
          setDatafromDB([res?.data])
        }catch(err){
            throw(err)          
        }
    };
    // console.log(request)
    console.log("datafromDB", datafromDB)

  return (
    <div className="request-cont">
       <div style={{fontWeight:"500"}}>{datafromDB.length ? datafromDB[datafromDB.length-1].budget[0].purpose : ""}</div> 
       <div style={{fontWeight:"500"}}>{datafromDB.length ? datafromDB[datafromDB.length-1].budget[0].detail : ""}</div> 
        <div style={{fontWeight:"500"}}>{datafromDB.length ? datafromDB[datafromDB.length-1].budget[0].amountRequired[0].amount : ""}</div>
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
