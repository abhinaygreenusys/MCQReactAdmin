import { useState, useEffect } from "react";
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIosNew,
} from "react-icons/md";
import "./pagination.css";

const Pagination = ({ page, setPage, lastPage, size = "md" }) => {
  const initialise = () => {
    if (lastPage === 1) return [1];
    else if (lastPage === 2) return [1, 2];
    return [1, 2, 3];
  };
  const [pagesList, setPagesList] = useState([]);
  useEffect(() => {
    setPagesList(initialise());
  }, [lastPage]);
  const handleChange = (value) => {
    setPage(value);
    if (value > 3) {
      if (value === lastPage) setPagesList([value - 2, value - 1, value]);
      else setPagesList([value - 1, value, value + 1]);
    } else {
      setPagesList(initialise());
    }
  };

  if (lastPage === null || lastPage === 1) return "";
  return (
    <div className={`pagination ${size}`}>
      <button
        className={page === 1 ? "disabled pagination-btn" : "pagination-btn"}
        onClick={() => {
          if (page !== 1) handleChange(1);
        }}
        disabled={page === 1}
      >
        <MdKeyboardDoubleArrowLeft />
      </button>
      <button
        className={page === 1 ? "disabled pagination-btn" : "pagination-btn"}
        onClick={() => {
          if (page !== 1) handleChange(page - 1);
        }}
        disabled={page === 1}
      >
        <MdOutlineArrowBackIosNew />
      </button>
      {pagesList &&
        pagesList.map((e) => (
          <span
            key={e}
            className={page === e ? "active pagination-num" : "pagination-num"}
            onClick={() => handleChange(e)}
          >
            {e}
          </span>
        ))}
      <button
        className={
          page === lastPage ? "disabled pagination-btn" : "pagination-btn"
        }
        onClick={() => {
          if (page !== lastPage) handleChange(page + 1);
        }}
        disabled={page === lastPage}
      >
        <MdOutlineArrowForwardIos />
      </button>
      <button
        className={
          page === lastPage ? "disabled pagination-btn" : "pagination-btn"
        }
        onClick={() => {
          if (page !== lastPage) handleChange(lastPage);
        }}
        disabled={page === lastPage}
      >
        <MdKeyboardDoubleArrowRight />
      </button>
    </div>
  );
};
Pagination.defaultProps = {
  size: "lg",
  lastPage: 100,
};

export default Pagination;
