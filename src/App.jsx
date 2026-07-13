import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import PersistLogin from "./components/PersistLogin";
import DashboardLayout from "./layouts/DashboardLayout";
import Attendance from "./pages/Attendance";
import Projects from "./pages/Projects";
import Milestones from "./pages/Milestones";
import Tasks from "./pages/Tasks";
import Performance from "./pages/Performance";
import Leaderboard from "./pages/Leaderboard";
import Communication from "./pages/Communication";
import Announcements from "./pages/Announcements";
import Profile from "./pages/Profile";
import Employees from "./pages/Employees";
import Leave from "./pages/Leave";

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Login />}
            />

            <Route element={<PersistLogin />}>

                <Route element={<ProtectedRoute />}>

                    {/* Layout */}
                    <Route element={<DashboardLayout />}>

                        <Route
                            path="/dashboard"
                            element={<Dashboard />}
                        />
                           <Route path="/employees" element={<Employees />} />
                           <Route path="/attendance" element={<Attendance />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/milestones" element={<Milestones />} />
                            <Route path="/tasks" element={<Tasks />}/>
                            <Route path="/performance" element={<Performance />} />
                            <Route path="/leaderboard" element={<Leaderboard />} />
                            <Route path="/communication" element={<Communication />} />
                            <Route path="/announcements" element={<Announcements />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route  path="/leave" element={<Leave />} />
                        {/* We'll add these later */}
                        {/* <Route path="/attendance" element={<Attendance />} /> */}
                        {/* <Route path="/leave" element={<Leave />} /> */}
                        {/* <Route path="/projects" element={<Projects />} /> */}

                    </Route>

                </Route>

            </Route>

        </Routes>

    );

}

export default App;