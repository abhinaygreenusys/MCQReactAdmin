import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import PassContext from "./components/utils/PassContext";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import "react-simple-toasts/dist/theme/success.css";
import "react-simple-toasts/dist/theme/failure.css";
import "./App.scss";

import Auth from "./pages/Auth";
import Layout from "./layout";
import Dashboard from "./pages/Dashboard";
import ManageCategories from "./pages/ManageCategories";
import QuestionList from "./pages/QuestionList";
import AddQuestion from "./pages/AddQuestion";
import UpdateQuestion from "./pages/UpdateQuestion";
import UserList from "./pages/UserList";
import ModeratorList from "./pages/ModeratorList";
import AddModerator from "./pages/AddModerator";
// import QuestionPaperList from "./pages/QuestionPaperList";
// import ViewQuestions from "./pages/ViewQuestions";
// import AddQuestionPaper from "./pages/AddQuestionPaper";

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
            path: "/manage-categories",
            element: <ManageCategories />,
          },
          {
            path: "/question-list",
            element: <QuestionList />,
          },
          {
            path: "/question-list/add-question",
            element: <AddQuestion />,
          },
          {
            path: "/question-list/update-question/:id",
            element: <UpdateQuestion />,
          },
          // {
          //   path: "/question-paper-list",
          //   element: <QuestionPaperList />,
          // },
          // {
          //   path: "/question-paper-list/:id",
          //   element: <ViewQuestions />,
          // },
          // {
          //   path: "/question-paper-list/add-question-paper",
          //   element: <AddQuestionPaper />,
          // },
          {
            path: "/user-list",
            element: <UserList />,
          },
          {
            path: "/moderator-list",
            element: <ModeratorList />,
          },
          {
            path: "/moderator-list/add-moderator",
            element: <AddModerator />,
          }
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
