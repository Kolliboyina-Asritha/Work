import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const COLORS = [
    "#f59e0b", // Pending
    "#22c55e", // Approved
    "#ef4444"  // Rejected
];

function LeaveChart({ data = [] }) {

    return (

        <div
            style={{
                background: "#fffffff6",
                padding: "20px",
                borderRadius: "15px",
                boxShadow: "0 5px 15px rgba(0,0,0,.08)"
            }}
        >

            <h3
                style={{
                    marginBottom: "20px"
                }}
            >
                Leave Request Status
            </h3>

            <ResponsiveContainer width="100%" height={320}>

                <PieChart>

                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={110}
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

                    <Legend
                        verticalAlign="bottom"
                    />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default LeaveChart;