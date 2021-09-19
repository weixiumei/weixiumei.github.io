import React, { useState, useEffect } from 'react';
import './App.css';
import { Input, Button } from 'antd';
import { Router, Route, Link } from 'react-router'

function App() {
  const [name, setName] = useState('')
  useEffect(() => {
    console.log('name=', name)
  }, [name])
  const submit = () => {
    console.log('name=', name)
    if (name === '卢春红') {
      alert(`你是${name}啊`)
      window.location.href = 'birthday-master/index.html'
    }
  }
  return (
    <div className="App">
      <div className="main">
        <div>写下你是谁</div>
        <Input onChange={(e) => { setName(e.target.value) }} placeholder="输入你的大名" />
        <Button type="primary" onClick={submit}>确定</Button>
      </div>
    </div>
  );
}

export default App;
