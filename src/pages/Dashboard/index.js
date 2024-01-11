import { useState, useEffect } from "react";
import api from "../../components/utils/api";
import myToast from "../../components/utils/myToast";
import Card from "../../components/common/Card";

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
      myToast(
        err?.response?.data?.error || "Something went wrong",
        "failure"
      );
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
          <div className="flex gap-x-8 gap-y-4 flex-wrap">
            {Object.keys(dashboardData).map((key) => (
              <Card key={key} className="bg-white w-48">
                <h5 className="capitalize mb-2">{key}</h5>
                <h3 className="text-center">{dashboardData[key]}</h3>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
