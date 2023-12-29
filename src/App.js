import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import QuestionList from "./pages/QuestionList";
import QuestionPaperList from "./pages/QuestionPaperList";
import UserList from "./pages/UserList";
import AddQuestion from "./pages/AddQuestion";
import UpdateQuestion from "./pages/UpdateQuestion";
import AddQuestionPaper from "./pages/AddQuestionPaper";
import Layout from "./layout";

const routes = createBrowserRouter([
  {
    path: "/auth/login",
    element: <Auth />,
  },
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
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
