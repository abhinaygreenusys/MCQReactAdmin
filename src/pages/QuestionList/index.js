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

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const getQuestions = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/getQuestions?page=${page}`);
      console.log(data);
      setQuestions(data.result);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.log(err);
      myToast(
        err?.response?.data?.message || "Something went wrong",
        "failure"
      );
    }
    setLoading(false);
  };
  useEffect(() => {
    getQuestions();
  }, []);

  const handleDelete = async (id) => {
    try {
      const { data } = await api.delete(`/deleteQuestion/${id}`);
      console.log(data);
      myToast(data.message, "success");
      getQuestions();
    } catch (err) {
      console.log(err);
      myToast(
        err?.response?.data?.message || "Something went wrong",
        "failure"
      );
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2>All Questions</h2>
        <Link to="/add-question">
          <Button>Add Question</Button>
        </Link>
      </div>
      <div>
        <Table
          tHead={["S.No.", "Question", "Options", "Action"]}
          loading={loading}
        >
          {questions.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.question}</td>
              <td>
                <ul className="flex gap-x-4 gap-y-2 flexx-wrap">
                  <li
                    className={item.option1 === item.answer ? "text-green" : ""}
                  >
                    A. {item.option1}
                  </li>
                  <li
                    className={item.option2 === item.answer ? "text-green" : ""}
                  >
                    B. {item.option2}
                  </li>
                </ul>
                <ul className="flex gap-x-4 gap-y-2 flexx-wrap">
                  <li
                    className={item.option3 === item.answer ? "text-green" : ""}
                  >
                    C. {item.option3}
                  </li>
                  <li
                    className={item.option4 === item.answer ? "text-green" : ""}
                  >
                    D. {item.option4}
                  </li>
                </ul>
              </td>
              <td>
                <div className="flex gap-x-2">
                  <span
                    className="cursor-pointer p-4"
                    onClick={() => navigate(`/update-question/${item._id}`)}
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
          ))}
        </Table>
        <Pagination lastPage={totalPages} page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default QuestionList;
