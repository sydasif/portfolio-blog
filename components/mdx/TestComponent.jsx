import React from 'react';

const TestComponent = ({ text }) => {
  return (
    <div style={{ padding: '10px', border: '1px solid blue', margin: '10px 0' }}>
      <h3>Test Component</h3>
      <p>{text}</p>
    </div>
  );
};

export default TestComponent;