import "./DashboardHeader.css";

function DashboardHeader({ title, subtitle }) {

    const today = new Date();

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    return (

        <div className="dashboard-header">

            <div>

                <h1>{title}</h1>

                <p>{subtitle}</p>

            </div>

            <div className="dashboard-date">

                {today.toLocaleDateString("en-IN", options)}

            </div>

        </div>

    );

}

export default DashboardHeader;