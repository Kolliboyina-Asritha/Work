import "../../css/MilestoneSelectorCard.css";

function MilestoneSelectorCard({

    milestone,

    selected,

    onClick

}) {

    const getStatusClass = (status) => {

        switch (status) {

            case "Completed":
                return "completed";

            case "In Progress":
                return "progress";

            case "Pending":
                return "pending";

            default:
                return "";

        }

    };

    return (

        <div
            className={`milestone-selector-card ${selected ? "selected" : ""}`}
            onClick={onClick}
        >

            <div className="milestone-top">

                <h3>

                    {selected ? "✔ " : ""}

                    {milestone.title}

                </h3>

                <span
                    className={`milestone-status ${getStatusClass(milestone.status)}`}
                >
                    {milestone.status}
                </span>

            </div>

            <div className="milestone-body">

                <div>

                    <small>Deadline</small>

                    <p>

                        {

                            milestone.deadline

                                ? new Date(
                                    milestone.deadline
                                ).toLocaleDateString()

                                : "--"

                        }

                    </p>

                </div>

                <div>

                    <small>Tasks</small>

                    <p>

                        {milestone.totalTasks || 0}

                    </p>

                </div>

            </div>

            
            

        </div>

    );

}

export default MilestoneSelectorCard;