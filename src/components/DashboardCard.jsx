import "./DashboardCard.css";

function DashboardCard({ title, value }) {

    return (

        <div className="dashboard-card">

            <div className="card-header">

                <h4>{title}</h4>

            </div>

            <div className="card-body">

                <h2>{value}</h2>

            </div>

        </div>

    );

}

export default DashboardCard;