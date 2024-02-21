import { useState, useEffect } from "react";
import api from "../../components/utils/api";
import myToast from "../../components/utils/myToast";
import Card from "../../components/common/Card";
import UsersChart from "./components/UsersChart";
import TestsChart from "./components/TestsChart";

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
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
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
          <>
            <div className="flex gap-x-8 gap-y-4 flex-wrap">
              {Object.keys(dashboardData).map((key) => (
                <Card key={key} className="bg-white w-48">
                  <h5 className="capitalize mb-2">{key}</h5>
                  <h3 className="text-center">{dashboardData[key]}</h3>
                </Card>
              ))}
            </div>
            <div className="mt-10 flex items-center gap-10 flex-col lg:flex-row">
              <Card size="graph" className="bg-white h-[20rem] w-full">
                <UsersChart
                  data={[
                    {
                      name: "Users",
                      total: dashboardData.users || 0,
                      verified: dashboardData.verifiedUsers || 0,
                      unverified: dashboardData.unverifiedUsers || 0,
                    },
                  ]}
                />
              </Card>
              <Card size="graph" className="bg-white h-[20rem] w-full">
                <TestsChart
                  data={[
                    {
                      name: "Tests",
                      total: dashboardData.tests || 0,
                      completed: dashboardData.completedTests || 0,
                      uncompleted: dashboardData.uncompletedTests || 0,
                    },
                  ]}
                />
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
