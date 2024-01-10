import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./App.scss";

import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import QuestionList from "./pages/QuestionList";
import QuestionPaperList from "./pages/QuestionPaperList";
import UserList from "./pages/UserList";
import AddQuestion from "./pages/AddQuestion";
import UpdateQuestion from "./pages/UpdateQuestion";
import AddQuestionPaper from "./pages/AddQuestionPaper";
import Layout from "./layout";

import "react-simple-toasts/dist/theme/success.css";
import "react-simple-toasts/dist/theme/failure.css";
import PassContext from "./components/utils/PassContext";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import ViewQuestions from "./pages/ViewQuestions";

const routes = createBrowserRouter([
  {
    path: "/auth/login",
    element: <Auth />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/question-list",
            element: <QuestionList />,
          },
          {
            path: "/question-paper-list",
            element: <QuestionPaperList />,
          },
          {
            path: "/question-paper-list/:id",
            element: <ViewQuestions />,
          },
          {
            path: "/user-list",
            element: <UserList />,
          },
          {
            path: "/add-question",
            element: <AddQuestion />,
          },
          {
            path: "/update-question/:id",
            element: <UpdateQuestion />,
          },
          {
            path: "/add-question-paper",
            element: <AddQuestionPaper />,
          },
        ],
      },
    ],
  },
]);

function App() {
  const [loggedUser, setLoggedUser] = useState("");
  const [loading, setLoading] = useState(true);
  const handleReturningUser = () => {
    const token = localStorage.getItem("mcq-token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("mcq-token");
        setLoggedUser("");
      } else {
        setLoggedUser(token);
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    handleReturningUser();
  }, []);

  if (loading) return null;
  return (
    <PassContext.Provider value={{ loggedUser, setLoggedUser }}>
      <RouterProvider router={routes} />
    </PassContext.Provider>
  );
}

export default App;
