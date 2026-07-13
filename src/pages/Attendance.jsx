import useAuth from "../hooks/useAuth";
import ROLES from "../config/roles";

import SuperAdminAttendance from "../pages/attendance/SuperAdminAttendance";
import HRAttendance from "../pages/attendance/HRAttendance";
import TeamLeadAttendance from "../pages/attendance/TeamLeadAttendance";
import EmployeeAttendance from "../pages/attendance/EmployeeAttendance";

function Attendance() {

    const { auth } = useAuth();

    const roles = auth?.roles || [];

    if (roles.includes(ROLES.SuperAdmin)) {
        return <SuperAdminAttendance />;
    }

    if (roles.includes(ROLES.HR)) {
        return <HRAttendance />;
    }

    if (roles.includes(ROLES.TeamLead)) {
        return <TeamLeadAttendance />;
    }

    if (
        roles.includes(ROLES.Employee) ||
        roles.includes(ROLES.Intern)
    ) {
        return <EmployeeAttendance />;
    }

    return <h2>Unauthorized</h2>;

}

export default Attendance;