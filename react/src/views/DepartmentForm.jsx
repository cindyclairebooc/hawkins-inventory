import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";

export default function DepartmentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [department, setDepartment] = useState({
    id: null,
    dep_name: '',
    dep_description: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient.get(`/departments/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setDepartment(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const onSubmit = ev => {
    ev.preventDefault();
    setLoading(true);

    if (id) {
      axiosClient.put(`/departments/${department.id}`, department)
        .then(() => {
          navigate('/departments');
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient.post(`/departments`, department)
        .then(() => {
          navigate('/departments');
        })
        .catch((err) => {
            setLoading(false);
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <>
      {department.id ? <h1>Update Department: {department.dep_name}</h1> : <h1>Create New Department</h1>}
      <div className="card animated fadeInDown">
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key, index) => (
              <p key={index}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            <input
              value={department.dep_name}
              onChange={(ev) => setDepartment({ ...department, dep_name: ev.target.value })}
              placeholder="Name"
            />
            <input
              value={department.dep_description}
              onChange={(ev) => setDepartment({ ...department, dep_description: ev.target.value })}
              placeholder="Description"
            />
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  );
}