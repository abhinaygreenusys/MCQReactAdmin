import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import myToast from "../../components/utils/myToast";
import PassContext from "../../components/utils/PassContext";
import { IoIosPaper } from "react-icons/io";
import { MdDashboard, MdLogout, MdCategory, MdShield } from "react-icons/md";
import { ImUsers } from "react-icons/im";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setLoggedUser } = useContext(PassContext);

  const data = [
    {
      icon: <MdDashboard />,
      name: "Dashboard",
      link: "/",
    },
    {
      icon: <MdCategory />,
      name: "Manage Categories",
      link: "/manage-categories",
    },
    {
      icon: <IoIosPaper />,
      name: "Questions",
      link: "/question-list",
    },
    // {
    //   icon: <PiExam />,
    //   name: "Question Papers",
    //   link: "/question-paper-list",
    // },
    {
      icon: <ImUsers />,
      name: "Users",
      link: "/user-list",
    },
    {
      icon: <MdShield />,
      name: "Moderators",
      link: "/moderator-list",
    }
  ];
  const [active, setActive] = useState(0);
  useEffect(() => {
    data.forEach((item, index) => {
      if (location.pathname.includes(item.link)) setActive(index);
    });
  }, [location.pathname]);
  return (
    <div className="sidebar">
      <div className="px-6 py-5">
        <Link to="/" className="flex gap-2 items-center">
          <img src="/app_logo.png" alt="logo" className="h-12 w-12" />
          <span className="font-semibold">Admin Panel</span>
        </Link>
      </div>
      <hr className="mx-5" />
      <ul>
        {data.map((item, index) => (
          <li
            key={index}
            className={`sidebar-item ${
              active === index ? "active" : "cursor-pointer"
            }`}
            onClick={() => {
              setActive(index);
              navigate(data[index].link);
            }}
          >
            {item.icon}
            {item.name}
          </li>
        ))}
        <li
          className="sidebar-item cursor-pointer"
          onClick={() => {
            localStorage.removeItem("mcq-token");
            setLoggedUser("");
            myToast("Logged out successfully", "success");
            navigate("/auth/login");
          }}
        >
          <MdLogout />
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
