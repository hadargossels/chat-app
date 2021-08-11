import { React, useState } from 'react';
import './App.css';
import {v4 as uuidV4} from 'uuid'
import useLocalStorage from './components/hooks/useLocalStorage';
import Chat from './components/chat/Chat';
import {Card} from 'react-bootstrap'

function App() {
  const [id, setId] = useLocalStorage('id')
  const [display, setDisplay] = useState('none')

  function createNewId () {
    if (id === undefined) {
      setId(uuidV4())
    }
    toggleChat()
  }

  function toggleChat () {
    if (display === 'none') {
      setDisplay('block')
    }
    else setDisplay('none')    
  }

  return (
    <div className="App">

      <div className="dropdown">
        <button className="start-chat" onClick={() => {createNewId()}}><i className="far fa-comment-dots"></i></button>
        <div className="dropdown-content" style={{display: display}}>
        <Card.Title className="p-3 text-center d-flex justify-content-center m-0" style={{color: "white", backgroundColor:"rgb(3, 37, 3)"}}>
                    Support Chat
                </Card.Title>
          <Chat id={id} chosen={id}/>
        </div>
      </div>

    </div>
  );
}

export default App;
