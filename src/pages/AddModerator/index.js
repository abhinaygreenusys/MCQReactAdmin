import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../components/utils/api";
import myToast from "../../components/utils/myToast";
import Button from "../../components/common/Button";

const AddQuestion = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const addQuestion = async () => {
    try {
      const { data } = await api.post("/addMediator", {
        name,
        userId,
        password,
      });
      console.log(data);
      myToast(data.message, "success");
      navigate("/moderator-list");
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
    }
  };

  return (
    <div>
      <h2 className="mb-8">Add Moderator</h2>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addQuestion();
          }}
        >
          <div className="mb-4">
            <h5 className="mb-1">Name</h5>
            <input
              className="w-full"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <h5 className="mb-1">User Id</h5>
            <input
              className="w-full"
              type="text"
              placeholder="User Id"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <h5 className="mb-1">Password</h5>
            <input
              className="w-full"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <Button type="submit">Add Moderator</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;
