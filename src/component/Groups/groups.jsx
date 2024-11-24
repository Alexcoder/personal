import { useState, useEffect } from "react";
import { useGlobalState
} from "../../state/context/context";
import * as hooks from "../../hooks/hooks";
import "./groups.css";

function Groups(){
    const {setGroupId, user, reqId} = useGlobalState();
    const [dBGroups, setDBGroups] = useState([])

    useEffect(()=>{
        const fetch=async()=>{
            try{
                const res = await hooks.getPost(`/houseTracker/v1/${user?._id}`)
                const resNew = Object.entries(res?.data)
                setDBGroups(resNew)
                console.log("db", res?.data)
            }catch(err){
                throw(err)
            }
        }
        fetch()
    },[user?._id, reqId])

    const handleClick=(id)=>{
        setGroupId(id)
    }


    return(
        <main className="groups">
           { dBGroups?.map(([id, data])=>(
            <div className="grp-map-cont" key={id}>
                {
                  data.map(item=>(
                    <div className="grp-map-sub" onClick={()=> handleClick(item?._id)}>
                        <div className="grp-item-logo">{item.groupName.slice(0,1)}</div>
                        <div className="grp-item">{item.groupName}</div>
                    </div>    
                  ))   
                }
            </div>
           ))}

        </main>
    )
}

export default Groups