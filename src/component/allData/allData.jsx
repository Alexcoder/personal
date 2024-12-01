import React, {useState, useEffect} from 'react';
import * as hooks from "../../hooks/hooks";
import {useGlobalState} from "../../state/context/context"
import Request from '../request/request';
import "./allData.css"
import useReactHooks from '../../hooks/reactHooks';

const AllData = () => {
    const {user, reqId, setReqId, loading, setLoading, addRequest} = useGlobalState();
    const [datafromDB, setDatafromDB] = useState([])
    const [budgetItem, setBudgetItem] = useState(hooks.getItemLocalStorage(`groupItem`));
    const [budgetId, setBudgetId] = useState("");
    const [postItem, setPostItem] = useState("");
    const [fullPost, setFullPost] = useState(false);
    const reactHooks = useReactHooks()
    console.log("datafromDB", datafromDB)
    console.log('budgetItem', budgetItem)

    useEffect(()=>{
      const fetchData=async()=>{
          try{
              setLoading(true)
              const res = await hooks.getPost("/houseTracker/")
              setDatafromDB(res?.data)
              setLoading(false)
          }catch(err){ throw(err)}
      }
      fetchData()
  },[reqId, setLoading]);

  const deleteItem=async(id)=>{
    try{
            setLoading(true)
            await hooks.deletePost(`/houseTracker/delete/${id}`)
            const findIndex = datafromDB.findIndex(item=> item._id===id)
            setDatafromDB(datafromDB.splice(findIndex, 0))
            setLoading(false)
    }catch(err){
        throw(err)
    }
  }
  const deleteBudget=async(id,budgetId)=>{
    try{
           setLoading(true)
           await hooks.deletePost(`/houseTracker/deleteBudget/${id}/${budgetId}`);
           setReqId(id)
           setLoading(false)
    }catch(err){
        throw(err)
    }
  }


const sum =(groupId)=>{
    const requestTime= datafromDB?.filter(item=>(
        (item?._id===groupId)
    ));
    const expenseList = requestTime.map(timeframe=>(
        timeframe.expenseList
    )).flat();
    
    const filterApproved = expenseList.filter(expense=> expense?.status.includes("approved"))
    const amountRequired = expenseList.reduce((acc, value)=>(acc + value.amountRequired),0)
    const amountApproved = filterApproved.reduce((acc, value)=>(acc + value.amountRequired),0)
    const amountPending = amountRequired-amountApproved


return  (
    <div style={{display:"flex", justifyContent:"space-between", padding:"10px 5px"}}>
    <div style={{color:"green"}}>NGN {hooks.formatNumber(amountApproved)}</div>    
    <div style={{fontSize:"18px"}}>NGN {hooks.formatNumber(amountRequired)}</div>    
    <div style={{color:"orange"}}>NGN {hooks.formatNumber(amountPending)}</div>    
    </div>
)
};

const handleApprove=async(postId, expenseId, expenseList, status)=>{
   try{
        const initialState={
            creator       : user?._id,
            username      : user?.username,
            email         : user?.email,
            firstName     : user?.firstName,
            lastName      : user?.lastName,
            requestor     : expenseList.creator,
            itemId        : expenseList._id, 

            
            detail        : expenseList.detail,
            purpose       : expenseList?.purpose,
            amount        : expenseList.amount,
            date          : hooks.formatDate.fullDate(),
            
            expenseId     : expenseId,
            status        : status,
            // user          : user
        }
       const res = await hooks.upDatePost(`/houseTracker/verifyStatus/${postId}`, initialState)
       console.log("res", res?.data)
       const findIndex =  datafromDB.findIndex(data=> data._id.toString(res?.data._id))
       const arr = [...datafromDB]
       arr[findIndex]=res?.data
       console.log("arr", arr)
       setDatafromDB(arr)
  }catch(err){

  }
};


function budgetColor(status){
   return status==="pending"? "orange":
          status==="denied"? "red" 
          : "green"
};

function view(postItem, budgetItem, budgetId){
    setFullPost(prev=> !prev)
    setBudgetItem(budgetItem)
    setPostItem(postItem)
    setBudgetId(budgetId)
}

const check=(budgetDetail)=>{
    if(budgetDetail.length>8){
        return  "..."
    }else{
        return
    }
};

const setUpNewUser=()=>{
    reactHooks.navigate(`/allUsers`)
};

const updateOutdatedTracker=async()=>{
    const requestTime= datafromDB?.filter(item=>(
        (item?._id==="673d980b6501517ffb7b4257")
    ));
    const budget = requestTime.map(timeframe=>(
        timeframe.budget
    ));

    const amount = budget.map(item=>(
        item
    )).flat();
    const expenseList = amount.map(item=>(
        item.expenseList
    )).flat();

   
    try{
         await expenseList.map((item)=>{
          return  (hooks.upDatePost(`/houseTracker/updateOutdated`, item))
    })        
    }catch(err){
        throw(err)
    }
}

// const SmartTracker="674af4b8f53e4144628df1a4"


function displaySelectedGroup(){
    const item = hooks.getItemLocalStorage(`groupItem`)
    return(
        <div key={item?._id} className="mapCont">
          <button
            className='delete-btn'
            disabled={true}
            onClick={()=> deleteItem(item?._id)}>
            X
        </button>
        <div>{item?.groupName}</div>
        <div><strong className="month-year"
        >{item?.monthCreated}  {item?.yearCreated}</strong></div>
        {/* <div style={{textAlign:"center"}}>{item._id}</div> */}
        <div><strong className="item">{sum(item?._id)}</strong></div>
        <section className='budgetWrapper'>
        {item?.expenseList.map(expense=>(
            <div 
            key={expense?._id} 
            className="budget" 
            onClick={()=> view(item, expense, expense?._id)}
            style={{backgroundColor: budgetColor(expense?.status)}}
            >
            {/* <section style={{display:"flex", justifyContent:"space-between"}}> */}

                <div className="budgetItem" style={{fontSize:"14px", textTransform:"uppercase", color:"black", fontWeight:"650"}}>{expense?.purpose.slice(0,8)}{check(expense?.purpose)}</div>
                <div className="budgetItem" style={{textAlign:"start",fontSize:"14px", fontStyle:"italic"}}>{expense?.detail.slice(0,8)}{check(expense?.detail)}</div>

                <div className="budgetItem" style={{fontSize:"15px"}}>NGN {hooks.formatNumber(expense?.amountRequired)}</div>
                <div className="budgetItem" style={{fontSize:"12px"}}>{expense?.username}</div>
            {/* </section> */}
            </div>
        )).reverse()}
        </section>
    </div>

    )
}

  return (
    <div className='allData'>
        {loading ? "page loading...": datafromDB.length<1? "No Data Found": displaySelectedGroup() }
        { fullPost &&
        <section 
         style={{
          background: "rgba(45, 45, 45, 0.6)",
          width: "100vw",
          height:"100vh",
          display:"flex", justifyContent:"center", alignItems:"center",
          position: "fixed",
          top: "0", left:"0", right:"", bottom:"0",
        }}>
            <div
            style={{
                // background:"white",
                backgroundColor: budgetColor(budgetItem.status),

                color:"white",
                // width : "fit",
                padding: "10px",
                borderRadius: "2px",
                // textAlign: "center",
                gap:"4px"
            }}>
                <div style={{float:"right", marginLeft:"10px"}}>
                <button onClick={()=> setFullPost(prev=> !prev)}>X</button>
                </div>
                 <div className="budgetItem" style={{fontSize:"16px", textTransform:"uppercase", color:"black", fontWeight:"650"}}>{budgetItem.purpose}</div>
                 <div className="budgetItem" style={{textAlign:"start",fontSize:"14px", fontStyle:"italic"}}>{ budgetItem.detail}</div>
                 
                 <div className="budgetItem" style={{fontSize:"16px", marginTop:"8px"}}>NGN {hooks.formatNumber(budgetItem.amountRequired)}</div>
                 <div className="budgetItem" style={{fontSize:"14px"}}>{budgetItem.firstName} {budgetItem.lastName} </div>
                 <div className="budgetItem" style={{fontSize:"14px"}}>{budgetItem.date} </div>
                 <div className="budgetItem" style={{fontSize:"14px"}}>{budgetItem.username}</div>

                 <div style={{display:"flex",gap:"40px", justifyContent:"space-between", paddingTop:"15px"}}>
                        { user?.email==="mogaleza@gmail.com" && <div onClick={()=>{setFullPost(prev=> !prev);  handleApprove(postItem?._id, budgetItem._id, budgetItem, "approved")}} className="approve-btn elevate"
                        style={{display: budgetItem.status==="pending"? "block" : "none"}} >{budgetItem.status? "confirm" : ""}</div>}
                        { user?.email==="mogaleza@gmail.com" && <div onClick={()=>{setFullPost(prev=> !prev);  handleApprove(postItem?._id, budgetItem?._id, budgetItem, "denied")}} className="reject-btn elevate" style={{  display: budgetItem.status==="pending"? "block" : "none"}}>{budgetItem.status? "reject" : ""}</div>}
                        { <button style={{display: budgetItem.status==="pending"? "block": budgetItem.status==="denied" ? "block" : "none"}} onClick={()=>{setFullPost(prev=> !prev); deleteBudget(postItem?._id, budgetId)}} className="elevate delete-budget-btn">delete</button> }

                </div>            
            </div>
        </section>
        }

        { addRequest && <Request/>}
        <div style={{}}>
            <button 
            onClick={()=> setUpNewUser()}
            style={{
                position:"fixed", top:"75px", left:"10px",
                border:"none",
                background:"darkred", color:"white",
                fontSize:"14px",
                padding:"8px", borderRadius:"2px"
                 }}>Add Group Member </button>
        </div>
        <button disabled={true} style={{position:"fixed", bottom:"60px"}} onClick={()=> updateOutdatedTracker()}>UPDATE OUTDATED</button>
    </div>
  )
}

export default AllData
