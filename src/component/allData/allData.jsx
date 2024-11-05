import React, {useState, useEffect} from 'react';
import * as hooks from "../../hooks/hooks";
import "./allData.css"

const AllData = () => {
    const [datafromDB, setDatafromDB] = useState([])

    useEffect(()=>{
      const fetchData=async()=>{
          try{
              const res = await hooks.getPost("/houseTracker/")
              setDatafromDB(res?.data)
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
    const amount = budget.flat().map(item=>(
        item.amount
    ));
    const amountRequired = amount.flat().reduce((acc, value)=>(acc + value.required),0)

return  (
    <div>NGN {Intl.NumberFormat().format(amountRequired)}</div>    
)
}

  return (
    <div className='allData'>
        {datafromDB?.map((item)=>(
            <div key={item?._id} className="mapCont">
                <button
                style={{float: "right"}}
                onClick={()=> deleteItem(item?._id)}
                className="item">X</button>
                <div><strong className="item">{item.month}</strong></div>
                <div><strong className="item">{sum(item.month, item.year)}</strong></div>
                <section className='budgetWrapper'>
                {item?.budget.map(budget=>(
                    <div key={budget?._id} className="budget">
                        <div className="budgetItem">{budget.purpose}</div>
                        <div className="budgetItem">{budget.detail}</div>
                        <div className="budgetItem">NGN {hooks.formatNumber(budget.amount[0].required)}</div>
                        <div className="budgetItem">{budget.amount[0].date}</div>
                        <div className="budgetItem">{budget.amount[0].status}</div>
                        <button onClick={()=> deleteBudget(item?._id, budget?._id)} className="item">X</button>
                    </div>
                ))}
                </section>
                {/* <button
                onClick={()=> deleteItem(item?._id)}
                 className="item">delete</button> */}
            </div>
        ))}
    </div>
  )
}

export default AllData
