import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://10.96.95.146:3000/', { // <WEB_SERVER_IP_OR_DOMAIN>을 웹 서버의 IP나 도메인으로 교체
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => setMessages(data))
    .catch(err => {
      setError(err.message);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Messages</h1>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <ul>
            {messages.map(message => (
              <li key={message.id}>{message.content}</li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default App;
