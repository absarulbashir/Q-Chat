import {useState,useEffect, useContext,useRef} from"react";
import { Context } from "./context";
import Robot from "../images/robot.gif"
import { useNavigate } from "react-router-dom";
import Loading from "../images/loading2.gif"
export default function Chat(){
    const navigate = useNavigate();
    const context = useContext(Context);
    const [users,setUsers] = useState([]);
    const username = useRef(context.username);
    const avatar = useRef(context.avatar);
    const text = useRef("");
    const recv = useRef("");
    const [chat,setChat] = useState(
        <div id="welcome">
            <img src={Robot} alt="" />
            <h2>Start a chat with Someone</h2>
        </div>
    );

    let local = localStorage.getItem("details");
    local = JSON.parse(local);




    const getChat=async(chat)=>{
        recv.current=chat;
        let Chat = await context.getChat(username.current,chat);
        let img = document.querySelector(".topChatImg");
        let name = document.querySelector(".topChatP");
        if(!Chat.chat){
            let Users = await context.getusers(username.current);
            Users = await Users.users.filter((el)=>{
                if(el.username===chat){
                    return el;
                }
            });
            img.src=Users[0].avatar;
            name.innerHTML=Users[0].username;
            setChat("")
        }
        else{
            let Users = await context.getusers(username.current);
            Users = await Users.users.filter((el)=>{
                if(el.username===chat){
                    return el;
                }
            });
            img.src=Users[0].avatar;
            name.innerHTML=Users[0].username;
            let chats = Chat.chat.map((el,i)=>{
                return (
                 el[0]==="s"?(<div key={i} className="sent">
                  <p>{el.slice(5,el.length)}</p>
                </div> ):( <div key={i} className="recieved">
                  <p>{el.slice(6,el.length)}</p>
                </div>)
                )
             })
             setChat(chats);
        }
    }

    useEffect(()=>{
        getUsers();
        if(local.username  && !context.islogin){
            context.login(local.username,atob(local.password));
            username.current=local.username;
        }
        else if(!context.islogin){
            navigate("/login");
        }
    });

    const getUsers = async ()=>{
        let Users = await context.getusers(username.current);
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
    
    if(!context.islogin && local.username){
        return (
            <img src={Loading} alt="" style={{width:"100vw",height:"90vh"}}/>
        )
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
                <div className="chts">
                    <div className="topChat" style={recv.current===""?{display:"none"}:{display:"flex"}}>
                        <img className="topChatImg" src="" alt="" />
                        <p className="topChatP"></p>
                    </div>
                 <div className="msgs">
                    {chat}
                 </div>
                </div>
                <div className="sendMsg" style={recv.current.length>=1 ? {
                    display:"flex",
                } : {
                    display:"none"
                }}>
                    <input type="text" value={text.current} autoComplete="none" onChange={(e)=>{
                        text.current=e.target.value;
                    }} /> 
                    <span class="material-symbols-rounded" onClick={()=>{
                        sendMsg(username.current,recv.current,text.current);
                        text.current="";
                    }}>
                    send
                    </span>
                </div>
            </div>
        </div>
        </>
    )
}