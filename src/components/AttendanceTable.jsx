import "./AttendanceTable.css";

function AttendanceTable({ data = [] }) {

    if (!data.length) {
        return (
            <div className="table-card">
                <h3>No Attendance Data</h3>
            </div>
        );
    }

    return (

        <div className="table-card">

            <h3>Employee Attendance</h3>

            <table className="attendance-table">

                <thead>

                    <tr>

                        <th>Employee ID</th>

                        <th>Name</th>

                        <th>Designation</th>

                        <th>Department</th>

                        <th>Present</th>

                        <th>Late</th>

                        <th>Absent</th>

                        <th>Leaves</th>

                        <th>Avg Hours</th>

                        <th>Today</th>

                    </tr>

                </thead>

                <tbody>

                    {data.map((emp) => (

                        <tr key={emp.employeeId}>

                            <td>{emp.employeeId}</td>

                            <td>{emp.fullname}</td>

                            <td>{emp.designation}</td>

                            <td>{emp.department || "-"}</td>

                            <td>{emp.presentDays}</td>

                            <td>{emp.lateDays}</td>

                            <td>{emp.absentDays}</td>

                            <td>{emp.leaveDays}</td>

                            <td> {emp.averageWorkingHours || 0} hrs</td>

                            <td>

                                <span
                                    className={`status ${emp.todayStatus
                                        ?.toLowerCase()
                                        .replace(/\s/g, "-")}`}
                                >
                                    {emp.todayStatus}
                                </span>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default AttendanceTable;