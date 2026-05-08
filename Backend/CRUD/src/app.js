// to create the server
const express = require("express");
const noteModel = require("./models/notes.models");

const app = express();

app.use(express.json());

/* POST */
app.post("/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "Note created successfully",
    note,
  });
});

module.exports = app;