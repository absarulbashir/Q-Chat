import React,{ useContext, useState, useEffect } from "react";
import { Context } from "./context";
import {toast} from "react-toastify"
import { Link, useNavigate } from "react-router-dom";

function Signin() {
  const context = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();

  const signin= async ()=>{
    let userSPace = username.indexOf(" ");
    let passSpace = password.indexOf(" ");
    if(username.length<=1 || password.length<=5 || avatar.length<=32){
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
      let login = await context.signin(username,password,avatar);
      if(login){
        navigate("/");
      }
    }
  }

  return (
    <>
      <div id="signContainer">
        <div id="signin">
          <label htmlFor="upload">
            <img
              src="https://api.multiavatar.com/1.png"
              alt=""
              id="profile"
            />
          </label>
          <input type="text" id="avatar" placeholder="Enter random name" onChange={async(e)=>{
            let profile = document.querySelector("#profile");
            if(e.target.value ===""){
              profile.src='https://api.multiavatar.com/1.png';
              setAvatar('https://api.multiavatar.com/1.png');
            }
            else{
              profile.src=`https://api.multiavatar.com/${e.target.value}.png`;
              setAvatar(`https://api.multiavatar.com/${e.target.value}.png`);
            }

          }} />
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
          <button id="signSubmit" onClick={signin}>Signin</button>
          <p>Already have an account</p>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </>
  );
}

export default Signin;