import "../../css/TeamLeadProfile.css";

function TeamLeadProfile({

    projects = [],

    teamMembers = []

}) {

    return (

        <div className="teamlead-profile">

            <section className="profile-section">

                <h3>

                    Managed Projects

                </h3>

                {

                    projects.length === 0 ?

                        (

                            <p className="empty-message">

                                No assigned projects.

                            </p>

                        )

                        :

                        (

                            <div className="project-list">

                                {

                                    projects.map(project => (

                                        <div

                                            key={project._id}

                                            className="project-card"

                                        >

                                            <div className="project-header">

                                                <h4>

                                                    {project.name}

                                                </h4>

                                                <span

                                                    className={`status ${project.status.toLowerCase().replace(/\s/g, "-")}`}

                                                >

                                                    {project.status}

                                                </span>

                                            </div>

                                            <div className="project-meta">

                                                <span>

                                                    <strong>Start:</strong>

                                                    {" "}

                                                    {

                                                        project.startDate

                                                            ?

                                                            new Date(project.startDate).toLocaleDateString()

                                                            :

                                                            "-"

                                                    }

                                                </span>

                                                <span>

                                                    <strong>End:</strong>

                                                    {" "}

                                                    {

                                                        project.endDate

                                                            ?

                                                            new Date(project.endDate).toLocaleDateString()

                                                            :

                                                            "-"

                                                    }

                                                </span>

                                            </div>

                                        </div>

                                    ))

                                }

                            </div>

                        )

                }

            </section>

            <section className="profile-section">

                <h3>

                    Team Members

                </h3>

                {

                    teamMembers.length === 0 ?

                        (

                            <p className="empty-message">

                                No team members assigned.

                            </p>

                        )

                        :

                        (

                            <div className="member-grid">

                                {

                                    teamMembers.map(member => (

                                        <div

                                            key={member._id}

                                            className="member-card"

                                        >

                                            <img

                                                src={
                                                    member.profilePicture ||

                                                    "https://via.placeholder.com/80?text=User"
                                                }

                                                alt={member.fullname}

                                            />

                                            <h4>

                                                {member.fullname}

                                            </h4>

                                            <p>

                                                {member.designation}

                                            </p>

                                            <p>

                                                {member.department}

                                            </p>

                                            <small>

                                                {member.employeeId}

                                            </small>

                                            <small>

                                                {member.email}

                                            </small>

                                        </div>

                                    ))

                                }

                            </div>

                        )

                }

            </section>

        </div>

    );

}

export default TeamLeadProfile;