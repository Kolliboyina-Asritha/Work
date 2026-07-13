import { useEffect, useState } from "react";

import "../../css/EmployeeFormModal.css";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import ROLES from "../../config/roles";

function EmployeeFormModal({

    employee,

    onClose,

    onSuccess

}) {

    const axiosPrivate = useAxiosPrivate();

    const isEdit = !!employee;

    const [fullname, setFullname] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [department, setDepartment] = useState("General");
    const [designation, setDesignation] = useState("Employee");

    const [role, setRole] = useState("Employee");

    const [reportingManager, setReportingManager] = useState("");

    const [managers, setManagers] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const fetchManagers = async () => {

            try {

                const response = await axiosPrivate.get("/teamleads");

                setManagers(response.data);

            } catch (err) {

                console.error(err);

            }

        };

        fetchManagers();

        if (employee) {

            setFullname(employee.fullname || "");
            setEmployeeId(employee.employeeId || "");
            setEmail(employee.email || "");
            setPhoneNumber(employee.phoneNumber || "");

            setDepartment(employee.department || "General");
            setDesignation(employee.designation || "Employee");

            setReportingManager(employee.reportingManager?._id || "");

            if (employee.roles?.HR) {

                setRole("HR");

            } else if (employee.roles?.TeamLead) {

                setRole("TeamLead");

            } else if (employee.roles?.Intern) {

                setRole("Intern");

            } else {

                setRole("Employee");

            }

        }

    }, [employee, axiosPrivate]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            let roles = {};

            switch (role) {

                case "HR":
                    roles = { HR: ROLES.HR };
                    break;

                case "TeamLead":
                    roles = { TeamLead: ROLES.TeamLead };
                    break;

                case "Intern":
                    roles = { Intern: ROLES.Intern };
                    break;

                default:
                    roles = { Employee: ROLES.Employee };

            }

            if (isEdit) {

                await axiosPrivate.put(`/emp/${employee._id}`, {

                    fullname,

                    employeeId,

                    email,

                    phoneNumber,

                    department,

                    designation,

                    reportingManager: reportingManager || null,

                    roles

                });

            } else {

                await axiosPrivate.post("/register", {

                    fullname,

                    employeeId,

                    email,

                    password,

                    phoneNumber,

                    department,

                    designation,

                    reportingManager: reportingManager || null,

                    role

                });

            }

            onSuccess();

        }

        catch (err) {

            console.error(err);

            alert(

                err.response?.data?.message ||

                "Operation failed"

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="employee-modal-overlay">

            <div className="employee-modal">

                <h2>

                    {isEdit
                        ? "Edit Employee"
                        : "Create Employee"}

                </h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder="Full Name"
                        value={fullname}
                        onChange={(e) =>
                            setFullname(e.target.value)
                        }
                        required
                    />

                    <input
                        type="text"
                        placeholder="Employee ID"
                        value={employeeId}
                        onChange={(e) =>
                            setEmployeeId(e.target.value)
                        }
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    {!isEdit && (

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                    )}

                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) =>
                            setPhoneNumber(e.target.value)
                        }
                        required
                    />

                    <input
                        type="text"
                        placeholder="Department"
                        value={department}
                        onChange={(e) =>
                            setDepartment(e.target.value)
                        }
                    />

                    <input
                        type="text"
                        placeholder="Designation"
                        value={designation}
                        onChange={(e) =>
                            setDesignation(e.target.value)
                        }
                    />

                    <select
                        value={role}
                        onChange={(e) =>
                            setRole(e.target.value)
                        }
                    >

                        <option value="Employee">
                            Employee
                        </option>

                        <option value="Intern">
                            Intern
                        </option>

                        <option value="TeamLead">
                            Team Lead
                        </option>

                        <option value="HR">
                            HR
                        </option>

                    </select>

                    <select
                        value={reportingManager}
                        onChange={(e) =>
                            setReportingManager(e.target.value)
                        }
                    >

                        <option value="">
                            Reporting Manager (Optional)
                        </option>

                        {managers.map((manager) => (

                            <option
                                key={manager._id}
                                value={manager._id}
                            >
                                {manager.fullname} - {manager.designation} ({manager.employeeId})
                            </option>

                        ))}

                    </select>

                    <div className="employee-modal-buttons">

                        <button
                            type="button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                        >

                            {loading
                                ? "Saving..."
                                : isEdit
                                    ? "Save Changes"
                                    : "Create Employee"}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EmployeeFormModal;