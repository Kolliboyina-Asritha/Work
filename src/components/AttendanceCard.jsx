import "./AttendanceCard.css";

function AttendanceCard({ title, value, color }) {
    return (
        <div className="attendance-card">
            <div
                className="attendance-icon"
                style={{ backgroundColor: color }}
            >
            </div>

            <div className="attendance-content">
                <h4>{title}</h4>
                <h2>{value}</h2>
            </div>
        </div>
    );
}

export default AttendanceCard;