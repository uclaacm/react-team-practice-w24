# Week 2: JavaScript Overview

- [Week 2: JavaScript Overview](#week-2-javascript-overview)
  - [Introduction](#introduction)
  - [ES6](#es6)
    - [let and const](#let-and-const)
    - [Arrow Functions](#arrow-functions)
    - [Array Methods](#array-methods)
    - [Destructuring](#destructuring)
    - [Spread Operator](#spread-operator)
    - [Modules](#modules)
      - [Export](#export)
      - [Import](#import)
  - [Additional Resources](#additional-resources)

Welcome! Today we will learn about JavaScript!

## Introduction
JavaScript is a programming language that serves as one of the key technologies behind the web, along with HTML and CSS. 

The three technologies synergize similarly to nouns, adjectives, and verbs in speech. HTML is analogous to a noun (outlining what will appear on the page) and CSS is analogous to an adjective (describing the styling of the page), JavaScript is analogous to a verb, allowing a page to dynamically respond to a user's actions.

As mentioned last week, Node.js is a runtime environment for JavaScript within which we can execute JavaScript code, while React is a JavaScript framework that we can use to develop web application.

## ES6
ES6 (ECMAScript 6 or ECMAScript 2015) was the result of the most recent major revision to the JavaScript language, which occurred in 2015. Before learning React, we will quickly overview the major features of ES6.

### let and const
ES6 introduced two new keywords for defining variables: `let` and `const`. We discourage using the previous keyword for declaring variables: `var`. Variables declared with `let` can be reassigned after definition, while variables declared with `const` cannot. 

```JavaScript
let x = 10
x = 5 // legal

const y = 10
y = 5 // TypeError
```

Unlike `var`, both `let` and `const` declare variables with block scope, meaning a variable's value will be accessible within the current block that it is declared in.

```JavaScript
let x = 1 // here x is 1

{
    let x = 2 // here x is 2
}

 // here x is 1 again
```

### Arrow Functions
Arrow functions are an alternative syntax for declaring functions. The first benefit of arrow functions is that their syntax can be significantly shorter. Contrast the following declarations:

```JavaScript
// regular function
function helloWorld () {
    return "Hello World"
}

// arrow function
timesTwoArrow = () => "Hello World"
```

For functions with a single statement, the arrow function syntax allows us to omit both the brackets and the `return` keyword.

Parameters to arrow functions go inside the parentheses. For functions with a single parameter, the parentheses can be omitted as well.

```JavaScript
// regular function
function timesTwo (x) {
    return x * 2
}

// arrow function
timesTwoArrow = x => x * 2
```

Another notable difference of arrow functions is the behavior of the `this` keyword, used to refer to a specific object that depends on how the function is called.

In regular functions, the `this` keyword also function always binds to the context where the function was called, Conversely, in arrow functions, the `this` keyword is bound lexically, meaning that its `this` keyword depends on the scope in which the function is declared. Each behavior is desirable in different situations:

```JavaScript
const student1 = {
    gpa: 3.1,
    get_gpa: function () {
        console.log(this.gpa)
    }
}

const student2 = {
    gpa: 3.1,
    get_gpa: () => {
        console.log(this.gpa)
    }
}

student1.get_gpa()
student2.get_gpa()
```

For the above code block, the output will be
```
3.1
undefined
```

The `get_gpa` function is a regular function called by the `student1` object, so its `this` keyword binds to the `student1` object. However, as an arrow function in the `student2` object, the `get_gpa` function gets its `this` keyword from the closest surrounding scope with a `this` keyword defined, which is the global scope (returning either the `global` object in Node.js or the `window` object on the browser). The `global` or `window` objects are missing the `gpa` attribute, the function call returns `undefined`.

Now consider the following two objects, in which a `setTimeout` call is nested inside the `get_gpa` function to delay returning the `gpa` field by 1 second:

```JavaScript
const student1 = {
    gpa: 3.1,
    get_gpa: function () {
        setTimeout(function () {
            console.log(this.gpa)
            }, 1000)
    }
}

const student2 = {
    gpa: 3.1,
    get_gpa: function () {
        setTimeout(() =>
            console.log(this.gpa),
            1000)
    }
}

student1.get_gpa()
student2.get_gpa()
```

Now, the output will be
```
3.1
undefined
```

In this case, for the `student1` object, the closest surrounding scope for which `get_gpa` function is defined is the scope of the `get_gpa` function, making its `this` keyword refer to the `student1` object. For the `student2` object, the GPA printing function is called by the `setTiemout` function, so its `this` keyword points to a `timeout` object. This object is missing a `gpa` attribute, so the function call returns undefined.

From the two examples above, here is general advice about when to use arrow functions or regular functions. **Generally, use regular functions when defining top-level methods for an object or class, and use arrow functions when nested inside other functions.** In situations when the `this` keyword is not relevant, the two syntaxes can generally be used interchangably.

### Array Methods
`map`, `filter`, and `reduce` are three useful methods for operating on arrays.

`map` allows you to execute a function on each item of an array, and returns a new array containing the outputs:

```JavaScript
const nums = [1,2,3]

const numsSqaured = nums.map(num => num ** 2) // returns [1,4,9]
```

`filter` allows you to select elements from an array that return `true` to a boolean filter function. Here is an example of only filtering the even numbers of an array:

```JavaScript
const nums = [1,2,3,4,5]

const numsEven = nums.filter(num => num % 2 === 0) // returns [2,4]
```

`reduce` runs a reducer function on each element of the array in order, passing the current result at each step to the next element. The user can pass in an initial value for the result before the first element is processed, without the value at index 0 will be used as the initial value. The most intuitive use case for this function is for summing all the elements of an array:

```JavaScript
const nums = [1, 2, 3, 4, 5];

const numsSum = nums.reduce(
  (acc, num) => acc + num,
  0
); // return 1+2+3+4+5, or 15
```

### Destructuring
Destructuring can be used to quickly initialize several variables based on an array or object.

Let's consider array destructuring first:

```JavaScript
const foods = ["apple", "broccoli", "chicken"]

const [fruit, veggie, meat] = foods
```

The code above assigns `"apple"` to `fruit`, `"broccoli"` to `veggie`, and `"chicken"` to `meat`. Note that the assignment order is determined by the order of the variables.

If you do not need one of the values from the array, simple omit a variable declaration in the corresponding position:

```JavaScript
const foods = ["apple", "broccoli", "chicken"]

const [fruit,, meat] = foods
```

Now only the `fruit` and `meat` variables will be initialized.

Object destructuring works in much the same way, but is instead based on attribute names instead of variable order.

```JavaScript
const student = {
    name: 'Tom',
    age: 20,
    gpa: 3.5
}

const {name, gpa, age} = student
```

The code above assigns `"Tom"` to `name`, `20` to `age`, and `3.5` to `gpa`. Note that the assignment order no longer has to match the attribute order within the object. As long as the attributes exist within the object, they will be assigned correctly.

### Spread Operator
The spread operator allows us to quickly assign or copy parts of an array or object to another array or object.

Below, the `numsCombined` array is combined by extracting the elements from `nums1` and `nums2` with the spread operator:

```JavaScript
const nums1 = [1,2,3]
const nums2 = [4,5,6]

const numsCombined = [...nums1, ...nums2] // [1,2,3,4,5,6]
```

The spread operator can also be used with destructuring:

```JavaScript
const nums = [1,2,3,4,5]

const [a,b,...c] = nums
```
Here, `a` is assigned `1`, `b` is assigned `2`, and `c` is assigned to an array containing the rest of the numbers in `nums`, or `[3,4,5]`.

The spread operator works analogously with objects:

```Javascript
const student = {
    name: 'Tom',
    age: 20,
    major: 'Global Health',
    gpa: 3.5,
    hometown: 'Seattle'
}

const {name, gpa, ...rest} = student
```

Here, `name` is assigned `Tom`, `age` is assigned `20`, and `rest` is assigned to an object consisting of the rest of attributes in `student`.

### Modules
Modules make your code easier to maintain by allowing you to break your code into separate files. In React, this will allow us to place each component in a separate file. Modules rely on two keywords: `export` and `import`. For this section, assume a directory with two files in it: `student.js` and `teacher.js`.

#### Export
Exports allow you to provide access to variables or functions from this module to another one. Exports are either named or default, and `export` statements can either be declared individually or all at once at the bottom of the file. Here is the code for named exports `student.js` in both cases:

Individually:

```JavaScript
export const gpa = 3.5
export const age = 20
```

All at once:
```JavaScript
const gpa = 3.5
const age = 20
export {gpa, age}
```

Default exports are specified as follows, of which there can only be one per file:

```JavaScript
export default const name = 20
```

We will discuss the significance of the default export when examining the `import` statement.

#### Import
Imports allow you to access variables or functions from another file. Imports of named exports are destructured with curly braces, while imports of default exports are not.

Let's take a look at using both types of imports from `student.js` in `teacher.js`:

Named:
```JavaScript
import {gpa, age} from "./student.js"
```

Default
```JavaScript
import name from "./student.js"
```

That's it for this week. Be sure to check out the resources linked below for more information on JavaScript!

## Additional Resources
[Arrow Functions Deep Dive](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

[General JavaScript Introduction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)




