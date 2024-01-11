import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../components/utils/api";
import Button from "../../components/common/Button";
import myToast from "../../components/utils/myToast";
import Table from "../../components/common/Table";
import Pagination from "../../components/common/Pagination";
import { RiDeleteBinLine } from "react-icons/ri";

const ModeratorList = () => {
  const [loading, setLoading] = useState(true);
  const [moderators, setModerators] = useState([]);
  const getModerators = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/getMediators");
      console.log(data);
      setModerators(data.result);
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
    }
    setLoading(false);
  };
  useEffect(() => {
    getModerators();
  }, []);

  const handleDelete = async (id) => {
    try {
      const { data } = await api.delete(`/deleteMediator/${id}`);
      console.log(data);
      myToast(data.message, "success");
      getModerators();
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2>All Moderators</h2>
        <Link to="./add-moderator">
          <Button>Add Moderator</Button>
        </Link>
      </div>
      <div>
        <Table tHead={["S.No.", "Name", "User Id", "Action"]} loading={loading}>
          {moderators.length > 0 ? (
            moderators.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.userId}</td>
                <td>
                  <span
                    className="cursor-pointer"
                    onClick={() => handleDelete(item._id)}
                  >
                    <RiDeleteBinLine />
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No Moderators Found
              </td>
            </tr>
          )}
        </Table>
      </div>
    </div>
  );
};

export default ModeratorList;