
## Conditional Rendering in React ##

**Conditional Rendering** means **showing different UI based on a condition** (state, props, user action, API response, etc.).

In simple words:

*React decides what to render depending on a condition.*

React uses **JavaScript conditions**, not special syntax.

Example:-

## Step 1: Users Data (Array of Objects)

```jsx
const users = [
  {
name:"Rahul",
email:"rahul@gmail.com",
gender:"male",
color:"blue"
  },
  {
name:"Amit",
email:"amit@gmail.com",
gender:"male",
color:"green"
  },
  {
name:"Priya",
email:"priya@gmail.com",
gender:"female",
color:"pink"
  },
  {
name:"Neha",
email:"neha@gmail.com",
gender:"female",
color:"purple"
  }
];

```

---

## Step 2: Mens Changing Room Component

```jsx
functionMensChangingRoom() {
return<h2>Mens Changing Room</h2>;
}

```

---

## Step 3: Womens Changing Room Component

```jsx
functionWomensChangingRoom() {
return<h2>Womens Changing Room</h2>;
}

```

---

## Step 4: Conditional Rendering Using Ternary Operator

```jsx
functionApp() {
return (
<div>
      {
        users[0].gender === "male"
          ?<MensChangingRoom />
          :<WomensChangingRoom />
      }
</div>
  );
}

exportdefaultApp;

```

# Events in React (JSX Events)

In **React**, events are **props** that you pass to JSX elements.

You are basically saying:

> “Jab ye event ho, to ye function chala do.”
> 

React uses **Synthetic Events**, which work the same across all browsers.

## Basic Rule in React Events

- Event names are written in **camelCase**
- You pass a **function reference**, not function call

### Wrong way

```jsx
<button onClick={handleClick()}>

```

### Correct way

```jsx
<button onClick={handleClick}>

```

---

## 1. `onClick` Event

### Example:

```jsx
functionApp() {
functionhandleClick() {
console.log("clicked");
  }

return<buttononClick={handleClick}>Click Me</button>;
}

```

---

## 2. `onSubmit` Event (Form)

### Example:

```jsx
functionApp() {
functionhandleSubmit(e) {
    e.preventDefault();
console.log("submitted");
  }

return (
<formonSubmit={handleSubmit}>
<buttontype="submit">Submit</button>
</form>
  );
}

```

---

## 3. `onChange` Event

### Example:

```jsx
functionApp() {
functionhandleChange() {
console.log("value changed");
  }

return<inputonChange={handleChange} />;
}

```

---

## 4. `onInput` Event

```jsx
<input onInput={() =>console.log("typing")} />

```

- Har key press par trigger hota hai

---

## 5. `onMouseEnter`

```jsx
<div onMouseEnter={() =>console.log("mouse entered")}>
HoverMe
</div>

```

---

## 6. `onMouseLeave`

```jsx
<div onMouseLeave={() =>console.log("mouse left")}>
LeaveMe
</div>

```

---

## 7. `onFocus`

```jsx
<input onFocus={() =>console.log("focused")} />

```

---

## 8. `onBlur`

```jsx
<input onBlur={() =>console.log("blurred")} />

```

---

## 9. `onKeyDown`

```jsx
<input onKeyDown={() =>console.log("key pressed")} />

```

---

## 10. `onDoubleClick`

```jsx
<button onDoubleClick={() =>console.log("double clicked")}>
DoubleClick
</button>

```

---

## 11. `onScroll`

```jsx
<div
  style={{height:"100px",overflow:"scroll" }}
  onScroll={() =>console.log("scrolling")}
>
ScrollContent
</div>

```

---

## 12. Passing Arrow Function Directly

```jsx
<button onClick={() =>console.log("clicked")}>
Click
</button>

```
Displaying Day 72 Notes.md.