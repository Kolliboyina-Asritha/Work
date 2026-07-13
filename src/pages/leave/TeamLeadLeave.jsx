import { useCallback, useEffect, useState } from "react";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatsGrid from "../../components/dashboard/StatsGrid";

import ApplyLeaveModal from "../../components/leave/ApplyLeaveModal";
import LeaveHistoryTable from "../../components/leave/LeaveHistoryTable";

import "../../css/EmployeeLeave.css";

function TeamLeadLeave() {

    const axiosPrivate = useAxiosPrivate();

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const loadDashboard = useCallback(async (signal) => {

        try {

            const response = await axiosPrivate.get(
                "/leave-dashboard/teamlead-dashboard",
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

    if (loading) {

        return <h2 style={{color:"#fff"}}>Loading Leave Dashboard...</h2>;

    }

    if (!dashboardData) {

        return <h2 style={{color:"#fff"}}>No Leave Data Found.</h2>;

    }

    const cards = [

        {
            title: "CL Balance",
            value: dashboardData.cards.CL
        },

        {
            title: "SL Balance",
            value: dashboardData.cards.SL
        },

        {
            title: "PL Balance",
            value: dashboardData.cards.PL
        },

        {
            title: "Total Balance",
            value: dashboardData.cards.totalBalance
        },

       

        {
            title: "Used Leaves",
            value: dashboardData.cards.used
        },

        {
            title: "Pending",
            value: dashboardData.cards.pending
        },

        {
            title: "Approved",
            value: dashboardData.cards.approved
        },

        {
            title: "Rejected",
            value: dashboardData.cards.rejected
        },

        {
            title: "Team Pending",
            value: dashboardData.cards.teamPending
        },

        {
            title: "Team Approved",
            value: dashboardData.cards.teamApproved
        },

        {
            title: "Team Rejected",
            value: dashboardData.cards.teamRejected
        }

    ];

    return (

        <>

            <DashboardHeader
                title="Team Lead Leave Management"
                subtitle="Track your leaves and monitor your team's leave requests."
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
            <h3 style={{ marginTop: "30px" ,color:"#fff"}}>
                Team Leave Requests
            </h3>

            <LeaveHistoryTable
                data={dashboardData.teamTable}
                isAdmin={true}
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

export default TeamLeadLeave;