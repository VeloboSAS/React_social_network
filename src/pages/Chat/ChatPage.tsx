import { Button } from "antd"
import React, { FC, memo, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ChatMessageApiType } from "../../api/chatAPI"
import { sendMessage, startMessagesListening, stopMessagesListening } from "../../Redux/Reducers/chatReducer"
import { AppDispatch, AppStateType } from "../../Redux/redux-store"


const ChatPage: FC = () => {
    return <Chat/>
} 

const Chat: FC = () => {

    const dispatch: AppDispatch = useDispatch()

    const status = useSelector((state: AppStateType) => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return <div style={{margin:"30px"}}>
        {status === 'error'? <div>Some error occured. Plase refresh the page</div>:
        <>
            <h2>Chat</h2>
        <Messages />
        <AddMessageForm />
        </>}

    </div>
}

const Messages: FC = () => {
    
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoSroll, setIsAutoScroll] = useState(false)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        let element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoSroll && setIsAutoScroll(true)
        } else {
            isAutoSroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoSroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth',  block: 'end'}) 
        }
    }, [isAutoSroll, messages])

    return <div style={{height: '400px', overflowY: 'auto'}} onScroll={scrollHandler}>
        {messages.map((m, id) => <Message key={id} message={m}/>)}
        <div ref={messagesAnchorRef}></div>

    </div>
}

const Message: FC<{message: ChatMessageApiType}> = memo(({message}) => {
    console.log('>>>message')
    return <div>
        <img src={message.photo} style={{width: '30px'}} alt=''/> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
})

const AddMessageForm: FC= () => {

    const [message, setMessage] = useState('')
    const dispatch: AppDispatch = useDispatch()

    const status = useSelector((state: AppStateType) => state.chat.status)

    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }
    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
        </div>
        <div>
            <Button disabled={status !== 'ready'} onClick={sendMessageHandler} type='primary'>Send</Button>
        </div>
    </div>       
}

export default ChatPage