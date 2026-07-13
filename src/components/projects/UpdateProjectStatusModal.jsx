import { useState } from "react";

import "../../css/Modal.css";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import ROLES from "../../config/roles";

function UpdateStatusModal({
    project,
    onClose,
    refreshProjects
}) {

    const axiosPrivate = useAxiosPrivate();

    const { auth } = useAuth();

    const roles = auth?.roles || [];

    const isAdmin =
        roles.includes(ROLES.SuperAdmin) ||
        roles.includes(ROLES.HR);

    const isTeamLead =
        roles.includes(ROLES.TeamLead);

    const [status, setStatus] = useState(project.status);

    const [reviewComment, setReviewComment] = useState("");

    const [deliverableUrl, setDeliverableUrl] = useState("");

    const [loading, setLoading] = useState(false);

    const updateStatus = async () => {

        try {

            setLoading(true);

            await axiosPrivate.patch(

                `/projects/${project._id}/status`,

                {
                    status
                }

            );

            await refreshProjects();

            onClose();

        } catch (err) {

            alert(
                err?.response?.data?.message ||
                "Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    const sendForReview = async () => {

        if (!deliverableUrl.trim()) {

            return alert(
                "Final Deliverable URL required."
            );

        }

        try {

            setLoading(true);

            await axiosPrivate.patch(

                `/projects/${project._id}/review`,

                {

                    finalDeliverableUrl: deliverableUrl

                }

            );

            await refreshProjects();

            onClose();

        } catch (err) {

            alert(
                err?.response?.data?.message ||
                "Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    const approveProject = async () => {

        try {

            setLoading(true);

            await axiosPrivate.patch(

                `/projects/${project._id}/approve`

            );

            await refreshProjects();

            onClose();

        } catch (err) {

            alert(
                err?.response?.data?.message ||
                "Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    const requestChanges = async () => {

        if (!reviewComment.trim()) {

            return alert(
                "Enter review comment."
            );

        }

        try {

            setLoading(true);

            await axiosPrivate.patch(

                `/projects/${project._id}/request-changes`,

                {

                    reviewComment

                }

            );

            await refreshProjects();

            onClose();

        } catch (err) {

            alert(
                err?.response?.data?.message ||
                "Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>

                    Update Project

                </h2>

                <p>

                    Current Status :

                    <b> {project.status}</b>

                </p>

                {/* Planning / In Progress */}

                {

                    project.status !==
                    "Under HR Review"

                    &&

                    <>

                        <label>

                            Status

                        </label>

                        <select

                            value={status}

                            onChange={(e) =>
                                setStatus(
                                    e.target.value
                                )
                            }

                        >

                            <option>

                                Planning

                            </option>

                            <option>

                                In Progress

                            </option>

                        </select>

                    </>

                }

                {/* Team Lead */}

                {

                    isTeamLead

                    &&

                    project.status ===
                    "In Progress"

                    &&

                    <>

                        <label>

                            Final Deliverable URL

                        </label>

                        <input

                            value={deliverableUrl}

                            onChange={(e)=>

                                setDeliverableUrl(
                                    e.target.value
                                )

                            }

                        />

                    </>

                }

                {/* HR */}

                {

                    isAdmin

                    &&

                    project.status ===
                    "Under HR Review"

                    &&

                    <>

                        <label>

                            Review Comment

                        </label>

                        <textarea

                            rows={4}

                            value={reviewComment}

                            onChange={(e)=>

                                setReviewComment(
                                    e.target.value
                                )

                            }

                        />

                    </>

                }

                <div className="modal-buttons">

                    <button

                        className="cancel-btn"

                        onClick={onClose}

                    >

                        Cancel

                    </button>

                    {

                        project.status ===
                        "Planning"

                        &&

                        <button

                            className="create-btn"

                            disabled={loading}

                            onClick={updateStatus}

                        >

                            Save

                        </button>

                    }

                    {

                        isTeamLead

                        &&

                        project.status ===
                        "In Progress"

                        &&

                        <button

                            className="create-btn"

                            disabled={loading}

                            onClick={sendForReview}

                        >

                            Send For Review

                        </button>

                    }

                    {

                        isAdmin

                        &&

                        project.status ===
                        "Under HR Review"

                        &&

                        <>

                            <button

                                className="cancel-btn"

                                onClick={
                                    requestChanges
                                }

                            >

                                Request Changes

                            </button>

                            <button

                                className="create-btn"

                                onClick={
                                    approveProject
                                }

                            >

                                Approve

                            </button>

                        </>

                    }

                </div>

            </div>

        </div>

    );

}

export default UpdateStatusModal;