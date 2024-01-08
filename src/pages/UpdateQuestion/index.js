import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../components/utils/api";
import myToast from "../../components/utils/myToast";
import Button from "../../components/common/Button";

const UpdateQuestion = () => {
  const { id } = useParams();

  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState("sample answer");
  const updateQuestion = async () => {
    if (answer === "sample answer")
      return myToast("Please select an answer from the options", "failure");
    try {
      const { data } = await api.post("/updateQuestion", {
        question,
        option1,
        option2,
        option3,
        option4,
        answer,
      });
      console.log(data);
      myToast(data.message, "success");
      setQuestion("");
      setOption1("");
      setOption2("");
      setOption3("");
      setOption4("");
      setAnswer("sample answer");
    } catch (err) {
      console.log(err);
      myToast(
        err?.response?.data?.error || "Something went wrong",
        "failure"
      );
    }
  };

  const getQuestion = async () => {
    try {
      const { data } = await api.get(`/getQuestion/${id}`);
      console.log(data);
      setQuestion(data.question);
      setOption1(data.option1);
      setOption2(data.option2);
      setOption3(data.option3);
      setOption4(data.option4);
      setAnswer(data.answer);
    } catch (err) {
      console.log(err);
      myToast(
        err?.response?.data?.error || "Something went wrong",
        "failure"
      );
    }
  };
  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <div>
      <h2 className="mb-8">Update Question</h2>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateQuestion();
          }}
        >
          <div className="mb-4">
            <h5 className="mb-1">Question</h5>
            <input
              className="w-full"
              type="text"
              placeholder="Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <div className="mb-1 flex gap-2">
              <h5>Option 1</h5>
              <div className={answer === option1 ? "text-sm" : "hidden"}>
                (answer)
              </div>
            </div>
            <input
              className="w-full"
              type="text"
              placeholder="Option 1"
              value={option1}
              onChange={(e) => setOption1(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <div className="mb-1 flex gap-2">
              <h5>Option 2</h5>
              <div className={answer === option2 ? "text-sm" : "hidden"}>
                (answer)
              </div>
            </div>
            <input
              className="w-full"
              type="text"
              placeholder="Option 2"
              value={option2}
              onChange={(e) => setOption2(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <div className="mb-1 flex gap-2">
              <h5>Option 3</h5>
              <div className={answer === option3 ? "text-sm" : "hidden"}>
                (answer)
              </div>
            </div>
            <input
              className="w-full"
              type="text"
              placeholder="Option 3"
              value={option3}
              onChange={(e) => setOption3(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <div className="mb-1 flex gap-2">
              <h5>Option 4</h5>
              <div className={answer === option4 ? "text-sm" : "hidden"}>
                (answer)
              </div>
            </div>
            <input
              className="w-full"
              type="text"
              placeholder="Option 4"
              value={option4}
              onChange={(e) => setOption4(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <h5 className="mb-1">Answer</h5>
            <select
              className="w-full"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            >
              <option value="sample answer">Select Answer</option>
              <option value={option1}>Option 1</option>
              <option value={option2}>Option 2</option>
              <option value={option3}>Option 3</option>
              <option value={option4}>Option 4</option>
            </select>
          </div>
          <div>
            <Button type="submit">Update</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateQuestion;
