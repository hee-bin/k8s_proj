import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);

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
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }, []);

  return (
    <div>
      <h1>Messages 4.9.2</h1>
      <ul>
        {data ? data.map((message, index) => (
          <li key={index}>{message.content}</li> // 'content'는 데이터베이스의 필드에 따라 달라질 수 있습니다.
        )) : <li>Loading messages...</li>}
      </ul>
    </div> // 여기에 닫는 div 태그를 추가했습니다.
  );
}

export default App;
