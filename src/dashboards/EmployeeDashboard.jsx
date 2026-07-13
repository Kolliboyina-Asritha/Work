import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsGrid from "../components/dashboard/StatsGrid";

import TaskChart from "../components/dashboard/charts/TaskChart";
import WeeklyTaskChart from "../components/dashboard/charts/WeeklyTaskChart";

function EmployeeDashboard() {

    const axiosPrivate = useAxiosPrivate();

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        let isMounted = true;

        const controller = new AbortController();

        const getDashboard = async () => {

            try {

                const response = await axiosPrivate.get("/dashboard", {
                    signal: controller.signal
                });

                if (isMounted) {
                    setDashboardData(response.data);
                }

            } catch (err) {
                console.log(err);
            } finally {
                if (isMounted) setLoading(false);
            }

        };

        getDashboard();

        return () => {
            isMounted = false;
            controller.abort();
        };

    }, [axiosPrivate]);

    if (loading) return <h2>Loading Dashboard...</h2>;
    if (!dashboardData) return <h2>No Data</h2>;

    const cards = [

        {
            title: "Total Tasks",
            value: dashboardData.cards.totalTasks
        },
        {
            title: "Completed",
            value: dashboardData.cards.completedTasks
        },
        {
            title: "Pending",
            value: dashboardData.cards.pendingTasks
        },
        {
            
    title: "Attendance Today",
    value: dashboardData.cards.attendanceToday

        },
        {
            title: "Leaves Taken",
            value: dashboardData.cards.leavesTaken
        },
        {
            title: "Performance",
            value: `${dashboardData.cards.performance}%`
        }

    ];

    return (

        <>

            <DashboardHeader
                title="Employee Dashboard"
                subtitle="Track your tasks and performance."
            />

            <StatsGrid cards={cards} />

            <div className="charts-grid">

                <TaskChart data={dashboardData.charts.taskStatus} />

                <WeeklyTaskChart data={dashboardData.charts.weeklyTasks} />

            </div>

        </>

    );

}

export default EmployeeDashboard;