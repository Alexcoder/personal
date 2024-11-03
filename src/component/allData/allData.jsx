import React, {useState, useEffect} from 'react';
import * as hooks from "../../hooks/hooks";

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
                {/* <strong className="item">{item._id}</strong> */}
                <div><strong className="item">{item.month}</strong></div>
                {item?.budget.map(budget=>(
                    <div key={budget?._id} className="budget">
                        {/* <div className="budgetItem">{budget._id}</div> */}
                        <div className="budgetItem">{budget.purpose}</div>
                        <div className="budgetItem">NGN {hooks.formatNumber(budget.amountRequired[0].amount)}</div>
                        <div className="budgetItem">{budget.amountRequired[0].date}</div>
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
