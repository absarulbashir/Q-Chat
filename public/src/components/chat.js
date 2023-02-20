import {useState,useEffect, useContext} from"react";
import { Context } from "./context";
export default function Chat(){
    const context = useContext(Context);
    const [users,setUsers] = useState([]);
    const [username,setUsername] = useState("Absar");
    const [avatar,setAvatar] = useState("https://api.multiavatar.com/absar.png");

    const getChat=(username)=>{
        alert(username);
    }

    useEffect(()=>{
        getUsers();
    })

    const getUsers = async ()=>{
        let Users = await context.getusers("Absar");
        setUsers(Users.users);
    }

    return (
        <>
        <div id="chatContainer">
            <div id="users">
                {
                    users.map((el,i)=>{
                        return <div className="user" key={i} onClick={()=>{
                            getChat(el.username);
                        }} >
                            <img src={el.avatar} alt="" />
                            <p>{el.username}</p>
                        </div>
                    })
                }
            </div>
            <div id="chat">

            </div>
        </div>
        </>
    )
}