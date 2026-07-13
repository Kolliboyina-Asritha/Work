import { useEffect, useRef } from "react";

import MessageBubble from "./MessageBubble";

import "../../css/ChatWindow.css";

function ChatWindow({

    messages,

    currentUser

}) {

    const bottomRef = useRef(null);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({

            behavior: "smooth"

        });

    }, [messages]);

    return (

        <div className="chat-window">

            {

                messages.length === 0 ?

                (

                    <div className="no-messages">

                        No messages yet.

                    </div>

                )

                :

                (

                    messages.map(message => (

                        <MessageBubble

                            key={message._id}

                            message={message}

                            currentUser={currentUser}

                        />

                    ))

                )

            }

            <div ref={bottomRef}></div>

        </div>

    );

}

export default ChatWindow;