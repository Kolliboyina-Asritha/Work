import "../../css/EmployeeTable.css";
// or "../../css/EmployeeTable.css"
// (use the path that matches your project structure)

function EmployeeTable({ employees, onEdit }) {

    if (employees.length === 0) {
        return (
            <div className="employee-table-empty">
                No employees found.
            </div>
        );
    }

    return (
        <div className="employee-table-container">

            <table className="employee-table">

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Employee ID</th>
                        <th>Department</th>
                        <th>Designation</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {employees.map((employee) => (

                        <tr key={employee._id}>

                            <td>{employee.fullname}</td>

                            <td>{employee.employeeId}</td>

                            <td>{employee.department}</td>

                            <td>{employee.designation}</td>

                            <td>{employee.phoneNumber}</td>

                            <td>
                                <span
                                    className={
                                        employee.isActive
                                            ? "status-active"
                                            : "status-inactive"
                                    }
                                >
                                    {employee.isActive ? "Active" : "Inactive"}
                                </span>
                            </td>

                            <td>

                                <button
                                    className="edit-btn"
                                    onClick={() => onEdit(employee)}
                                >
                                    Edit
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default EmployeeTable;