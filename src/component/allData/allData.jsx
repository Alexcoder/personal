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
  console.log("dataFromDB allData.js", datafromDB)

  const deleteItem=async(id)=>{
    try{
       await hooks.deletePost(`/houseTracker/delete/${id}`)
       const findIndex = datafromDB.findIndex(item=> item._id===id)
       setDatafromDB(datafromDB.splice(findIndex, 0))
    }catch(err){
        throw(err)
    }
  }


  return (
    <div className='allData'>
        {datafromDB?.map((item)=>(
            <div key={item?._id} className="mapCont">
                <div><strong className="item">{item.month}</strong></div>
                {item?.budget.map(budget=>(
                    <div key={budget?._id} className="budget">
                        <div className="budgetItem">{budget.purpose}</div>
                        <div className="budgetItem">{budget.detail}</div>
                        <div className="budgetItem">NGN {hooks.formatNumber(budget.amount[0].required)}</div>
                        <div className="budgetItem">{budget.amount[0].date}</div>
                        <div className="budgetItem">{budget.amount[0].status}</div>
                    </div>
                ))}
                <button
                onClick={()=> deleteItem(item?._id)}
                 className="item">delete</button>
            </div>
        ))}
    </div>
  )
}

export default AllData
