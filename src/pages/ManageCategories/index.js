import { useState, useEffect } from "react";
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

  const deleteCategory = async (category) => {
    try {
      const { data } = await api.delete("/deleteCategory/", {
        data: { name: category },
      });
      console.log(data);
      setCategories(categories.filter((item) => item !== category));
      myToast(data.message, "success");
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
    }
  };

  const [newCategory, setNewCategory] = useState("");
  const addCategory = async () => {
    try {
      const { data } = await api.post("/addCategory", {
        category: newCategory,
      });
      console.log(data);
      setCategories([...categories, newCategory]);
      setNewCategory("");
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2>Manage Categories</h2>
      </div>
      <section className="mb-8">
        <div className="my-4">
          <h5>Add a new Category</h5>
        </div>
        <form
          className="flex gap-4 items-center"
          onSubmit={(e) => {
            e.preventDefault();
            addCategory();
          }}
        >
          <input
            type="text"
            className="w-full"
            placeholder="Enter category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button type="submit">Add</Button>
        </form>
      </section>
      <section>
        <div className="my-4">
          <h5>Existing Categories</h5>
        </div>
        <div className="flex flex-wrap gap-4">
          {categories.length > 0 ? (
            categories.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border border-gray-300 rounded-md bg-white gap-4"
              >
                <div className="px-4">{item}</div>
                <span
                  className="p-2 cursor-pointer"
                  onClick={() => deleteCategory(item)}
                >
                  <MdOutlineClose />
                </span>
              </div>
            ))
          ) : (
            <div>No categories found</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ManageCategories;
