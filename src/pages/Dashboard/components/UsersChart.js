import {
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Tooltip,
  Bar,
  ResponsiveContainer,
} from "recharts";

function UsersChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={730} height={250} data={data} maxBarSize={60}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#4071b8" />
        <Bar dataKey="verified" fill="#56c568" />
        <Bar dataKey="unverified" fill="#f44336" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default UsersChart;
