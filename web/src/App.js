import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null); // 에러 상태 추가

  useEffect(() => {
    // CORS 설정을 포함한 fetch 요청
    fetch('http://10.96.95.146:3000/', {
      method: 'GET',
      mode: 'cors', // CORS 요청 설정
      headers: {
        'Content-Type': 'application/json',
        // 필요한 다른 헤더 추가
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
        setError(err.message); // 에러 상태 업데이트
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Messages4.5</h1>
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
