import { useCallback, useEffect, useState } from "react";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatsGrid from "../../components/dashboard/StatsGrid";
import LeaveHistoryTable from "../../components/leave/LeaveHistoryTable";

import "../../css/EmployeeLeave.css";

function SuperAdminLeave() {

    const axiosPrivate = useAxiosPrivate();

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadDashboard = useCallback(async (signal) => {

        try {

            const response = await axiosPrivate.get(
                "/leave-dashboard/superadmin-dashboard",
                { signal }
            );

            setDashboardData(response.data);

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

    const updateStatus = async (leaveId, status) => {

        try {

            await axiosPrivate.put(
                `/leave/${leaveId}/status`,
                { status }
            );

            setLoading(true);

            loadDashboard();

        }

        catch (err) {

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Unable to update leave status."
            );

        }

    };

    if (loading) {

        return <h2 style={{color:"#fff"}}>Loading Leave Dashboard...</h2>;

    }

    if (!dashboardData) {

        return <h2 style={{color:"#fff"}}>Unable to load dashboard.</h2>;

    }

    const cards = [

        {
            title: "Total Employees",
            value: dashboardData.cards.totalEmployees
        },

        {
            title: "Employees On Leave",
            value: dashboardData.cards.employeesOnLeaveToday
        },

        {
            title: "Total Requests",
            value: dashboardData.cards.totalRequests
        },

        {
            title: "Pending Requests",
            value: dashboardData.cards.pendingRequests
        },

        {
            title: "Approved Requests",
            value: dashboardData.cards.approvedRequests
        },

        {
            title: "Rejected Requests",
            value: dashboardData.cards.rejectedRequests
        }

    ];

    return (

        <>

            <DashboardHeader
                title="Super Admin Leave Dashboard"
                subtitle="Monitor and manage all employee leave requests."
            />

            <StatsGrid cards={cards} />

            <LeaveHistoryTable
                data={dashboardData.employeeTable}
                isAdmin={true}
                onApprove={(id) => updateStatus(id, "Approved")}
                onReject={(id) => updateStatus(id, "Rejected")}
            />

        </>

    );

}

export default SuperAdminLeave;