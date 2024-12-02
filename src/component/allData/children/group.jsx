import React from 'react'
import "../allData.css"

const Group = ({item, deleteItem, hooks, check, view, budgetColor, sum}) => {

  return (
    <div>
        <div key={item?._id} className="mapCont">
          <button
            className='delete-btn'
            disabled={true}
            onClick={()=> deleteItem(item?._id)}>
            X
        </button>
        <div><strong className="month-year"
        >{item?.groupName}</strong></div>
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


      
    </div>
  )
}

export default Group
