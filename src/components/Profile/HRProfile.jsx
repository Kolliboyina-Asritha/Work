import "../../css/HRProfile.css";

function HRProfile({ statistics }) {

    if (!statistics) return null;

    return (

        <div className="hr-profile">

            <h3>

                HR Overview

            </h3>

            <div className="hr-grid">

                <div className="hr-card">

                    <h2>

                        {statistics.totalEmployees}

                    </h2>

                    <p>

                        Total Employees

                    </p>

                </div>

                <div className="hr-card">

                    <h2>

                        {statistics.presentToday}

                    </h2>

                    <p>

                        Present Today

                    </p>

                </div>

                <div className="hr-card">

                    <h2>

                        {statistics.pendingLeaveRequests}

                    </h2>

                    <p>

                        Pending Leave Requests

                    </p>

                </div>

                <div className="hr-card">

                    <h2>

                        {statistics.employeesOnLeaveToday}

                    </h2>

                    <p>

                        Employees On Leave

                    </p>

                </div>

                <div className="hr-card">

                    <h2>

                        {statistics.averagePerformance}%

                    </h2>

                    <p>

                        Average Performance

                    </p>

                </div>

            </div>

        </div>

    );

}

export default HRProfile;