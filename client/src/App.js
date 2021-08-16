import React, { useState } from 'react';
import './App.css';
import Header from './components/myApp/Header';
import Body from './components/myApp/Body';



function App() {
  const [reload, setReload] = useState(true);
  return (

    <div className="App">
      <Header reload={reload} setReload={() => setReload(!reload)}/>

      <Body reload={reload} setReload={() => setReload(!reload)}/>
    </div>
  )
}

export default App;


