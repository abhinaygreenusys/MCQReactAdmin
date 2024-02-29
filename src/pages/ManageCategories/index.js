import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../components/utils/api";
import myToast from "../../components/utils/myToast";
import Button from "../../components/common/Button";
import Table from "../../components/common/Table";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

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
          tHead={["S.No.", "Name", "Assets", "Questions", "QR", "Action"]}
          loading={loading}
        >
          {categories.length > 0 ? (
            categories.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>

                <td
                  className="text-theme cursor-pointer hover:underline text-sm"
                  onClick={() => navigate(`./${item._id}/update-category`)}
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
                <td
                  className="cursor-pointer hover:text-theme"
                  onClick={() =>
                    navigate(`/manage-categories/${item._id}/qr-code`)
                  }
                >
                  <div className="flex gap-1 items-center">
                    <span className="text-2xl">
                      <MdOutlineQrCodeScanner />
                    </span>
                    <span className="text-sm">Generate</span>
                  </div>
                </td>
                <td className="p-2 cursor-pointer hover:text-theme">
                  <span
                    onClick={() => deleteCategory(item._id)}
                    className="flex gap-1 items-center"
                  >
                    <RiDeleteBinLine className="text-xl" />
                    <span className="text-sm">Remove</span>
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
