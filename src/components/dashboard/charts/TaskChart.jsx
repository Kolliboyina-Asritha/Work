import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const COLORS = [
    "#22c55e", // Completed
    "#ef4444", // Pending
    "#f59e0b", // In Progress
    "#3b82f6"  // Under Review
];

function TaskChart({ data = [] }) {

    return (

        <div
            style={{
                background: "#fffffff6",
                padding: "20px",
                borderRadius: "16px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
            }}
        >

            <h3
                style={{
                    marginBottom: "20px",
                    color: "#1f2937"
                }}
            >
                Overall Task Status
            </h3>

            <ResponsiveContainer width="100%" height={320}>

                <PieChart>

                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={110}
                        innerRadius={55}
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                        }
                    >

                        {
                            data.map((entry, index) => (

                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />

                            ))
                        }

                    </Pie>

                    <Tooltip />

                    <Legend verticalAlign="bottom" />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default TaskChart;