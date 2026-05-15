# MERN Notes App - Complete Notes

# What is MERN Stack?

MERN stands for:

* MongoDB → Database
* Express.js → Backend framework
* React.js → Frontend library
* Node.js → JavaScript runtime

---

# Full MERN Flow

```txt
React Frontend
       ↓
Axios Request
       ↓
Express Backend API
       ↓
MongoDB Database
       ↓
Response Sent Back
       ↓
React State Updated
       ↓
UI Re-rendered
```

---

# React Concepts

# Component

A component is a reusable function that returns UI.

Example:

```js
function App() {
  return <h1>Hello</h1>
}
```

* `App` → component
* `return()` → UI

---

# useState

Used to store data.

```js
const [notes, setNotes] = useState([])
```

| Part     | Meaning         |
| -------- | --------------- |
| notes    | state variable  |
| setNotes | update function |
| []       | initial value   |

---

# useEffect

Used to run code when component loads.

```js
useEffect(()=>{
  fetchNote()
},[])
```

`[]` means:

```txt
Run only once
```

Mostly used for:

* API calls
* Fetching data
* Side effects

---

# Axios

Axios is used to send HTTP requests.

Install:

```bash
npm install axios
```

Import:

```js
import axios from 'axios'
```

---

# Axios Methods

| Method         | Purpose             |
| -------------- | ------------------- |
| axios.get()    | Fetch data          |
| axios.post()   | Create data         |
| axios.put()    | Update full data    |
| axios.patch()  | Update partial data |
| axios.delete() | Delete data         |

---

# Fetch Notes

```js
function fetchNote() {
  axios
    .get("http://localhost:3000/api/notes")
    .then((res) => {
      setNotes(res.data.notes)
    })
    .catch((err) => {
      console.log(err)
    })
}
```

# Flow

```txt
Frontend Request
      ↓
Backend API
      ↓
MongoDB Fetch
      ↓
Response
      ↓
State Update
      ↓
UI Update
```

---

# Form Handling

# handleSubmit

```js
function handleSubmit(e) {
  e.preventDefault()

  const { title, description } = e.target.elements

  axios.post("http://localhost:3000/api/notes", {
    title: title.value,
    description: description.value
  })
}
```

---

# e.preventDefault()

Stops page refresh.

Without this:

```txt
Form reloads page
```

---

# e.target

Represents form element.

---

# e.target.elements

Contains all form inputs.

Example:

```html
<input name="title" />
```

Access:

```js
e.target.elements.title
```

---

# .value

Gets user typed text.

```js
title.value
```

---

# React Controlled Inputs

```js
<input
  value={editTitle}
  onChange={(e)=>setEditTitle(e.target.value)}
/>
```

React state controls input value.

---

# Conditional Rendering

```js
editId === note._id ? (...) : (...)
```

If condition true:

* show edit UI

Else:

* show normal UI

---

# map()

Used to loop through array.

```js
notes.map((note)=>{})
```

---

# key in React

```js
key={note._id}
```

Used by React to identify elements uniquely.

---

# Backend Concepts

# Express

Import:

```js
const express = require("express")
```

Create app:

```js
const app = express()
```

---

# Middleware

Middleware runs before routes.

---

# express.json()

```js
app.use(express.json())
```

Converts incoming JSON into JavaScript object.

Without this:

```js
req.body === undefined
```

---

# CORS

```js
app.use(cors())
```

Allows frontend and backend communication.

---

# Static Files

```js
app.use(express.static("./public"))
```

Serves:

* CSS
* images
* frontend build files

---

# req and res

| Keyword | Meaning                   |
| ------- | ------------------------- |
| req     | request from frontend     |
| res     | response sent to frontend |

---

# req.body

Contains frontend data.

Example:

```js
{
  title:"Study",
  description:"Learn React"
}
```

---

# req.params

Gets dynamic route values.

Example:

```js
/api/notes/:id
```

Access:

```js
req.params.id
```

---

# CRUD APIs

# CREATE API

