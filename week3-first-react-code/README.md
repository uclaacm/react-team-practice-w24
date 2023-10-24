# Week 3: First React Code

Welcome! Today we will finally begin taking a closer look at React! But first a little bit of Git!

## Basic Git

```
git checkout main
git pull origin main
git checkout [WORKING BRANCH]
git pull origin main
```

Clone the repo
```
git clone https://github.com/uclaacm/(repo name)
```
Create new local branch and checkout (switch) to it
```
git checkout -b new_branch_name
```
Delete local branch
```
git branch -D branch_name
```
Delete remote branch
```
git push origin –delete branch_name
```
Commit and push single file
```
git add file_name
git commit -m “Commit message”
git push origin —-set-upstream branch_name
```
Commit and push all changes
```
git add *
git commit -m “Commit message” -m “description”
git push origin –-set-upstream branch_name
```
git Commit and push to main (FOR DEPENDENCIES/FINISHED COMPONENT)
```
git checkout main
git add file_name
git commit -m “Commit message”
git push origin –-set-upstream main
```
Merge, commit, push to main
```
git checkout main
git merge branch_name –squash
git commit
git push origin –-set-upstream main
```

Okay moving on :)

## Page Updating in React

Before we dive into React, let's take a moment to understand the most important feature of React: the fact that **React will only update what needs to be updated on the page**, rather than re-evaluate the entire page. This characteristic is built-in to React to avoid a lot of unnecessary computation. Let's take a closer look at how this works.

### DOM

The DOM (Document Object Model) is a tree representation of the HTML elements that form the structure of a webpage. Below is an example of an HTML document with its corresponding DOM tree:

![HTML document with corresponding DOM tree](./images/html-dom-tree.png)

Now updating this DOM is an incredibly expensive operation, since changing the DOM corresponds with updating what is actually displayed on the webpage as well. React avoids this inefficiency by updating the real DOM as rarely as possible. How does it accomplish this?

### Virtual DOM
Instead of always directly updating the real DOM, React instead primary works with the virtual DOM, which is a lightweight copy of the DOM. The virtual DOM does not directly manipulate the content of the webpage, which makes updating it much cheaper than updating the real DOM. 

When updating the virtual DOM, React will also maintain a copy of the previous virtual DOM to serve as a point of comparison. The pre- and post-update virtual DOMs will be compared to determine differences. Only these differences will then be updated on the real DOM. Below is a diagram better illustrating this process:

![update, diff, and display in virtual and real DOM](images/update-diff-display.png)

## Props and State

Now what exactly triggers a component re-render in React? The answer is a change in its props and state, or a re-rendering of its parent component.

### Props
Recall from week 1 that each React component corresponds with a function. Props are the arguments to these functions, and can be used to pass information between different components, and dynamically control a child component from its parent.

Let's take a look at a concrete example. Inside the `src` directory of the React application that we created back in Week 1, create a new file called `ImageDisplay.js`. Add the following code inside this file:

```JavaScript
// ImageDisplay.js
import React from 'react'

function ImageDisplay(props) {
    return (
        <img src={props.url} alt={props.alt} width={props.width} />
    )
}

export default ImageDisplay
```

We define a component called `ImageDisplay` which corresponds with a function. This function takes a single argument: `props`. This argument represents an object containing all the information (variables and functions) passed to the component by its parent. We access the `url`, `alt`, and `width` fields to define the image to display on the screen.

Note that these fields can be accessed using object destructuring as well:
```JavaScript
// ImageDisplay.js
import React from 'react'

function ImageDisplay({...props}) {
    return (
        <img src={url} alt={alt} width={width} />
    )
}

export default ImageDisplay
```


Now, we must configure the parent component to actually provide these arguments. Navigate to the `App.js` file in the `src` folder, which will serve as the parent component. Replace the existing code with the following:

```JavaScript
// App.js
import logo from './logo.svg'
import './App.css'
import React from 'react'
import ImageDisplay from './ImageDisplay'

function App() {
  return (
    <div className="App">
      <ImageDisplay url={logo} alt={"React logo"} width={300}/>
    </div>
  )
}

export default App
```

Note that the arguments are defined individually for the `ImageDisplay` child component. React will automatically pack these arguments into a `props` object inside the child component.

Running the app should display the following:

[on screen React logo](images/on-screen-react-logo.png)

We can now dynamically control the properties of the image displayed in the `ImageDisplay` component from the `App` component. Try changing the prop values yourself!

### State

It's very easy for us to change the image properties within the code itself, but what if we wanted to let users modify these properties? Say we wanted to add buttons to let the user dynamically scale the image. We try the following implementation, with a local variable `size`:

```JavaScript
// App.js

// ##### doesn't work!! #####
function App() {
  let size = 300

  function handleClickInc() {
    size += 10
  }

  function handleClickDec() {
    size -= 10
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
```

Unfortunately, you'll quickly discover that clicking the buttons does nothing. Remember the conditions under which a React component will re-render: there must be a change in its props or state, or a re-render of its parent component. Since changing a local variable meets none of these three criteria, the component will not re-render!

In order to make these buttons behave as expected, we must take advantage of state. State refers to variables that persist in a component between re-renders.

To use state, we must import the aptly named `useState` hook. Hooks are simply special functions that allow us to access various React features. Add the import in `App.js` as follows:

```JavaScript
import React, {useState} from 'react'
```

We can now declare a state variable to represent the image size within the `App` component, and pass this variable as a prop to the `ImageDisplay` component:

```JavaScript
const [size, setSize] = useState(300)
```

The `useState` function returns an array of exactly two elements: the state variable (`size`) and a function for updating this variable (`setSize`). Note the use of array destructuring to immediately declare these variables. The function itself takes a single argument: the initial value of the state variable. In our case, `size` will have an initial value of 300.

Pay special attention to the `setSize` function. It is important that we use this function to update the `size` variable, with the new desired value as an argument. **Do not directly assign a new value to `size`.** Remember that reassigning the value of a local variable does not trigger a re-render.

Now let's modify the bodies of the `handleClickInc` and `handleClickDec` functions to use the `setSize` function:

```Javascript
function handleClickInc() {
    setSize(prevSize => prevSize + 10)
}

function handleClickDec() {
    setSize(prevSize => prevSize - 10)
}
```

Note the use of an arrow function as an argument instead of simply passing `size + 10`. This is necessary since the new value of `size` depends on the previous value, as multiple increments in quick succession could lead to a data race in which a later increment reads an old value of `size` before an earlier increment has written the new, correct value. Don't worry too much if you are unfamiliar with this concept; you will learn all about it in CS33. Just know that React allows us to avoid this problem using the arrow function syntax because it will guarantee us the latest value of `size`, which we access here as `prevSize`.

Now our code will work as expected, as we can dynamically adjust the size of the logo using the buttons.

## Summary

Today we learned about how React efficiently updates pages, as well as how to use the fundamental features of props and state. Be sure to check out the resources below for more information. Next week, we will learn about another powerful React hook: `useEffect`!

## Additional Resources

[Props](https://beta.reactjs.org/learn/passing-props-to-a-component)
[State](https://beta.reactjs.org/learn/state-a-components-memory)
[Data Races](https://www.mathworks.com/products/polyspace/static-analysis-notes/what-data-races-how-avoid-during-software-development.html)
[Re-rendering in React](https://felixgerschau.com/react-rerender-components/)




