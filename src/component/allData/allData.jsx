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
    <div className='allData'>
        {loading ? "page loading...": datafromDB.length<1? "No Data Found": ""}
        {datafromDB?.map((item)=>(
            <div key={item?._id} className="mapCont">
                <button
                 className='delete-btn'
                 disabled={true}
                 onClick={()=> deleteItem(item?._id)}>
                    X
                </button>
                {/* <div>{item?._id}</div> */}
                <div><strong className="month-year"
                >{item.month}  {item.year}</strong></div>
                <div><strong className="item">{sum(item.month, item.year)}</strong></div>
                <section className='budgetWrapper'>
                {item?.budget.reverse().map(budget=>(
                    <div key={budget?._id} className="budget" 
                    style={{backgroundColor: budgetColor(budget.expenseList[0].status)}}
                    >
                    {/* <section style={{display:"flex", justifyContent:"space-between"}}> */}

                        <div className="budgetItem" style={{fontSize:"14px", textTransform:"uppercase", color:"black", fontWeight:"650"}}>{budget.expenseList[0].purpose}</div>
                        <div className="budgetItem" style={{textAlign:"start",fontSize:"14px", fontStyle:"italic"}}>{budget.expenseList[0].detail.slice()}</div>

                        <div className="budgetItem" style={{fontSize:"15px"}}>NGN {hooks.formatNumber(budget.expenseList[0].amountRequired)}</div>
                        <div className="budgetItem" style={{fontSize:"12px"}}>{budget.expenseList[0].firstName} {budget.expenseList[0].date.slice(0,6)} </div>
                        <div className="budgetItem" style={{fontSize:"12px"}}>{budget.expenseList[0].username}</div>
                        <div style={{display:"flex",gap:"4px", justifyContent:"space-between"}}>
                        { user?.email==="mogaleza@gmail.com" && <div onClick={()=> handleApprove(item?._id, budget.expenseList[0]._id, budget.expenseList[0], "approved")} className="approve-btn elevate"
                        style={{display: budget.expenseList[0].status==="pending"? "block" : "none"}} >{budget.expenseList[0].status? "confirm" : ""}</div>}
                        { user?.email==="mogaleza@gmail.com" && <div onClick={()=> handleApprove(item?._id, budget.expenseList[0]._id, budget.expenseList[0], "denied")} className="reject-btn elevate" style={{  display: budget.expenseList[0].status==="pending"? "block" : "none"}}>{budget.expenseList[0].status? "reject" : ""}</div>}
                        { <button style={{display: budget.expenseList[0].status==="pending"? "block": budget.expenseList[0].status==="denied" ? "block" : "none"}} onClick={()=> deleteBudget(item?._id, budget?._id)} className="elevate delete-budget-btn">X</button> }
                        </div>
                    {/* </section> */}
                    </div>
                ))}
                </section>
            </div>
        ))}
    </div>
  )
}

export default AllData
