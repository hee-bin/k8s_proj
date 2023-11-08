import React, { useState, useEffect } from 'react';

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

  const appStyle = {
    backgroundColor: 'black', // 검은 바탕
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // 화면 전체 높이에 가운데 정렬
    color: 'white', // 흰색 글자
    fontSize: '24px', // 원하는 글꼴 크기
  };

  return (
    <div style={appStyle}>
      <div>
        <h1>Messages 4.9.5</h1>
        {error ? ( // 에러 상태에 따라 에러 메시지 또는 데이터를 표시
          <div>Error: {error}</div>
        ) : (
          <ul>
            {data ? data.map((message, index) => (
              <li key={index}>{message.content}</li>
            )) : <li>Loading messages...</li>}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
