// import {useState} from 'react'
import "../allData.css"

const ExpenseList = (props) => {
 const {
   groupItem,
   deleteItem, 
   hooks, 
   check, 
   view, 
   budgetColor, 
   sum, 
   NAIRA,
   isApproved, 
   } = props

  const status={
    approved: "approved",
    pending : "pending",
    all     : "",
  }
  const viewbtn={
    approved  : "pending request",
    pending : "approved request",
    all     : "",
  }

  const filterExpense=()=>{
   const filter =  groupItem?.expenseList?.filter(item=> item?.status.includes(status[isApproved]))
   return filter
  }
  return (
    <div>
        <div key={groupItem?._id} className="mapCont">
          <button
            className='delete-btn'
            disabled={true}
            onClick={()=> deleteItem(groupItem?._id)}>
            X
        </button>
        <section style={{display:""}} >
          <div><strong className="month-year"
          >{groupItem?.groupName}</strong></div>
          {/* <button style={{padding:"8px"}} onClick={()=> setIsApproved(prev=> !prev)}>see {viewbtn[isApproved]}</button>  */}
        </section>
        <div><strong className="item">{sum(groupItem?._id)}</strong></div>
        <section className='budgetWrapper'>
        {filterExpense()?.length? filterExpense().map(expense=>(
            <div 
            key={expense?._id} 
            className="budget" 
            onClick={()=> view(groupItem, expense, expense?._id)}
            style={{backgroundColor: budgetColor(expense?.status)}}
            >
            {/* <section style={{display:"flex", justifyContent:"space-between"}}> */}
                <div className="budgetItem" style={{fontSize:"14px", textTransform:"uppercase", color:"black", fontWeight:"650"}}>{expense?.purpose.slice(0,8)}{check(expense?.purpose)}</div>
                <div className="budgetItem" style={{textAlign:"start",fontSize:"14px", fontStyle:"italic"}}>{expense?.detail.slice(0,8)}{check(expense?.detail)}</div>
                <div className="budgetItem" style={{fontSize:"15px"}}>{NAIRA} {hooks.formatNumber(expense?.amountRequired)}</div>
                <div className="budgetItem" style={{fontSize:"10px"}}>{expense?.date && expense?.date.slice(0,5)}  {expense?.firstName}</div>
            {/* </section> */}
            </div>
        )).reverse() : <div style={{position:"fixed", top:"450px",left:"140px",textTransform:"uppercase"}}>no request {viewbtn[!isApproved]}</div>}
        </section>
    </div>


      
    </div>
  )
}

export default ExpenseList
