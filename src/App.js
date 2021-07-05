import './App.css';
import React, { useState, useEffect } from "react";
import Axios from 'axios';


function App() {

  const[nameТask, setNameТask] = useState('')
  const[colorStatus, setColorStatus] = useState('')
  const[movieReviewList, setMovieList] = useState([])

  const[newName, setNewName] = useState('')
  const[newColor, setNewColor] = useState('')


  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setMovieList(response.data)
    })
  }, [])

  const submitReview = () => {

    Axios.post('http://localhost:3001/api/insert', {
      nameТask: nameТask, 
      colorStatus: colorStatus
    })  

    setMovieList([
      ...movieReviewList, 
      {nameТask: nameТask, colorStatus: colorStatus},
    ])
    window.location.reload();
  }

  const deleteTask = (id) => {
    Axios.delete("http://localhost:3001/api/delete/"+id)
    window.location.reload();
    
  }

  const editTask = (task) => {
    Axios.put("http://localhost:3001/api/update", {
      nameТask: task, 
      newName: newName,
      newColor: newColor,
    }) 
    setNewName("")
    setNewColor("")
    window.location.reload();
    console.log({newName})
  }

  return (
    <div className="App">
      <h1>My Task</h1>
      <div className="form">
        <label>Create Task:</label>
        <input type="text" name="nameТask" onChange={(e) => {setNameТask(e.target.value)}} />
        <label>Select color:</label>
        <input type="radio" id="colorStatus" name="status" onChange={(e) => {setColorStatus(e.target.value)}} value="normal" />
        <label htmlFor="normal">normal</label>
        <input type="radio" id="colorStatus" name="status" onChange={(e) => {setColorStatus(e.target.value)}} value="orange" />
        <label htmlFor="orange">orange</label>
        <input type="radio" id="colorStatus" name="status" onChange={(e) => {setColorStatus(e.target.value)}} value="red" />
        <label htmlFor="red">red</label>

        <button onClick={submitReview}>Submit</button>

        {movieReviewList.map((val) => {
          return (
            <>
              <div className="carts">
                <h1>{val.nameТask}</h1>
                <p>Color: {val.colorStatus} </p>
                {/* <p>id: {val.id} </p> */}
                <button 
                onClick={() => {deleteTask(val.id)}}
                >
                  Delete</button>
                <form>
                <div className="editTask" style={{border: "1px solid red"}}>
                  <input 
                    onChange={(e) => {setNewName(e.target.value)}}
                    type="text" placeholder="edit task" 
                  />
                  <input type="radio" id="colorStatus" name="status" onChange={(e) => {setNewColor(e.target.value)}} value="normal" />
                  <label htmlFor="normal">normal</label>
                  <input type="radio" id="colorStatus" name="status" onChange={(e) => {setNewColor(e.target.value)}} value="orange" />
                  <label htmlFor="orange">orange</label>
                  <input type="radio" id="colorStatus" name="status" onChange={(e) => {setNewColor(e.target.value)}} value="red" />
                  <label htmlFor="red">red</label>
                  </div>
                <button 
                  onClick={() => {editTask(val.nameТask)}} 
                >
                  edit task
                </button>
                </form>
              </div>

            </>
          )
        })}
      </div>
    </div>
  );
}

export default App;
