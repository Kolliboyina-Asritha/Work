import "../../css/SuperAdminProfile.css";

function SuperAdminProfile({ statistics }) {

    if (!statistics) return null;

    return (

        <div className="superadmin-profile">

            <h3>

                Organization Overview

            </h3>

            <div className="superadmin-grid">

                <div className="admin-card">

                    <h2>

                        {statistics.totalEmployees}

                    </h2>

                    <p>

                        Total Employees

                    </p>

                </div>

                <div className="admin-card">

                    <h2>

                        {statistics.activeProjects}

                    </h2>

                    <p>

                        Active Projects

                    </p>

                </div>

                <div className="admin-card">

                    <h2>

                        {statistics.completedProjects}

                    </h2>

                    <p>

                        Completed Projects

                    </p>

                </div>

                <div className="admin-card">

                    <h2>

                        {statistics.attendancePercentage}%

                    </h2>

                    <p>

                        Today's Attendance

                    </p>

                </div>

                <div className="admin-card">

                    <h2>

                        {statistics.averagePerformance}%

                    </h2>

                    <p>

                        Organization Performance

                    </p>

                </div>

            </div>

        </div>

    );

}

export default SuperAdminProfile;