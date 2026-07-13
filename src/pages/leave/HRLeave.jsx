import { useCallback, useEffect, useState } from "react";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatsGrid from "../../components/dashboard/StatsGrid";

import ApplyLeaveModal from "../../components/leave/ApplyLeaveModal";
import LeaveHistoryTable from "../../components/leave/LeaveHistoryTable";

import "../../css/EmployeeLeave.css";

function HRLeave() {

    const axiosPrivate = useAxiosPrivate();

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const loadDashboard = useCallback(async (signal) => {

        try {

            const response = await axiosPrivate.get(
                "/leave-dashboard/hr-dashboard",
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

    const updateLeaveStatus = async (leaveId, status) => {

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

        return <h2 style={{color:"#fff"}}>No Leave Data Found.</h2>;

    }

    const cards = [

        {
            title: "My Pending",
            value: dashboardData.cards.myPending
        },

        {
            title: "My Approved",
            value: dashboardData.cards.myApproved
        },

        {
            title: "My Rejected",
            value: dashboardData.cards.myRejected
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
                title="HR Leave Management"
                subtitle="Manage your leave and employee leave requests."
            />

            <div className="leave-header">

                <button
                    className="apply-leave-btn"
                    onClick={() => setShowModal(true)}
                >
                    Apply Leave
                </button>

            </div>

            <StatsGrid cards={cards} />
             <br></br>
            <h3 style={{color:"#fff"}}>My Leave History</h3>

            <LeaveHistoryTable
                data={dashboardData.myTable}
            />
<br></br>
            <h3 style={{ marginTop: "30px",color:"#fff" }}>
                Employee Leave Requests
            </h3>

            <LeaveHistoryTable
                data={dashboardData.employeeTable}
                isAdmin={true}
                onApprove={(id) =>
                    updateLeaveStatus(id, "Approved")
                }
                onReject={(id) =>
                    updateLeaveStatus(id, "Rejected")
                }
            />

            {

                showModal &&

                <ApplyLeaveModal

                    onClose={() => setShowModal(false)}

                    onSuccess={() => {

                        setShowModal(false);

                        setLoading(true);

                        loadDashboard();

                    }}

                />

            }

        </>

    );

}

export default HRLeave;