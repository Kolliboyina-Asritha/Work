import { useEffect, useState, useCallback } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatsGrid from "../../components/dashboard/StatsGrid";
import AttendanceTable from "../../components/AttendanceTable";

function SuperAdminAttendance() {

    const axiosPrivate = useAxiosPrivate();

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadDashboard = useCallback(async (signal) => {

        try {

            const response = await axiosPrivate.get(
                "/attendance/superadmin-dashboard",
                { signal }
            );

            setDashboard(response.data);

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

    if (!dashboard)
        return <h2>No Attendance Data</h2>;

    const cards = [

        {
            title: "Total Employees",
            value: dashboard.cards.totalEmployees
        },

        {
            title: "Present Today",
            value: dashboard.cards.presentToday
        },

        {
            title: "Late Today",
            value: dashboard.cards.lateToday
        },

        {
            title: "On Leave",
            value: dashboard.cards.leaveToday
        },

        {
            title: "Absent Today",
            value: dashboard.cards.absentToday
        }

    ];

    return (

        <>

            <DashboardHeader
                title="Attendance Management"
                subtitle="View attendance of all employees."
            />

            <StatsGrid cards={cards} />

            <AttendanceTable
                data={dashboard.employeeTable}
            />

        </>

    );

}

export default SuperAdminAttendance;