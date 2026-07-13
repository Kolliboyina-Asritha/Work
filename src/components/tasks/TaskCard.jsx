import "../../css/TaskCard.css";

import useAuth from "../../hooks/useAuth";
import ROLES from "../../config/roles";

function TaskCard({

    task,

    onEdit,

    onDelete,

    onStart,

    onSubmit,

    onApprove,

    onRequestChanges

}) {

    const { auth } = useAuth();

    const roles = auth?.roles || [];

    const userId = auth?.id;

    const isTeamLead = roles.includes(ROLES.TeamLead);

    const isEmployee = roles.includes(ROLES.Employee);

    const isIntern = roles.includes(ROLES.Intern);

    const isAssignedUser =
        task.assignedTo?._id === userId;

    const getStatusClass = (status) => {

        switch (status) {

            case "Pending":
                return "pending";

            case "In Progress":
                return "progress";

            case "Submitted":
                return "submitted";

            case "Approved":
                return "approved";

            case "Changes Requested":
                return "changes";

            default:
                return "";

        }

    };

    const getPriorityClass = (priority) => {

        switch (priority) {

            case "Low":
                return "low";

            case "Medium":
                return "medium";

            case "High":
                return "high";

            case "Critical":
                return "critical";

            default:
                return "";

        }

    };

    return (

        <div className="task-card">

            <div className="task-header">

                <div>

                    <h3 className="task-title">

                        {task.title}

                    </h3>

                    <p className="task-description">

                        {task.description || "No description"}

                    </p>

                </div>

                <span
                    className={`task-status ${getStatusClass(task.status)}`}
                >
                    {task.status}
                </span>

            </div>

            <div className="task-info">

                <div className="task-info-item">

                    <span>Assigned To</span>

                    <p>

                        {task.assignedTo?.fullname}

                    </p>

                </div>

                <div className="task-info-item">

                    <span>Priority</span>

                    <p>

                        <span
                            className={`priority ${getPriorityClass(task.priority)}`}
                        >

                            {task.priority}

                        </span>

                    </p>

                </div>

                <div className="task-info-item">

                    <span>Deadline</span>

                    <p>

                        {

                            new Date(
                                task.deadline
                            ).toLocaleDateString()

                        }

                    </p>

                </div>

                <div className="task-info-item">

                    <span>Submitted</span>

                    <p>

                        {

                            task.submittedAt

                                ?

                                new Date(
                                    task.submittedAt
                                ).toLocaleDateString()

                                :

                                "--"

                        }

                    </p>

                </div>

            </div>

            {

                task.reviewComment && (

                    <div className="review-box">

                        <h5>

                            Review Comment

                        </h5>

                        <p>

                            {task.reviewComment}

                        </p>

                    </div>

                )

            }

            <div className="task-actions">

                {

                    isTeamLead && (

                        <>

                            <button
                                className="edit-btn"
                                onClick={() => onEdit(task)}
                            >

                                Edit

                            </button>

                            <button
                                className="delete-btn"
                                onClick={() => onDelete(task)}
                            >

                                Delete

                            </button>

                        </>

                    )

                }

                {

                    isAssignedUser &&

                    task.status === "Pending" && (

                        <button
                            className="start-btn"
                            onClick={() => onStart(task)}
                        >

                            Start Task

                        </button>

                    )

                }

                {

                    isAssignedUser &&

                    (

                        task.status === "In Progress" ||

                        task.status === "Changes Requested"

                    ) && (

                        <button
                            className="submit-btn"
                            onClick={() => onSubmit(task)}
                        >

                            Submit

                        </button>

                    )

                }

                {

                    isTeamLead &&

                    task.status === "Submitted" && (

                        <>

                            <button
                                className="approve-btn"
                                onClick={() => onApprove(task)}
                            >

                                Approve

                            </button>

                            <button
                                className="request-btn"
                                onClick={() => onRequestChanges(task)}
                            >

                                Request Changes

                            </button>

                        </>

                    )

                }

            </div>

        </div>

    );

}

export default TaskCard;