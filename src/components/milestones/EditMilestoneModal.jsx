import { useState } from "react";

import "../../css/CreateMilestoneModal.css";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function EditMilestoneModal({

    milestone,

    onClose,

    refreshMilestones

}) {

    const axiosPrivate = useAxiosPrivate();

    const [title, setTitle] = useState(
        milestone.title
    );

    const [description, setDescription] = useState(
        milestone.description || ""
    );

    const [deadline, setDeadline] = useState(

        milestone.deadline

            ?

            milestone.deadline.substring(0,10)

            :

            ""

    );

    const [status, setStatus] = useState(
        milestone.status
    );

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try{

            setLoading(true);

            await axiosPrivate.patch(

                `/milestones/${milestone._id}`,

                {

                    title,

                    description,

                    deadline,

                    status

                }

            );

            await refreshMilestones();

            onClose();

        }

        catch(err){

            console.error(err);

            setError(

                err.response?.data?.message ||

                "Failed to update milestone."

            );

        }

        finally{

            setLoading(false);

        }

    };
        return(

        <div className="modal-overlay">

            <div className="modal">

                <h2>

                    Edit Milestone

                </h2>

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

                        min={new Date().toISOString().split("T")[0]}

                        onChange={(e)=>

                            setDeadline(e.target.value)

                        }

                    />

                    <label>

                        Status

                    </label>

                    <select

                        value={status}

                        onChange={(e)=>

                            setStatus(e.target.value)

                        }

                    >

                        <option>

                            Pending

                        </option>

                        <option>

                            In Progress

                        </option>

                        <option>

                            Completed

                        </option>

                    </select>

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

                                "Updating..."

                                :

                                "Update"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditMilestoneModal;