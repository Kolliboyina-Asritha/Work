import "../../css/LeaderboardTable.css";

function LeaderboardTable({

    leaderboard,
    loading

}) {

    if (loading) {

        return <h3>Loading...</h3>;

    }

    if (leaderboard.length === 0) {

        return <h3>No leaderboard data found.</h3>;

    }

    return (

        <div className="leaderboard-table-container">

            <table className="leaderboard-table">

                <thead>

                    <tr>

                        <th>Rank</th>

                        <th>Employee</th>

                        <th>Employee ID</th>

                        <th>Designation</th>

                        <th>Attendance</th>

                        <th>Tasks</th>

                        <th>Deadline</th>

                        <th>Contribution</th>

                        <th>Overall</th>

                    </tr>

                </thead>

                <tbody>

                    {leaderboard.map((employee) => (

                        <tr key={employee.employee?._id}>

                            <td>

                                {employee.rank}

                            </td>

                            <td>

                                {employee.employee?.fullname}

                            </td>

                            <td>

                                {employee.employee?.employeeId}

                            </td>

                            <td>

                                {employee.employee?.designation}

                            </td>

                            <td>

                                {employee.attendanceScore}

                            </td>

                            <td>

                                {employee.taskScore}

                            </td>

                            <td>

                                {employee.deadlineScore}

                            </td>

                            <td>

                                {employee.contributionScore}

                            </td>

                            <td>

                                <span
                                    className="overall-score"
                                >

                                    {employee.overallScore}

                                </span>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default LeaderboardTable;