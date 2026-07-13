import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

import "../css/Tasks.css";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

import ROLES from "../config/roles";

import ProjectSelectorCard from "../components/tasks/ProjectSelectorCard";
import MilestoneSelectorCard from "../components/tasks/MilestoneSelectorCard";
import TaskCard from "../components/tasks/TaskCard";

import CreateTaskModal from "../components/tasks/CreateTaskModal";
import EditTaskModal from "../components/tasks/EditTaskModal";
function Tasks() {

    const axiosPrivate = useAxiosPrivate();

    const { auth } = useAuth();

    const roles = auth?.roles || [];

    // ==========================
    // Role Checks
    // ==========================

    const isAdmin =
        roles.includes(ROLES.SuperAdmin) ||
        roles.includes(ROLES.HR);

    const isTeamLead =
        roles.includes(ROLES.TeamLead);

    const isEmployee =
        roles.includes(ROLES.Employee);

    const isIntern =
        roles.includes(ROLES.Intern);

    // ==========================
    // States
    // ==========================

    const [projects, setProjects] = useState([]);

    const [selectedProject, setSelectedProject] = useState(null);

    const [milestones, setMilestones] = useState([]);

    const [selectedMilestone, setSelectedMilestone] = useState(null);

    const [tasks, setTasks] = useState([]);

    const [loadingProjects, setLoadingProjects] = useState(true);

    const [loadingMilestones, setLoadingMilestones] = useState(false);

    const [loadingTasks, setLoadingTasks] = useState(false);

    const [search, setSearch] = useState("");

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [selectedTask, setSelectedTask] = useState(null);

    // ==========================
    // Fetch Projects
    // ==========================

    const fetchProjects = async () => {

        try {

            setLoadingProjects(true);

            const response = await axiosPrivate.get("/projects");

            setProjects(response.data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoadingProjects(false);

        }

    };

    // ==========================
    // Fetch Milestones
    // ==========================

    const fetchMilestones = async (projectId) => {

        try {

            setLoadingMilestones(true);

            const response = await axiosPrivate.get(
                `/milestones/project/${projectId}`
            );

            setMilestones(response.data);

            setSelectedMilestone(null);

            setTasks([]);

        } catch (err) {

            console.error(err);

        } finally {

            setLoadingMilestones(false);

        }

    };

    // ==========================
    // Fetch Tasks
    // ==========================

    const fetchTasks = async (milestoneId) => {

        try {

            setLoadingTasks(true);

            const response = await axiosPrivate.get(
                `/task/milestone/${milestoneId}`
            );

            setTasks(response.data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoadingTasks(false);

        }

    };

    // ==========================
    // Initial Load
    // ==========================

    useEffect(() => {

        fetchProjects();

    }, []);

    // ==========================
    // Handlers
    // ==========================

    const handleProjectSelect = async (project) => {

        setSelectedProject(project);

        setSelectedMilestone(null);

        setTasks([]);

        await fetchMilestones(project._id);

    };

    const handleMilestoneSelect = async (milestone) => {

        setSelectedMilestone(milestone);

        await fetchTasks(milestone._id);

    };
         const handleEdit = (task) => {

            setSelectedTask(task);

            setShowEditModal(true);

        };

        const handleDelete = async (task) => {

            if (!window.confirm("Delete this task?")) return;

            try {

                await axiosPrivate.delete(`/task/${task._id}`);

                fetchTasks(selectedMilestone._id);

            } catch (err) {

                console.error(err);

            }

        };

        const handleStart = async (task) => {

            try {

                await axiosPrivate.patch(
                    `/task/${task._id}/start`
                );

                fetchTasks(selectedMilestone._id);

            } catch (err) {

                console.error(err);

                alert(err.response?.data?.message);

            }

        };

        const handleSubmit = async (task) => {

            const deliverableUrl = prompt("Enter Deliverable URL");

            if (!deliverableUrl) return;

            try {

                await axiosPrivate.patch(

                    `/task/${task._id}/submit`,

                    {

                        deliverableUrl

                    }

                );

                fetchTasks(selectedMilestone._id);

            } catch (err) {

                console.error(err);

                alert(err.response?.data?.message);

            }

        };

        const handleApprove = async (task) => {

            try {

                await axiosPrivate.patch(

                    `/task/${task._id}/approve`

                );

                fetchTasks(selectedMilestone._id);

            } catch (err) {

                console.error(err);

            }

        };

        const handleRequestChanges = async (task) => {

            const reviewComment = prompt("Review Comment");

            if (!reviewComment) return;

            try {

                await axiosPrivate.patch(

                    `/task/${task._id}/request-changes`,

                    {

                        reviewComment

                    }

                );

                fetchTasks(selectedMilestone._id);

            } catch (err) {

                console.error(err);

            }

        };

    return (

    <div className="tasks-page">

        <div className="tasks-header">

            <div>

                <h2>Tasks</h2>

                <p>
                    Manage project tasks
                </p>

            </div>

            {
                isTeamLead &&
                selectedMilestone && (

                    <button
                        className="add-task-btn"
                        onClick={() => setShowCreateModal(true)}
                    >
                        + Add Task
                    </button>

                )
            }

        </div>

        <div className="tasks-search">

            <FaSearch />

            <input
                type="text"
                placeholder="Search Tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

        </div>

        <div className="tasks-content">

            {/* ============================
                Projects
            ============================ */}

            <div className="tasks-column">

                <h3>Projects</h3>
                <br></br>

                {

                    loadingProjects ?

                        <p>Loading...</p>

                        :

                        projects.map(project => (

                            <ProjectSelectorCard

                                key={project._id}

                                project={project}

                                selected={
                                    selectedProject?._id === project._id
                                }

                                onClick={() =>
                                    handleProjectSelect(project)
                                }

                            />

                        ))

                }

            </div>

            {/* ============================
                Milestones
            ============================ */}

            <div className="tasks-column">

                <h3>Milestones</h3>

                {

                    loadingMilestones ?

                        <p>Loading...</p>

                        :

                        milestones.length === 0 ?

                            <p>No Milestones</p>

                            :

                            milestones.map(milestone => (

                                <MilestoneSelectorCard

                                    key={milestone._id}

                                    milestone={milestone}

                                    selected={
                                        selectedMilestone?._id === milestone._id
                                    }

                                    onClick={() =>
                                        handleMilestoneSelect(milestone)
                                    }

                                />

                            ))

                }

            </div>

            {/* ============================
                Tasks
            ============================ */}

            <div className="tasks-column tasks-list">

                

                {

                    loadingTasks ?

                        <p>Loading...</p>

                        :

                        tasks.length === 0 ?

                            <p>No Tasks</p>

                            :

                            tasks.map(task => (

                            <TaskCard

                            key={task._id}

                            task={task}

                            onEdit={handleEdit}

                            onDelete={handleDelete}

                            onStart={handleStart}

                            onSubmit={handleSubmit}

                            onApprove={handleApprove}

                            onRequestChanges={handleRequestChanges}

                        />

                            ))

                }

            </div>

        </div>

        {

            showCreateModal && (

                <CreateTaskModal

                    milestone={selectedMilestone}

                    onClose={() =>
                        setShowCreateModal(false)
                    }

                    refreshTasks={() =>
                        fetchTasks(selectedMilestone._id)
                    }

                />
                )
            }
                {

    showEditModal && selectedTask && (

        <EditTaskModal

            task={selectedTask}

            onClose={() => {

                setShowEditModal(false);

                setSelectedTask(null);

            }}

            refreshTasks={() =>

                fetchTasks(selectedMilestone._id)

            }

        />

    )

}

        

    </div>

);
}

export default Tasks;