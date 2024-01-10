import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import myToast from "../../components/utils/myToast";
import PassContext from "../../components/utils/PassContext";

const Auth = () => {
  const navigate = useNavigate();
  const { setLoggedUser } = useContext(PassContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/login`,
        { email, password }
      );
      console.log(data);
      setLoggedUser(data.token);
      localStorage.setItem("mcq-token", data.token);
      myToast("Logged in successfully", "success");
      navigate("/");
    } catch (error) {
      console.log(error);
      myToast(error?.response?.data?.error, "failure");
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Card size="lg" className="w-[28rem]">
        <h3 className="mb-8">Login</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
          className="w-full"
          autoComplete
        >
          <div className="mb-4">
            <h5 className="mb-1">Email</h5>
            <input
              className="w-full"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <Button rounded="none" className="w-full font-medium" type="submit">
              Log In
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Auth;
