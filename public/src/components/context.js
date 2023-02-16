import React from "react";
import { createContext } from "react";

const Context = createContext();

export default function contextApi(props){

    return(
        <Context.Provider value="">
            {props.children}
        </Context.Provider>
    )
}

export {Context};