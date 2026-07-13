import "../../css/ProjectSelectorCard.css";

function ProjectSelectorCard({
    project,
    selected,
    onSelect
}) {

    const getStatusClass = (status) => {

        switch (status) {

            case "Planning":
                return "planning";

            case "In Progress":
                return "progress";

            case "Under HR Review":
                return "review";

            case "Completed":
                return "completed";

            default:
                return "";

        }

    };

    return (

        <div
            className={`project-selector-card ${selected ? "selected" : ""}`}
            onClick={() => onSelect(project)}
        >

            <div className="selector-header">

                <h3>{project.name}</h3>

                <span
                    className={`selector-status ${getStatusClass(project.status)}`}
                >
                    {project.status}
                </span>

            </div>

            <p className="selector-description">

                {project.description || "No description available"}

            </p>

            <div className="selector-footer">

                <div>

                    <small>Team Lead</small>

                    <p>{project.teamLead?.fullname}</p>

                </div>

                <div>

                    <small>Milestones</small>

                    <p>

                        {project.completedMilestones || 0} /
                        {" "}
                        {project.totalMilestones || 0}

                    </p>

                </div>

            </div>

        </div>

    );

}

export default ProjectSelectorCard;