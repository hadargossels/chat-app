import React, { useState, useEffect, useRef } from 'react'
import {Card, Form, InputGroup, Button} from 'react-bootstrap'
import './Chat.css'
import axios from 'axios'
import { io } from "socket.io-client";

export const Chat = (props) => {

    const [text, setText] = useState('')
    const [conversation, setConversation] = useState([])
    const [user, setUser] = useState([])
    const textAreaRef = useRef()
    const [chosen, setChosen] = useState(props.chosen)

    // 
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = useRef(io("ws://localhost:8900"));
    const scrollRef = useRef();
    const toRef = useRef();
    // 

    useEffect(() => {
        getConversation()
        getUsers()
        socket.current = io("ws://localhost:8900")
        socket.current.on("getMessage", data => {
            let sender = props.id
            let recipient = sender !== 'admin' ? 'admin' : chosen
            let conversationId = recipient !== 'admin' ? recipient : sender
            setArrivalMessage({ 
                sender: data.senderId,
                recipient: data.reciverId,
                conversationId: conversationId,
                text: data.text
            })
        })
    },[])

    
    useEffect(() => {
        socket.current = io("ws://localhost:8900")
        socket.current.on("getMessage", data => {
            let sender = props.id
            let recipient = sender !== 'admin' ? 'admin' : chosen
            let conversationId = recipient !== 'admin' ? recipient : sender
            setArrivalMessage({ 
                sender: data.senderId,
                recipient: data.reciverId,
                conversationId: conversationId,
                text: data.text
            })
        })
    },[])

    useEffect(() => {
       arrivalMessage && chosen?.user.filter((v) => {
        if (v.id === arrivalMessage.sender)
        return true
        else return false}) && 
        setConversation((prev) => [...prev, arrivalMessage])  
    }, [arrivalMessage, chosen])

    useEffect(() => {
        socket.current.emit("addUser", props.id)
        socket.current.on("getUsers", users => {
        })
    }, [props.id])

    async function getConversation() {
        try {
            await axios.get(`${process.env.REACT_APP_URL}/chat/`)
            .then((response) => {
                let conversation = []
            response.data.forEach(element => {
                if (element.conversationId === chosen) {
                    conversation.push(element)
                }
                setConversation(conversation)
            })
            
            });
            
        } catch (error) {
            console.error(error);
        }
    }

    async function getUsers() {
        try {
            await axios.get(`${process.env.REACT_APP_URL}/user/`)
            .then((response) => { 
                setUser(response.data)
                       
            });
            
        } catch (error) {
            console.error(error);
        }
    }

    function handleSubmit(e) {
        
        textAreaRef.current.value = ""
        let sender = props.id
        let recipient = sender !== 'admin' ? 'admin' : chosen
        let conversationId = recipient !== 'admin' ? recipient : sender
        let messegeText = text
        let conversation1 = [...conversation]
        let users = [...user]
        e.preventDefault();
        // 
       socket.current.emit("sendMessege", {
           senderId: sender,
           reciverId: recipient,
           text: messegeText
       })
        // 
         axios.post(`${process.env.REACT_APP_URL}/chat/`, {
            sender: sender,
            recipient: recipient,
            text: messegeText,
            conversationId: conversationId
            })

          .then(function (response) {

            // conversation1.push({sender: sender,
            // recipient: recipient,
            // text: messegeText,
            // conversationId: conversationId})
            // setConversation(conversation1)

            let userIds = users.map((v) => {return v.id})

            if (userIds.includes(conversationId)) {
            axios.put(`${process.env.REACT_APP_URL}/user/${conversationId}`, {
                id: conversationId,
                lastText: messegeText
                })
                .then(function (response) {
                users.push({id: conversationId,
                    lastText: messegeText}) 
                setUser(users)
                })
                .catch(function (error) {
                console.log(error);
                });
            }
            else {
            axios.post(`${process.env.REACT_APP_URL}/user/`, {
                id: conversationId,
                lastText: messegeText
                })
                .then(function (response) {
                users.push({id: conversationId,
                    lastText: messegeText}) 
                setUser(users)
                })
                  .catch(function (error) {
                    console.log(error);
                  });
             }            
          })
          .catch(function (error) {
            console.log(error);
          });

           
    }
    
    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    }, [conversation])

    function setTo(e) {
        e.preventDefault()
        setChosen(toRef.current.value)
    }

    return (
        <div className="chat">
            {chosen === 'new' ?
            <div>
            <form onSubmit={(e) => setTo(e)}>
                <label htmlFor="to" style={{padding: "5px"}}>To: </label>
                <input type="text" name="to" placeholder="User Id"
                style={{width: "40vw", border: "none", marginRight: "5px"}} ref={toRef}/>
                <button type="submit" style={{border: 'none'}}>Send</button>
            </form>                
        </div> : null
        }
            
            <Card>
                <Card.Body style={{height: "250px", overflow: "auto"}}>
                    
                        {conversation.map((v, index) =>
                        <div className="messeges" key={index} ref={scrollRef}>
                            <p key={index}
                            className="textp"
                            style={{backgroundColor: v.sender === "admin"  ? "burlywood" : "forestgreen",
                            marginLeft: v.sender === "admin" ? "auto" : "0"}}>
                                {v.text}</p>
                            </div>
                        )}
                   
                </Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <InputGroup>
                        <Form.Control 
                        as="textarea"
                        required
                        onChange={e => setText(e.target.value)}
                        className="textarea"
                        ref = {textAreaRef}
                        />
                        <InputGroup.Append>
                        <Button type="submit" className="submitMessege">Send</Button>
                        </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                </Form>
            </Card>
        </div>
    )
}

export default Chat
