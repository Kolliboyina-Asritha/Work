import "../../css/TeamLeaveTable.css";

function TeamLeaveTable({ data = [] }) {

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-IN");

    return (

        <div className="team-leave-card">

            <h3>Team Leave Requests</h3>

            {

                data.length === 0 ?

                    <p className="no-data">

                        No leave requests found.

                    </p>

                :

                <table className="team-leave-table">

                    <thead>

                        <tr>

                            <th>Employee ID</th>

                            <th>Name</th>

                            <th>Designation</th>

                            <th>Leave Type</th>

                            <th>From</th>

                            <th>To</th>

                            <th>Days</th>

                            <th>Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            data.map((leave) => (

                                <tr key={leave._id}>

                                    <td>{leave.employeeId}</td>

                                    <td>{leave.fullname}</td>

                                    <td>{leave.designation}</td>

                                    <td>{leave.leaveType}</td>

                                    <td>{formatDate(leave.fromDate)}</td>

                                    <td>{formatDate(leave.toDate)}</td>

                                    <td>{leave.days}</td>

                                    <td>

                                        <span
                                            className={`status ${leave.status.toLowerCase()}`}
                                        >

                                            {leave.status}

                                        </span>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            }

        </div>

    );

}

export default TeamLeaveTable;