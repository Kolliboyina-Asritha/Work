import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { FaPlus } from "react-icons/fa";

import "../css/Announcements.css";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import ROLES from "../config/roles";

import AnnouncementCard from "../components/announcements/AnnouncementCard";
import AnnouncementModal from "../components/announcements/AnnouncementModal";

function Announcements() {

    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();

    const [announcements, setAnnouncements] = useState([]);
    const [socket, setSocket] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [editingAnnouncement, setEditingAnnouncement] = useState(null);

    const canManageAnnouncements =
        auth?.roles?.includes(ROLES.SuperAdmin) ||
        auth?.roles?.includes(ROLES.HR);

    // ==========================
    // Socket Connection
    // ==========================

    useEffect(() => {

        if (!auth?.accessToken) return;

        const newSocket = io("http://localhost:6006", {
            auth: {
                token: auth.accessToken
            }
        });

        setSocket(newSocket);

        return () => newSocket.disconnect();

    }, [auth]);

    // ==========================
    // Load Announcements
    // ==========================

    const loadAnnouncements = async () => {

        try {

            const response = await axiosPrivate.get("/announcements");

            setAnnouncements(response.data);

        }
        catch (err) {

            console.error(err);

        }

    };

    useEffect(() => {

        loadAnnouncements();

    }, []);

    // ==========================
    // Socket Events
    // ==========================

    useEffect(() => {

        if (!socket) return;

        socket.on("newAnnouncement", (announcement) => {

            setAnnouncements(prev => [

                announcement,

                ...prev

            ]);

        });

        socket.on("announcementUpdated", (updatedAnnouncement) => {

            setAnnouncements(prev =>

                prev.map(item =>

                    item._id === updatedAnnouncement._id

                        ? updatedAnnouncement

                        : item

                )

            );

        });

        socket.on("announcementDeleted", (announcementId) => {

            setAnnouncements(prev =>

                prev.filter(item => item._id !== announcementId)

            );

        });

        return () => {

            socket.off("newAnnouncement");

            socket.off("announcementUpdated");

            socket.off("announcementDeleted");

        };

    }, [socket]);

    return (

        <div className="announcements-page">

            <div className="announcements-header">

                <h2>

                    Announcements

                </h2>

                {canManageAnnouncements && (

                    <button

                        className="new-announcement-btn"

                        onClick={() => {

                            setEditingAnnouncement(null);

                            setShowModal(true);

                        }}

                    >

                        <FaPlus />

                        New Announcement

                    </button>

                )}

            </div>

            <div className="announcements-list">

                {announcements.length === 0 ? (

                    <div className="no-announcements">

                        No announcements available.

                    </div>

                ) : (

                    announcements.map((announcement) => (

                        <AnnouncementCard

                            key={announcement._id}

                            announcement={announcement}

                            canManage={canManageAnnouncements}

                            onEdit={() => {

                                setEditingAnnouncement(announcement);

                                setShowModal(true);

                            }}

                            onDelete={loadAnnouncements}

                            axiosPrivate={axiosPrivate}

                        />

                    ))

                )}

            </div>

            {showModal && (

                <AnnouncementModal

                    announcement={editingAnnouncement}

                    onClose={() => {

                        setShowModal(false);

                        setEditingAnnouncement(null);

                    }}

                    onSuccess={() => {

                        loadAnnouncements();

                        setShowModal(false);

                        setEditingAnnouncement(null);

                    }}

                />

            )}

        </div>

    );

}

export default Announcements;