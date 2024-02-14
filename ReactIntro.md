# Hello World

This is a chance for you to start learning react.

Key concepts:

## JSX

Working in web development, programmers are always challenged by moving between languages, since the web is built on three distinct languages (HTML, CSS and JavaScript). 

Different developers have found different ways to deal with this complexity. For this project, we will use React, which solved the problem by extending the syntax of JavaScript (or TypeScript) to allow inserting HTML-like code directly into your JavaScript.

In react, you can simply write HTML* in the midst of your JavaScript.

So, for example, whereas normally we would write:

```js
let name = 'Tom'
let age = 17
```

Now we can write:
```jsx
let name = 'Tom'
let head = <h1>Heading</h1>
let age = 17;
```

[*]I write `HTML*` instead of `HTML` because actually, you can't write *pure* HTML in JSX: it's a special HTML-like syntax with some important differences.

There are a few special rules for HTML in React:

1. All tags must be closed in JSX, which means self-closing tags must be written with a trailing slash (this is XHTML syntax instead of HTML syntax). So tags like `<br>` and `<input>` need to be written as `<br/>` and `<input/>` in JSX or TSX.
2. You can use braces to insert JavaScript in the midst of an HTML tag in markup. So you can in effect "toggle" between markup and JavaScript by using {} in markup or using <> in JavaScript.
3. There are a number of reserved words in JavaScript that also exist in HTML. For each of these, we have to use a substitute word in JSX:
    1. `class=` in HTML becomes `className=` in JSX
    2. `for=` in HTML becomes `htmlFor=` in JSX
4. React handles inline styles as objects rather than strings.
  `style="background-color:blue" in HTML becomes `style=  {{backgroundColor:'blue'}} in JSX.
5. React prefers camelCase...
  1. onclick="somefunction" in HTML becomes `onClick={someFunction}` in JSX
  2. tabindex becomes tabIndex
  3. readonly becomes readOnly
4. Comments are written with JS comments in brackets
  {/* Comment here */}

Here are some more examples of JSX:

```jsx
let name = 'Tom'
let tomsHead = <h1>This Page Belongs to {name}</h1>
let tomsIntro = <div>{tomsHead}<nav><p>All about me</p></div>
```

In practice, developers often put parentheses around JSX for clarity and simplicty:
```jsx
let tomsIntro = (
  <div>
    {tomsHead}
    <p>All About Me</p>
  </div>
)
```

## Functions

Functions are a key way to bundle up reusable code. Functions can take *parameters* and can *return* a value (or values). 

There are multiple ways to define functions, but we will use *arrow functions* in this class, which look like this:

```typescript

const doSomething = (arg) => {
  // list of statements
  return // "return a value"
}
```

Let me give you a more valid function as an example:

```typescript
const factorial = (n) => {
  if (n == 1) {
    return n;
  } else {
    return n * factorial(n-1);
  }
}
```

When working in *typescript* we can add hints about what
type of arguments we are using and we return with the : operator, which would look like this:

```typescript
const factorial = (n : number) : number => {
  if (n==1) {
    return n;
  } else {
    return n * factorial(n-1);
  }
}
```

In arrow functions, we can *omit* the word "return" if the function just returns a single value. This is very handy for writing quick functions, like this:

```tsx

const double = (n) => n*2;
const increment = (n) => n+1;
const decrement = (n) => n-1;
const head = (text) => (<h1>{text}</h1>);

```

## Components

In React, a *Component* is just a function that return markup. By convention, components have capitalized names.

In markup in JSX, you can *insert* a component by treating it like a tag.

```tsx

const Heading = () => <h1>Hello World</h1>

const Header = () => (
  <header>
    <Heading/>
    <p>Some other content</p>
  </header>
);
```

## App Design

Most React Apps define a top level component App. This template file has an `index.tsx` which imports a top level App component from `App.tsx` and adds it to the webpage. In practice, all of your code will land in `App.tsx` eventually, which is the central starting point for your app. Whatever the `App` function in `App.tsx` returns is what will be rendered to the page.

## Reactivity

React has a "hook" called `useState` which will let us define *reactive* values in a component. useState uses a common pattern with a "getter" and a "setter." for a value. Whenever we *set* a value using this pattern, React will re-render all components that use that value, updating our webpage dynamically.

The generic structure for useState looks like this:
```
const [someReactiveVariable,setSomeReactiveVariable] = useState(initialValue)
```

Where:
* someReactiveVariable is a variable that will update reactively.
* setSomeReactiveVariable is a function that sets the value and triggers reactivity.
* initialValue is our initial value for our variable.

So, for example:

```tsx
import {useState} from 'react';
const Counter = () => {
  const [count, setCount] = useState(0);
  const incrementCount = () => setCount(count+1);
  return (
    <button onClick={incrementCount}>The count is {count}</button>  
  );
}

```

