import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    getUsers();
    getDepartments();
    getPositions();
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  const onDelete = (user) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    axiosClient.delete(`/users/${user.id}`)
      .then(() => {
        getUsers();
        setNotification({
          type: 'Danger',
          message: `User ${user.name} has been deleted.`,
        });
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        setNotification({
          type: 'Danger',
          message: 'Failed to delete user. Please try again.',
        });
      });
  };

  const getUsers = () => {
    setLoading(true);
    axiosClient.get('/users')
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching users:", error);
      });
  };

  const getDepartments = () => {
    axiosClient.get('/departments')
      .then(({ data }) => {
        setDepartments(data.data);
      })
      .catch(() => {
        console.error('Error fetching departments');
      });
  };

  const getPositions = () => {
    axiosClient.get('/positions')
      .then(({ data }) => {
        setPositions(data.data);
      })
      .catch(() => {
        console.error('Error fetching positions');
      });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Employees</h1>
        <Link to="/users/new" className="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add new
        </Link>
      </div>
      {notification && (
        <div className="mt-2 bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500" role="alert">
          <span className="font-bold">{notification.type}</span> {notification.message}
        </div>
      )}
      <div className="bg-white shadow-md rounded overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">Create Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">Gender</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">Date of Birth</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">Position</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-teal-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <tr>
                <td colSpan="9" className="text-center py-4">Loading...</td>
              </tr>
            </tbody>
          ) : (
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.created_at}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.date_of_birth}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{departments.find(d => d.id === user.department_id)?.dep_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{positions.find(p => p.id === user.position_id)?.pos_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link className="text-indigo-600 hover:text-indigo-900 mr-2" to={'/users/' + user.id}>Edit</Link>
                    <button onClick={() => onDelete(user)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}