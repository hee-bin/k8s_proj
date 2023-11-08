import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null); // 에러 상태 추가

  useEffect(() => {
    fetch('http://10.96.95.146:3000/api')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setError(null); // 성공 시 에러 상태를 초기화
      })
      .catch(error => {
        setError(error.message); // 실패 시 에러 상태 설정
        console.error('Fetch error:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1 className="App-header">Messages 4.9.4</h1>
      {error ? ( // 에러 상태에 따라 에러 메시지 또는 데이터를 표시
        <div>Error: {error}</div>
      ) : (
        <ul className="App-list">
          {data ? data.map((message, index) => (
            <li key={index}>{message.content}</li>
          )) : <li>Loading messages...</li>}
        </ul>
      )}
    </div>
  );
}

export default App;
