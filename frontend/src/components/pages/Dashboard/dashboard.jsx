import { useEffect } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  BarChart, 
  Bar, 
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import useFoodItem from "../../../hooks/useFoodItem";
import Layout from "../../common/Layout";

const Dashboard = () => {
  const { wasteMetric, getWasteMetric, usageWasteData, getUsageWasteData } = useFoodItem();

  useEffect(() => {
    getWasteMetric();
    getUsageWasteData();
  }, []);

  const COLORS = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8A2BE2",
    "#00FF00",
    "#FF1493",
    "#00CED1",
    "#FFD700",
    "#8B4513",
    "#800080",
    "#556B2F",
    "#ADFF2F",
    "#FF69B4",
    "#32CD32",
    "#DAA520",
  ];
  

  // Prepare data for the Pie Chart
  const chartData = wasteMetric.map(({ categoryname, wastedQuantity }) => ({
    name: categoryname,
    value: wastedQuantity,
  }));

  const renderTooltipContent1 = (props) => {
    const { payload } = props;
    const total = payload.reduce((sum, entry) => sum + entry.value, 0);

    return (
      <div
        style={{
          backgroundColor: "white",
          padding: "5px",
          border: "1px solid #ccc",
        }}
      >
        {payload.map((entry, index) => (
          <div key={`tooltip-${index}`} style={{ color: "black" }}>
            {`${entry.name}: ${entry.value} (${(
              (entry.value / total) *
              100
            ).toFixed(2)}%)`}
          </div>
        ))}
      </div>
    );
  };

  const renderTooltipContent2 = (props) => {
    const { payload } = props;
    return (
      <div style={{ backgroundColor: 'white', padding: '5px', border: '1px solid #ccc' }}>
        {payload.map((entry, index) => (
          <div key={`tooltip-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <div>
        <h1>Dashboard</h1>
        {/* Render your other dashboard components here */}
        {/* Render the Pie Chart */}
        <h2>Food Waste by Category</h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={200}
              fill="white"
              label={(entry) =>
                `${entry.name}: ${(entry.percent * 100).toFixed(2)}%`
              }
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={renderTooltipContent1} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h2>Usage vs Waste Over Time</h2>
        <ResponsiveContainer width="100%" height={400}>
        <BarChart
            data={usageWasteData}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={renderTooltipContent2} />
            <Legend />
            <Bar
              dataKey="used"
              name="Food Used"
              fill="#8884d8"
              barSize={40}
            />
            <Bar
              dataKey="wasted"
              name="Food Wasted"
              fill="#82ca9d"
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Layout>
  );
};

export default Dashboard;
