import "../../css/PerformanceSummaryCards.css";

function PerformanceSummaryCards({

    summary = {},
    performances = []

}) {

    const highestScore =
        performances.length > 0
            ? Math.max(
                  ...performances.map(
                      p => p.overallScore || 0
                  )
              )
            : 0;

    const lowestScore =
        performances.length > 0
            ? Math.min(
                  ...performances.map(
                      p => p.overallScore || 0
                  )
              )
            : 0;

    // ==========================
    // Employee Dashboard
    // ==========================

    if (summary.totalMonths !== undefined) {

        return (

            <div className="performance-summary-grid">

                <div className="summary-card">
                    <h4>Overall Average</h4>
                    <h2>{summary.overallAverage ?? 0}%</h2>
                </div>

                <div className="summary-card">
                    <h4>Highest Score</h4>
                    <h2>{summary.highestScore ?? 0}%</h2>
                </div>

                <div className="summary-card">
                    <h4>Lowest Score</h4>
                    <h2>{summary.lowestScore ?? 0}%</h2>
                </div>

                <div className="summary-card">
                    <h4>Total Months</h4>
                    <h2>{summary.totalMonths ?? 0}</h2>
                </div>

            </div>

        );

    }

    // ==========================
    // Team Lead Dashboard
    // ==========================

    if (summary.totalMembers !== undefined) {

        return (

            <div className="performance-summary-grid">

                <div className="summary-card">
                    <h4>Team Members</h4>
                    <h2>{summary.totalMembers}</h2>
                </div>

                <div className="summary-card">
                    <h4>Team Average</h4>
                    <h2>{summary.teamAveragePerformance ?? 0}%</h2>
                </div>

                <div className="summary-card">
                    <h4>My Performance</h4>
                    <h2>{summary.teamLeadPerformance ?? 0}%</h2>
                </div>

                <div className="summary-card">
                    <h4>Best Team Score</h4>
                    <h2>{highestScore}%</h2>
                </div>

            </div>

        );

    }

    // ==========================
    // HR / Admin Dashboard
    // ==========================

    return (

        <div className="performance-summary-grid">

            <div className="summary-card">
                <h4>Total Employees</h4>
                <h2>{summary.totalEmployees ?? 0}</h2>
            </div>

            <div className="summary-card">
                <h4>Average Performance</h4>
                <h2>{summary.averagePerformance ?? 0}%</h2>
            </div>

            <div className="summary-card">
                <h4>Highest Score</h4>
                <h2>{highestScore}%</h2>
            </div>

            <div className="summary-card">
                <h4>Lowest Score</h4>
                <h2>{lowestScore}%</h2>
            </div>

        </div>

    );

}

export default PerformanceSummaryCards;