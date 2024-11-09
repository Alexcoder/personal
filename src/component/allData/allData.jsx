import React, {useState, useEffect} from 'react';
import * as hooks from "../../hooks/hooks";
import "./allData.css"

const AllData = () => {
    const [datafromDB, setDatafromDB] = useState([])
    const [loading, setLoading] = useState(false)
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
    const filtered= datafromDB?.filter(item=>(
        (item.month===month & item.year===year)
    ));
    const budget = filtered.map(item=>(
        item.budget
    ));

    const amount = budget.map(item=>(
        item
    ));
    const expense = amount.flat().map(item=>(
        item.expenseList
    ));
    // const sent = amount.flat().map(item=>(
    //     item.amountSent
    // ));
    const expenseList    = expense.flat();
    // const amountSentList = sent.flat();
    const amountRequired = expenseList.reduce((acc, value)=>(acc + value.amountRequired),0)


return  (
    <div>NGN {Intl.NumberFormat().format(amountRequired)}</div>    
)
};


function budgetColor(status){
   return status!=="pending"? "orange" 
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
                        {/* <div className="budgetItem">{budget.expenseList[0].status}</div> */}
                        <button style={{display:"none"}} onClick={()=> deleteBudget(item?._id, budget?._id)} className="item">X</button>
                    </div>
                ))}
                </section>
            </div>
        ))}
    </div>
  )
}

export default AllData
