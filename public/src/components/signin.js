import React,{ useContext, useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import ToastCss from 'react-toastify/dist/ReactToastify.css';
import { Context } from "./context";


function Signin() {
  const context = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  
  useEffect(() => {
    setAvatar(avatar);
  }, [avatar]);

  const signin=()=>{
    let userSPace = username.indexOf(" ");
    let passSpace = password.indexOf(" ");
    if(username.length<1 || password.length<=5 || avatar.length<=32){
      toast("PLease fill in the credentials",{
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
      context.signin(username,password,avatar)
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
            const res = await fetch(`https://api.multiavatar.com/${e.target.value}.png`);
            const img = await res.JSON;
            let profile = document.querySelector("#profile");
            profile.src=res.url;
            setAvatar(`https://api.multiavatar.com/${e.target.value}.png`)
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
          <a href="">Login</a>
        </div>
      </div>
      <ToastContainer theme="dark" />
    </>
  );
}

export default Signin;