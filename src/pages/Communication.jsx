import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import "../css/Communication.css";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

import ChatTabs from "../components/communication/ChatTabs";
import ChatWindow from "../components/communication/ChatWindow";
import MessageInput from "../components/communication/MessageInput";

function Communication() {

    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();

    const [activeChat, setActiveChat] = useState("GLOBAL");
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    // ==========================
    // Socket Connection
    // ==========================

    useEffect(() => {

        if (!auth?.accessToken) return;

        const newSocket = io("https://work2-59om.onrender.com", {

            auth: {

                token: auth.accessToken

            }

        });

        setSocket(newSocket);

        return () => {

            newSocket.disconnect();

        };

    }, [auth]);

    // ==========================
    // Load Messages
    // ==========================

    useEffect(() => {

        loadMessages();

    }, [activeChat]);

    const loadMessages = async () => {

        try {

            const endpoint =

                activeChat === "GLOBAL"

                    ? "/chat/global"

                    : "/chat/team";

            const response = await axiosPrivate.get(endpoint);

            setMessages(response.data);

        }

        catch (err) {

            console.error(err);

            setMessages([]);

        }

    };

    // ==========================
    // Listen Socket Messages
    // ==========================

    useEffect(() => {

        if (!socket) return;

        const handleGlobalMessage = (message) => {

            if (activeChat === "GLOBAL") {

                setMessages(prev => [...prev, message]);

            }

        };

        const handleTeamMessage = (message) => {

            if (activeChat === "TEAM") {

                setMessages(prev => [...prev, message]);

            }

        };

        socket.on(
            "receiveGlobalMessage",
            handleGlobalMessage
        );

        socket.on(
            "receiveTeamMessage",
            handleTeamMessage
        );

        return () => {

            socket.off(
                "receiveGlobalMessage",
                handleGlobalMessage
            );

            socket.off(
                "receiveTeamMessage",
                handleTeamMessage
            );

        };

    }, [socket, activeChat]);

    return (

        <div className="communication-page">

            <h2>Communication</h2>

            <ChatTabs

                activeChat={activeChat}

                setActiveChat={setActiveChat}

            />

            <ChatWindow

                messages={messages}

                currentUser={auth.id}

            />

            <MessageInput

                socket={socket}

                activeChat={activeChat}

            />

        </div>

    );

}

export default Communication;
