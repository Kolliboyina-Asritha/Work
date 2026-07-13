import { useEffect, useState } from "react";

import "../css/Performance.css";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

import ROLES from "../config/roles";

import PerformanceSummaryCards from "../components/performance/PerformanceSummaryCards";
import PerformanceFilter from "../components/performance/PerformanceFilter";
import PerformanceTable from "../components/performance/PerformanceTable";

function Performance() {

    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();

    const today = new Date();

    const [month, setMonth] = useState(today.getMonth() + 1);
    const [year, setYear] = useState(today.getFullYear());

    const [performances, setPerformances] = useState([]);
    const [summary, setSummary] = useState({});
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("");

    useEffect(() => {
        loadPerformance();
    }, [month, year]);

    const loadPerformance = async () => {

        try {

            setLoading(true);

            const roles = Object.values(auth.roles);

            let response;

            // ==========================
            // HR / SUPER ADMIN
            // ==========================
            if (
                roles.includes(ROLES.SuperAdmin) ||
                roles.includes(ROLES.HR)
            ) {

                response = await axiosPrivate.get(
                    `/performance?month=${month}&year=${year}`
                );

                setPerformances(response.data.performances || []);

                setSummary({
                    averagePerformance: response.data.averagePerformance,
                    totalEmployees: response.data.totalEmployees
                });

            }

            // ==========================
            // TEAM LEAD
            // ==========================
            else if (roles.includes(ROLES.TeamLead)) {

                response = await axiosPrivate.get(
                    `/performance/team?month=${month}&year=${year}`
                );

                setPerformances(response.data.performances || []);

                setSummary({
                    teamAveragePerformance:
                        response.data.teamAveragePerformance,

                    teamLeadPerformance:
                        response.data.teamLeadPerformance,

                    totalMembers:
                        response.data.totalMembers
                });

            }

            // ==========================
            // EMPLOYEE / INTERN
            // ==========================
            else {

                response = await axiosPrivate.get(
                    `/performance/me?month=${month}&year=${year}`
                );

                setPerformances(
                    response.data.performance
                        ? [response.data.performance]
                        : []
                );

                setSummary(
                    response.data.statistics || {}
                );

            }

        }

        catch (err) {

            console.error(err);

            setPerformances([]);
            setSummary({});

        }

        finally {

            setLoading(false);

        }

    };

    // ==========================
    // Filter
    // ==========================

    const filteredPerformances = Array.isArray(performances)
        ? performances.filter((performance) => {

            const matchesSearch =
                search === "" ||
                performance.employee?.fullname
                    ?.toLowerCase()
                    .includes(search.toLowerCase());

            const matchesDepartment =
                department === "" ||
                performance.employee?.department === department;

            return matchesSearch && matchesDepartment;

        })
        : [];

    return (

        <div className="performance-page">

            <h2>Performance Management</h2>

            <PerformanceFilter

                month={month}
                year={year}

                setMonth={setMonth}
                setYear={setYear}

                search={search}
                setSearch={setSearch}

                department={department}
                setDepartment={setDepartment}

            />

            <PerformanceSummaryCards

                summary={summary}
                performances={filteredPerformances}

            />

            <PerformanceTable

                performances={filteredPerformances}
                loading={loading}

            />

        </div>

    );

}

export default Performance;