import React from 'react'


const ShowTracker = ({datafromDB}) => {
  return (
    <div>
        {
            datafromDB.map((item, i)=>(
                <div key={i}>
                    <div className="item">{item.purpose}</div>
                    <div className="item">
                        {
                          item.budget.map((it, j)=>(
                            <div key={j}>
                                <div className="item">{it.purpose}</div>
                                <div className="item">{it.amount}</div>
                                <div className="item">{it.date}</div>
                            </div>
                          ))
                        }
                    </div>
                </div>
            ))
        }
      
    </div>
  )
}

export default ShowTracker
