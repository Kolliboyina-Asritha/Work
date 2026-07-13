import { useEffect, useState } from "react";

import "../../css/CreateTaskModal.css";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function CreateTaskModal({

    milestone,

    onClose,

    refreshTasks

}) {

    const axiosPrivate = useAxiosPrivate();

    const [employees, setEmployees] = useState([]);

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [assignedTo, setAssignedTo] = useState("");

    const [priority, setPriority] = useState("Medium");

    const [deadline, setDeadline] = useState("");

    const [loading, setLoading] = useState(false);

    const fetchMembers = async () => {

        try {

            const response = await axiosPrivate.get(
                "/teammembers"
            );

            setEmployees(response.data);

        } catch (err) {

            console.error(err);

        }

    };

    useEffect(() => {

        fetchMembers();

    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await axiosPrivate.post("/task", {

                milestone: milestone._id,

                assignedTo,

                title,

                description,

                priority,

                deadline

            });

            refreshTasks();

            onClose();

        } catch (err) {

            console.error(err);

            alert(
                err.response?.data?.message ||
                "Failed to create task"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>Create Task</h2>

                <form onSubmit={handleSubmit}>

                    <label>Task Title</label>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <label>Description</label>

                    <textarea
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <label>Assign To</label>

                    <select
                        value={assignedTo}
                        onChange={(e) => setAssignedTo(e.target.value)}
                        required
                    >

                        <option value="">
                            Select Employee / Intern
                        </option>

                        {employees.map(member => (

                            <option
                                key={member._id}
                                value={member._id}
                            >
                                {member.fullname} ({member.designation})
                            </option>

                        ))}

                    </select>

                    <label>Priority</label>

                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >

                        <option value="Low">Low</option>

                        <option value="Medium">Medium</option>

                        <option value="High">High</option>

                        <option value="Critical">Critical</option>

                    </select>

                    <label>Deadline</label>

                    <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        required
                    />

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
                            className="save-btn"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create Task"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default CreateTaskModal;