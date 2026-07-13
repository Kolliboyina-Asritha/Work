import "../../css/ChatTabs.css";

function ChatTabs({

    activeChat,

    setActiveChat

}) {

    return (

        <div className="chat-tabs">

            <button

                className={
                    activeChat === "GLOBAL"
                        ? "active"
                        : ""
                }

                onClick={() =>
                    setActiveChat("GLOBAL")
                }

            >

                🌍 Global Chat

            </button>

            <button

                className={
                    activeChat === "TEAM"
                        ? "active"
                        : ""
                }

                onClick={() =>
                    setActiveChat("TEAM")
                }

            >

                👥 Team Chat

            </button>

        </div>

    );

}

export default ChatTabs;