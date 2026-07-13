import { useState } from "react";

import "../../css/DeleteMilestoneModal.css";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function DeleteMilestoneModal({

    milestone,

    onClose,

    refreshMilestones

}) {

    const axiosPrivate = useAxiosPrivate();

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleDelete = async () => {

        try {

            setLoading(true);

            setError("");

            await axiosPrivate.delete(

                `/milestones/${milestone._id}`

            );

            await refreshMilestones();

            onClose();

        }

        catch(err){

            console.error(err);

            setError(

                err.response?.data?.message ||

                "Failed to delete milestone."

            );

        }

        finally{

            setLoading(false);

        }

    };

    return(

        <div className="modal-overlay">

            <div className="delete-modal">

                <h2>

                    Delete Milestone

                </h2>

                <p>

                    Are you sure you want to delete

                    <strong>

                        {" "}

                        {milestone.title}

                    </strong>

                    ?

                </p>

                {

                    error && (

                        <div className="error-box">

                            {error}

                        </div>

                    )

                }

                <div className="delete-buttons">

                    <button

                        className="cancel-btn"

                        onClick={onClose}

                        disabled={loading}

                    >

                        Cancel

                    </button>

                    <button

                        className="delete-btn"

                        onClick={handleDelete}

                        disabled={loading}

                    >

                        {

                            loading

                            ?

                            "Deleting..."

                            :

                            "Delete"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeleteMilestoneModal;