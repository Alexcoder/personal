import React, {useState, useEffect} from 'react';
import * as hooks from "../../hooks/hooks";
import {useGlobalState} from "../../state/context/context"
import Request from '../request/request';
import ExpenseList from "./children/expenseList"
import ExpenseDetail from './children/expenseDetail';
import "./allData.css"
import useReactHooks from '../../hooks/reactHooks';
import Notification from '../../reusableComponent/notification/notification';

const AllData = () => {
    const {user, reqId, setReqId, loading, setLoading, addRequest, message, notification, NAIRA} = useGlobalState();
    const [datafromDB, setDatafromDB] = useState([])
    const [budgetItem, setBudgetItem] = useState(``);
    // const [budgetItemCreator, setBudgetItemCreator] = useState(hooks.getItemLocalStorage(`budgetItemCreator`));
    const [budgetId, setBudgetId] = useState("");
    const [postItem, setPostItem] = useState("");
    const [fullPost, setFullPost] = useState(false);

    // const [fetching, setFetching] = useState(false);
    const reactHooks = useReactHooks()
    console.log("datafromDB", datafromDB)
    console.log('budgetItem', budgetItem)
    // console.log('budgetItemCreator', budgetItemCreator)

    useEffect(()=>{
      const fetchData=async()=>{
          try{
              setLoading(true)
            //   const res = await hooks.getPost("/houseTracker/")
            const res = await hooks.houseTracker().getAllPost()
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
  };

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
    <div style={{color:"green"}}>{NAIRA} {hooks.formatNumber(amountApproved)}</div>    
    <div style={{fontSize:"18px"}}>{NAIRA} {hooks.formatNumber(amountRequired)}</div>    
    <div style={{color:"orange"}}>{NAIRA} {hooks.formatNumber(amountPending)}</div>    
    </div>
)
};

const handleApprove=async(postId, expenseId, expenseList, status)=>{
   try{
        const initialState={
            user,
            itemId        : expenseList._id, 

            detail        : expenseList.detail,
            purpose       : expenseList?.purpose,
            amount        : expenseList.amount,
            date          : hooks.formatDate.fullDate(),   
            expenseId     : expenseId,
            status        : status,
            groupId       : hooks.getItemLocalStorage("groupId")
        }
       const res = await hooks.verifyStatus(`/houseTracker/verifyStatus/${postId}`, initialState)
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

const item = hooks.getItemLocalStorage(`groupItem`)




  return (
    <div className='allData'>
        {loading ? "page loading...": 
           datafromDB.length<1? "No Data Found": 
           <ExpenseList 
             item={item} 
             deleteItem={deleteItem} 
             hooks={hooks} 
             check={check}
             view={view}
             sum={sum}
             budgetColor={budgetColor}
             NAIRA={NAIRA}
             /> }
        
        { fullPost &&
          <ExpenseDetail
          budgetColor={budgetColor} 
          budgetId={budgetId} 
          budgetItem={budgetItem} 
          setFullPost={setFullPost} 
          hooks={hooks} 
          handleApprove={handleApprove} 
          user={user} 
          deleteBudget={deleteBudget}
          postItem={postItem}
          NAIRA={NAIRA}
          />
        }

        { addRequest && <Request/>}

        <div style={{ position:"fixed", top:"60px", left:"0px", right:"0px",background:"inherit",
}}>        
 {/* <div>{item?.groupName}</div> */}
            <button 
            onClick={()=> setUpNewUser()}
            style={{
                border:"none",
                background:"inherit", color:"darkred",
                fontSize:"14px",
                padding:"8px 12px", borderRadius:"2px", fontWeight:"600",
                 }}>New Member </button>
                 {/* <div>{item?.groupName}</div> */}
        </div>
        { notification && <Notification message={message} onClick={()=>reactHooks.navigate(`/`) }/>}
    </div>
  )
}

export default AllData
