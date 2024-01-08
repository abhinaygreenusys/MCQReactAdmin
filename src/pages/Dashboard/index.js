import { useState, useEffect } from "react";
import api from "../../components/utils/api";
import myToast from "../../components/utils/myToast";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({});

  const getDashboardData = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/dashboard");
      console.log(data);
      setDashboardData(data);
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.message || "Something went wrong", "error");
    }
    setLoading(false);
  };
  useEffect(() => {
    getDashboardData();
  }, []);
  return (
    <div>
      <h2 className="mb-8">Dashboard</h2>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {Object.keys(dashboardData).map((key, value) => (
              <div key={key} className="my-4">
                <h5 className="capitalize">{key}</h5>
                <p>{value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
