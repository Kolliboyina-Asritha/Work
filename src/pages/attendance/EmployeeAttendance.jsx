import { useEffect, useState, useCallback } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatsGrid from "../../components/dashboard/StatsGrid";
import AttendanceButtons from "../../components/AttendanceButtons";
import "../../css/EmployeeAttendance.css";
function EmployeeAttendance() {

    const axiosPrivate = useAxiosPrivate();

    const [dashboardData, setDashboardData] = useState(null);
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadDashboard = useCallback(async (signal) => {

        try {

            const [dashboard, history] = await Promise.all([

                axiosPrivate.get(
                    "/attendance/employee-dashboard",
                    { signal }
                ),

                axiosPrivate.get(
                    "/attendance/my-attendance",
                    { signal }
                )

            ]);

            setDashboardData(dashboard.data);
            setAttendance(history.data);

        }

        catch (err) {

            if (err.name !== "CanceledError") {
                console.log(err);
            }

        }

        finally {

            setLoading(false);

        }

    }, [axiosPrivate]);

    useEffect(() => {

        const controller = new AbortController();

        loadDashboard(controller.signal);

        return () => controller.abort();

    }, [loadDashboard]);

    if (loading)
        return <h2>Loading Attendance...</h2>;

    if (!dashboardData)
        return <h2>No Attendance Data</h2>;

    const cards = [

        {
            title: "Attendance %",
            value: `${dashboardData.cards.attendancePercentage}%`
        },

        {
            title: "Present Days",
            value: dashboardData.cards.presentDays
        },

        {
            title: "Absent Days",
            value: dashboardData.cards.absentDays
        },

        {
            title: "Leave Days",
            value: dashboardData.cards.leaveDays
        },

        {
            title: "Avg Working Hours",
            value: dashboardData.cards.averageWorkingHours
        },

        {
            title: "Today's Status",
            value: dashboardData.cards.todayStatus
        }

    ];

    return (

        <>

            <DashboardHeader
                title="Attendance"
                subtitle="View your attendance details."
            />

            <AttendanceButtons
                onSuccess={() => loadDashboard()}
            />

            <StatsGrid cards={cards} />

            <div className="dashboard-card">

                <h2>Attendance History</h2>

                <table className="attendance-table">

                    <thead>

                        <tr>

                            <th>Date</th>
                            <th>Check In</th>
                            <th>Check Out</th>
                            <th>Hours</th>
                            <th>Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {attendance.map(record => (

                            <tr key={record._id}>

                                <td>
                                    {new Date(record.date).toLocaleDateString()}
                                </td>

                                <td>
                                    {record.checkIn
                                        ? new Date(record.checkIn).toLocaleTimeString()
                                        : "-"}
                                </td>

                                <td>
                                    {record.checkOut
                                        ? new Date(record.checkOut).toLocaleTimeString()
                                        : "-"}
                                </td>

                                <td>
                                    {(record.totalHours || 0).toFixed(2)}
                                </td>

                                <td>{record.status}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </>

    );

}

export default EmployeeAttendance;