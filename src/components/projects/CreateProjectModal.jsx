import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import "../../css/Modal.css";

function CreateProjectModal({ onClose, refreshProjects }) {

    const axiosPrivate = useAxiosPrivate();

    const [teamLeads, setTeamLeads] = useState([]);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        teamLead: "",
        projectDocumentUrl: "",
        startDate: "",
        endDate: ""
    });

    useEffect(() => {

        fetchTeamLeads();

    }, []);

    const fetchTeamLeads = async () => {

        try {

            const response = await axiosPrivate.get("/teamleads");

            setTeamLeads(response.data);

        } catch (err) {

            console.error(err);

        }

    };

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.name.trim()) {
            return alert("Project Name is required");
        }

        if (!formData.teamLead) {
            return alert("Please select Team Lead");
        }

        if (
            formData.startDate &&
            formData.endDate &&
            formData.startDate > formData.endDate
        ) {
            return alert("End Date cannot be before Start Date");
        }

        try {

            setLoading(true);

            await axiosPrivate.post("/projects", formData);

            await refreshProjects();

            onClose();

        } catch (err) {

            console.error(err);

            alert(
                err?.response?.data?.message ||
                "Failed to create project"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>Create Project</h2>

                <form onSubmit={handleSubmit}>

                    <label>

                        Project Name

                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <label>

                        Description

                    </label>

                    <textarea
                        rows="4"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />

                    <label>

                        Team Lead

                    </label>

                    <select
                        name="teamLead"
                        value={formData.teamLead}
                        onChange={handleChange}
                    >

                        <option value="">

                            Select Team Lead

                        </option>

                        {

                            teamLeads.map(lead => (

                                <option
                                    key={lead._id}
                                    value={lead._id}
                                >

                                    {lead.fullname} ({lead.employeeId})

                                </option>

                            ))

                        }

                    </select>

                    <label>

                        Project Document URL

                    </label>

                    <input
                        type="text"
                        name="projectDocumentUrl"
                        value={formData.projectDocumentUrl}
                        onChange={handleChange}
                    />

                    <div className="date-row">

                        <div>

                            <label>

                                Start Date

                            </label>

                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                            />

                        </div>

                        <div>

                            <label>

                                End Date

                            </label>

                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    <div className="modal-buttons">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onClose}
                        >

                            Cancel

                        </button>

                        <button
                            type="submit"
                            className="create-btn"
                            disabled={loading}
                        >

                            {

                                loading

                                    ? "Creating..."

                                    : "Create Project"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default CreateProjectModal;