import "../../css/ProjectCard.css";

import useAuth from "../../hooks/useAuth";
import ROLES from "../../config/roles";

function ProjectCard({ project, onUpdateStatus }) {

    const { auth } = useAuth();

    const roles = auth?.roles || [];

    const isAdmin =
        roles.includes(ROLES.SuperAdmin) ||
        roles.includes(ROLES.HR);

    const isTeamLead =
        roles.includes(ROLES.TeamLead);

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

        <div className="project-card">

            <div className="project-header">

                <h3>{project.name}</h3>

                <span
                    className={`status ${getStatusClass(project.status)}`}
                >
                    {project.status}
                </span>

            </div>

            <p className="description">

                {project.description || "No description available."}

            </p>

            <div className="progress-section">

                <div className="progress-info">

                    <span>Progress</span>

                    <span>{project.progress}%</span>

                </div>

                <div className="progress-bar">

                    <div
                        className="progress-fill"
                        style={{
                            width: `${project.progress}%`
                        }}
                    />

                </div>

                <small>

                    {project.completedMilestones} / {project.totalMilestones} Milestones Completed

                </small>

            </div>

            <div className="project-details">

                <div>

                    <span className="label">

                        Team Lead

                    </span>

                    <p>

                        {project.teamLead?.fullname || "--"}

                    </p>

                </div>

                <div>

                    <span className="label">

                        Start Date

                    </span>

                    <p>

                        {
                            project.startDate
                                ? new Date(project.startDate).toLocaleDateString()
                                : "--"
                        }

                    </p>

                </div>

                <div>

                    <span className="label">

                        End Date

                    </span>

                    <p>

                        {
                            project.endDate
                                ? new Date(project.endDate).toLocaleDateString()
                                : "--"
                        }

                    </p>

                </div>

            </div>

            {(isAdmin || isTeamLead) && (

                <div className="project-actions">

                    <button
                        className="status-btn"
                        onClick={() => onUpdateStatus(project)}
                    >

                        Update Status

                    </button>

                </div>

            )}

        </div>

    );

}

export default ProjectCard;