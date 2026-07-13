import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsGrid from "../components/dashboard/StatsGrid";
import MilestoneJourney from "../components/dashboard/charts/MilestoneJourney";

function TeamLeadDashboard() {

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

    if (!dashboardData) return <h2>Unable to load dashboard.</h2>;

    const cards = [

        {
            title: "Team Members",
            value: dashboardData.cards.totalTeamMembers
        },

        {
            title: "Assigned Projects",
            value: dashboardData.cards.assignedProjects
        },

        {
            title: "Completed Projects",
            value: dashboardData.cards.completedProjects
        },

        {
            title: "Pending Tasks",
            value: dashboardData.cards.pendingTasks
        },

        {
            title: "Completed Tasks",
            value: dashboardData.cards.completedTasks
        },

        {
            title: "Team Attendance",
            value: `${dashboardData.cards.teamAttendancePercentage}%`
        },

        {
            title: "Team Performance",
            value: `${dashboardData.cards.teamPerformance}%`
        }

    ];

    return (

        <>

            <DashboardHeader
                title="Team Lead Dashboard"
                subtitle="Track your team, projects and milestones."
            />

            <StatsGrid cards={cards} />

            <MilestoneJourney
                data={dashboardData.charts.milestoneJourney}
            />

        </>

    );

}

export default TeamLeadDashboard;