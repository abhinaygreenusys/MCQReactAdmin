import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { PiExam } from "react-icons/pi";
import { IoIosPaper } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { ImUsers } from "react-icons/im";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const data = [
    {
      icon: <MdDashboard />,
      name: "Dashboard",
      link: "/",
    },
    {
      icon: <IoIosPaper />,
      name: "Questions",
      link: "/question-list",
    },
    {
      icon: <PiExam />,
      name: "Question Papers",
      link: "/question-paper-list",
    },
    {
      icon: <ImUsers />,
      name: "Users",
      link: "/user-list",
    },
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
          <img src="/assets/logo.png" alt="logo" className="h-12 w-12" />
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
      </ul>
    </div>
  );
};

export default Sidebar;
