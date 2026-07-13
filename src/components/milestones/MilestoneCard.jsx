import "../../css/MilestoneCard.css";

function MilestoneCard({
    milestone,
    canManage,
    onEdit,
    onDelete
}) {

    const getStatusClass = (status) => {

        switch (status) {

            case "Pending":
                return "pending";

            case "In Progress":
                return "progress";

            case "Completed":
                return "completed";

            default:
                return "";

        }

    };

    return (

        <div className="milestone-card">

            <div className="milestone-header">

                <div>

                    <h3>

                        {milestone.title}

                    </h3>

                    <p className="project-name">

                        Project : {milestone.project?.name}

                    </p>

                </div>

                <span
                    className={`milestone-status ${getStatusClass(
                        milestone.status
                    )}`}
                >

                    {milestone.status}

                </span>

            </div>

            <div className="milestone-body">

                <p>

                    {

                        milestone.description ||

                        "No description available."

                    }

                </p>

            </div>

            <div className="milestone-footer">

                <div>

                    <small>

                        Deadline

                    </small>

                    <p>

                        {

                            milestone.deadline ?

                            new Date(
                                milestone.deadline
                            ).toLocaleDateString()

                            :

                            "--"

                        }

                    </p>

                </div>

                {

                    canManage && (

                        <div className="milestone-actions">

                            <button
                                className="edit-btn"
                                onClick={onEdit}
                            >

                                Edit

                            </button>

                            <button
                                className="delete-btn"
                                onClick={onDelete}
                            >

                                Delete

                            </button>

                        </div>

                    )

                }

            </div>

        </div>

    );

}

export default MilestoneCard;