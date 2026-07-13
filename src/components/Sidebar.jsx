import "./Sidebar.css";

import { NavLink, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";
import ROLES from "../config/roles";
import {
    MdDashboard,
    MdOutlineEventAvailable,
    MdEventBusy,
    MdLeaderboard,
    MdCampaign,
    MdLogout
} from "react-icons/md";

import {
    FaUsers,
    FaTasks,
    FaUserCircle
} from "react-icons/fa";

import { BsChatDotsFill } from "react-icons/bs";

function Sidebar() {

    const navigate = useNavigate();
    const logout = useLogout();
   const { auth } = useAuth();

 const canManageEmployees =
    auth?.roles?.includes(ROLES.SuperAdmin) ||
    auth?.roles?.includes(ROLES.HR);
    
    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login", { replace: true });
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (

        <div className="sidebar">

            <div className="sidebar-logo">
                <div className="logo-box"></div>
                <h2>WorkSync</h2>
                
            </div>

            <ul>

                <li>
                    <NavLink to="/dashboard">
                        <MdDashboard />
                        <span>Dashboard</span>
                    </NavLink>
                </li>

                {canManageEmployees && (
                    <li>
                        <NavLink to="/employees">
                            <FaUsers />
                            <span>Employee Management</span>
                        </NavLink>
                    </li>
                )}

                <li>
                    <NavLink to="/attendance">
                        <MdOutlineEventAvailable />
                        <span>Attendance</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/leave">
                        <MdEventBusy />
                        <span>Leave</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/projects">
                        <FaTasks />
                        <span>Projects</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/milestones">
                        <FaTasks />
                        <span>Milestones</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/tasks">
                        <FaTasks />
                        <span>Tasks</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/performance">
                        <MdLeaderboard />
                        <span>Performance</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/leaderboard">
                        <MdLeaderboard />
                        <span>Leaderboard</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/communication">
                        <BsChatDotsFill />
                        <span>Communication</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/announcements">
                        <MdCampaign />
                        <span>Announcements</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/profile">
                        <FaUserCircle />
                        <span>Profile</span>
                    </NavLink>
                </li>

            </ul>

            <div
                className="logout"
                onClick={handleLogout}
                style={{ cursor: "pointer" }}
            >
                <MdLogout />
                <span>Logout</span>
            </div>

        </div>

    );

}

export default Sidebar;