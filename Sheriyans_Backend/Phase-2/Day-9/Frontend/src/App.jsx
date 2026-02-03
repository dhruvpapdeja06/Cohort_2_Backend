import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";

const App = () => {
  /**
  const [notes,setNotes] = useState([
    {
      "title" : "title 1",
      "descripiton" : "descritption 1"
    },
    {
      "title" : "title 2",
      "descripiton" : "descritption 2"
    },
    {
      "title" : "title 3",
      "descripiton" : "descritption 4"
    },
    {
      "title" : "title 4",
      "descripiton" : "descritption 4"
    }
  ])
   */

  // Creating a state variable

  const [notes, setNotes] = useState([]);

  // App function call again and again --> To solve this use useEffect

  function fetchNotes() {
    console.log("Fetch Function call");
    // Get api call
    axios.get("http://localhost:3000/api/notes").then((res) => {
      // When you change the state variable then it re-render the component.
      setNotes(res.data.note);
    });
  }

  useEffect(()=>{
    fetchNotes()
  },[])


  // Post Api Integrate
  function handleSubmit(e){
    e.preventDefault()

    const { title , description } = e.target.elements

    axios.post("http://localhost:3000/api/notes",{
      title : title.value,
      description : description.value
    })
    .then(res=>{
      console.log(res.data);
      fetchNotes();
    })
  }

  // Delete Api Intergration
  function handleDeleteNote(noteId){
    // console.log(noteId);
    axios.delete("http://localhost:3000/api/notes/"+noteId)
      .then(res=>{
        console.log(res.data);

        fetchNotes();
      })
  }

  // Patch Api Intergration
  function handleUpdateNote(e,noteId){
    e.preventDefault();

    const { description } = e.target.elements;

    axios.patch("http://localhost:3000/api/notes/"+noteId,{
      description : description.value
    })
    .then(res=>{
      console.log(res.data);
      fetchNotes();
    })
    .catch(err => console.log(err));
  }

  return (

  // For Post Api Implementation create a form
  <>
  <form className="note-create-form" onSubmit={handleSubmit}>
      <div className="note-form">
        <label htmlFor="title">Title :  </label>
          <input name="title" type="text" id="title" placeholder="Enter you title" />
      </div>

      <div className="note-form">
        <label htmlFor="description">Description :  </label>
        <input name="description" type="text" id="description" placeholder="Enter your description" />
      </div>
      <button>Create Note</button>
    </form>

    <div className="notes">
      {notes.map((note) => {
        return (
          <div className="note">
            <h2>{note.title}</h2>
            <h3>{note.description}</h3>
            <button onClick={()=>{handleDeleteNote(note._id)}}>Delete Note</button>
            <button onClick={()=>{handleUpdateNote(note._id)}}>Update </button>
          </div>
        );
      })}
    </div>
  </>
  );
};

export default App;
