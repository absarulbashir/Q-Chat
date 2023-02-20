import React from "react";
import { createContext } from "react";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";

const Context = createContext();

export default function contextApi(props){

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
          }
    }

    const login = async (username,password)=>{
        
        const response = await fetch("http://127.0.0.1:5000/api/auth/login", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                username,
                password,
            })
          });
        
          const res = await response.json();
          if(res.error){
            toast("No user found",{
                position:toast.POSITION.BOTTOM_RIGHT,
                style:{background:"brown",color:"white",fontSize:"medium",fontFamily:"poppins"}
              });
          }
          else{
            toast("Logged in Successfully",{
                position:toast.POSITION.BOTTOM_RIGHT,
                style:{background:"darkgreen",color:"white",fontSize:"medium",fontFamily:"poppins"}
              });
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

    return(
        <>
        <Context.Provider value={{
            signin,
            login,
            getusers,
        }}>
            {props.children}
        </Context.Provider>
        </>
    )
}

export {Context};