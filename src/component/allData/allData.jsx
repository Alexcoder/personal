import React, {useState, useEffect} from 'react';
import * as hooks from "../../hooks/hooks";
import {useGlobalState} from "../../state/context/context"
import "./allData.css"

const AllData = () => {
    const [datafromDB, setDatafromDB] = useState([])
    const {user, reqId, setReqId, loading, setLoading} = useGlobalState();
    console.log("datafromDB", datafromDB)

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


const sum =(month, year)=>{
    const requestTime= datafromDB?.filter(item=>(
        (item.month===month & item.year===year)
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
    const filterApproved = expenseList.filter(expenseList=> expenseList.status.includes("approved"))
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

            
            detail        : expenseList.detail,
            purpose       : expenseList?.purpose,
            amount        : expenseList.amount,
            date          : hooks.formatDate.fullDate(),
            
            expenseId     : expenseId,
            status        : status,
            user          : user
        }
       const res = await hooks.upDatePost(`/houseTracker/update/${postId}`, initialState)
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

  return (
    <div className='allData' style={{width:"100vw"}}>
        {loading ? "page loading...": !datafromDB? "No Data Found": ""}
        {datafromDB?.map((item)=>(
            <div key={item?._id} className="mapCont">
                <button
                disabled={true}
                style={{display:"none", float: "right", backgroundColor:"darkred", border:"none", color:"white"}}
                onClick={()=> deleteItem(item?._id)}
                className="item">X</button>
                <div><strong className="item" style={{textTransform:"uppercase",display:"flex", justifyContent:"center", background:"lightgray", padding:"5px"}}>{item.month}  {item.year}</strong></div>
                <div><strong className="item">{sum(item.month, item.year)}</strong></div>
                <section className='budgetWrapper'>
                {item?.budget.map(budget=>(
                    <div key={budget?._id} className="budget" 
                    style={{backgroundColor: budgetColor(budget.expenseList[0].status)}}
                    >
                        <div className="budgetItem" style={{fontSize:"14px", textTransform:"uppercase", color:"black", fontWeight:"650"}}>{budget.expenseList[0].purpose}</div>
                        {/* <div className="budgetItem" style={{fontSize:"14px", fontStyle:"italic"}}>{budget.expenseList[0].detail}</div> */}
                        <div className="budgetItem" style={{fontSize:"14px"}}>{budget.expenseList[0].firstName}</div>

                        <div className="budgetItem" style={{fontSize:"15px"}}>NGN {hooks.formatNumber(budget.expenseList[0].amountRequired)}</div>
                        <div className="budgetItem" style={{fontSize:"12px"}}>{budget.expenseList[0].date.slice(0,10)}...</div>
                        {/* <div className="budgetItem" style={{fontSize:"12px"}}>{budget.expenseList[0].email.slice(0,12)}...</div> */}
                        <div className="budgetItem" style={{fontSize:"12px"}}>{budget.expenseList[0].username}</div>
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                        { true && <div onClick={()=> handleApprove(item?._id, budget.expenseList[0]._id, budget.expenseList[0], "approved")} className="budgetItem" style={{background:"white",color:"black", width:"fit-content", fontSize:"10px", padding:"1px 2px", cursor:"pointer", display: budget.expenseList[0].status==="pending"? "block" : "none"}}>{budget.expenseList[0].status? "confirm" : ""}</div>}
                        { false && <div onClick={()=> handleApprove(item?._id, budget.expenseList[0]._id, budget.expenseList[0], "denied")} className="budgetItem" style={{background:"red", width:"fit-content", fontSize:"10px", padding:"1px 2px", cursor:"pointer", display: budget.expenseList[0].status==="pending"? "block" : "none"}}>{budget.expenseList[0].status? "reject" : ""}</div>}
                        { true && <button style={{display: budget.expenseList[0].status==="pending"? "block": "none"}} onClick={()=> deleteBudget(item?._id, budget?._id)} className="item">X</button> }
                        </div>
                    </div>
                ))}
                </section>
            </div>
        ))}
    </div>
  )
}

export default AllData
