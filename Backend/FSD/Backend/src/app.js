const express = require("express");
const noteModel = require("./models/note.models");
const cors=require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("./public"));

/*
* -POST API to create a note and save in db
/api/notes
- req.body={title,description}
 */

app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;

 const note = await  noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "note created successfully",
    note
  });

});


/**
 *  -GET api/notes
 *  -fetch all notes from db and return in response
 */

app.get("/api/notes", async (req, res) => {
    const notes = await noteModel.find();

    res.status(200).json({
        message: "notes fetched successfully",
        notes
    });
});

/**
 * DELETE  api/notes/:id
 * - delete a note from db based on id and return deleted note in response
 */

app.delete("/api/notes/:id", async (req, res) => {
    // const {id}  = req.params;
    const id=req.params.id;
    const note = await noteModel.findByIdAndDelete(id);

    res.status(200).json({  
    message: "note deleted successfully",
    note
    });
});


/**
 * patch api/notes/:id
 * - update  a note discription  in db based on id and return updated note in response
 */

app.patch("/api/notes/:id", async (req, res) => {
    const {id} =req.params;
    const {description}=req.body;

const notes=await noteModel.findByIdAndUpdate(id, {description})

res.status(200).json({
    message:"note uppdated sucessfully",
    notes
})
});
/**
 * put api/notes/:id
 * - update  a note title and discription  in db based on id and return updated note in response
 */

app.put("/api/notes/:id", async (req, res) => {

  const { id } = req.params;

  const updatedNote = await noteModel.findByIdAndUpdate(
    id,
    req.body,
    { new: true }
  );

  res.status(200).json({
    message: "Note updated successfully",
    updatedNote
  });

});

app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public", "index.html"));
});


module.exports = app;
