import "../../css/StatisticsCard.css";

function StatisticsCard({ statistics }) {

    if (!statistics) return null;

    return (

        <div className="statistics-section">

            <h3>Statistics</h3>

            <div className="statistics-grid">

                {Object.entries(statistics).map(([key, value]) => (

                    <div

                        key={key}

                        className="stat-card"

                    >

                        <h2>

                            {value ?? 0}

                        </h2>

                        <p>

                            {key
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, str => str.toUpperCase())}

                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default StatisticsCard;