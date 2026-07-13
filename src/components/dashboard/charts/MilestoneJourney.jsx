import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

import "./MilestoneJourney.css";

const COLORS = [
    "#22c55e", // Completed
    "#f59e0b", // In Progress
    "#ef4444", // Pending
    "#8b5cf6"  // Under Review
];

function MilestoneJourney({ data = [] }) {

    if (!data.length) {
        return (
            <div className="milestone-wrapper">
                <h2>Milestone Journey</h2>
                <p>No milestone data available.</p>
            </div>
        );
    }

    return (

        <div className="milestone-wrapper">

            <h2>Milestone Journey</h2>

            <div className="milestone-grid">

                {data.map((project, index) => (

                    <div className="milestone-card" key={index}>

                        <h3 className="project-title">
                            {project.projectName}
                        </h3>

                        <div style={{ width: "100%", height: 300 }}>

                            <ResponsiveContainer>

                                <PieChart>

                                    <Pie
                                        data={project.data}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        innerRadius={55}
                                        paddingAngle={3}
                                        label={({ name, percent }) =>
                                            `${name} ${(percent * 100).toFixed(0)}%`
                                        }
                                    >

                                        {project.data.map((entry, i) => (
                                            <Cell
                                                key={i}
                                                fill={COLORS[i % COLORS.length]}
                                            />
                                        ))}

                                    </Pie>

                                    <Tooltip />
                                    <Legend />

                                </PieChart>

                            </ResponsiveContainer>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default MilestoneJourney;