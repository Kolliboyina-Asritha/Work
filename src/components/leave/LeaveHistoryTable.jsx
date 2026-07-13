import "../../css/LeaveHistoryTable.css";

function LeaveHistoryTable({

    data = [],

    isAdmin = false,

    onApprove,

    onReject

}) {

    if (!data.length) {

        return (

            <div className="leave-table-container">

                <p>No leave records found.</p>

            </div>

        );

    }

    const formatDate = (date) => {

        return new Date(date).toLocaleDateString("en-IN");

    };

    return (

        <div className="leave-table-container">

            <table className="leave-table">

                <thead>

                    <tr>

                        {isAdmin && <th>Employee ID</th>}

                        {isAdmin && <th>Name</th>}

                        {isAdmin && <th>Department</th>}

                        {isAdmin && <th>Designation</th>}

                        <th>Leave Type</th>

                        <th>From</th>

                        <th>To</th>

                        <th>Days</th>

                        <th>Reason</th>

                        <th>Status</th>

                        {isAdmin && <th>Action</th>}

                    </tr>

                </thead>

                <tbody>

                    {data.map((leave) => {

                        const id = leave._id || leave.id;

                        const days =
                            leave.days ??
                            (
                                Math.floor(
                                    (
                                        new Date(leave.toDate) -
                                        new Date(leave.fromDate)
                                    ) /
                                    (1000 * 60 * 60 * 24)
                                ) + 1
                            );

                        return (

                            <tr key={id}>

                                {isAdmin && (

                                    <td>

                                        {leave.employeeId ?? leave.employee?.employeeId ?? "-"}
                                    </td>

                                )}

                                {isAdmin && (

                                    <td>

                                        {leave.fullname ?? leave.employee?.fullname ?? "-"}

                                    </td>

                                )}

                                {isAdmin && (

                                    <td>

                                        {leave.department ?? leave.employee?.department ?? "-"}

                                    </td>

                                )}

                                {isAdmin && (

                                    <td>

                                        {leave.designation ?? leave.employee?.designation ?? "-"}

                                    </td>

                                )}

                                <td>{leave.leaveType}</td>

                                <td>{formatDate(leave.fromDate)}</td>

                                <td>{formatDate(leave.toDate)}</td>

                                <td>{days}</td>

                                <td>{leave.reason}</td>

                                <td>

                                    <span
                                        className={`status ${leave.status.toLowerCase()}`}
                                    >

                                        {leave.status}

                                    </span>

                                </td>

                                {isAdmin && (

                                    <td>

                                        {

                                            leave.status === "Pending"

                                                ?

                                                <div className="action-buttons">

                                                    <button

                                                        className="approve-btn"

                                                        onClick={() => onApprove(id)}

                                                    >

                                                        Approve

                                                    </button>

                                                    <button

                                                        className="reject-btn"

                                                        onClick={() => onReject(id)}

                                                    >

                                                        Reject

                                                    </button>

                                                </div>

                                                :

                                                <span>-</span>

                                        }

                                    </td>

                                )}

                            </tr>

                        );

                    })}

                </tbody>

            </table>

        </div>

    );

}

export default LeaveHistoryTable;