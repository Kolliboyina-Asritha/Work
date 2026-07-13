import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function PerformanceChart({ data }) {

    const chartData = data.map(item => ({
        month: `${item._id.month}/${item._id.year}`,
        average: item.averagePerformance
    }));

    return (

        <div
            style={{
                background: "#fffffff6",
                padding: "20px",
                borderRadius: "15px",
                boxShadow: "0 5px 15px rgba(0,0,0,.08)"
            }}
        >

            <h3>Performance Trend</h3>

            <ResponsiveContainer width="100%" height={320}>

                <AreaChart data={chartData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Area
                        type="monotone"
                        dataKey="average"
                        stroke="#16a34a"
                        fill="#bbf7d0"
                    />

                </AreaChart>

            </ResponsiveContainer>

        </div>

    );

}

export default PerformanceChart;