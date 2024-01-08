import { useState, useEffect } from "react";
import api from "../../components/utils/api";
import myToast from "../../components/utils/myToast";
import Button from "../../components/common/Button";
import Table from "../../components/common/Table";

const AddQuestionPaper = () => {
  const [time, setTime] = useState("00:00");
  const [difficulty, setDifficulty] = useState("");
  const [questionIds, setQuestionIds] = useState([]);

  const addQuestionPaper = async () => {
    if (questionIds.length === 0)
      return myToast("Please select at least one question", "failure");
    try {
      const { data } = await api.post("/generateQuestionPaper", {
        time: 10,
        difficulty,
        questionIds,
      });
      console.log(data);
      myToast(data.message, "success");
    } catch (err) {
      console.log(err);
      myToast(
        err?.response?.data?.message || "Something went wrong",
        "failure"
      );
    }
  };

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const getQuestions = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/getQuestions");
      console.log(data);
      setQuestions(data.result);
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
      <h2 className="mb-8">Add Question Paper</h2>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addQuestionPaper();
          }}
        >
          <div className="mb-4">
            <h5 className="mb-1">Time</h5>
            <input
              className="w-full"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <h5 className="mb-1">Difficulty</h5>
            <select
              className="w-full"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              required
            >
              <option value="">Select Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="mb-4">
            <h5 className="mb-1">Select Questions</h5>
            <Table tHead={["S.No.", "Question", "Selection"]} loading={loading}>
              {questions.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.question}</td>
                  <td>
                    <Button
                      size="sm"
                      type="button"
                      theme={questionIds.includes(item._id) ? "red" : "blue"}
                      onClick={() => {
                        if (questionIds.find((id) => id === item._id))
                          setQuestionIds(
                            questionIds.filter((id) => id !== item._id)
                          );
                        else setQuestionIds([...questionIds, item._id]);
                      }}
                    >
                      {questionIds.includes(item._id)
                        ? "Remove Question"
                        : "Add Question"}
                    </Button>
                  </td>
                </tr>
              ))}
            </Table>
          </div>
          <div>
            <Button type="submit">Add Question Paper</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuestionPaper;
