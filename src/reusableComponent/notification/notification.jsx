// import { useState } from "react"
import "./notification.css"
import {useGlobalState} from "../../state/context/context"

function Notification({message, onClick}){
    const {notification, setNotification} = useGlobalState()

    return(
        <div>

        { notification &&
            <main className="notification-cont">
                <div className="notification-wrapper">
                    <div className="message">{message}</div>
                    <div>
                     <button className="notification-btn" onClick={()=> {onClick(); setNotification(false)}}>
                         OK
                    </button>
                    </div>
                </div>
            </main>
        }
        </div>
    )
}

export default Notification