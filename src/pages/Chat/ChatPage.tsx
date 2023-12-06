import { Button } from "antd"
import React, { FC, useEffect, useState } from "react"

const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export type ChatMessageType = {
    message: string,
   photo:  string,
   userId: number,
   userName: string
}

const ChatPage: FC = () => {
    return <Chat/>
} 

const Chat: FC = () => {

    return <div style={{margin:"30px"}}>
        <h2>Chat</h2>
        <Messages/>
        <AddMessageForm/>
    </div>
}

const Messages: FC = () => {

    const [messages, setMessages] = useState<ChatMessageType[]>([]) 
    useEffect(() => {
        wsChannel.addEventListener('message', (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        })
    }, [])
    return <div style={{height: '400px', overflowY: 'auto'}}>
        {messages.map((m, index) => <Message key={index} message={m}/>)}

    </div>
}

const Message: FC<{message: ChatMessageType}> = ({message}) => {

    return <div>
        <img src={message.photo} style={{width: '30px'}} alt=''/> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
}

const AddMessageForm: FC = () => {

    const [message, setMessage] = useState('')
    const sendMessage = () => {
        if (!message) {
            return
        }
        wsChannel.send(message)
        setMessage('')
    }
    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
        </div>
        <div>
            {/* <button onClick={sendMessage}>Send</button> */}
            <Button onClick={sendMessage} type='primary'>Send</Button>
        </div>
    </div>       
}

export default ChatPage