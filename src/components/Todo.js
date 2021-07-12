import { Modal } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { db } from "../firebase";

function Todo(props) {
  const [text, setText] = useState("");
  const [mytodos, setMytodos] = useState([]);
  const history = useHistory();
  const [open, setOpen] = useState(false);

  let unsubscribe = () => { };

  const textChangeHandler = (event) => {
    setText(event.target.value);
  };
  const addTodo = (event) => {
    event.preventDefault();
    db.collection("todos")
      .doc(props.user.uid)
      .set({
        todo: [...mytodos, text],
      });
    setText("");
  };
  const deleteTodo = (deleteTodo) => {
    const docRef = db.collection("todos").doc(props.user.uid);
    docRef.get().then(docSnap => {
      const result = docSnap.data().todo.filter(todo => todo != deleteTodo)
      docRef.update({
        todo: result
      })
    })
  };

  const handleOpen = () =>{
    setOpen(true);
  };
  const handleClose = () =>{
    setOpen(false);
  };
  const updateTodo = () =>{
    db.collection("todos").doc(props.todo.id).set(
      {
        task: text,
      },
      { merge: true }
    );
    setOpen(false);
  };

  useEffect(() => {
    if (props.user) {
      const docRef = db.collection("todos").doc(props.user.uid);
      unsubscribe = docRef.onSnapshot((docSnap) => {
        if (docSnap.exists) {
          console.log(docSnap.data().todo);
          setMytodos(docSnap.data().todo);
        } else {
          console.log("No docs");
        }
      });
    } else {
      history.push("/login");
    }
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="container">
      <h1>Todo</h1>
      <form onSubmit={addTodo}>
      <input
        placeholder="Add Todos"
        type="text"
        value={text}
        onChange={textChangeHandler}
      />
      <button className="btn blue" type="submit" disabled={!text}>
        Add
      </button>
      </form>
      
      <ul className="collection">
        {mytodos.map((todo) => {
          return (
            <li className="collection-item" key={todo}>
              {todo}
              <i className="material-icons right" onClick={() => deleteTodo(todo)}>delete</i>
              <i className="material-icons right" onClick={handleOpen}>edit</i>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Todo;
