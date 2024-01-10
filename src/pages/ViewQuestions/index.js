import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import Table from "../../components/common/Table";

const ViewQuestions = () => {
  const location = useLocation();
  const { questions } = location.state;

  return (
    <div>
      <Link className="flex gap-2 items-center mb-8" to="/question-paper-list">
        <IoChevronBackCircleOutline className="text-3xl" />
        <span className="text-xl font-medium">Go Back</span>
      </Link>
      <div>
        <Table tHead={["S.No.", "Question", "Options"]}>
          {questions
            ? questions.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.question}</td>
                  <td>
                    <ul className="flex gap-x-4 gap-y-2 flexx-wrap">
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
                    </ul>
                    <ul className="flex gap-x-4 gap-y-2 flexx-wrap">
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
                </tr>
              ))
            : "Some error occured"}
        </Table>
      </div>
    </div>
  );
};

export default ViewQuestions;
