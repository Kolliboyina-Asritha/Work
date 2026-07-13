import useAuth from "../hooks/useAuth";
import ROLES from "../config/roles";

import SuperAdminDashboard from "../dashboards/SuperAdminDashboard";
import HRDashboard from "../dashboards/HRDashboard";
import TeamLeadDashboard from "../dashboards/TeamLeadDashboard";
import EmployeeDashboard from "../dashboards/EmployeeDashboard";

function Dashboard() {

    const { auth } = useAuth();

    const roles = auth?.roles || [];

    if (roles.includes(ROLES.SuperAdmin)) {
        return <SuperAdminDashboard />;
    }

    if (roles.includes(ROLES.HR)) {
        return <HRDashboard />;
    }

    if (roles.includes(ROLES.TeamLead)) {
        return <TeamLeadDashboard />;
    }

    if (
        roles.includes(ROLES.Employee) ||
        roles.includes(ROLES.Intern)
    ) {
        return <EmployeeDashboard />;
    }

    return <h2>Unauthorized</h2>;
}

export default Dashboard;