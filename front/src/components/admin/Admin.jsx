import React, { useState } from 'react'
import Chat from '../chat/Chat'
import ChatList from '../chatList/ChatList'
import {Card} from 'react-bootstrap'

export const Admin = (props) => {
    
    const [chosen, setChosen] = useState(null)

    function openNew () {
        setChosen('new')
    }
    
    return (
        <div>
            <Card style={{width: "50vw"}} className="m-auto mt-5">
                {chosen === null ?
                <>
                <Card.Title className="p-3 text-center d-flex justify-content-center m-0" style={{color: "white", backgroundColor:"rgb(3, 37, 3)"}}>
                     Conversations
                    <button className="new-btn" onClick={()=>openNew()}><i class="fas fa-external-link-alt"></i></button>
                </Card.Title>
                <ChatList chooseConversation={chosenCon => setChosen(chosenCon)}/>
                
                </> :
                <>
                <Card.Title className="p-3 text-center d-flex justify-content-center m-0" style={{color: "white", backgroundColor:"rgb(3, 37, 3)"}}>
                    <button className="back-btn" onClick={() => setChosen(null)}><i class="fas fa-chevron-left"></i></button>
                    Chat
                </Card.Title>
                <Chat id={'admin'} chosen={chosen}/>
                </>}              
            </Card>
        </div>
    )
}

export default Admin
