import {
    FaEdit,
    FaTrash,
    FaThumbtack
} from "react-icons/fa";

import "../../css/AnnouncementCard.css";

function AnnouncementCard({

    announcement,

    canManage,

    onEdit,

    onDelete,

    axiosPrivate

}) {

    const {

        _id,

        title,

        description,

        image,

        priority,

        isPinned,

        createdAt,

        createdBy

    } = announcement;

    const deleteAnnouncement = async () => {

        const confirmDelete = window.confirm(

            "Delete this announcement?"

        );

        if (!confirmDelete) return;

        try {

            await axiosPrivate.delete(

                `/announcements/${_id}`

            );

            onDelete();

        }

        catch (err) {

            console.error(err);

            alert(

                err.response?.data?.message ||

                "Failed to delete announcement."

            );

        }

    };

    return (

        <div className={`announcement-card-container ${priority.toLowerCase()}`}>

            <div className="announcement-card-header">

                <div>

                    <h3>

                        {isPinned && (

                            <FaThumbtack className="pin-icon" />

                        )}

                        {title}

                    </h3>

                </div>

                <span className={`announcement-priority-badge ${priority.toLowerCase()}`}>

                    {priority}

                </span>

            </div>

            {image && (

                <img

                    src={image}

                    alt={title}

                    className="announcementc-card-image"

                />

            )}

            <p className="announcement-card-description">

                {description}

            </p>

            <div className="announcement-card-footer">

                <div>

                    <strong>

                        {createdBy?.fullname}

                    </strong>

                    {createdBy?.designation && (

                        <> • {createdBy.designation}</>

                    )}

                </div>

                <span>

                    {new Date(createdAt).toLocaleString()}

                </span>

            </div>

            {canManage && (

                <div className="announcement-card-actions">

                    <button

                        className="announcement-edit-btn"

                        onClick={onEdit}

                    >

                        <FaEdit />

                        Edit

                    </button>

                    <button

                        className="announcement-delete-btn"

                        onClick={deleteAnnouncement}

                    >

                        <FaTrash />

                        Delete

                    </button>

                </div>

            )}

        </div>

    );

}

export default AnnouncementCard;