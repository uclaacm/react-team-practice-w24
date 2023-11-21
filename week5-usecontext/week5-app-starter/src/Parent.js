import logo from './logo.svg'
import './Parent.css'
import React, { useState } from 'react'

function Parent() {
  const [width, setWidth] = useState(300)

  function handleClickInc() {
    setWidth(width => width + 10)
  }

  function handleClickDec() {
    setWidth(width => width - 10)
  }

  return (
    <>
      <div className="container">
        <button onClick={handleClickInc}>+</button>
        <button onClick={handleClickDec}>-</button>
      </div>
      <div className="parent">
        <p>Parent</p>
        <Child1 url={logo} alt={"React logo"} width={width}/>
      </div>
    </>
  )
}

function Child1(props) {
  return (
    <div className="child">
      <p>Child1</p>
      <Child2 width={props.width}/>
    </div>
  )
}

function Child2(props) {
  return <div className="child">
      <p>Child2</p>
      <Child3 width={props.width}/>
    </div>
}

function Child3(props) {
  return <div className="child">
      <p>Child3</p>
      <Child4 width={props.width}/>
    </div>
}

function Child4(props) {
  return <div className="child">
      <p>Child4</p>
      <img className="logo" src={logo} alt={"React logo"} width={props.width}/>
    </div>
}

export default Parent;
