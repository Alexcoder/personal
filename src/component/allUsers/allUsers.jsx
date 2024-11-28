import "./allUsers.css"
import { useState } from "react";
import * as hooks from "../../hooks/hooks";
import useReactHooks from "../../hooks/reactHooks";
import { useGlobalState } from "../../state/context/context";
import Notification from "../../reusableComponent/notification/notification";
import Button from "../../reusableComponent/button/button";

function AllUsers(){
    const reactHooks = useReactHooks()
    const [message, setMessage]= useState(``)
    const {setReqId, allUsers, selectedId, notification, setNotification, setSelectedId,} = useGlobalState()

    async function addUserToGroup(selectedUserId, user){
        setSelectedId(selectedUserId)
       try{
          const res = await hooks.createPost(`/auth/addUserToGroup/${selectedId}`, {
            groupId      :  hooks.getItemLocalStorage(`groupId`),
            monthCreated :  hooks.getItemLocalStorage(`monthCreated`), 
            yearCreated  :  hooks.getItemLocalStorage(`yearCreated`), 
            dayCreated   :  hooks.getItemLocalStorage(`dayCreated`),   
            user,
            joinDate: hooks.formatDate.fullDate()    
        });
        setReqId(res?.data._id)
        console.log("addGroupRes", res?.data.message)
        setMessage(res?.data.message)
        setNotification(prev=> !prev)
       }catch(err){
        throw(err)
       }
    }

    return(
        <main className="allUsers">
           <div className="allUsers-wrapper">
              { allUsers?.map(item=>(
                <div className="allUsers-map-cont" key={item?._id}>
                    <div className="allUsers-map-item">{item?.email}</div>
                    <Button
                    title={"Add"} 
                    onClick={()=>{ addUserToGroup(item?._id, item)}} 
                    disabled={false} 
                    bc={""} 
                    color={""}
                    />
                </div>
              ))}
           </div>
           {notification &&
            <Notification 
              message={message} 
              onClick={()=> reactHooks.navigate(`/`)}/>
           }
        </main>
    )
}

export default AllUsers