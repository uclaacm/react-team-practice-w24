# Week 5: Context API

Welcome! Today we will learn about the Context API, a way to share state across many components at once!

## Motivation

So far, the only way that we have to pass information between components in React is via props. As a reminder, props allow us to bundle a set of values in a parent component into a `props` object, and then access those values as object fields in the child component.

Unfortunately, props only allow us to pass information from a parent component to its direct children. This limitation presents an issue in the case of deeply nested component chains. Consider the scenario shown in the diagram below:

![long prop chain](images/prop-chain.png)

Imagine if `Parent` to `Child4` both accessed the same state variable. To accomplish this, we would declare the state in `Parent` and then pass it as a prop to `Child1`, `Child2`, `Child2`, and finally `Child4`. Even if the intermediary components do not use this prop at all, they would still need to receive the prop in order to forward it to the next component. 

Here is the corresponding code for this structure, with the props containing the width of the React logo in `child4`. Note the repeated passing of the same `width` prop through each child component. The complete code can be found in the `week5-app-starter` folder.

```JavaScript
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
```

Passing props this way is both tedious and error-prone; is there a better solution? Fortunately, The Context API addresses this very problem!

## Context API

The Context API allows React to share state globally. Note that a context does not manage the state variable itself; we will still rely on `useState` for that purpose. The Context API simply makes this state variable available to child components without requiring the component to receive the value as a prop.

### createContext

To create a context, we must declare the `createContext` function outside any component. Since context shares values across multiple components, it should not be associated with a single component.

```JavaScript
const widthContext = createContext(300)
```

`createContext` takes a single argument to set a default value for the context, which in this case represents a width of 300 pixels. If this argument is omitted, this value is `undefined`.

The function returns an object with two values: a `Provider`, which a parent can use to make the context available to children, and a `Consumer`, which a child can use to access the context from the parent. What makes context different from props is that any descendent of the parent component can access the `Consumer`, not just the direct children.

Although we will not do that here, we could also use object destructuring on the returned object:

```JavaScript
const { Provider, Consumer } = createContext(300)
```

### Provider

We can use the `Provider` in the parent function as follows:

```JavaScript
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
```

The `value` field in the `Provider` wrapper indicates the value made available to the child component, which is the `width` state variable here. Again, omitting this `value` field will result in a value of `undefined`. Note that nesting multiple `Provider` wrappers inside each other will cause the value of the inner wrapper to override the value of the outer one.


### Consumer

Now to access the value in the `Provider`, we must use the `Consumer` wrapper in any child components that need to use the value. In this case, only `Child4` needs the `width` variable, so we will only add the `Consumer` there:

```JavaScript
function Child4() {
  return (
      <widthContext.Consumer>
        {width => 
          <div className="child">
            <p>Child4</p>
            <img className="logo" src={logo} alt={"React logo"} width={width}/>
          </div>
        }
      </widthContext.Consumer>
    )
}
```

To determine the value of the `Consumer` wrapper, React will traverse up the component hierarchy to find the value of the closest context `Provider`. This value is then available as the argument to an arrow function, which in turn returns the elements of the component. 

It is here that the advantage of `useContext` becomes apparent. We only need to add the `Consumer` wrapper to the components that use the state variable, and can leave the intermediary components (`Child1`, `Child2`, and `Child2`) unmodified. 

This separation applies for re-rendering as well: **when the context value changes in the parent component, only child components with a** `Consumer` **wrapper will go through the re-render process**. This is an exception to the typical behavior of a parent component re-rendering all of its child components when its state or props change.

### useContext

There is an alternate syntax for consuming a context: using the `useContext` hook.

```JavaScript
const width = useContext(widthContext)
```

The hook takes a single argument representing the context to consume. Its behavior will be identical to the `Consumer` (i.e. it will traverse up the component hierarchy to find the closest `Provider`), but its syntax is shorter and more analogous to that of other React hooks. Using this implementation, the full `Child4` component will look as follows:

```JavaScript
function Child4() {
  const width = useContext(widthContext)
  return (
      <div className="child">
        <p>Child4</p>
        <img className="logo" src={logo} alt={"React logo"} width={width}/>
      </div>
    )
}
```

## Recap

The Context API allows us to share values globally across a component without needing to resort to long prop chains through intermediary components. We first create a context using `createContext`, then make a context value available to child components using a `Provider` wrapper. Finally, in child components, we consume the context using either a `Consumer` wrapper or the `useContext` hook.

That's it for this week and all the content for the track! We will spend the rest of the quarter working through a sample project where we put everything we have learned together!

## Additional Resources
[Overview of Contest API](https://reactjs.org/docs/context.html)
[useContext Docs](https://beta.reactjs.org/reference/react/useContext)





