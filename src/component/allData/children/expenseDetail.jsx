// import {useState} from 'react'
import "../allData.css"

const ExpenseDetail = (props) => {
  const {
      budgetColor, budgetId, budgetItem, 
      setFullPost, hooks, handleApprove, 
      deleteBudget, editBudget, 
      postItem, NAIRA, isGroupAdmin,
      isGroupMember,setAmountRequired,
      amountRequired,
    } = props




  return (
    <div>
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
                backgroundColor: budgetColor(budgetItem.status),
                color:"white",
                padding: "10px",
                borderRadius: "2px",
                gap:"4px"
            }}>
                <div style={{float:"right", marginLeft:"10px"}}>
                <button onClick={()=> setFullPost(prev=> !prev)}>X</button>
                </div>
                 <div className="budgetItem" style={{fontSize:"16px", textTransform:"uppercase", color:"black", fontWeight:"650"}}>{budgetItem.purpose}</div>
                 <div className="budgetItem" style={{textAlign:"start",fontSize:"14px", fontStyle:"italic"}}>{ budgetItem.detail}</div>
                 
                 <div className="budgetItem" style={{fontSize:"16px", marginTop:"8px"}}>{NAIRA} {hooks.formatNumber(budgetItem.amountRequired)}</div>
                 <div className="budgetItem" style={{fontSize:"14px"}}>{budgetItem.firstName} {budgetItem.lastName} </div>
                 <div className="budgetItem" style={{fontSize:"14px"}}>{budgetItem.date} </div>

                 <div style={{display:"flex",gap:"40px", justifyContent:"space-between", paddingTop:"15px"}}>
                        { isGroupAdmin() && <div onClick={()=>{setFullPost(prev=> !prev);  handleApprove(postItem?._id, budgetItem._id, budgetItem, "approved")}} className="approve-btn elevate"
                        style={{display: budgetItem.status==="pending"? "block" : "none"}} >{budgetItem.status? "confirm" : ""}</div>}
                        {isGroupAdmin() && <div onClick={()=>{setFullPost(prev=> !prev);  handleApprove(postItem?._id, budgetItem?._id, budgetItem, "denied")}} className="reject-btn elevate" style={{  display: budgetItem.status==="pending"? "block" : "none"}}>{budgetItem.status? "reject" : ""}</div>}
                        {isGroupAdmin() && <button style={{display: budgetItem.status==="pending"? "block": budgetItem.status==="denied" ? "block" : "none"}} onClick={()=>{setFullPost(prev=> !prev); deleteBudget(postItem?._id, budgetId)}} className="elevate delete-budget-btn">delete</button> }
                        {/* {isGroupMember() && <button style={{ display: budgetItem.status==="pending"? "block": budgetItem.status==="denied" ? "block" : "none" }} onClick={()=>{setFullPost(prev=> !prev); editBudget(postItem?._id, budgetId)}} className="elevate delete-budget-btn">update</button> } */}
                        {isGroupMember() && 
                         <div>
                          <input 
                          style={{width:"50px", padding:"4px", marginBottom:"2px"}}
                            placeholder='amountRequired'
                            type="number"
                            value={amountRequired}
                            onChange={(e)=> setAmountRequired(e.target.value)}/>
                          <button style={{ display: budgetItem.status==="pending"? "block": budgetItem.status==="denied" ? "block" : "none" }} onClick={()=>{setFullPost(prev=> !prev); editBudget(postItem?._id, budgetId)}} className="elevate delete-budget-btn">update</button> 
                        </div> 
                       }           

                </div>            
            </div>
        </section>
    </div>
  )
}

export default ExpenseDetail
