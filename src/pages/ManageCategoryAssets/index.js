import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../components/utils/api";
import myToast from "../../components/utils/myToast";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineLink } from "react-icons/ai";

const CategoryAssets = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState("");
  const [categoryUrls, setCategoryUrls] = useState([]);

  const getCategory = async () => {
    try {
      const { data } = await api.get("/getCategory/" + id);
      console.log(data);
      setCategoryName(data.result.name);
      setCategoryUrls(data.result.urls);
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
    }
  };
  useEffect(() => {
    getCategory();
  }, []);

  const handleDelete = async (url) => {
    try {
      const { data } = await api.patch("/deleteCategoryUrl/" + id, { url });
      console.log(data);
      setCategoryUrls(categoryUrls.filter((item) => item !== url));
      myToast(data.message, "success");
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
    }
  };

  return (
    <div>
      <div className="flex gap-4 mb-8">
        <IoChevronBackCircleOutline
          className="text-4xl cursor-pointer"
          onClick={() => navigate("/manage-categories")}
        />
        <h2>{categoryName}</h2>
      </div>
      <div>
        <h4>URLs</h4>
        <div className="my-4">
          {categoryUrls.length > 0 ? (
            categoryUrls.map((item) => (
              <div
                className="flex justify-between items-center mb-2 bg-lightgrey px-4 rounded-sm"
                key={item}
              >
                <a
                  href={`${process.env.REACT_APP_BASE_VIDEO_URL}/${item}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-theme flex items-center gap-2"
                >
                  <AiOutlineLink />
                  {item}
                </a>
                <span
                  className="p-2 pr-0 cursor-pointer"
                  onClick={() => handleDelete(item)}
                >
                  <MdDeleteOutline />
                </span>
              </div>
            ))
          ) : (
            <p>No assets found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryAssets;
