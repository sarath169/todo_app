import React, { useState } from "react";
import {auth} from "../firebase"
import {useHistory, Link} from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory()

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    try{
        const result = await auth.createUserWithEmailAndPassword(email,password);
    window.M.toast({html: `Welcome ${result.user.email}`, classes:"green"});
    history.push('/')
    }
    catch(error){
        window.M.toast({html: error.message, classes:"red"})
    }
    };
  return (
    <div className="center container">
      <h1>SignUp</h1>
      <form onSubmit={submitHandler}>
        <div className="input-field col s6">
          <input
            placeholder="joe@gmail.com"
            type="email"
            value={email}
            onChange={emailChangeHandler}
          />
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={passwordChangeHandler}
          />
          <button type="submit" className="btn blue">SignUp</button>
          <p>have an account? <Link to="/login">login</Link></p>
        </div>
      </form>
    </div>
  );
}

export default Login;
