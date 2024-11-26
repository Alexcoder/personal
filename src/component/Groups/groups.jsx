import { useState, useEffect } from "react";
import { useGlobalState
} from "../../state/context/context";
import * as hooks from "../../hooks/hooks";
import "./groups.css";

function Groups(){
    const {setGroupId, user, reqId} = useGlobalState();
    const [dBGroups, setDBGroups] = useState({})

    useEffect(()=>{
        const fetch=async()=>{
            try{
                const res = await hooks.getPost(`/houseTracker/v1/${user?._id}`)
                setDBGroups({...res?.data})
                console.log("res?.data", res?.data)
            }catch(err){
                throw(err)
            }
        }
        fetch()
    },[user?._id, reqId])

    const handleClick=(id)=>{
        setGroupId(id)
    }

    console.log("user?.group", user?.group)

    return(
        <main className="groups">
           { user?.group.map((group)=>(
            <div className="grp-map-cont" key={group}>
                    <div className="grp-map-sub" onClick={()=> handleClick(group?.groupId)}>
                        <div className="grp-item-logo">{dBGroups[group?.groupId]?._doc.groupName.slice(0,1)}</div>
                        <div className="grp-item">{dBGroups[group?.groupId]?._doc.groupName}</div>
                    </div>    
            </div>
           ))}
           {/* { dBGroups?.map(([id, data])=>(
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
           ))} */}

        </main>
    )
}

export default Groups