import "../../css/EmployeeProfile.css";

function EmployeeProfile({

    tasks = [],

    achievements = []

}) {

    return (

        <div className="employee-profile">

            <section className="profile-section">

                <h3>Assigned Tasks</h3>

                {

                    tasks.length === 0 ?

                        (

                            <p className="empty-message">

                                No assigned tasks.

                            </p>

                        )

                        :

                        (

                            <div className="task-list">

                                {

                                    tasks.map(task => (

                                        <div
                                            key={task._id}
                                            className="task-card"
                                        >

                                            <div className="task-header">

                                                <h4>

                                                    {task.title}

                                                </h4>

                                                <span
                                                    className={`status ${task.status.toLowerCase().replace(/\s/g, "-")}`}
                                                >

                                                    {task.status}

                                                </span>

                                            </div>

                                            <p>

                                                {task.description}

                                            </p>

                                            <div className="task-meta">

                                                <span>

                                                    <strong>Priority:</strong>

                                                    {" "}

                                                    {task.priority}

                                                </span>

                                                <span>

                                                    <strong>Deadline:</strong>

                                                    {" "}

                                                    {

                                                        task.deadline

                                                            ?

                                                            new Date(task.deadline).toLocaleDateString()

                                                            :

                                                            "-"

                                                    }

                                                </span>

                                            </div>

                                            <div className="task-meta">

                                                <span>

                                                    <strong>Assigned By:</strong>

                                                    {" "}

                                                    {task.assignedBy?.fullname || "-"}

                                                </span>

                                            </div>

                                            {

                                                task.milestone &&

                                                <div className="task-meta">

                                                    <span>

                                                        <strong>Project:</strong>

                                                        {" "}

                                                        {

                                                            task.milestone.project?.name

                                                        }

                                                    </span>

                                                    <span>

                                                        <strong>Milestone:</strong>

                                                        {" "}

                                                        {

                                                            task.milestone.title

                                                        }

                                                    </span>

                                                </div>

                                            }

                                        </div>

                                    ))

                                }

                            </div>

                        )

                }

            </section>

            <section className="profile-section">

                <h3>

                    Achievements

                </h3>

                {

                    achievements.length === 0 ?

                        (

                            <p className="empty-message">

                                No achievements yet.

                            </p>

                        )

                        :

                        (

                            <div className="achievement-list">

                                {

                                    achievements.map((achievement, index) => (

                                        <div
                                            key={index}
                                            className="achievement-card"
                                        >

                                            <h2>

                                                {achievement.badge}

                                            </h2>

                                            <h4>

                                                {achievement.title}

                                            </h4>

                                            <p>

                                                Rank #

                                                {achievement.rank}

                                            </p>

                                            <p>

                                                Score :

                                                {" "}

                                                {achievement.overallScore}

                                            </p>

                                            <p>

                                                {

                                                    achievement.month

                                                }

                                                /

                                                {

                                                    achievement.year

                                                }

                                            </p>

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

export default EmployeeProfile;