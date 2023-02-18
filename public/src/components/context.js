import React from "react";
import { createContext } from "react";

const Context = createContext();

export default function contextApi(props){

    const signin = async (username,password,avatar)=>{
        
        const response = await fetch("http://127.0.0.1:5000/api/auth/signin", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': 1
            },

            body: JSON.stringify({
                username,
                password,
                messages:{},
                avatar,
            })
          });
        
          const res = await response.json();
          console.log(res);
    }

    return(
        <Context.Provider value={{
            signin
        }}>
            {props.children}
        </Context.Provider>
    )
}

export {Context};