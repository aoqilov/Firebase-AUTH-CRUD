import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../utils/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { toast } from "sonner";

const Home = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await getDocs(collection(db, "users"));
    const userList = response.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return setUsers(userList);
  };

  const handleEdit = (id) => {
    navigate(`/users/${id}/edit`);
    console.log(id);
  };
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      toast.success("deleted");
      fetchUsers();
    } catch (error) {
      toast.message(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <a
        href=""
        onClick={() => {
          localStorage.removeItem("username");
          navigate("/login");
        }}
        className="text-end text-primary "
      >
        if you want Logout
      </a>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>User List</h2>
        <button className="btn btn-success" onClick={() => navigate("/users")}>
          + POST NEW USER
        </button>
      </div>
      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleEdit(user.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
