import { useEffect, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";

import "../css/Projects.css";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import ROLES from "../config/roles";

import ProjectCard from "../components/projects/ProjectCard";
import CreateProjectModal from "../components/projects/CreateProjectModal";
import UpdateStatusModal from "../components/projects/UpdateProjectStatusModal";

function Projects() {

    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();

    const roles = auth?.roles || [];

    const isAdmin =
        roles.includes(ROLES.SuperAdmin) ||
        roles.includes(ROLES.HR);

    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    // Create Project Modal
    const [showCreateModal, setShowCreateModal] = useState(false);

    // Update Status Modal
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const fetchProjects = async () => {

        try {

            setLoading(true);

            const response = await axiosPrivate.get("/projects");

            setProjects(response.data);
            setFilteredProjects(response.data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

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

    const handleUpdateStatus = (project) => {

        setSelectedProject(project);

        setShowStatusModal(true);

    };

    return (

        <div className="projects-page">

            <div className="projects-header">

                <div>

                    <h2>Projects</h2>

                    <p>
                        Manage all ongoing projects
                    </p>

                </div>

                {

                    isAdmin && (

                        <button
                            className="add-project-btn"
                            onClick={() => setShowCreateModal(true)}
                        >

                            <FaPlus />

                            Add Project

                        </button>

                    )

                }

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

            {

                loading ?

                    <h3>Loading Projects...</h3>

                    :

                    filteredProjects.length === 0 ?

                        <h3>No Projects Found</h3>

                        :

                        <div className="projects-grid">

                            {

                                filteredProjects.map(project => (

                                    <ProjectCard

                                        key={project._id}

                                        project={project}

                                        onUpdateStatus={handleUpdateStatus}

                                    />

                                ))

                            }

                        </div>

            }

            {

                showCreateModal && (

                    <CreateProjectModal

                        onClose={() => setShowCreateModal(false)}

                        refreshProjects={fetchProjects}

                    />

                )

            }

            {

                showStatusModal && selectedProject && (

                    <UpdateStatusModal

                        project={selectedProject}

                        onClose={() => {

                            setShowStatusModal(false);

                            setSelectedProject(null);

                        }}

                        refreshProjects={fetchProjects}

                    />

                )

            }

        </div>

    );

}

export default Projects;