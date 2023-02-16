import React,{ useContext, useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from "./context";
import Logo from "../images/logo.jpg";

function Signin() {
  const context = useContext(Context);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [avatar, setAvatar] = useState();
  
  useEffect(() => {
    setAvatar(avatar);
  }, [avatar]);

  const signin=()=>{
    toast("Hello how are you",{
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      style:{color:"white",backgroundColor:"indigo"}
    })
  }

  return (
    <>
      <div id="signContainer">
        <div id="signLogo">
          <img src={Logo} alt="err" />
        </div>
        <div id="signin">
          <label htmlFor="upload">
            <img
              src="https://media.istockphoto.com/id/1273297997/vector/default-avatar-profile-icon-grey-photo-placeholder-hand-drawn-modern-man-avatar-profile-icon.jpg?s=170667a&w=0&k=20&c=JEH1FikFgnjjC__PjHbbO0h7oFMlodNfoKF6ANBgP8o="
              alt=""
              id="profile"
            />
            <span class="material-symbols-outlined">add</span>
          </label>
          <input
            id="upload"
            type="file"
            accept="jpg/png"
            onChange={(event) => {
              const file = event.target.files[0];
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.addEventListener("load", () => {
                setAvatar(reader.result);
                let img = document.querySelector("#profile");
                img.src = reader.result;
              });
            }}
          />
          <input
            type="text"
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
          <button id="signSubmit" onClick={signin}>Submit</button>
          <p>Already have an account</p>
          <a href="">Login</a>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
}

export default Signin;
