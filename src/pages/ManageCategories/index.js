import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../components/utils/api";
import myToast from "../../components/utils/myToast";
import Button from "../../components/common/Button";
import { MdOutlineClose } from "react-icons/md";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    try {
      const { data } = await api.get("/getCategories");
      console.log(data);
      setCategories(data.result);
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  const deleteCategory = async (categoryId) => {
    try {
      const { data } = await api.delete("/deleteCategory/", {
        data: { _id: categoryId },
      });
      console.log(data);
      setCategories(categories.filter((item) => item._id !== categoryId));
      myToast(data.message, "success");
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
    }
  };

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <h2>Manage Categories</h2>
        <Link to="./add-category">
          <Button>Add Category</Button>
        </Link>
      </div>
      <div className="flex flex-wrap gap-4">
        {categories.length > 0 ? (
          categories.map((item, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-md bg-white"
            >
              <div className="flex justify-between items-center gap-4">
                <div className="px-4">{item.name}</div>
                <span
                  className="p-2 cursor-pointer"
                  onClick={() => deleteCategory(item._id)}
                >
                  <MdOutlineClose />
                </span>
              </div>
              <video
                src={process.env.REACT_APP_BASE_VIDEO_URL + "/" + item.url}
                controls
                width="480"
                height="360"
                className="px-2 pb-2"
              />
            </div>
          ))
        ) : (
          <div>No categories found</div>
        )}
      </div>
    </div>
  );
};

export default ManageCategories;
