import { useEffect, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";

import "../css/Employee.css";

import useAxiosPrivate from "../hooks/useAxiosPrivate";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import EmployeeTable from "../components/employees/EmployeeTable";
import EmployeeFormModal from "../components/employees/EmployeeFormModal";

function Employees() {

    const axiosPrivate = useAxiosPrivate();

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const fetchEmployees = async () => {
        try {
            const response = await axiosPrivate.get("/emp");
            setEmployees(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleCreate = () => {
        setSelectedEmployee(null);
        setShowModal(true);
    };

    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedEmployee(null);
    };

    const filteredEmployees = employees.filter(emp =>
        emp.fullname.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="employees-page">

            <DashboardHeader title="Employees" />

            <div className="employees-toolbar">

                <div className="employee-search">
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Search employee..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <button
                    className="create-employee-btn"
                    onClick={handleCreate}
                >
                    <FaPlus />
                    Create Employee
                </button>

            </div>

            {loading ? (
                <p>Loading employees...</p>
            ) : (
                <EmployeeTable
                    employees={filteredEmployees}
                    onEdit={handleEdit}
                />
            )}

            {showModal && (
                <EmployeeFormModal
                    employee={selectedEmployee}
                    onClose={closeModal}
                    onSuccess={() => {
                        fetchEmployees();
                        closeModal();
                    }}
                />
            )}

        </div>
    );
}

export default Employees;