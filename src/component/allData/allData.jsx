import React, {useState, useEffect} from 'react';
import * as hooks from "../../hooks/hooks";
import {useGlobalState} from "../../state/context/context"
import "./allData.css"

const AllData = () => {
    const [datafromDB, setDatafromDB] = useState([])
    const [loading, setLoading] = useState(false);
    const {user} = useGlobalState();
    // const [request, setRequest]=useState({})
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
  },[]);

  const deleteItem=async(id)=>{
    try{
            await hooks.deletePost(`/houseTracker/delete/${id}`)
            const findIndex = datafromDB.findIndex(item=> item._id===id)
            setDatafromDB(datafromDB.splice(findIndex, 0))
    }catch(err){
        throw(err)
    }
  }
  const deleteBudget=async(id,budgetId)=>{
    try{
            await hooks.deletePost(`/houseTracker/deleteBudget/${id}/${budgetId}`)
            // const findIndex = datafromDB.findIndex(item=> item._id===id)
            // setDatafromDB(datafromDB.splice(findIndex, 0))
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
    const amountRequired = expenseList.reduce((acc, value)=>(acc + value.amountRequired),0)


return  (
    <div>NGN {hooks.formatNumber(amountRequired)}</div>    
)
};

const handleApprove=async(postId, expenseId, expenseList, status)=>{
   try{
        const initialState={
            creator       : user?._id,
            firstName     : user?.firstName,
            lastName      : user?.lastName,
            purpose       : expenseList?.purpose,
            
            detail        : expenseList.detail,
            amountRequired: expenseList.amountRequired,
            month         : hooks.formatDate.month ,
            year          : hooks.formatDate.year ,
            date          : hooks.formatDate.fullDate(),
            
            expenseId : expenseId,
            status   : status
    
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
        {loading && "page loading..."}
        {datafromDB?.map((item)=>(
            <div key={item?._id} className="mapCont">
                <button
                style={{float: "right", backgroundColor:"darkred", border:"none", color:"white"}}
                onClick={()=> deleteItem(item?._id)}
                className="item">X</button>
                <div><strong className="item">{item.month}</strong></div>
                <div><strong className="item">{sum(item.month, item.year)}</strong></div>
                <section className='budgetWrapper'>
                {item?.budget.map(budget=>(
                    <div key={budget?._id} className="budget" 
                    style={{backgroundColor: budgetColor(budget.expenseList[0].status)}}
                    >
                        <div className="budgetItem" style={{fontSize:"14px", textTransform:"uppercase", color:"black", fontWeight:"650"}}>{budget.expenseList[0].purpose}</div>
                        <div className="budgetItem" style={{fontSize:"14px", fontStyle:"italic"}}>{budget.expenseList[0].detail}</div>
                        <div className="budgetItem" style={{fontSize:"14px"}}>{budget.expenseList[0].firstName}</div>

                        <div className="budgetItem" style={{fontSize:"15px"}}>NGN {hooks.formatNumber(budget.expenseList[0].amountRequired)}</div>
                        <div className="budgetItem" style={{fontSize:"12px"}}>{budget.expenseList[0].date}</div>
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                        { false && <div onClick={()=> handleApprove(item?._id, budget.expenseList[0]._id, budget.expenseList[0], "approved")} className="budgetItem" style={{background:"red", width:"fit-content", fontSize:"10px", padding:"1px 2px", cursor:"pointer", display: budget.expenseList[0].status==="pending"? "block" : "none"}}>{budget.expenseList[0].status? "approve" : ""}</div>}
                        { false && <div onClick={()=> handleApprove(item?._id, budget.expenseList[0]._id, budget.expenseList[0], "denied")} className="budgetItem" style={{background:"red", width:"fit-content", fontSize:"10px", padding:"1px 2px", cursor:"pointer", display: budget.expenseList[0].status==="pending"? "block" : "none"}}>{budget.expenseList[0].status? "reject" : ""}</div>}
                        { false && <button style={{display: budget.expenseList[0].status==="pending"? "block": "none"}} onClick={()=> deleteBudget(item?._id, budget?._id)} className="item">X</button> }
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
