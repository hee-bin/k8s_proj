import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null); // 에러 상태 추가

  useEffect(() => {
    fetch('http://10.96.95.146/')
      .then(response => {
        if (!response.ok) {
          const errorMessage = `Failed to fetch data: ${response.status} - ${response.statusText}`;
          throw new Error(errorMessage); // 에러 발생
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
        <h1>Messages4.4</h1>
        {error ? (
          <p>Error: {error}</p> // 에러가 발생한 경우 에러 메시지 표시
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
