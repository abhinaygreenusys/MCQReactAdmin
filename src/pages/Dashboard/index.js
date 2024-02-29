import { useState, useEffect } from "react";
import api from "../../components/utils/api";
import myToast from "../../components/utils/myToast";
import Card from "../../components/common/Card";
import UsersChart from "./components/UsersChart";
import TestsChart from "./components/TestsChart";
import QuestionCategoryChart from "./components/QuestionCategoryChart";
import { AiOutlineLoading } from "react-icons/ai";
import TestsPerCategoryChart from "./components/TestsPerCategoryChart";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({});
  const [questionsPerCategory, setQuestionsPerCategory] = useState([]);
  const [testsPerCategory, setTestsPerCategory] = useState([]);

  const getDashboardData = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/dashboard");
      console.log(data);
      setQuestionsPerCategory(data.categoriesWithQuestions);
      setTestsPerCategory(data.categoriesWithTests);
      delete data.categoriesWithQuestions;
      delete data.categoriesWithTests;
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

  const changeCamelCaseToNormal = (str) => {
    return str.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
      return str.toUpperCase();
    });
  };

  return (
    <div>
      <h2 className="mb-8">Dashboard</h2>
      <div>
        {loading ? (
          <div className="flex items-center gap-2">
            <AiOutlineLoading className="animate animate-spin text-theme text-2xl" />
            Loading...
          </div>
        ) : (
          <>
            <div className="flex gap-x-8 gap-y-4 flex-wrap">
              {Object.keys(dashboardData).map((key) => (
                <Card key={key} className="bg-white w-[13rem]">
                  <h5 className="capitalize mb-2">
                    {changeCamelCaseToNormal(key)}
                  </h5>
                  <h3 className="text-center">{dashboardData[key]}</h3>
                </Card>
              ))}
            </div>
            <div className="mt-10 flex items-center gap-10 flex-col lg:flex-row">
              <Card size="graph" className="bg-white h-[20rem] w-full">
                <div className="font-medium mb-6">User Verification Data</div>
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
                <div className="font-medium mb-6">Tests Completion Data</div>
                <TestsChart
                  data={[
                    {
                      name: "Tests",
                      total: dashboardData.tests || 0,
                      completed: dashboardData.completedTests || 0,
                      uncompleted: dashboardData.incompleteTests || 0,
                    },
                  ]}
                />
              </Card>
            </div>
            <div className="mt-10">
              <Card size="graph" className="bg-white h-[20rem] w-full">
                <div className="font-medium mb-6">Questions per Category</div>
                <QuestionCategoryChart data={questionsPerCategory} />
              </Card>
            </div>
            <div className="mt-10">
              <Card size="graph" className="bg-white h-[20rem] w-full">
                <div className="font-medium mb-6">Tests per Category</div>
                <TestsPerCategoryChart data={testsPerCategory} />
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
