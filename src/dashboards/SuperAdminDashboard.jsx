import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsGrid from "../components/dashboard/StatsGrid";
import AttendanceChart from "../components/dashboard/charts/AttendanceChart";
import TaskChart from "../components/dashboard/charts/TaskChart";
import PerformanceChart from "../components/dashboard/charts/PerformanceChart";

import "../components/dashboard/ChartsGrid.css";
function SuperAdminDashboard() {

    const axiosPrivate = useAxiosPrivate();

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        let isMounted = true;

        const controller = new AbortController();

        const getDashboard = async () => {

            try {

                const response = await axiosPrivate.get(
                    "/dashboard",
                    {
                        signal: controller.signal
                    }
                );

                if (isMounted) {
                    setDashboardData(response.data);
                }

            } catch (err) {

                console.log(err);

            } finally {

                if (isMounted) {
                    setLoading(false);
                }

            }

        };

        getDashboard();

        return () => {

            isMounted = false;
            controller.abort();

        };

    }, [axiosPrivate]);

    if (loading) {
        return <h2>Loading Dashboard...</h2>;
    }

    if (!dashboardData) {
        return <h2>Unable to load dashboard.</h2>;
    }

    const cards = [

        {
            title: "Total Employees",
            value: dashboardData.cards.totalActiveEmployees
        },

        {
            title: "Active Projects",
            value: dashboardData.cards.activeProjects
        },

        {
            title: "Completed Projects",
            value: dashboardData.cards.completedProjects
        },

        {
            title: "Average Performance",
            value: `${dashboardData.cards.averagePerformance}%`
        },

        {
            title: "Today's Attendance",
            value: `${dashboardData.cards.todayAttendancePercentage}%`
        },

        {
            title: "Today's Task Completion",
            value: `${dashboardData.cards.todayTaskCompletionPercentage}%`
        }

    ];
  return (

    <>

        <DashboardHeader
            title="Super Admin Dashboard"
            subtitle="Welcome back! Here's your organization overview."
        />

        <StatsGrid cards={cards} />

        <div className="charts-grid">

            <AttendanceChart
                data={dashboardData.charts.attendanceTrend}
            />

            <TaskChart
                data={dashboardData.charts.taskStatus}
            />

        </div>

        <div className="performance-chart">

            <PerformanceChart
                data={dashboardData.charts.performanceTrend}
            />

        </div>

    </>

);

}

export default SuperAdminDashboard;