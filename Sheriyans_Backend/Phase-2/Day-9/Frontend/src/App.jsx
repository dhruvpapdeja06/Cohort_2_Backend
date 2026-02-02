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
    fetchNotes();
  },[])


  function handleSubmit(){}

  // Post Api



  return (

  // For Post Api Implementation create a form
  <>
  <form className="note-create-form" onSubmit={handleSubmit}>
      <div className="note-form">
        <label htmlFor="title">Title :  </label>
          <input type="text" id="title" placeholder="Enter you title" />
      </div>

      <div className="note-form">
        <label htmlFor="description">Description :  </label>
        <input type="text" id="description" placeholder="Enter your description" />
      </div>
      <button>Submit</button>
    </form>

    <div className="notes">
      {notes.map((note) => {
        return (
          <div className="note">
            <h2>title: {note.title}</h2>
            <h3>descripiton: {note.description}</h3>
          </div>
        );
      })}
    </div>
  </>
  );
};

export default App;
