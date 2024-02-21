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
  
  function QuestionCategoryChart({ data }) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={730} height={250} data={data} maxBarSize={60}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="questions" fill="#4071b8" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
  
  export default QuestionCategoryChart;
  