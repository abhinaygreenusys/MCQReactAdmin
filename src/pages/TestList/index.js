import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../components/utils/api";
import myToast from "../../components/utils/myToast";
import Table from "../../components/common/Table";
import Pagination from "../../components/common/Pagination";

const TestList = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [tests, setTests] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const getTests = async () => {
    setLoading(true);
    const order = sortBy.split("_")[0];
    const sort = sortBy.split("_")[1];
    try {
      const { data } = await api.get(
        `/tests?page=${page}&sortBy=${sort}&orderBy=${order}&filterByCompletion=${filterBy}`
      );
      console.log(data);
      setTests(data.result);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
    }
    setLoading(false);
  };
  useEffect(() => {
    getTests();
  }, [page, sortBy, filterBy]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8 gap-4 flex-wrap">
        <h2>All Tests</h2>
        <div className="flex gap-x-8 flex-wrap gap-y-4">
          <div>
            <span className="font-medium">Sort By </span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="asc_score">Scores (↑)</option>
              <option value="desc_score">Scores (↓)</option>
              <option value="asc_createdAt">Date (↑)</option>
              <option value="desc_createdAt">Date (↓)</option>
            </select>
          </div>
          <div>
            <span className="font-medium">Filter By </span>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option value={true}>Completed</option>
              <option value={false}>Not Completed</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <Table
          tHead={[
            "S.No.",
            "Name",
            "No. of Ques.",
            "Score",
            "Completion",
            "Action",
          ]}
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
                <td
                  className="cursor-pointer text-theme hover:underline"
                  onClick={() => navigate(`./${item._id}`)}
                >
                  view responses
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No Users Found
              </td>
            </tr>
          )}
        </Table>
        <Pagination lastPage={totalPages} page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default TestList;
