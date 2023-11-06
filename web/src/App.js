import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch('http://was-service/messages')
      .then(response => response.json())
      .then(data => setMessages(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Messages</h1>
        <ul>
          {messages.map(message => (
            <li key={message.id}>{message.content}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;


