import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../components/utils/api";
import myToast from "../../components/utils/myToast";
import Button from "../../components/common/Button";
import Table from "../../components/common/Table";

const QuestionPaperList = () => {
  const [loading, setLoading] = useState(true);
  const [questionPapers, setQuestionPapers] = useState([]);
  const getQuestions = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/getQuestionPapers");
      console.log(data);
      setQuestionPapers(data.result);
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

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2>All Question Papers</h2>
        <Link to="/add-question-paper">
          <Button>Add Question Paper</Button>
        </Link>
      </div>
      <div>
        <Table
          tHead={["S.No.", "Difficulty", "Attempts", "Status", "Action"]}
          loading={loading}
        >
          {questionPapers.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.difficulty}</td>
              <td>{item.attempts}</td>
              <td>{item.status}</td>
              <td className="text-blue2 underline cursor-pointer">
                View Questions
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
};

export default QuestionPaperList;
