import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Ingress의 호스트 이름을 사용하여 요청을 보냅니다.
    // 예를 들어, Ingress가 `www.example.com`에 설정되어 있다면:
    const apiUrl = 'http://125.6.36.221//api';

    fetch(apiUrl, {
      method: 'GET',
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
