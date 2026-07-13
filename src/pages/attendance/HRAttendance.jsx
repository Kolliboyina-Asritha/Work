import { useEffect, useState, useCallback } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatsGrid from "../../components/dashboard/StatsGrid";
import AttendanceButtons from "../../components/AttendanceButtons";
import AttendanceTable from "../../components/AttendanceTable";

function HRAttendance() {

    const axiosPrivate = useAxiosPrivate();

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);


    const loadDashboard = useCallback(async (signal) => {

        try {

            const response = await axiosPrivate.get(
                "/attendance/hr-dashboard",
                {
                    signal
                }
            );


            setDashboardData(response.data);


        } 
        catch (err) {

            if (err.name !== "CanceledError") {

                console.log(err);

            }

        } 
        finally {

            if (!signal.aborted) {

                setLoading(false);

            }

        }


    }, [axiosPrivate]);



    useEffect(() => {

        const controller = new AbortController();


        loadDashboard(controller.signal);


        return () => {

            controller.abort();

        };


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
            value: `${dashboardData.cards.averageWorkingHours} hrs`
        },


        {
            title: "Today's Status",
            value: dashboardData.cards.todayStatus || "-"
        }


    ];



    return (

        <>

            <DashboardHeader

                title="HR Attendance"

                subtitle="Manage your attendance and monitor all employees."

            />



            <AttendanceButtons

                onSuccess={() =>
                    loadDashboard(
                        new AbortController().signal
                    )
                }

            />



            <StatsGrid

                cards={cards}

            />



            <AttendanceTable

                data={
                    dashboardData.employeeAttendance || []
                }

            />


        </>

    );

}


export default HRAttendance;