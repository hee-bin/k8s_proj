import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null); // 에러 상태 추가

  useEffect(() => {
    fetch('http://was-service/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data'); // 에러 발생
        }
        return response.json();
      })
      .then(data => setMessages(data))
      .catch(err => {
        setError(err.message); // 에러 상태 업데이트
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Messages2</h1>
        {error ? ( // 에러가 발생한 경우 에러 메시지를 표시
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
