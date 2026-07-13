import "../../css/ProjectSelectorCards.css";

function ProjectSelectorCard({

    project,

    selected,

    onClick

}) {

    return (

        <div
            className={`project-selector-card ${selected ? "selected" : ""}`}
            onClick={onClick}
        >

            <div className="project-card-top">

                <h3>{project.name}</h3>

                <span className="project-status">

                    {project.status}

                </span>

            </div>

            <div className="project-teamlead">

                <small>Team Lead</small>

                <p>

                    {project.teamLead?.fullname || "--"}

                </p>

            </div>

            <div className="project-progress">

                <div className="progress-header">

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

            </div>

        </div>

    );

}

export default ProjectSelectorCard;