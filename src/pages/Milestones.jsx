import { useEffect, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";

import "../css/Milestones.css";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import ROLES from "../config/roles";

import ProjectSelectorCard from "../components/milestones/ProjectSelectorCard";
import MilestoneCard from "../components/milestones/MilestoneCard";
import CreateMilestoneModal from "../components/milestones/CreateMilestoneModal";
import EditMilestoneModal from "../components/milestones/EditMilestoneModal";
import DeleteMilestoneModal from "../components/milestones/DeleteMilestoneModal";

function Milestones() {

    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();

    const roles = auth?.roles || [];

    const isTeamLead = roles.includes(ROLES.TeamLead);

    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);

    const [selectedProject, setSelectedProject] = useState(null);

    const [milestones, setMilestones] = useState([]);

    const [search, setSearch] = useState("");

    const [loadingProjects, setLoadingProjects] = useState(true);
    const [loadingMilestones, setLoadingMilestones] = useState(false);

    const [showCreateModal, setShowCreateModal] = useState(false);

    const [editingMilestone, setEditingMilestone] = useState(null);

    const [deletingMilestone, setDeletingMilestone] = useState(null);

    const fetchProjects = async () => {

        try {

            setLoadingProjects(true);

            const response = await axiosPrivate.get("/projects");

            setProjects(response.data);
            setFilteredProjects(response.data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoadingProjects(false);

        }

    };

    const fetchMilestones = async (projectId) => {

        try {

            setLoadingMilestones(true);

            const response = await axiosPrivate.get(
                `/milestones/project/${projectId}`
            );

            setMilestones(response.data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoadingMilestones(false);

        }

    };
        useEffect(() => {

        fetchProjects();

    }, []);

    useEffect(() => {

        const value = search.toLowerCase();

        const filtered = projects.filter(project =>

            project.name.toLowerCase().includes(value) ||

            project.teamLead?.fullname
                ?.toLowerCase()
                .includes(value)

        );

        setFilteredProjects(filtered);

    }, [search, projects]);

    const handleProjectSelect = async (project) => {

        setSelectedProject(project);

        await fetchMilestones(project._id);

    };

    const refreshMilestones = async () => {

        if (selectedProject) {

            await fetchMilestones(selectedProject._id);

        }

    };

    const canManage =

        isTeamLead &&

        selectedProject &&

        selectedProject.teamLead?._id === auth.id;
    return (

        <div className="milestones-page">

            <div className="milestones-header">

                <div>

                    <h2>Milestones</h2>

                    <p>
                        Manage project milestones
                    </p>

                </div>

            </div>

            <div className="search-box">

                <FaSearch />

                <input

                    type="text"

                    placeholder="Search Project..."

                    value={search}

                    onChange={(e) =>
                        setSearch(e.target.value)
                    }

                />

            </div>

            <div className="milestones-layout">

                {/* Left Panel */}

                <div className="projects-panel">

                    <h3>Projects</h3>

                    {

                        loadingProjects ?

                            <p>Loading Projects...</p>

                            :

                            filteredProjects.length === 0 ?

                                <p>No Projects Found</p>

                                :

                                filteredProjects.map(project => (

                                    <ProjectSelectorCard

                                        key={project._id}

                                        project={project}

                                        selected={
                                            selectedProject?._id === project._id
                                        }

                                        onSelect={handleProjectSelect}

                                    />

                                ))

                    }

                </div>

                {/* Right Panel */}

                <div className="milestones-panel">

                    {

                        !selectedProject ?

                            (

                                <div className="empty-panel">

                                    <h3>Select a Project</h3>

                                    <p>

                                        Choose a project from the left to
                                        view its milestones.

                                    </p>

                                </div>

                            )

                            :

                            (

                                <>

                                    <div className="selected-project-header">

                                        <div>

                                            <h2>

                                                {selectedProject.name}

                                            </h2>

                                            <p>

                                                {

                                                    selectedProject.description ||

                                                    "No description available."

                                                }

                                            </p>

                                        </div>

                                        {

                                            canManage && (

                                                <button

                                                    className="add-project-btn"

                                                    onClick={() =>
                                                        setShowCreateModal(true)
                                                    }

                                                >

                                                    <FaPlus />

                                                    Create Milestone

                                                </button>

                                            )

                                        }

                                    </div>
                                                                        <div className="milestones-list">

                                        {

                                            loadingMilestones ?

                                                (

                                                    <h3>

                                                        Loading Milestones...

                                                    </h3>

                                                )

                                                :

                                                milestones.length === 0 ?

                                                    (

                                                        <div className="empty-panel">

                                                            <h3>

                                                                No Milestones Found

                                                            </h3>

                                                            <p>

                                                                This project doesn't have any milestones yet.

                                                            </p>

                                                        </div>

                                                    )

                                                    :

                                                    (

                                                        milestones.map(milestone => (

                                                            <MilestoneCard

                                                                key={milestone._id}

                                                                milestone={milestone}

                                                                canManage={canManage}

                                                                onEdit={() =>
                                                                    setEditingMilestone(milestone)
                                                                }

                                                                onDelete={() =>
                                                                    setDeletingMilestone(milestone)
                                                                }

                                                            />

                                                        ))

                                                    )

                                        }

                                    </div>

                                </>

                            )

                    }

                </div>

            </div>

            {

                showCreateModal && selectedProject && (

                    <CreateMilestoneModal

                        project={selectedProject}

                        onClose={() =>
                            setShowCreateModal(false)
                        }

                        refreshMilestones={refreshMilestones}

                    />

                )

            }

            {

                editingMilestone && (

                    <EditMilestoneModal

                        milestone={editingMilestone}

                        onClose={() =>
                            setEditingMilestone(null)
                        }

                        refreshMilestones={refreshMilestones}

                    />

                )

            }

            {

                deletingMilestone && (

                    <DeleteMilestoneModal

                        milestone={deletingMilestone}

                        onClose={() =>
                            setDeletingMilestone(null)
                        }

                        refreshMilestones={refreshMilestones}

                    />

                )

            }

        </div>

    );

}

export default Milestones;