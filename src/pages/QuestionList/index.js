import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../components/utils/api";
import myToast from "../../components/utils/myToast";
import Button from "../../components/common/Button";
import Table from "../../components/common/Table";
import Pagination from "../../components/common/Pagination";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";

const QuestionList = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/getCategories");
      console.log(data);
      setCategories(data.result);
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
    }
    setLoading(false);
  };
  useEffect(() => {
    getCategories();
  }, []);

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const getQuestions = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `/getQuestions?page=${page}&filterBy=${categoryFilter}`
      );
      console.log(data);
      setQuestions(data.result);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
    }
    setLoading(false);
  };
  useEffect(() => {
    getQuestions();
  }, [page, categoryFilter]);

  const handleDelete = async (id) => {
    try {
      const { data } = await api.delete(`/deleteQuestion/${id}`);
      console.log(data);
      myToast(data.message, "success");
      getQuestions();
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <h2>All Questions</h2>
        <div className="flex gap-4 flex-wrap">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((item) => (
              <option value={item.name} key={item._id}>
                {item.name}
              </option>
            ))}
          </select>
          <Link to="./add-question">
            <Button>Add Question</Button>
          </Link>
        </div>
      </div>
      <div>
        <Table
          tHead={["S.No.", "Category", "Question", "Options", "Action"]}
          loading={loading}
        >
          {questions.length > 0 ? (
            questions.map((item, index) => (
              <tr key={item._id}>
                <td>{(page - 1) * 20 + index + 1}</td>
                <td>{item.category}</td>
                <td>{item.question}</td>
                <td>
                  <ul className="flex flex-col gap-y-2">
                    <li
                      className={
                        item.option1 === item.answer ? "text-green" : ""
                      }
                    >
                      A. {item.option1}
                    </li>
                    <li
                      className={
                        item.option2 === item.answer ? "text-green" : ""
                      }
                    >
                      B. {item.option2}
                    </li>
                    <li
                      className={
                        item.option3 === item.answer ? "text-green" : ""
                      }
                    >
                      C. {item.option3}
                    </li>
                    <li
                      className={
                        item.option4 === item.answer ? "text-green" : ""
                      }
                    >
                      D. {item.option4}
                    </li>
                  </ul>
                </td>
                <td>
                  <div className="flex gap-x-2">
                    <span
                      className="cursor-pointer p-4"
                      onClick={() => navigate(`./update-question/${item._id}`)}
                    >
                      <RiEdit2Line />
                    </span>
                    <span
                      className="cursor-pointer p-4"
                      onClick={() => handleDelete(item._id)}
                    >
                      <RiDeleteBinLine />
                    </span>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No Questions Found
              </td>
            </tr>
          )}
        </Table>
        <Pagination lastPage={totalPages} page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default QuestionList;
