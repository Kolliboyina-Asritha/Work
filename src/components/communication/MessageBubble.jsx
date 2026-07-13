import "../../css/MessageBubble.css";

function MessageBubble({

    message,

    currentUser

}) {

    const isMine =
        message.sender?._id === currentUser;

    const time = new Date(
        message.createdAt
    ).toLocaleTimeString([], {

        hour: "2-digit",

        minute: "2-digit"

    });

    return (

        <div
            className={
                isMine
                    ? "message-row mine"
                    : "message-row"
            }
        >

            <div
                className={
                    isMine
                        ? "message-bubble mine"
                        : "message-bubble"
                }
            >

                {

                    !isMine &&

                    <div className="sender-name">

                        {message.sender?.fullname}

                    </div>

                }

                <div className="message-text">

                    {message.message}

                </div>

                <div className="message-time">

                    {time}

                </div>

            </div>

        </div>

    );

}

export default MessageBubble;