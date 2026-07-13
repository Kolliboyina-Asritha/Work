import "../../css/LeaderboardHeader.css";

function LeaderboardHeader({

    month,
    year,
    setMonth,
    setYear

}) {

    return (

        <div className="leaderboard-header">

            <div>

                <h2>Performance Leaderboard</h2>

                <p>
                    Monthly rankings based on employee performance score
                </p>

            </div>

            <div className="leaderboard-filters">

                <select
                    value={month}
                    onChange={(e) => setMonth(Number(e.target.value))}
                >

                    {[...Array(12)].map((_, index) => (

                        <option
                            key={index + 1}
                            value={index + 1}
                        >
                            {new Date(0, index).toLocaleString(
                                "default",
                                {
                                    month: "long"
                                }
                            )}
                        </option>

                    ))}

                </select>

                <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                >

                    {[2025, 2026, 2027].map(year => (

                        <option
                            key={year}
                            value={year}
                        >
                            {year}
                        </option>

                    ))}

                </select>

            </div>

        </div>

    );

}

export default LeaderboardHeader;