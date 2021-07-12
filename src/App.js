import { BrowserRouter, Route, Switch } from "react-router-dom";
import {useState, useEffect} from 'react';

import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Todo from "./components/Todo";
import Signup from "./components/Signup";
import {auth} from "./firebase";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {setUser(user)}
      else {setUser(null)}
    })
    return () =>{
      unsubscribe();
    }
  }, [])
  return (
    <BrowserRouter>
      <NavBar user = {user} />
      <Switch>
        <Route exact path="/">
          <Todo user = {user}/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/signup">
          <Signup/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
