import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient, { getDepartments, getPositions } from "../axios-client";

export default function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    gender: "",
    date_of_birth: "",
    password: "",
    password_confirmation: "",
    user_type: "",
    department_id: "",
    position_id: ""
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [department, setDepartment] = useState([]);
  const [position, setPosition] = useState([]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient
        .get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setUser({
            ...data,
            password: "",
            password_confirmation: "",
            user_type: data.user_type
          });
        })
        .catch(() => {
          setLoading(false);
        });
    }

    // Fetch departments
    getDepartments()
      .then((data) => {
        if (Array.isArray(data)) {
          setDepartment(data);
        } else {
          console.error("Department response is not an array");
        }
      })
      .catch((err) => console.error(err));

    // Fetch positions
    getPositions()
      .then((data) => {
        if (Array.isArray(data)) {
          setPosition(data);
        } else {
          console.error("Position response is not an array");
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  const onSubmit = (ev) => {
    ev.preventDefault();
    setErrors(null);

    const userData = {
      ...user,
      department_id: parseInt(user.department_id),
      position_id: parseInt(user.position_id)
    };

    if (user.id) {
      axiosClient
        .put(`/users/${user.id}`, userData)
        .then(() => {
          navigate("/users");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post("/users", userData)
        .then(() => {
          navigate("/users");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  const handleGenderChange = (value) => {
    setUser({ ...user, gender: value });
  };

  const handleDateOfBirthChange = (value) => {
    setUser({ ...user, date_of_birth: value });
  };

  const handleUserTypeChange = (value) => {
    setUser({ ...user, user_type: value });
  };

  const handleDepartmentChange = (value) => {
    setUser((prevUser) => ({ ...prevUser, department_id: value }));
  };

  const handlePositionChange = (value) => {
    setUser((prevUser) => ({ ...prevUser, position_id: value }));
  };

  return (
    <>
      {user.id ? (
        <h1 className="text-xl font-bold mb-4">Update User: {user.name}</h1>
      ) : (
        <h1 className="text-xl font-bold mb-4">New User</h1>
      )}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center text-gray-500">Loading...</div>
        )}
        {errors && (
          <div
            className="alert bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
            role="alert"
          >
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit} className="space-y-4">
            <input
              value={user.name}
              onChange={(ev) =>
                setUser({ ...user, name: ev.target.value })
              }
              placeholder="Name"
              className="w-full px-3 py-2 border rounded"
            />
            <input
              value={user.email}
              onChange={(ev) =>
                setUser({ ...user, email: ev.target.value })
              }
              placeholder="Email"
              className="w-full px-3 py-2 border rounded"
            />
            <select
              value={user.gender}
              onChange={(ev) => handleGenderChange(ev.target.value)}
              placeholder="Gender"
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="date"
              value={user.date_of_birth}
              onChange={(ev) =>
                handleDateOfBirthChange(ev.target.value)
              }
              placeholder="Date of Birth"
              className="w-full px-3 py-2 border rounded"
            />
            <select
              value={user.department_id}
              onChange={(ev) =>
                handleDepartmentChange(ev.target.value)
              }
              placeholder="Department"
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select Department</option>
              {department.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
            <select
              value={user.position_id}
              onChange={(ev) =>
                handlePositionChange(ev.target.value)
              }
              placeholder="Position"
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select Position</option>
              {position.map((pos) => (
                <option key={pos.id} value={pos.id}>
                  {pos.pos_name}
                </option>
              ))}
            </select>
            <input
              type="password"
              value={user.password}
              onChange={(ev) =>
                setUser({ ...user, password: ev.target.value })
              }
              placeholder="Password"
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="password"
              value={user.password_confirmation}
              onChange={(ev) =>
                setUser({
                  ...user,
                  password_confirmation: ev.target.value
                })
              }
              placeholder="Password Confirmation"
              className="w-full px-3 py-2 border rounded"
            />
            <select
              value={user.user_type}
              onChange={(ev) =>
                handleUserTypeChange(ev.target.value)
              }
              placeholder="User Type"
              className="w-full px-3 py-2 border rounded bg-gray-200"
            >
              <option value="" disabled>
                Select User Type
              </option>
              <option value="employee">Employee</option>
            </select>
            <button className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Save
            </button>
          </form>
        )}
      </div>
    </>
  );
}
