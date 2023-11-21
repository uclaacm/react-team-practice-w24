import logo from './logo.svg'
import './Parent.css'
import React, { useState, createContext, useContext } from 'react'

const widthContext = createContext(300)

function Parent() {
  const [width, setWidth] = useState(300)

  function handleClickInc() {
    setWidth(width => width + 10)
  }

  function handleClickDec() {
    setWidth(width => width - 10)
  }

  return (
    <widthContext.Provider value={width}>
      <div className="container">
        <button onClick={handleClickInc}>+</button>
        <button onClick={handleClickDec}>-</button>
      </div>
      <div className="parent">
        <p>Parent</p>
        <Child1/>
      </div>
    </widthContext.Provider>
  )
}

function Child1() {
  return (
    <div className="child">
      <p>Child1</p>
      <Child2/>
    </div>
  )
}

function Child2() {
  return <div className="child">
      <p>Child2</p>
      <Child3/>
    </div>
}

function Child3() {
  return <div className="child">
      <p>Child3</p>
      <Child4/>
    </div>
}

function Child4() {
  const width = useContext(widthContext)
  return (
      <div className="child">
        <p>Child4</p>
        <img className="logo" src={logo} alt={"React logo"} width={width}/>
      </div>
    )
}

export default Parent;
