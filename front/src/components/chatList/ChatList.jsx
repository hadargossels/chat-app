import React, { useState, useEffect } from 'react'
import {Card} from 'react-bootstrap'
import './ChatList.css'
import axios from 'axios'

export const ChatList = (props) =>{

    const [user, setUser] = useState([])

    useEffect(() => {
        getUsers()
    },[])

    async function getUsers() {
        try {
            await axios.get(`${process.env.REACT_APP_URL}/user/`)
            .then((response) => {
                setUser(response.data)
            })
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="chat-list">
                <Card.Body style={{height: "250px", overflow: "auto"}}> 
                    {user.map((v, index) => 
                    <div key={index}
                    className="chatList"
                    >
                        <p onClick={() => {props.chooseConversation(v.id)}}>{v.lastText}</p>
                    </div>
                    )}
                </Card.Body>
        </div>
    )
}

export default ChatList;
