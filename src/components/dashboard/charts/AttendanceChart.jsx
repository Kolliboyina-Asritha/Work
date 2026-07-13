import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

function AttendanceChart({ data }) {

    return (

        <div
            style={{
                background: "#fffffff6",
                padding: "20px",
                borderRadius: "15px",
                boxShadow: "0 5px 15px rgba(0,0,0,.08)"
            }}
        >

            <h3>Attendance Trend</h3>

            <ResponsiveContainer width="100%" height={320}>

                <LineChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="_id" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Line
                        type="monotone"
                        dataKey="present"
                        stroke="#22c55e"
                    />

                    <Line
                        type="monotone"
                        dataKey="late"
                        stroke="#f59e0b"
                    />

                    <Line
                        type="monotone"
                        dataKey="absent"
                        stroke="#ef4444"
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

}

export default AttendanceChart;