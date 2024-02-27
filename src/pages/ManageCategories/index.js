import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../components/utils/api";
import myToast from "../../components/utils/myToast";
import Button from "../../components/common/Button";
import Table from "../../components/common/Table";
import {
  MdOutlineQrCodeScanner,
  MdDeleteOutline,
  MdEdit,
} from "react-icons/md";

const ManageCategories = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const getCategories = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/getCategories");
      console.log(data);
      setCategories(data.result);
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
    }
    setLoading(false);
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
      <div className="mb-8 flex justify-between items-center gap-4 flex-wrap">
        <h2>Manage Categories</h2>
        <Link to="./add-category">
          <Button>Add Category</Button>
        </Link>
      </div>
      <div>
        <Table
          tHead={["S.No.", "Name", "Assets", "Questions", "Action"]}
          loading={loading}
        >
          {categories.length > 0 ? (
            categories.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td
                  className="cursor-pointer"
                  onClick={() =>
                    navigate(`/manage-categories/${item._id}/qr-code`)
                  }
                >
                  <div className="flex gap-2 items-start">
                    <span>{item.name}</span>
                    <span className="text-theme text-2xl">
                      <MdOutlineQrCodeScanner />
                    </span>
                  </div>
                </td>
                <td
                  className="text-theme cursor-pointer hover:underline"
                  onClick={() =>
                    navigate(`/manage-categories/${item._id}/assets`)
                  }
                >
                  Manage ({item.urls.length})
                </td>
                <td>
                  <Button
                    size="sm"
                    rounded="sm"
                    theme="blue"
                    onClick={() =>
                      navigate(
                        `/manage-categories/${item._id}/add-bulk-questions`
                      )
                    }
                  >
                    Add multiple
                  </Button>
                </td>
                <td className="flex gap-2">
                  <span
                    className="p-2 cursor-pointer text-xl hover:text-theme"
                    onClick={() => deleteCategory(item._id)}
                  >
                    <MdDeleteOutline />
                  </span>
                  <span
                    className="p-2 cursor-pointer text-xl hover:text-theme"
                    onClick={() => navigate(`./${item._id}/update-category`)}
                  >
                    <MdEdit />
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No Categories Found
              </td>
            </tr>
          )}
        </Table>
      </div>
    </div>
  );
};

export default ManageCategories;
