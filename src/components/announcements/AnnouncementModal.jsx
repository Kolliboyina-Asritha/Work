import { useEffect, useState } from "react";

import "../../css/AnnouncementModal.css";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ROLES from "../../config/roles";

function AnnouncementModal({

    announcement,

    onClose,

    onSuccess

}) {

    const axiosPrivate = useAxiosPrivate();

    const isEdit = Boolean(announcement);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [isPinned, setIsPinned] = useState(false);
    const [expiresAt, setExpiresAt] = useState("");
    const [targetRoles, setTargetRoles] = useState([]);

    useEffect(() => {

        if (!announcement) return;

        setTitle(announcement.title);
        setDescription(announcement.description);
        setImage(announcement.image || "");
        setPriority(announcement.priority || "Medium");
        setIsPinned(announcement.isPinned || false);
        setTargetRoles(announcement.targetRoles || []);

        if (announcement.expiresAt) {

            setExpiresAt(
                announcement.expiresAt.substring(0, 10)
            );

        }

    }, [announcement]);

    const toggleRole = (role) => {

        setTargetRoles(prev =>

            prev.includes(role)

                ? prev.filter(r => r !== role)

                : [...prev, role]

        );

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const body = {

                title: title.trim(),

                description: description.trim(),

                image,

                priority,

                isPinned,

                targetRoles,

                expiresAt: expiresAt || null

            };

            if (isEdit) {

                await axiosPrivate.put(

                    `/announcements/${announcement._id}`,

                    body

                );

            }

            else {

                await axiosPrivate.post(

                    "/announcements",

                    body

                );

            }

            onSuccess();

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Operation failed."

            );

        }

    };

    return (

        <div className="announcement-modal-overlay">

            <div className="announcement-modal">

                <h2>

                    {isEdit
                        ? "Edit Announcement"
                        : "New Announcement"}

                </h2>

                <form onSubmit={handleSubmit}>

                    <input

                        type="text"

                        placeholder="Title"

                        value={title}

                        onChange={(e) =>
                            setTitle(e.target.value)
                        }

                        required

                    />

                    <textarea

                        placeholder="Description"

                        rows={5}

                        value={description}

                        onChange={(e) =>
                            setDescription(e.target.value)
                        }

                        required

                    />

                    <input

                        type="text"

                        placeholder="Image URL (optional)"

                        value={image}

                        onChange={(e) =>
                            setImage(e.target.value)
                        }

                    />

                    <select

                        value={priority}

                        onChange={(e) =>
                            setPriority(e.target.value)
                        }

                    >

                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Urgent">Urgent</option>

                    </select>

                    <label>

                        Expiry Date

                    </label>

                    <input

                        type="date"

                        value={expiresAt}

                        onChange={(e) =>
                            setExpiresAt(e.target.value)
                        }

                    />

                    <div className="roles-section">

                        <h4>

                            Target Roles

                        </h4>

                        <label>

                            <input

                                type="checkbox"

                                checked={targetRoles.includes(ROLES.SuperAdmin)}

                                onChange={() =>
                                    toggleRole(ROLES.SuperAdmin)
                                }

                            />

                            Super Admin

                        </label>

                        <label>

                            <input

                                type="checkbox"

                                checked={targetRoles.includes(ROLES.HR)}

                                onChange={() =>
                                    toggleRole(ROLES.HR)
                                }

                            />

                            HR

                        </label>

                        <label>

                            <input

                                type="checkbox"

                                checked={targetRoles.includes(ROLES.TeamLead)}

                                onChange={() =>
                                    toggleRole(ROLES.TeamLead)
                                }

                            />

                            Team Lead

                        </label>

                        <label>

                            <input

                                type="checkbox"

                                checked={targetRoles.includes(ROLES.Employee)}

                                onChange={() =>
                                    toggleRole(ROLES.Employee)
                                }

                            />

                            Employee

                        </label>

                        <label>

                            <input

                                type="checkbox"

                                checked={targetRoles.includes(ROLES.Intern)}

                                onChange={() =>
                                    toggleRole(ROLES.Intern)
                                }

                            />

                            Intern

                        </label>

                    </div>

                    <label className="pin-checkbox">

                        <input

                            type="checkbox"

                            checked={isPinned}

                            onChange={(e) =>
                                setIsPinned(e.target.checked)
                            }

                        />

                        Pin this announcement

                    </label>

                    <div className="modal-buttons">

                        <button type="submit">

                            {isEdit ? "Update" : "Create"}

                        </button>

                        <button

                            type="button"

                            onClick={onClose}

                        >

                            Cancel

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default AnnouncementModal;