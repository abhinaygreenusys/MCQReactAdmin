import { useState, useEffect } from "react";
import api from "../../components/utils/api";
import myToast from "../../components/utils/myToast";
import Table from "../../components/common/Table";
import Pagination from "../../components/common/Pagination";

const UserList = () => {
  const [loading, setLoading] = useState(true);
  const [orderBy, setOrderBy] = useState("asc");
  const [filterBy, setFilterBy] = useState(true);
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const getUsers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `/getUsers?page=${page}&sortByDate=${orderBy}&filterByStatus=${filterBy}`
      );
      console.log(data);
      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
    }
    setLoading(false);
  };
  useEffect(() => {
    getUsers();
  }, [page, orderBy, filterBy]);

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <h2>All Users</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          <div>
            <span className="font-medium">Sort By </span>
            <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
              <option value="asc">Date (↑)</option>
              <option value="desc">Date (↓)</option>
            </select>
          </div>
          <div>
            <span className="font-medium">Filter By </span>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option value={true}>Verified</option>
              <option value={false}>Not Verified</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <Table
          tHead={["S.No.", "Name", "ID", "Email", "Status"]}
          loading={loading}
        >
          {users.length > 0 ? (
            users.map((item, index) => (
              <tr key={item._id}>
                <td>{(page - 1) * 20 + index + 1}</td>
                <td>{item.name}</td>
                <td>{item.employeeId}</td>
                <td>{item.email}</td>
                <td>{item.isVerified ? "Verified" : "Not Verified"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No Users Found
              </td>
            </tr>
          )}
        </Table>
        <Pagination lastPage={totalPages} page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default UserList;
