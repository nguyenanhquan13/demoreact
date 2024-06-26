import React, { useState } from 'react';

const containerStyle = {
  padding: '32px',
  textAlign: 'center',
  backgroundColor: '#f7f9fc',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  maxWidth: '400px',
  margin: '0 auto',
  fontFamily: 'Arial, sans-serif'
};

const titleStyle = {
  fontSize: '24px',
  color: '#333',
  marginBottom: '16px'
};

const buttonStyle = {
  padding: '12px 24px',
  fontSize: '16px',
  color: 'white',
  backgroundColor: '#007bff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease'
};

const buttonHoverStyle = {
  backgroundColor: '#0056b3'
};

function App() {
  const [gift, setGift] = useState(null);

  const gifts = ['Xe hơi', 'Du lịch', 'Laptop', 'Điện thoại', 'Voucher'];

  const randomGift = () => {
    const randomIndex = Math.floor(Math.random() * gifts.length);
    setGift(gifts[randomIndex]);
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>{gift || 'Chưa có phần thưởng'}</h1>
      <button
        style={{ ...buttonStyle, ...(buttonStyle[':hover'] ? buttonHoverStyle : {}) }}
        onClick={randomGift}
      >
        Lấy thưởng
      </button>
    </div>
  );
}

export default App;