```js
app.post("/api/notes", async (req, res) => {

  const { title, description } = req.body

  const note = await noteModel.create({
    title,
    description
  })

  res.status(201).json({
    message: "note created successfully",
    note
  })
})
```

---

# READ API

```js
app.get("/api/notes", async (req, res) => {

  const notes = await noteModel.find()

  res.status(200).json({
    notes
  })
})
```

---

# DELETE API

```js
app.delete("/api/notes/:id", async (req, res) => {

  const id = req.params.id

  const note = await noteModel.findByIdAndDelete(id)

  res.status(200).json({
    note
  })
})
```

---

# PATCH API

Used for partial update.

```js
app.patch("/api/notes/:id", async (req, res) => {

  const { id } = req.params
  const { description } = req.body

  const note = await noteModel.findByIdAndUpdate(
    id,
    { description },
    { new:true }
  )

  res.json({
    note
  })
})
```

---

# PUT API

Used for full update.

```js
app.put("/api/notes/:id", async (req, res) => {

  const { id } = req.params

  const updatedNote = await noteModel.findByIdAndUpdate(
    id,
    req.body,
    { new:true }
  )

  res.json({
    updatedNote
  })
})
```

---

# PUT vs PATCH

| PUT                 | PATCH                 |
| ------------------- | --------------------- |
| Full update         | Partial update        |
| Replace full object | Update specific field |

---

# MongoDB Methods

| Method              | Purpose         |
| ------------------- | --------------- |
| create()            | Create document |
| find()              | Fetch documents |
| findByIdAndDelete() | Delete document |
| findByIdAndUpdate() | Update document |

---

# async and await

Used for asynchronous operations.

Example:

```js
const notes = await noteModel.find()
```

`await` waits for database response.

---

# HTTP Status Codes

| Code | Meaning              |
| ---- | -------------------- |
| 200  | Success              |
| 201  | Created Successfully |
| 404  | Route Not Found      |
| 500  | Server Error         |

---

# Wildcard Route

```js
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})
```

Used for:

* React deployment
* Catch unknown routes

---

# path.join()

Safely creates file path.

Example:

```js
path.join(__dirname, "public", "index.html")
```

---

# __dirname

Represents current folder path.

---

# Notes About React Re-render

Whenever state changes:

```js
setNotes(...)
```

React automatically updates UI.

This is called:

```txt
Re-rendering
```

---

# Important React Rules

# Hooks Rule

Hooks must stay inside component.

Correct:

```js
function App(){
  const [notes, setNotes] = useState([])
}
```

Wrong:

```js
const [notes, setNotes] = useState([])

function App(){}
```

---

# Common Errors

# 404 Error

Meaning:

```txt
Route not found
```

Fix:

* Check route path
* Check request method
* Restart backend

---

# req.body undefined

Fix:

```js
app.use(express.json())
```

---

# Infinite API Calls

Wrong:

```js
axios.get(...)
```

inside component directly.

Correct:

```js
useEffect(()=>{
  axios.get(...)
},[])
```

---

# Final CRUD Architecture

```txt
React Frontend
      ↓
Axios Request
      ↓
Express Route
      ↓
MongoDB Query
      ↓
Database Response
      ↓
res.json()
      ↓
Frontend Receives Data
      ↓
State Updates
      ↓
UI Re-renders
```

---

# Final Important Interview Questions

# What is React?

React is a JavaScript library used to build user interfaces.

---

# What is Express?

Express is a Node.js framework used for backend development.

---

# What is MongoDB?

MongoDB is a NoSQL database.

---

# What is Axios?

Axios is a library used for sending HTTP requests.

---

# What is CRUD?

| Operation | Meaning     |
| --------- | ----------- |
| Create    | Add data    |
| Read      | Fetch data  |
| Update    | Modify data |
| Delete    | Remove data |

---

# What is API?

API is a medium through which frontend and backend communicate.

---

# What is Middleware?

Middleware is a function that runs before route handlers.

---

# What is JSON?

JSON stands for:

```txt
JavaScript Object Notation
```

Used for data transfer.
