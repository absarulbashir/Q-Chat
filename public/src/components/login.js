import React,{ useContext, useState } from "react";
import { Context } from "./context";
import {toast} from "react-toastify";
import { Link } from "react-router-dom";

function Login() {
  const context = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const login=()=>{
    let userSPace = username.indexOf(" ");
    let passSpace = password.indexOf(" ");
    if(username.length<=1 || password.length<=5){
      toast("Please fill in the credentials",{
        position:toast.POSITION.BOTTOM_RIGHT,
        style:{background:"brown",color:"white",fontSize:"larger",fontFamily:"poppins"}
      });
    }
    else if(userSPace>=0 || passSpace>=0){
      toast("Cannot include spaces",{
        position:toast.POSITION.BOTTOM_RIGHT,
        style:{background:"brown",color:"white",fontSize:"larger",fontFamily:"poppins"}
      });
    }
    else{
      context.login(username,password);
    }
  }

  return (
    <>
      <div id="loginContainer">
        <div id="login">
          <input
            type="text"
            id="username"
            placeholder="Enter a username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button id="signSubmit" onClick={login}>Login</button>
          <p>Don't have an account</p>
          <Link to="/signin">Signin</Link>
        </div>
      </div>
    </>
  );
}

export default Login;