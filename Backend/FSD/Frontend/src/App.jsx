import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  // Notes state
  const [notes, setNotes] = useState([]);

  // Edit states
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  function fetchNote() {
    axios
      .get("https://software-engineering-journey.onrender.com/api/notes")
      .then((res) => {
        setNotes(res.data.notes);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchNote();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const { title, description } = e.target.elements;

    axios.post("https://software-engineering-journey.onrender.com/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then(() => {
        fetchNote();

        // Clear form
        title.value = "";
        description.value = "";
      });
  }

  function handleDelete(noteId) {
    axios.delete(`https://software-engineering-journey.onrender.com/api/notes/${noteId}`).then(() => {
      fetchNote();
    });
  }

  function handleUpdate(noteId) {
    axios
      .put(`http://localhost:3000/api/notes/${noteId}`, {
        title: editTitle,
        description: editDescription,
      })
      .then(() => {
        fetchNote();

        setEditId(null);
        setEditTitle("");
        setEditDescription("");
      });
  }

  return (
    <>
      <form className="note-create-form" onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Note Title" />

        <textarea name="description" placeholder="Note Description"></textarea>

        <button type="submit">Create Note</button>
      </form>

      <div className="notes">
        {notes.map((note) => {
          return (
            <div className="note" key={note._id}>
              {editId === note._id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />

                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  ></textarea>

                  <button onClick={() => handleUpdate(note._id)}>Save</button>
                </>
              ) : (
                <>
                  <h1>{note.title}</h1>
                  <p>{note.description}</p>
                </>
              )}

              <button onClick={() => handleDelete(note._id)}>Delete</button>

              <button
                onClick={() => {
                  setEditId(note._id);
                  setEditTitle(note.title);
                  setEditDescription(note.description);
                }}
              >
                Edit
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
