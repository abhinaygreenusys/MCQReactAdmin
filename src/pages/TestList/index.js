import { useState, useEffect } from "react";
import api from "../../components/utils/api";
import myToast from "../../components/utils/myToast";
import Table from "../../components/common/Table";
import Pagination from "../../components/common/Pagination";

const TestList = () => {
  const [loading, setLoading] = useState(true);
  const [tests, setTests] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);
//   const [page, setPage] = useState(1);
  const getTests = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/tests");
      console.log(data);
      setTests(data.result);
    //   setTotalPages(data.totalPages);
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
    }
    setLoading(false);
  };
  useEffect(() => {
    getTests();
  }, []);
  return (
    <div>
      <h2 className="mb-8">All Tests</h2>
      <div>
        <Table
          tHead={["S.No.", "Name", "No. of Ques.", "Score", "Completion"]}
          loading={loading}
        >
          {tests.length > 0 ? (
            tests.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item?.user?.name}</td>
                <td>{item.questions.length}</td>
                <td>{item.score}</td>
                <td>{item.isCompleted ? "Completed" : "Not Completed"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No Users Found
              </td>
            </tr>
          )}
        </Table>
        {/* <Pagination lastPage={totalPages} page={page} setPage={setPage} /> */}
      </div>
    </div>
  );
};

export default TestList;
