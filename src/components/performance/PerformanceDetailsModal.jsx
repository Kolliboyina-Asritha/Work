import "../../css/PerformanceDetailsModal.css";

function PerformanceDetailsModal({

    performance,

    onClose

}) {

    return (

        <div className="modal-overlay">

            <div className="performance-modal">

                <div className="modal-header">

                    <h2>

                        {performance.employee.fullname}

                    </h2>

                    <button

                        onClick={onClose}

                    >

                        ✕

                    </button>

                </div>

                <div className="performance-grid">

                    <div>

                        <h4>Attendance</h4>

                        <h2>

                            {performance.attendanceScore}/30

                        </h2>

                    </div>

                    <div>

                        <h4>Tasks</h4>

                        <h2>

                            {performance.taskScore}/40

                        </h2>

                    </div>

                    <div>

                        <h4>Deadline</h4>

                        <h2>

                            {performance.deadlineScore}/20

                        </h2>

                    </div>

                    <div>

                        <h4>Contribution</h4>

                        <h2>

                            {performance.contributionScore}/10

                        </h2>

                    </div>

                </div>

                <div className="overall-score-card">

                    <h3>Overall Performance</h3>

                    <h1>

                        {performance.overallScore}

                    </h1>

                </div>

            </div>

        </div>

    );

}

export default PerformanceDetailsModal;