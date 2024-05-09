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
import AddCategory from "./pages/AddCategory";
import UpdateCategory from "./pages/UpdateCategory";
import CategoryQRCode from "./pages/CategoryQRCode";
import QuestionList from "./pages/QuestionList";
import AddQuestion from "./pages/AddQuestion";
import AddBulkQuestions from "./pages/AddBulkQuestions";
import UpdateQuestion from "./pages/UpdateQuestion";
import UserList from "./pages/UserList";
import TestList from "./pages/TestList";
import TestResponses from "./pages/TestResponses";
import UploadTestInstructions from "./pages/UploadTestInstructions";

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
            path: "/upload-test-instructions",
            element: <UploadTestInstructions />,
          },
          {
            path: "/manage-categories",
            element: <ManageCategories />,
          },
          {
            path: "/manage-categories/add-category",
            element: <AddCategory />,
          },
          {
            path: "/manage-categories/:id/update-category",
            element: <UpdateCategory />,
          },
          {
            path: "/manage-categories/:id/add-bulk-questions",
            element: <AddBulkQuestions />,
          },
          {
            path: "/manage-categories/:id/qr-code",
            element: <CategoryQRCode />,
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
          {
            path: "/user-list",
            element: <UserList />,
          },
          {
            path: "/test-list",
            element: <TestList />,
          },
          {
            path: "/test-list/:id",
            element: <TestResponses />,
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
    // <UserList />
  );
}

export default App;
