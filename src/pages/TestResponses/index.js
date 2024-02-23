import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../components/utils/api";
import myToast from "../../components/utils/myToast";
import { IoChevronBackCircleOutline } from "react-icons/io5";

const TestResponses = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [testDetails, setTestDetails] = useState({});
  const getTests = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/test/${id}`);
      console.log(data);
      setQuestions(data.result);
      setTestDetails({
        user: data.user,
        score: data.score,
        isCompleted: data.isCompleted,
        category: data?.category?.name,
      });
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
    }
    setLoading(false);
  };
  useEffect(() => {
    getTests();
  }, []);

  const answerClass = (myAnswer, answer, option) => {
    if (myAnswer === option && answer === option)
      return "text-green font-medium";
    if (myAnswer === option) return "text-green";
    if (answer === option) return "text-blue";
    return "";
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex gap-4">
            <IoChevronBackCircleOutline
              className="text-4xl cursor-pointer"
              onClick={() => navigate("/test-list")}
            />
            <div>
              <h2>{testDetails.user}</h2>
              <p>
                <span className="font-medium">Category:</span>{" "}
                {testDetails.category}
              </p>
              <p>
                <span className="font-medium">Score:</span> {testDetails.score}
              </p>
              <p>
                <span className="font-medium">Completion:</span>{" "}
                {testDetails.isCompleted ? "Completed" : "Not Completed"}
              </p>
            </div>
          </div>
        </div>
        <div className="text-xs sticky top-4">
          <div className="flex gap-2 items-center mb-1">
            <span className="p-2 bg-blue"></span>
            CORRECT ANSWER
          </div>
          <div className="flex gap-2 items-center mb-1">
            <span className="p-2 bg-green"></span>
            YOUR ANSWER
          </div>
          <div className="flex gap-2 items-center mb-1">
            <span className="p-2 bg-red"></span>
            SKIPPED BY USER
          </div>
        </div>
      </div>
      <div>
        <h4>Responses</h4>
        <div className="my-4">
          {questions.length > 0 ? (
            questions.map((item, index) => (
              <div key={item._id} className="mb-4">
                <div className={item.myAnswer === "skipped" ? "text-red" : ""}>
                  <span className="font-medium">Q{index + 1}:</span>{" "}
                  {item.question}
                </div>
                <div>
                  <div
                    className={answerClass(
                      item.myAnswer,
                      item.answer,
                      item.Option1
                    )}
                  >
                    A. {item.Option1}
                  </div>
                  <div
                    className={answerClass(
                      item.myAnswer,
                      item.answer,
                      item.Option2
                    )}
                  >
                    B. {item.Option2}
                  </div>
                  <div
                    className={answerClass(
                      item.myAnswer,
                      item.answer,
                      item.Option3
                    )}
                  >
                    C. {item.Option3}
                  </div>
                  <div
                    className={answerClass(
                      item.myAnswer,
                      item.answer,
                      item.Option4
                    )}
                  >
                    D. {item.Option4}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No responses found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestResponses;
