import { useState, useEffect } from "react";
import { useGlobalState
} from "../../state/context/context";
import * as hooks from "../../hooks/hooks";
import useReactHooks from "../../hooks/reactHooks";
import "./groups.css";
import Input from "../../reusableComponent/input/input";
import Button from "../../reusableComponent/button/button";
import Notification from "../../reusableComponent/notification/notification";

function Groups(){
    const {setGroupId, user, setReqId, notification, setNotification} = useGlobalState();
    const [dBGroups, setDBGroups] = useState({})
    const [groupName, setGroupName] = useState("")
    const [createNewGroup, setCreateNewGroup] = useState(false)
    const reactHooks = useReactHooks()

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
    },[user,])

    const handleClick=(id)=>{
        setGroupId(id)
    }

    const createGroup= async()=>{
        const dataToCreate = {
          day         :  hooks.formatDate.date,
          month       :  hooks.formatDate.month,
          year        :  hooks.formatDate.year,
          creator     : user?._id, 
          groupName   : groupName, 
          date        : hooks.formatDate.fullDate(),
          user,
         }
        try{
           await hooks.createPost(`/houseTracker/createGroup/${"1234"}`, dataToCreate)
          setCreateNewGroup(prev=>!prev)
          setNotification(prev=> !prev)
  
        }catch(err){
          throw(err.message)
        }
      }
      const fetchUserInfo=async()=>{
        try{
           const res = await hooks.getPost(`/auth/fetchOneUser/${user?._id}`)
           hooks.setItemLocalStorage(`user`, res?.data)
           setReqId(res?.data._id)
        }catch(err){ throw(err) }
      };

      const groupDetail=(groupId, groupItem)=>{
        hooks.setItemLocalStorage('groupId', groupId)
        hooks.setItemLocalStorage('groupItem', groupItem)
        hooks.setItemLocalStorage('dayCreated', groupItem?.dayCreated)
        hooks.setItemLocalStorage('monthCreated', groupItem?.monthCreated)
        hooks.setItemLocalStorage('yearCreated', groupItem?.yearCreated)
        reactHooks.navigate(`/allData?group-name=${groupItem.groupName}&groupId=${groupId}`)
      }
  
  const groupItem=(id, Item)=>{
    return (
        <>
            <div className="grp-item-logo">{  Item?.groupName.slice(0,1)}</div>
            <div className="grp-item-name">{Item? Item?.groupName : <span style={{fontStyle:"italic", fontWeight:"300"}}>fetching...</span>}</div>
            <div className="grp-item-member">{Item?.groupMember.length}{Item && "m"}</div>
            <div className="grp-item-request">{Item?.expenseList.length}{id? "-request" : ""}</div>
        </>
    )
  }

    return(
        <main className="groups" >
           {dBGroups ? user.group.map((group)=>(
            <div className="grp-map-cont" key={group?.groupId} onClick={()=> groupDetail(group?.groupId, dBGroups[group?.groupId]?._doc)}>
                    <div className="grp-map-sub" onClick={()=> handleClick(group?.groupId)}>
                       <>{ groupItem(dBGroups[group?.groupId], dBGroups[group?.groupId]?._doc)}</> 
                    </div> 
            </div>
            
           )) : <button onClick={()=> reactHooks.navigate(`/`)}>Login To Continue</button>}
           {
            <div
            style={{}}
            >
                <button
                 onClick={()=> {setCreateNewGroup(prev=> !prev)}}
                 style={{zIndex:"3",position: "fixed", top:"120px", right:"20px", padding:"8px 14px", borderRadius:"50%", border:"none", background:"darkred", color:"white", fontSize:"29px"}}
                >{createNewGroup ? <span style={{}}>x</span>: "+"}</button>
            </div>
           }
           { createNewGroup &&
            <div 
            style={{ width:"100vw",display:"flex", 
                flexDirection:"column", 
                gap:"20px",
                justifyContent:"center", 
                alignItems:"center",position:"fixed", 
                top:"0", left:"0", right:"0", bottom:"0",
                 background:"rgba(45, 45, 45, 0.6)"}}>             
               <div>
                <Input 
                title={<strong style={{fontSize:"14px"}}>Group Name</strong>} 
                name={"groupName"}
                type={"String"} 
                value={groupName}
                placeholder={"enter group name"} 
                onChange={(e)=> setGroupName(e.target.value)}
                /> { groupName.length>0 &&
                    <Button
                     title={"Create"}
                     onClick={()=> createGroup()}  
                     disabled={false} 
                     bc={""} 
                     color={""}
                    />               
                }
                </div> 
            </div>
           }
           { notification &&
               <Notification 
                message={`${groupName} created Succesfully`}
                onClick={()=> fetchUserInfo()}/>
           }

        </main>
    )
}

export default Groups