// to create the server, we need to import the express module and create an instance of it. We also need to define a port for the server to listen on.
// to config the server, we need to use the express.json() middleware to parse incoming JSON requests. We also need to define a route for the root URL ("/") that sends a welcome message as a response.

const express = require("express");

const app = express(); /* server instance */
app.use(express.json()); /* middleware to parse incoming JSON requests */
const notes=[
    // {
    //    "title":"Note 1",
    //    "content":"This is the content of note 1"
    //  },
    //  {
    //    "title":"Note 2",
    //    "content":"This is the content of note 2"
    // }
] 

app.get("/", (req, res) => {
  res.send("Welcome to the Notes API!");
});


/* post /notes */
app.post("/notes",(req,res)=>{
    console.log(req.body)
    notes.push(req.body);
    console.log(notes)

    res.send("Note created successfully")
})

/* GET/notes */

app.get("/notes",(req,res)=>{
    res.send(notes);
})

/* DELETE /notes */
/*prams*/
// delete/notes/index(0 )
app.delete("/notes/:index",(req,res)=>{
 console.log(req.params.index)
 delete notes[req.params.index]
 res.send("Note deleted successfully")
})

/*PATCH */
/*patch/notes/:index */
/*req.body={description:-"feel freely modify the data buddy 🍾" } */

app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].description=req.body.description;
    res.send("Note updated successfully")
})

/*PUT */
/*put/notes/:index */

app.put("/notes/:index",(req,res)=>{
    notes[req.params.index]=req.body;
    res.send("Note updated successfully")
})


module.exports = app;