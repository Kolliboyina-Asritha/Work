import { useState } from "react";

import "../../css/CreateMilestoneModal.css";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function CreateMilestoneModal({

    project,

    onClose,

    refreshMilestones

}) {

    const axiosPrivate = useAxiosPrivate();

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [deadline, setDeadline] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            setLoading(true);

            await axiosPrivate.post(

                `/milestones/project/${project._id}`,

                {

                    title,

                    description,

                    deadline

                }

            );

            await refreshMilestones();

            onClose();

        }

        catch (err) {

            console.error(err);

            setError(

                err.response?.data?.message ||

                "Failed to create milestone."

            );

        }

        finally {

            setLoading(false);

        }

    };
        return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>

                    Create Milestone

                </h2>

                <p className="project-label">

                    Project :

                    <strong>

                        {" "}

                        {project.name}

                    </strong>

                </p>

                {

                    error && (

                        <div className="error-box">

                            {error}

                        </div>

                    )

                }

                <form onSubmit={handleSubmit}>

                    <label>

                        Title

                    </label>

                    <input

                        type="text"

                        value={title}

                        onChange={(e)=>

                            setTitle(e.target.value)

                        }

                        required

                    />

                    <label>

                        Description

                    </label>

                    <textarea

                        rows="4"

                        value={description}

                        onChange={(e)=>

                            setDescription(e.target.value)

                        }

                    />

                    <label>

                        Deadline

                    </label>

                    <input

                        type="date"

                        value={deadline}

                        onChange={(e)=>

                            setDeadline(e.target.value)

                        }

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

                            {

                                loading

                                ?

                                "Creating..."

                                :

                                "Create"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default CreateMilestoneModal;