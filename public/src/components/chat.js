import {useState,useEffect, useContext,useRef} from"react";
import { Context } from "./context";
import Robot from "../images/robot.gif"
export default function Chat(){
    const context = useContext(Context);
    const [users,setUsers] = useState([]);
    const [username,setUsername] = useState("Absar");
    const [avatar,setAvatar] = useState("https://api.multiavatar.com/absar.png");
    const [text,setText] = useState("");
    const recv = useRef("");
    const [chat,setChat] = useState(
        <div id="welcome">
            <img src={Robot} alt="" />
            <h2>Start a chat with Someone</h2>
        </div>
    )

    const getChat=async(chat)=>{

        recv.current=chat;
        let Chat = await context.getChat(username,chat);
        if(Chat === "no chat"){
            setChat("");
        }
        else{
            let chats = Chat.map((el,i)=>{
                return (
                 el[0]==="s"?<div key={i} className="sent">
                  <p>{el.slice(5,el.length)}</p>
                </div> : <div key={i} className="recieved">
                  <p>{el.slice(6,el.length)}</p>
                </div>
                )
             })
             setChat(chats);
        }
    }

    useEffect(()=>{
        getUsers();
    });

    const getUsers = async ()=>{
        let Users = await context.getusers(username);
        setUsers(Users.users);
    }

    const sendMsg = async(username,recv,msg)=>{
        let space = msg.trim()
        if(space.length===0){
            recv.current=recv.current;
        }
        else{
            context.sendMsg(username,recv,msg);
        }
        
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if(recv.current === ""){
            recv.current=recv.current;
            }
            else{
               getChat(recv.current);
            }
        }, 400);
        return () => clearInterval(interval);
    }, []);

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
                <div className="chts">
                {chat}
                </div>
                <div className="sendMsg" style={recv.current.length>=1 ? {
                    display:"flex",
                } : {
                    display:"none"
                }}>
                    <input type="text" value={text} autoComplete="none" onChange={(e)=>{
                        setText(e.target.value);
                    }} />
                    <button onClick={()=>{
                        sendMsg(username,recv.current,text);
                        setText("");
                    }}>SEND</button>
                </div>
            </div>
        </div>
        </>
    )
}