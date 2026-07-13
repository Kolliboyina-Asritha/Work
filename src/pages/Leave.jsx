import useAuth from "../hooks/useAuth";
import ROLES from "../config/roles";

import SuperAdminLeave from "./leave/SuperAdminLeave";
import HRLeave from "./leave/HRLeave";
import TeamLeadLeave from "./leave/TeamLeadLeave";
import EmployeeLeave from "./leave/EmployeeLeave";

function Leave() {

    const { auth } = useAuth();

    const roles = auth?.roles || [];

    if (roles.includes(ROLES.SuperAdmin)) {
        return <SuperAdminLeave />;
    }

    if (roles.includes(ROLES.HR)) {
        return <HRLeave />;
    }

    if (roles.includes(ROLES.TeamLead)) {
        return <TeamLeadLeave />;
    }

    if (
        roles.includes(ROLES.Employee) ||
        roles.includes(ROLES.Intern)
    ) {
        return <EmployeeLeave />;
    }

    return <h2>Unauthorized</h2>;

}

export default Leave;