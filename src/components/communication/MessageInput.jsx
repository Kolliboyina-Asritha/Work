import { useState } from "react";

import "../../css/MessageInput.css";

import { IoSend } from "react-icons/io5";

function MessageInput({

    socket,

    activeChat

}) {

    const [message, setMessage] = useState("");

    const sendMessage = () => {

        if (!socket) return;

        if (!message.trim()) return;

        if (activeChat === "GLOBAL") {

            socket.emit("globalMessage", {

                message

            });

        }

        else {

            socket.emit("teamMessage", {

                message

            });

        }

        setMessage("");

    };

    const handleKeyDown = (e) => {

        if (e.key === "Enter") {

            e.preventDefault();

            sendMessage();

        }

    };

    return (

        <div className="message-input-container">

            <input

                type="text"

                placeholder="Type a message..."

                value={message}

                onChange={(e) => setMessage(e.target.value)}

                onKeyDown={handleKeyDown}

            />

            <button onClick={sendMessage}>

                <IoSend />

            </button>

        </div>

    );

}

export default MessageInput;