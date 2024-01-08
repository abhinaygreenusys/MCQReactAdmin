import { useState, useEffect } from "react";
import api from "../../components/utils/api";
import myToast from "../../components/utils/myToast";
import Table from "../../components/common/Table";
import Pagination from "../../components/common/Pagination";

const UserList = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const getUsers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/getUsers?page=${page}`);
      console.log(data);
      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.log(err);
      myToast(
        err?.response?.data?.error || "Something went wrong",
        "failure"
      );
    }
    setLoading(false);
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <h2 className="mb-8">All Question Papers</h2>
      <div>
        <Table
          tHead={["S.No.", "Name", "ID", "Email", "Status", "Tests"]}
          loading={loading}
        >
          {users.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.employeeId}</td>
              <td>{item.email}</td>
              <td>{item.isVerified ? "Verified" : "Not Verified"}</td>
              <td></td>
            </tr>
          ))}
        </Table>
        <Pagination lastPage={totalPages} page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default UserList;
