import { useCallback, useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatsGrid from "../../components/dashboard/StatsGrid";

import ApplyLeaveModal from "../../components/leave/ApplyLeaveModal";
import LeaveHistoryTable from "../../components/leave/LeaveHistoryTable";

import "../../css/EmployeeLeave.css";

function EmployeeLeave() {

    const axiosPrivate = useAxiosPrivate();

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const loadDashboard = useCallback(async (signal) => {

        try {

            const response = await axiosPrivate.get(
                "/leave-dashboard/employee-dashboard",
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

        return <h2 style={{color:"#fff"}}>Unable to load dashboard.</h2>;

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
        }

    ];

    return (

        <>

            <DashboardHeader
                title="Leave Management"
                subtitle="Apply for leave and track your leave history."
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

            <LeaveHistoryTable
                data={dashboardData.table}
            />

            {

                showModal && (

                    <ApplyLeaveModal

                        onClose={() => setShowModal(false)}

                        onSuccess={() => {

                            setShowModal(false);

                            setLoading(true);

                            loadDashboard();

                        }}

                    />

                )

            }

        </>

    );

}

export default EmployeeLeave;