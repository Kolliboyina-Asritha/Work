import "../../css/PerformanceTable.css";

function PerformanceTable({

    performances = [],
    loading

}) {

    if (loading) {

        return (
            <div className="performance-table-loading">
                Loading...
            </div>
        );

    }

    if (performances.length === 0) {

        return (
            <div className="performance-table-loading">
                No Performance Records Found
            </div>
        );

    }

    const getBadgeClass = (score) => {

        if (score >= 85) return "excellent";
        if (score >= 70) return "good";
        if (score >= 50) return "average";
        return "poor";

    };

    return (

        <div className="performance-table-container">

            <table className="performance-table">

                <thead>

                    <tr>

                        <th>Rank</th>

                        <th>Employee</th>

                        <th>Department</th>

                        <th>Attendance</th>

                        <th>Task</th>

                        <th>Deadline</th>

                        <th>Contribution</th>

                        <th>Overall</th>

                    </tr>

                </thead>

                <tbody>

                    {performances.map((performance, index) => (

                        <tr key={performance._id}>

                            <td>

                                #{index + 1}

                            </td>

                            <td>

                                <div className="employee-cell">

                                    <div className="avatar">

                                        {performance.employee?.fullname
                                            ?.charAt(0)
                                            ?.toUpperCase()}

                                    </div>

                                    <div>

                                        <h4>

                                            {performance.employee?.fullname}

                                        </h4>

                                        <p>

                                            {performance.employee?.employeeId}

                                        </p>

                                    </div>

                                </div>

                            </td>

                            <td>

                                {performance.employee?.department}

                            </td>

                            <td>

                                {performance.attendanceScore}%

                            </td>

                            <td>

                                {performance.taskScore}%

                            </td>

                            <td>

                                {performance.deadlineScore}%

                            </td>

                            <td>

                                {performance.contributionScore}%

                            </td>

                            <td>

                                <span

                                    className={`overall-badge ${getBadgeClass(
                                        performance.overallScore
                                    )}`}

                                >

                                    {performance.overallScore}%

                                </span>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default PerformanceTable;