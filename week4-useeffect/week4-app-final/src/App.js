import logo from './logo.svg'
import './App.css'
import React, {useState, useEffect} from 'react'
import ImageDisplay from './ImageDisplay'

function App() {
  const [size, setSize] = useState(300)
  const [auto, setAuto] = useState(false)

  useEffect(() => {
    let interval = null;
    if (auto)
      interval = setInterval(() => {
        setSize(prevSize => (prevSize % 500 + 100))
      }, 1000)
    return () => clearInterval(interval)
  }, [auto])

  function handleClickInc() {
    if (!auto)
      setSize(prevSize => prevSize + 10)
  }

  function handleClickDec() {
    if (!auto)
      setSize(prevSize => prevSize - 10)
  }

  function handleClickAuto() {
    setAuto(auto => !auto)
  }

  return (
    <div className="App">
      <div>
        <button onClick={handleClickInc}>+</button>
        <button onClick={handleClickDec}>-</button>
        <button onClick={handleClickAuto}>{auto ? "Pause" : "Play"}</button>
      </div>
      <ImageDisplay url={logo} alt={"React logo"} width={size}/>
    </div>
  )
}

export default App;
