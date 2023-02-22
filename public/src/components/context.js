import React, { useState,useRef } from "react";
import { createContext } from "react";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";
const Context = createContext();

export default function ContextApi(props){
    const islogin = useRef(false);
    const [username,setUsername] = useState("");
    const [avatar,setAvatar] = useState("");

    const signin = async (username,password,avatar)=>{

        const response = await fetch("http://127.0.0.1:5000/api/auth/signin", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                username,
                password,
                messages:{},
                avatar,
            })
          });
        
          const res = await response.json();
          if(res.error){
            toast("A user with this username or password already exists",{
                position:toast.POSITION.BOTTOM_RIGHT,
                style:{background:"brown",color:"white",fontSize:"medium",fontFamily:"poppins"}
              });
          }
          else{
            toast("Signed in Successfully",{
                position:toast.POSITION.BOTTOM_RIGHT,
                style:{background:"darkgreen",color:"white",fontSize:"medium",fontFamily:"poppins"}
              });
              setUsername(username);
              setAvatar(res.avatar);
              islogin.current=true;
              let bs64=btoa(password);
              localStorage.setItem("details",JSON.stringify({username,password:bs64}))
              return true;
          }
    }

    const login = async (usern,password)=>{
        
        const response = await fetch("http://127.0.0.1:5000/api/auth/login", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                username:usern,
                password,
            })
          });
        
          const res = await response.json();
          if(res.error){
            toast("No user found",{
                position:toast.POSITION.BOTTOM_RIGHT,
                style:{background:"brown",color:"white",fontSize:"medium",fontFamily:"poppins"}
              });
              return false;
          }
          else{
            setUsername(usern);
            setAvatar(res.avatar);
            islogin.current=true;
            let bs64=btoa(password);
            localStorage.setItem("details",JSON.stringify({username:usern,password:bs64}))
            return true;

          }

    }

    const getusers = async (username)=>{
      const response = await fetch("http://127.0.0.1:5000/api/auth/getusers", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                username,
            })
          });

        const data = await response.json();
        return data;
    }

    const getChat = async (user,chat)=>{
      const response = await fetch("http://127.0.0.1:5000/api/auth/getchat", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                user,
                chat,
            })
          });

        const data = await response.json();
          return data;
    }



    const sendMsg = async (sender,recv,msg)=>{
      const response = await fetch("http://127.0.0.1:5000/api/auth/chat", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
              sender:sender,
              reciever:recv,
              message:msg
          })
        });
      
}

    return(
        <>
        <Context.Provider value={{
            signin,
            login,
            getusers,
            getChat,
            sendMsg,
            username,
            avatar,
            islogin:islogin.current,
        }}>
            {props.children}
        </Context.Provider>
        </>
    )
}

export {Context};