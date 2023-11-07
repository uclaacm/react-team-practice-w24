import logo from './logo.svg'
import './App.css'
import React, {useState} from 'react'
import ImageDisplay from './ImageDisplay'

function App() {
  const [size, setSize] = useState(300)
  function handleClickInc() {
    setSize(prevSize => prevSize + 10)
  }

  function handleClickDec() {
    setSize(prevSize => prevSize - 10)
  }

  return (
    <div className="App">
      <div>
        <button onClick={handleClickInc}>+</button>
        <button onClick={handleClickDec}>-</button>
      </div>
      <ImageDisplay url={logo} alt={"React logo"} width={size}/>
    </div>
  )
}

export default App;
