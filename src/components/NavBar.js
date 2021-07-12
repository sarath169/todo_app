import React from "react";
import { Link, useHistory } from "react-router-dom";

import { auth } from "../firebase";

function NavBar(props) {
  const history = useHistory();
  return (
    <nav>
      <div className="nav-wrapper blue ">
        <Link to="/" className="brand-logo">
          Todo
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {props.user ? (
            <li>
              <button
                className="btn red"
                onClick={() => {
                  auth.signOut();
                  history.push("/login");
                }}
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">SignUp</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
