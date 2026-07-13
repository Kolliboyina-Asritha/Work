import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

function WeeklyTaskChart({ data = [] }) {

    const daysOrder = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // convert backend data into map
    const taskMap = {};

    data.forEach((item) => {
        const date = new Date(item._id);
        const day = isNaN(date) ? item._id : date.toLocaleDateString("en-US", { weekday: "short" });
        taskMap[day] = item.tasks;
    });

    // force all 7 days
    const formattedData = daysOrder.map((day) => ({
        day,
        tasks: taskMap[day] || 0
    }));

    return (
        <div className="chart-card">
            <h3>Weekly Tasks</h3>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={formattedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="tasks" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default WeeklyTaskChart;