import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // API 요청을 보내고 응답을 상태에 저장합니다.
    const fetchData = async () => {
      try {
        const response = await axios.get('http://10.98.165.174:3000/getData');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시 한 번만 실행되도록 합니다.

  return (
    <div>
      <h1>Messages</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.content}</li> // 'content'는 데이터베이스의 필드에 따라 달라질 수 있습니다.
        ))}
      </ul>
    </div>
  );
}

export default App;
